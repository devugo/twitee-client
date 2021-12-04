import axios from 'axios';

import { SERVER_URL } from '../../constants/SERVER_URL';
import { STORAGE_VARIABLE } from '../../constants/STORAGE_VARIABLE';
import { retrieveFromStorage } from '../../helpers/functions/localStorage';
import { ActionType } from '../../types.d';

type ActionObject = {
  type: ActionType;
  api: (client: any) => {};
  url: string;
  data?: any;
};

const apiMiddleware = (store: any) => (next: any) => async (action: ActionObject) => {
  const GET_TOKEN = retrieveFromStorage(STORAGE_VARIABLE.token);

  const axiosClient: any = axios.create({
    baseURL: SERVER_URL,
    headers: { Authorization: `Bearer ${GET_TOKEN}` },
  });
  const { api, type, url, data } = action;
  if (data) {
    next({ type: type.SUCCESS, response: data });
  } else if (!url) {
    next({ type: type.SUCCESS, response: null });
  } else {
    next({ type: type.IN_PROGRESS, response: null });

    const promise = api(axiosClient) as any;
    promise
      .then((response: any) => {
        next({ type: type.SUCCESS, response: response });
      })
      .catch((error: any) => {
        next({ type: type.FAILURE, response: error.response });
      });
  }
};

export default apiMiddleware;
