import { deleteHelper } from '../../helpers/functions/deleteHelper';
import { ApiResponseType, PostType } from '../../types.d';
import {
  COMMENT_ON_POST,
  CREATE_POST,
  DELETE_POST,
  LIKE_A_POST,
  READ_ONE_POST,
  READ_POSTS,
  UPDATE_POST,
} from '../actions/types';
import { DEFAULT_STATE } from './defaultState';

const initialState = DEFAULT_STATE.posts;

const postReducer = (state = initialState, action: ApiResponseType) => {
  const { type, response } = action;
  const currentState = { ...state };

  switch (type) {
    case READ_POSTS.SUCCESS: {
      const responseData = response.data.posts;
      const responseCount = response.data.count;
      return { ...currentState, data: responseData, count: responseCount, loaded: true };
    }
    case READ_ONE_POST.SUCCESS: {
      const responseData = response.data;
      return { ...currentState, current: responseData };
    }

    case CREATE_POST.SUCCESS: {
      const responseData = response.data;
      return { ...currentState, data: [responseData, ...state.data], count: state.count + 1 };
    }

    case DELETE_POST.SUCCESS: {
      const filteredData = deleteHelper(currentState.data);
      if (filteredData) {
        return { ...currentState, data: filteredData, count: currentState.count - 1 };
      }
      return currentState;
    }

    case LIKE_A_POST.SUCCESS: {
      const responseData = response.data;
      const data: PostType[] = currentState.data;
      let current: any = currentState.current;
      const updatedIndex = data.findIndex((data) => data.id === responseData.id);
      if (updatedIndex > -1) {
        data[updatedIndex] = { ...data[updatedIndex], ...responseData };
      }
      if (responseData.id === current.id) {
        current = { ...current, ...responseData };
      }
      return { ...currentState, data, current };
    }

    case COMMENT_ON_POST.SUCCESS: {
      const responseData = response.data;
      const data: PostType[] = currentState.data;
      const updatedIndex = data.findIndex((data) => data.id === responseData.id);
      if (updatedIndex > -1) {
        data[updatedIndex] = { ...data[updatedIndex], ...responseData };
      }
      return { ...currentState, data };
    }

    case UPDATE_POST.SUCCESS: {
      const responseData = response.data;
      const data: PostType[] = currentState.data;
      const updatedIndex = data.findIndex((data) => data.id === responseData.id);
      if (updatedIndex > -1) {
        data[updatedIndex] = responseData;
      }
      return { ...currentState, data };
    }

    default: {
      return state;
    }
  }
};

export default postReducer;
