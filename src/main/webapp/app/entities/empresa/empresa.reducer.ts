import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEmpresa, defaultValue } from 'app/shared/model/empresa.model';

export const ACTION_TYPES = {
  FETCH_EMPRESA_LIST: 'empresa/FETCH_EMPRESA_LIST',
  FETCH_EMPRESA: 'empresa/FETCH_EMPRESA',
  CREATE_EMPRESA: 'empresa/CREATE_EMPRESA',
  UPDATE_EMPRESA: 'empresa/UPDATE_EMPRESA',
  DELETE_EMPRESA: 'empresa/DELETE_EMPRESA',
  SET_BLOB: 'empresa/SET_BLOB',
  RESET: 'empresa/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEmpresa>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type EmpresaState = Readonly<typeof initialState>;

// Reducer

export default (state: EmpresaState = initialState, action): EmpresaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EMPRESA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EMPRESA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_EMPRESA):
    case REQUEST(ACTION_TYPES.UPDATE_EMPRESA):
    case REQUEST(ACTION_TYPES.DELETE_EMPRESA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_EMPRESA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EMPRESA):
    case FAILURE(ACTION_TYPES.CREATE_EMPRESA):
    case FAILURE(ACTION_TYPES.UPDATE_EMPRESA):
    case FAILURE(ACTION_TYPES.DELETE_EMPRESA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPRESA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPRESA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_EMPRESA):
    case SUCCESS(ACTION_TYPES.UPDATE_EMPRESA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_EMPRESA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType,
        },
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/empresas';

// Actions

export const getEntities: ICrudGetAllAction<IEmpresa> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EMPRESA_LIST,
  payload: axios.get<IEmpresa>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IEmpresa> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EMPRESA,
    payload: axios.get<IEmpresa>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IEmpresa> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EMPRESA,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEmpresa> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EMPRESA,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEmpresa> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EMPRESA,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType,
  },
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
