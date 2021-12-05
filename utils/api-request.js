import axios from 'axios';

const baseURL = 'https://www.reactjs.caters-vn.xyz:3000/';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Pragma: 'no-cache',
};

const axiosInstance = axios.create({
  baseURL,
  timeout: 30000,
  headers,
});

// Common
const responseError = async err => {
  const dataErr = err.response;
  // console.log(dataErr.status);
  if (err.code === 'ECONNABORTED') {
    return {
      status: 408,
      result: {
        message: 'Timeout',
      },
    };
  } else if (dataErr.status === 401) {
    return {
      status: dataErr.status || 408,
      result: dataErr.data,
    };
  } else {
    return {
      status: dataErr.status || 408,
      result: dataErr.data || 'Timeout',
    };
  }
};

const creatHeadersRequest = token => {
  return {
    headers: {
      'x-token': token,
    },
  };
};

// Call API get
export const getRequest = async (path, token) => {
  const config = creatHeadersRequest(token);
  return await axiosInstance
    .get(`${path}`, config)
    .then(res => {
      // console.log(res.data);
      return {
        status: res.status,
        result: res.data.data,
      };
    })
    .catch(err => {
      return responseError(err, 'get', path, null);
    });
};

// Call API put
export const putRequest = async (path, token, data) => {
  const config = creatHeadersRequest(token);
  return await axiosInstance
    .put(path, data, config)
    .then(res => {
      return {
        status: res.status,
        result: res.data.data,
      };
    })
    .catch(err => {
      console.log(err);
      return responseError(err, 'put', path, data);
    });
};

// Call API create
export const createRequest = async (path, token, data) => {
  const config = creatHeadersRequest(token);
  return await axiosInstance
    .post(path, data, config)
    .then(res => {
      return {
        status: res.status,
        result: res.data.data,
      };
    })
    .catch(err => {
      return responseError(err, 'create', path, data);
    });
};

// Call API update
export const updateRequest = async (path, token, data) => {
  const config = creatHeadersRequest(token);
  return await axiosInstance
    .put(path, data, config)
    .then(res => {
      return {
        status: res.status,
        result: res.data.data,
      };
    })
    .catch(err => {
      return responseError(err, 'update', path, data);
    });
};

// Call API delete
export const deleteRequest = async (path, token) => {
  const config = creatHeadersRequest(token);
  return await axiosInstance
    .delete(path, config)
    .then(res => {
      return {
        status: res.status,
        result: res.data,
      };
    })
    .catch(err => {
      return responseError(err, 'delete', path, null);
    });
};

export const loginRequest = async (path, data) => {
  return await axiosInstance
    .post(path, data)
    .then(res => {
      const {message} = res.data;
      return {
        status: res.status,
        result: {
          message,
          data: res.data.data || null,
        },
      };
    })
    .catch(err => {
      // console.log(err.response);
      const dataErr = err.response;
      if (!dataErr) {
        return {
          status: 500,
          result: {
            message: 'System error',
          },
        };
      } else {
        if (err.code === 'ECONNABORTED') {
          return {
            status: 408,
            result: {
              message: 'Timeout',
            },
          };
        } else {
          return {
            status: dataErr.status,
            result: dataErr.data,
          };
        }
      }
    });
};

export const registerRequest = async (path, data) => {
  return await axiosInstance
    .post(path, data)
    .then(res => {
      const {message} = res.data;
      return {
        status: res.status,
        result: {
          message,
          data: res.data.data || null,
        },
      };
    })
    .catch(err => {
      // console.clear();
      const dataErr = err.response;
      if (!dataErr) {
        return {
          status: 500,
          result: {
            message: 'System error',
          },
        };
      } else {
        if (err.code === 'ECONNABORTED') {
          return {
            status: 408,
            result: {
              message: 'Timeout',
            },
          };
        } else {
          return {
            status: dataErr.status,
            result: dataErr.data,
          };
        }
      }
    });
};
