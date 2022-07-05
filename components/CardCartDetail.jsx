import {
  Checkbox,
  CheckboxGroup,
  NumberInputField,
  Divider,
  Button,
  NumberInput,
} from "@chakra-ui/react";
import { useState } from "react";
import API_URL from "../helpers/apiurl";
import Rupiah from "../lib/rupiah";
import { HiTrash } from "react-icons/hi";
import { TiMinus, TiPlus } from "react-icons/ti";
import axios from "axios";
import Cookies from "js-cookie";
import { debounce } from "lodash";
import { useCallback } from "react";
import { useEffect } from "react";
import { getCartAction } from "../redux/actions/cart_action";
import { connect } from "react-redux";

const CardCartDetail = ({ cartData, handleCheckbox, getCartAction }) => {
  const [kuantitas, setKuantitas] = useState(cartData.quantity);
  let token = Cookies.get("token");

  const updateQuantityInputHandler = async () => {
    try {
      await axios.post(
        `${API_URL}/transaction/update-quantity`,
        {
          currentQuantity: parseInt(kuantitas),
          cart_id: cartData.id,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      getCartAction();
    }
  };

  useEffect(() => {
    updateQuantityInputHandler();
  }, [kuantitas]);

  const subtractQuantityHandler = async () => {
    try {
      let angka = parseInt(kuantitas) - 1;
      angka = angka + "";
      setKuantitas(angka);
    } catch (error) {
      console.log(error);
    }
  };

  const addQuantityHandler = async () => {
    try {
      let angka = parseInt(kuantitas) + 1;
      angka = angka + "";
      setKuantitas(angka);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-[40px]">
      <Checkbox
        colorScheme="whiteAlpha"
        iconColor="black"
        value={cartData.id}
        onChange={(e) => handleCheckbox(e, { cartData, kuantitas })}
      >
        <div className="flex justify-between w-[302px] md:w-[680px]">
          <img
            src={`${API_URL}${cartData.image}`}
            alt=""
            className="w-[71px] h-[72px]"
          />
          <div className="mr-[48px] md:mr-[188px]">
            <p className="text-xs w-[77px] md:text-base md:w-[167px]">
              {cartData.detail_product.name}
            </p>
            <p className="text-[10px] mt-1 md:text-xs">
              1 {cartData.detail_product.unit}
            </p>
          </div>

          <div className="text-sm font-bold mt-8">
            {Rupiah(cartData.detail_product.price)}
          </div>
        </div>
      </Checkbox>
      <div className="flex justify-between items-center w-[326px] md:w-[700px] md:pl-[430px]">
        <p className="text-[10px] mt-3 md:mr-3 ">pindahkan ke wishlist</p>
        <div className="flex items-center">
          <HiTrash className="mt-4 md:mr-3" />
          <div className="flex items-center mt-3">
            <Button
              variant="ghost"
              bg="gray.100"
              isDisabled={kuantitas == 1}
              roundedRight="none"
              h="28px"
              w="28px"
              onClick={() => {
                subtractQuantityHandler();
              }}
            >
              <TiMinus />
            </Button>
            <NumberInput
              bg="gray.100"
              min={1}
              max={cartData.maxInput}
              onChange={(value) => {
                console.log(value, typeof value);
                try {
                  setKuantitas(value);
                } catch (error) {
                  console.log(error);
                } finally {
                  // updateQuantityInputHandler();
                }
              }}
              value={kuantitas}
              w="40px"
              h="28px"
            >
              <NumberInputField
                name="kuantitas"
                rounded="none"
                w="70px"
                h="28px"
                fontSize="xs"
              />
            </NumberInput>
            <Button
              bg="gray.100"
              isDisabled={kuantitas == cartData.maxInput}
              roundedLeft="none"
              h="28px"
              w="28px"
              onClick={() => {
                addQuantityHandler();
              }}
            >
              <TiPlus />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { getCartAction })(CardCartDetail);