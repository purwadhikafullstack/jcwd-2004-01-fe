import {
  Checkbox,
  CheckboxGroup,
  NumberInputField,
  Divider,
  Button,
  NumberInput,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import API_URL from "../helpers/apiurl";
import useCart from "../hooks/useCart";
import Rupiah from "../lib/rupiah";
import CardCartDetail from "./CardCartDetail";
import { getCartAction } from "../redux/actions/cart_action";
import { connect } from "react-redux";

const CardCart = ({ cartData }) => {
  const [input, setInput] = useState();
  const dispatch = useDispatch();

  const handleCheckbox = (e, prop) => {
    console.log(e.target.value, "||", prop);
    let dataArr = [];
    if (e.target.checked) {
      dataArr.push(prop);
    } else {
      dataArr = dataArr.filter((id) => id !== e.target.value);
    }
    console.log(dataArr, "dataArr");
    setInput(dataArr);
    dispatch({ type: "UPDATE_SELECTED_PRODUCT", payload: dataArr });
    console.log(input, "input");
  };

  return (
    <div className="mx-6 md:ml-[96px] md:w-[783px] md:shadow-2xl md:p-9 md:mt-[64px]">
      <div className="mt-8 md:mt-7">
        <Checkbox colorScheme="whiteAlpha" iconColor="black">
          <p className="text-xs">Pilih Semua</p>
        </Checkbox>
      </div>
      <Divider my="23px" w="327px" mx="auto" />
      <div className="flex-col">
        {cartData.map((val, i) => {
          return (
            <CardCartDetail
              cartData={val}
              key={i}
              handleCheckbox={handleCheckbox}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CardCart;
