import axios from "axios";
import API_URL from "../../helpers/apiurl";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const registerAction = ({ ...values }) => {
  return async (dispatch) => {
    try {
      let res1 = await axios.post(`${API_URL}/auth/register`, {
        ...values,
      });

      dispatch({ type: "LOGIN", payload: res1.data });
      toast.success("Successfully registered!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: { backgroundColor: "#48BB78" },
      });

      Cookies.set("token", res1.headers["x-token-access"]);
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response.data.message || "Network Error",
      });
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: { backgroundColor: "#e85362" },
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
      let res = await axios.post(`${API_URL}/auth/login`, {
        ...values,
        email: values.username,
      });
      console.log(res.data);
      dispatch({ type: "LOGIN", payload: { ...res.data.data } });

      Cookies.set("token", res.headers["x-token-access"]);
      toast.success("Welcome back!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: { backgroundColor: "#48BB78" },
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response.data.message || "Network Error",
      });
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: { backgroundColor: "#e85362" },
      });
    } finally {
      dispatch({ type: "DONE" });
    }
  };
};
