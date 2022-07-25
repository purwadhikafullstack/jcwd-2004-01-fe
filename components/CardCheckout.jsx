import { Divider, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { Rupiah } from "../lib/convertRupiah";
import CardCheckoutDetail from "./CardCheckoutDetail";

const CardCheckout = ({ selected_product, subTotal, shippingCost, total }) => {
  return (
    <div className="md:mx-6 px-3 w-[100vw] md:ml-[96px] md:w-[783px] md:shadow-2xl md:p-9 md:mt-[27px] mt-[48px] md:rounded-lg">
      <div>
        <p className="text-[20px] font-bold">Ringkasan Order</p>
      </div>
      <Divider mx="auto" mt="12px" className="hidden md:inline" />
      {/* product checkout */}
      <div className="flex-col">
        {selected_product.map((val, i) => {
          return <CardCheckoutDetail val={val} key={i} />;
        })}
      </div>
      <Divider width="550px" ml="150px" className="hidden md:inline" />
      <div className="">
        <div className="text-xs md:text-base flex justify-between md:w-[532px] md:ml-[150px] mt-[12px]">
          <p className="">Sub Total</p>
          <p className="md:font-bold">{Rupiah(subTotal)}</p>
        </div>
        <div className="text-xs flex md:hidden justify-between md:w-[532px] md:ml-[150px] mt-[12px]">
          <p className="">Pengiriman</p>
          <p className="">
            {shippingCost == 0 ? (
              <Spinner size="sm" />
            ) : (
              <>{Rupiah(shippingCost)}</>
            )}
          </p>
        </div>
        <div className="font-bold text-sm flex md:hidden justify-between md:w-[532px] md:ml-[150px] mt-[24px]">
          <p className="">Sub Total</p>
          <p className="">{Rupiah(total)}</p>
        </div>
      </div>
    </div>
  );
};

export default CardCheckout;
