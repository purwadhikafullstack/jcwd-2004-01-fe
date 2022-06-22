import axios from "axios";
import API_URL from "../../helpers/apiurl";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const registerAction = ({ ...values }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LOADING" });

      let res1 = await axios.post(`${API_URL}/auth/register`, {
        ...values,
      });

      dispatch({ type: "LOGIN", payload: res1.data });
      toast.success("Successfully registered!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      Cookies.set("token", res1.headers["x-token-access"]);
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response.data.message || "Network Error",
      });
      toast.error(error.response.data.message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log(error);
    } finally {
      dispatch({ type: "DONE" });
    }
  };
};

export const loginAction = ({ ...values }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LOADING" });
      let res = await axios.post(`${API_URL}/auth/login`, {
        ...values,
        email: values.name,
      });
      dispatch({ type: "LOGIN", payload: { ...res.data } });

      Cookies.set("token", res.headers["x-token-access"]);
      toast.success("Welcome back!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response.data.message || "Network Error",
      });
      toast.error(error.response.data.message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      dispatch({ type: "DONE" });
    }
  };
};
