import axios from 'axios';
import {
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction,
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProductos, defaultValue } from 'app/shared/model/productos.model';

export const ACTION_TYPES = {
  FETCH_PRODUCTOS_LIST: 'productos/FETCH_PRODUCTOS_LIST',
  FETCH_PRODUCTOS: 'productos/FETCH_PRODUCTOS',
  CREATE_PRODUCTOS: 'productos/CREATE_PRODUCTOS',
  UPDATE_PRODUCTOS: 'productos/UPDATE_PRODUCTOS',
  DELETE_PRODUCTOS: 'productos/DELETE_PRODUCTOS',
  SET_BLOB: 'productos/SET_BLOB',
  RESET: 'productos/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProductos>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type ProductosState = Readonly<typeof initialState>;

// Reducer

export default (state: ProductosState = initialState, action): ProductosState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PRODUCTOS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PRODUCTOS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PRODUCTOS):
    case REQUEST(ACTION_TYPES.UPDATE_PRODUCTOS):
    case REQUEST(ACTION_TYPES.DELETE_PRODUCTOS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PRODUCTOS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PRODUCTOS):
    case FAILURE(ACTION_TYPES.CREATE_PRODUCTOS):
    case FAILURE(ACTION_TYPES.UPDATE_PRODUCTOS):
    case FAILURE(ACTION_TYPES.DELETE_PRODUCTOS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRODUCTOS_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_PRODUCTOS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PRODUCTOS):
    case SUCCESS(ACTION_TYPES.UPDATE_PRODUCTOS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PRODUCTOS):
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

const apiUrl = 'api/productos';

// Actions

export const getEntities: ICrudGetAllAction<IProductos> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PRODUCTOS_LIST,
    payload: axios.get<IProductos>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IProductos> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PRODUCTOS,
    payload: axios.get<IProductos>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IProductos> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PRODUCTOS,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const updateEntity: ICrudPutAction<IProductos> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PRODUCTOS,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProductos> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PRODUCTOS,
    payload: axios.delete(requestUrl),
  });
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
