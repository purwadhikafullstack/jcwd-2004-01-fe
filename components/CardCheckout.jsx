import { Divider, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import Rupiah from "../lib/rupiah";
import CardCheckoutDetail from "./CardCheckoutDetail";

const CardCheckout = ({ selected_product, subTotal }) => {
  console.log(selected_product, "checkout");

  return (
    <div className="mx-6 md:ml-[96px] md:w-[783px] md:shadow-2xl md:p-9 md:mt-[27px] md:rounded-lg">
      <div>
        <p className="text-[20px] font-bold">Ringkasan Order</p>
      </div>
      <Divider mx="auto" mt="12px" />
      {/* product checkout */}
      <div className="flex-col">
        {selected_product.map((val, i) => {
          return <CardCheckoutDetail val={val} key={i} />;
        })}
      </div>
      <Divider width="550px" ml="150px" />
      <div className="flex justify-between w-[532px] ml-[150px] mt-[12px]">
        <p className="">Sub Total</p>
        <p className="font-bold">{Rupiah({ subTotal })}</p>
      </div>
    </div>
  );
};

export default CardCheckout;
