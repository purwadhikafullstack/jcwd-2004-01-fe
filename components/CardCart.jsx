import { Checkbox, Divider, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import CardCartDetail from "./CardCartDetail";

const CardCart = ({ cartData, selected_product }) => {
  const dispatch = useDispatch();

  const [selectedId, setSelectedId] = useState({
    item: [],
  });

  const handleCheckbox = (e, cartData) => {
    console.log(e.target.value, cartData);
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
    dispatch({ type: "UPDATE_SELECTED_PRODUCT", payload: tempArr });
  };

  return (
    <div className="mx-6 md:ml-[96px] md:w-[783px] md:shadow-2xl md:p-9 md:mt-[64px] rounded-lg ">
      {cartData.length == 0 ? (
        <div className="font-bold text-xl text-center py-24">
          Belum ada produk di cart anda.
        </div>
      ) : (
        <>
          <div className="mt-8 md:mt-7">
            <Checkbox colorScheme="whiteAlpha" iconColor="black">
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
