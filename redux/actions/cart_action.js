import axios from "axios";
import API_URL from "../../helpers/apiurl";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const getCartAction = () => {
  let token = Cookies.get("token");
  return async (dispatch) => {
    try {
      let response = await axios.get(`${API_URL}/transaction/get-cart`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "UPDATE_CART", payload: response.data.result });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
};
