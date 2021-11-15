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
  baseURL: `${SERVER_BASE_URL}`,
  // headers can be added here
});

/**
 * 
 * @param {String} url The endpoint of the GET request 
 * @param {Object} headers Pass a custom headers object, if any
 * @param {Number} timeout Pass the timeout in milliseconds
 * @returns 
 */
export const GET = (url, headers, timeout) => {
  return axiosInstance({
    method: "get",
    url: url,
    headers: headers || {},
    timeout: timeout || timeouts.TWO_MIN,
  });
};

/**
 * 
 * @param {String} url The endpoint of the GET request
 * @param {Object} body The payload associated with the request
 * @param {Object} headers Pass a custom headers object, if any
 * @param {Number} timeout Pass the timeout in milliseconds
 * @returns 
 */
export const POST = (url, body, headers, timeout) => {
  return axiosInstance({
    method: "post",
    url: url,
    headers: headers || {},
    data: body || {},
    timeout: timeout || timeouts.TWO_MIN,
  });
};

/**
 * 
 * @param {String} url The endpoint of the GET request
 * @param {Object} body The payload associated with the request
 * @param {Object} headers Pass a custom headers object, if any
 * @param {Number} timeout Pass the timeout in milliseconds
 * @returns 
 */
export const PUT = (url, body, headers, timeout) => {
  return axiosInstance({
    method: "put",
    url: url,
    headers: headers || {},
    data: body || {},
    timeout: timeout || timeouts.TWO_MIN,
  });
};

/**
 * 
 * @param {String} url The endpoint of the GET request
 * @param {Object} body The payload associated with the request
 * @param {Object} headers Pass a custom headers object, if any
 * @param {Number} timeout Pass the timeout in milliseconds
 * @returns 
 */
export const PATCH = (url, body, headers, timeout) => {
  return axiosInstance({
    method: "patch",
    url: url,
    headers: headers || {},
    data: body || {},
    timeout: timeout || timeouts.TWO_MIN,
  });
};

/**
 * 
 * @param {String} url The endpoint of the GET request
 * @param {Object} body The payload associated with the request
 * @param {Object} headers Pass a custom headers object, if any
 * @param {Number} timeout Pass the timeout in milliseconds
 * @returns 
 */
export const DELETE = (url, body, headers, timeout) => {
  return axiosInstance({
    method: "delete",
    url: url,
    headers: headers || {},
    data: body || {},
    timeout: timeout || timeouts.TWO_MIN,
  });
};