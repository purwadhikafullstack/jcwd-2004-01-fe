import axios from "axios";
import API_URL from "../../helpers/apiurl";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export const profileAction = () => {
  let token = Cookies.get("token");
  return async (dispatch) => {
    try {
      let res = await axios.get(`${API_URL}/profile/getuserprofile`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: "UPDATE_PROFILE", payload: res.data });
      toast.success("Successfully updated!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      Cookies.set("token", res.headers["x-token-access"]);
    } catch (error) {
      dispatch({
        type: "PROFILE_ERROR",
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
    }
  };
};
