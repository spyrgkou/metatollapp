import axios from "axios";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    alert("Unexpected Error");
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["X-OBSERVATORY-AUTH"] = jwt;
  axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
