import axios from "axios";
import API_URL from "../../helpers/apiurl";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import useCart from "../../hooks/useCart";

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

export const UpdateCartAction = ({ data, selected_product }) => {
  return async (dispatch) => {
    try {
      console.log(data, selected_product, "data");
      // dispatch({ type: "UPDATE_SELECTED_QUANTITY", payload: data });
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
};
