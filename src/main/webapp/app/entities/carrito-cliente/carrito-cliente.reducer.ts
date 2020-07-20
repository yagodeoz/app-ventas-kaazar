import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICarritoCliente, defaultValue } from 'app/shared/model/carrito-cliente.model';

export const ACTION_TYPES = {
  FETCH_CARRITOCLIENTE_LIST: 'carritoCliente/FETCH_CARRITOCLIENTE_LIST',
  FETCH_CARRITOCLIENTE: 'carritoCliente/FETCH_CARRITOCLIENTE',
  CREATE_CARRITOCLIENTE: 'carritoCliente/CREATE_CARRITOCLIENTE',
  UPDATE_CARRITOCLIENTE: 'carritoCliente/UPDATE_CARRITOCLIENTE',
  DELETE_CARRITOCLIENTE: 'carritoCliente/DELETE_CARRITOCLIENTE',
  RESET: 'carritoCliente/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICarritoCliente>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type CarritoClienteState = Readonly<typeof initialState>;

// Reducer

export default (state: CarritoClienteState = initialState, action): CarritoClienteState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CARRITOCLIENTE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CARRITOCLIENTE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_CARRITOCLIENTE):
    case REQUEST(ACTION_TYPES.UPDATE_CARRITOCLIENTE):
    case REQUEST(ACTION_TYPES.DELETE_CARRITOCLIENTE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_CARRITOCLIENTE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CARRITOCLIENTE):
    case FAILURE(ACTION_TYPES.CREATE_CARRITOCLIENTE):
    case FAILURE(ACTION_TYPES.UPDATE_CARRITOCLIENTE):
    case FAILURE(ACTION_TYPES.DELETE_CARRITOCLIENTE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CARRITOCLIENTE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CARRITOCLIENTE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_CARRITOCLIENTE):
    case SUCCESS(ACTION_TYPES.UPDATE_CARRITOCLIENTE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_CARRITOCLIENTE):
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

const apiUrl = 'api/carrito-clientes';

// Actions

export const getEntities: ICrudGetAllAction<ICarritoCliente> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CARRITOCLIENTE_LIST,
  payload: axios.get<ICarritoCliente>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ICarritoCliente> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CARRITOCLIENTE,
    payload: axios.get<ICarritoCliente>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ICarritoCliente> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CARRITOCLIENTE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICarritoCliente> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CARRITOCLIENTE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICarritoCliente> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CARRITOCLIENTE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
