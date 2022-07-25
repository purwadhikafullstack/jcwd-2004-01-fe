import {
  Checkbox,
  NumberInputField,
  Button,
  NumberInput,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import API_URL from "../helpers/apiurl";
import { Rupiah } from "../lib/convertRupiah";
import { HiTrash } from "react-icons/hi";
import { TiMinus, TiPlus } from "react-icons/ti";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { getCartAction, UpdateCartAction } from "../redux/actions/cart_action";
import { connect, useDispatch } from "react-redux";

const CardCartDetail = ({
  cartData,
  handleCheckbox,
  getCartAction,
  UpdateCartAction,
  selected_product,
  allChecked,
  selectedId,
  setSelectedId,
  handleInc,
  handleDec,
  handleInput,
}) => {
  const [kuantitas, setKuantitas] = useState(cartData.quantity);
  const [checked, setChecked] = useState(false);
  let token = Cookies.get("token");
  const toast = useToast();
  console.log(checked, "ini ceked");

  //deleteCart
  const deletCartHandler = async () => {
    try {
      let response = await axios.patch(`${API_URL}/transaction/delete-cart`, {
        id: cartData.id,
      });
      toast({
        title: "Success!",
        description: response.data.message,
        status: "success",
        duration: 9000,
        position: "top-right",
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    } finally {
      await getCartAction();
    }
  };

  //update quantity
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
      await getCartAction();
    }
  };

  useEffect(() => {
    if (allChecked) {
      if (!checked) {
        setChecked(true);
        let e = { target: { checked: true } };
        handleCheckbox(e, cartData);
      }
    } else if (!allChecked) {
      setChecked(false);
      setSelectedId({ item: [] });
    }
  }, [allChecked]);

  useEffect(() => {
    updateQuantityInputHandler();
  }, [kuantitas]);

  useEffect(() => {
    if (checked) {
      UpdateCartAction({ data: cartData, selected_product });
    }
  }, [cartData, checked]);

  const subtractQuantityHandler = async () => {
    try {
      let angka = parseInt(kuantitas) - 1;
      angka = angka + "";
      setKuantitas(angka);
      handleDec(cartData);
    } catch (error) {
      console.log(error);
    }
  };

  const addQuantityHandler = async () => {
    try {
      let angka = parseInt(kuantitas) + 1;
      angka = angka + "";
      setKuantitas(angka);
      handleInc(cartData);
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
        onChange={(e) => {
          handleCheckbox(e, cartData);
          setChecked(!checked);
        }}
        isChecked={checked}
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
          <HiTrash
            className="mt-4 md:mr-3 hover:cursor-pointer"
            onClick={() => {
              deletCartHandler();
            }}
          />
          <div className="flex items-center mt-3">
            <Button
              variant="ghost"
              bg="gray.100"
              isDisabled={kuantitas == 1}
              roundedRight="none"
              h="28px"
              w="28px"
              onClick={(e) => {
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
                  setKuantitas(parseInt(value));
                  handleInput(cartData, parseInt(value));
                } catch (error) {
                  console.log(error);
                } finally {
                  // updateQuantityInputHandler();
                }
              }}
              value={kuantitas || 0}
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
              checked={checked}
              onClick={(e) => {
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

export default connect(null, { getCartAction, UpdateCartAction })(
  CardCartDetail
);
