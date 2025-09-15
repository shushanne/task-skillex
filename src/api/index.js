import axios from "axios";

const createBaseUrl = (baseURL) => {
  const instance = axios.create({
    baseURL,
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const message =
        error.response?.data?.message || error.message || "Unknown error";
      console.error("API Error:", message);

      return Promise.reject({
        message,
        status: error.response?.status || null,
      });
    }
  );

  return instance;
};

export default createBaseUrl;
