import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICarritoClienteDetalle, defaultValue } from 'app/shared/model/carrito-cliente-detalle.model';

export const ACTION_TYPES = {
  FETCH_CARRITOCLIENTEDETALLE_LIST: 'carritoClienteDetalle/FETCH_CARRITOCLIENTEDETALLE_LIST',
  FETCH_CARRITOCLIENTEDETALLE: 'carritoClienteDetalle/FETCH_CARRITOCLIENTEDETALLE',
  CREATE_CARRITOCLIENTEDETALLE: 'carritoClienteDetalle/CREATE_CARRITOCLIENTEDETALLE',
  UPDATE_CARRITOCLIENTEDETALLE: 'carritoClienteDetalle/UPDATE_CARRITOCLIENTEDETALLE',
  DELETE_CARRITOCLIENTEDETALLE: 'carritoClienteDetalle/DELETE_CARRITOCLIENTEDETALLE',
  RESET: 'carritoClienteDetalle/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICarritoClienteDetalle>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type CarritoClienteDetalleState = Readonly<typeof initialState>;

// Reducer

export default (state: CarritoClienteDetalleState = initialState, action): CarritoClienteDetalleState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CARRITOCLIENTEDETALLE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CARRITOCLIENTEDETALLE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_CARRITOCLIENTEDETALLE):
    case REQUEST(ACTION_TYPES.UPDATE_CARRITOCLIENTEDETALLE):
    case REQUEST(ACTION_TYPES.DELETE_CARRITOCLIENTEDETALLE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_CARRITOCLIENTEDETALLE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CARRITOCLIENTEDETALLE):
    case FAILURE(ACTION_TYPES.CREATE_CARRITOCLIENTEDETALLE):
    case FAILURE(ACTION_TYPES.UPDATE_CARRITOCLIENTEDETALLE):
    case FAILURE(ACTION_TYPES.DELETE_CARRITOCLIENTEDETALLE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CARRITOCLIENTEDETALLE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_CARRITOCLIENTEDETALLE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_CARRITOCLIENTEDETALLE):
    case SUCCESS(ACTION_TYPES.UPDATE_CARRITOCLIENTEDETALLE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_CARRITOCLIENTEDETALLE):
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

const apiUrl = 'api/carrito-cliente-detalles';

// Actions

export const getEntities: ICrudGetAllAction<ICarritoClienteDetalle> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_CARRITOCLIENTEDETALLE_LIST,
    payload: axios.get<ICarritoClienteDetalle>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<ICarritoClienteDetalle> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CARRITOCLIENTEDETALLE,
    payload: axios.get<ICarritoClienteDetalle>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ICarritoClienteDetalle> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CARRITOCLIENTEDETALLE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICarritoClienteDetalle> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CARRITOCLIENTEDETALLE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICarritoClienteDetalle> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CARRITOCLIENTEDETALLE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
