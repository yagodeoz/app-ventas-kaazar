import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICuentaCliente, defaultValue } from 'app/shared/model/cuenta-cliente.model';

export const ACTION_TYPES = {
  FETCH_CUENTACLIENTE_LIST: 'cuentaCliente/FETCH_CUENTACLIENTE_LIST',
  FETCH_CUENTACLIENTE: 'cuentaCliente/FETCH_CUENTACLIENTE',
  CREATE_CUENTACLIENTE: 'cuentaCliente/CREATE_CUENTACLIENTE',
  UPDATE_CUENTACLIENTE: 'cuentaCliente/UPDATE_CUENTACLIENTE',
  DELETE_CUENTACLIENTE: 'cuentaCliente/DELETE_CUENTACLIENTE',
  RESET: 'cuentaCliente/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICuentaCliente>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type CuentaClienteState = Readonly<typeof initialState>;

// Reducer

export default (state: CuentaClienteState = initialState, action): CuentaClienteState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CUENTACLIENTE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CUENTACLIENTE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_CUENTACLIENTE):
    case REQUEST(ACTION_TYPES.UPDATE_CUENTACLIENTE):
    case REQUEST(ACTION_TYPES.DELETE_CUENTACLIENTE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_CUENTACLIENTE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CUENTACLIENTE):
    case FAILURE(ACTION_TYPES.CREATE_CUENTACLIENTE):
    case FAILURE(ACTION_TYPES.UPDATE_CUENTACLIENTE):
    case FAILURE(ACTION_TYPES.DELETE_CUENTACLIENTE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CUENTACLIENTE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CUENTACLIENTE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_CUENTACLIENTE):
    case SUCCESS(ACTION_TYPES.UPDATE_CUENTACLIENTE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_CUENTACLIENTE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/cuenta-clientes';

// Actions

export const getEntities: ICrudGetAllAction<ICuentaCliente> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CUENTACLIENTE_LIST,
  payload: axios.get<ICuentaCliente>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ICuentaCliente> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CUENTACLIENTE,
    payload: axios.get<ICuentaCliente>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ICuentaCliente> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CUENTACLIENTE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICuentaCliente> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CUENTACLIENTE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICuentaCliente> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CUENTACLIENTE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
