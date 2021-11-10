import axios from 'axios';

// Timeouts
const timeouts = {
  ONE_MIN: 60000,
  TWO_MIN: 120000,
  THIRTY_MIN: 240000,
};

export const SERVER_BASE_URL = "http://localhost:5000";

// Axios Configuration
const axiosInstance = axios.create({
  baseURL: `${SERVER_BASE_URL}/api`,
  // headers can be added here
});

export const GET = (url, headers) => {
  return axiosInstance({
    method: "get",
    url: url,
    headers: headers || {},
    timeout: timeouts.TWO_MIN,
  });
};

export const POST = (url, body, headers, timeout) => {
  return axiosInstance({
    method: "post",
    url: url,
    headers: headers || {},
    data: body || {},
    timeout: timeout || timeouts.TWO_MIN,
  });
};

export const PUT = (url, body, headers) => {
  return axiosInstance({
    method: "put",
    url: url,
    headers: headers || {},
    data: body || {},
    timeout: timeouts.TWO_MIN,
  });
};
export const PATCH = (url, body, headers) => {
  return axiosInstance({
    method: "patch",
    url: url,
    headers: headers || {},
    data: body || {},
    timeout: timeouts.TWO_MIN,
  });
};
export const DELETE = (url, body, headers) => {
  return axiosInstance({
    method: "delete",
    url: url,
    headers: headers || {},
    data: body || {},
    timeout: timeouts.TWO_MIN,
  });
};