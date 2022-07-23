import { Checkbox, Divider, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import CardCartDetail from "./CardCartDetail";

const CardCart = ({ cartData, selected_product }) => {
  const dispatch = useDispatch();

  let [selectedId, setSelectedId] = useState({
    item: [],
  });
  console.log(selectedId, "ini selected idi");

  const handleInc = (cartData) => {
    let tempArr = selectedId.item;
    console.log(tempArr, cartData.id, "oiiiiiiii");
    let newArr = tempArr.map((val, i) => {
      if (val.id == cartData.id) {
        return { ...val, quantity: val.quantity + 1 };
      } else {
        return { ...val };
      }
    });
    setSelectedId({ item: newArr });
  };
  const handleInput = (cartData, value) => {
    let tempArr = selectedId.item;
    console.log(tempArr, cartData.id, "oiiiiiiii");
    let newArr = tempArr.map((val, i) => {
      if (val.id == cartData.id) {
        return { ...val, quantity: value };
      } else {
        return { ...val };
      }
    });
    setSelectedId({ item: newArr });
  };
  const handleDec = (cartData) => {
    let tempArr = selectedId.item;
    console.log(tempArr, cartData.id, "oiiiiiiii");
    let newArr = tempArr.map((val, i) => {
      if (val.id == cartData.id) {
        return { ...val, quantity: val.quantity - 1 };
      } else {
        return { ...val };
      }
    });
    setSelectedId({ item: newArr });
  };

  const handleCheckbox = (e, cartData) => {
    console.log(e, "eeeee");
    let tempArr = selectedId.item;
    console.log(tempArr, "tempArrSebelum");
    if (e.target.checked) {
      tempArr.push(cartData);
    } else {
      tempArr = tempArr.filter((item) => item.id !== cartData.id);
    }
    console.log(tempArr, "tempArrSesudah");
    setSelectedId({ ...selectedId, item: tempArr });
    console.log(selectedId, "selectedId");
  };

  useEffect(() => {
    dispatch({ type: "UPDATE_SELECTED_PRODUCT", payload: selectedId.item });
  }, [selectedId]);

  const [allChecked, setAllChecked] = useState(false);
  console.log(allChecked, "ini all cek");

  return (
    <div className="mx-6 md:ml-[96px] md:w-[783px] md:shadow-2xl md:p-9 md:mt-[64px] rounded-lg ">
      {cartData.length == 0 ? (
        <div className="font-bold text-xl text-center py-24">
          Belum ada produk di cart anda.
        </div>
      ) : (
        <>
          <div className="mt-8 md:mt-7">
            <Checkbox
              colorScheme="whiteAlpha"
              iconColor="black"
              isChecked={allChecked}
              onChange={(e) => {
                setAllChecked(!allChecked);
              }}
            >
              <p className="text-xs">Pilih Semua</p>
            </Checkbox>
          </div>
          <Divider my="23px" w="327px" mx="auto" />
          <div className="flex-col">
            {cartData?.map((val, i) => {
              return (
                <CardCartDetail
                  cartData={val}
                  key={i}
                  handleCheckbox={handleCheckbox}
                  selected_product={selected_product}
                  allChecked={allChecked}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                  handleInc={handleInc}
                  handleDec={handleDec}
                  handleInput={handleInput}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default CardCart;
