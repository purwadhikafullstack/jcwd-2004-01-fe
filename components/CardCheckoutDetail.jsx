import API_URL from "../helpers/apiurl";
import Rupiah from "../lib/rupiah";

const CardCheckoutDetail = ({ val }) => {
  let totalHargaProduct = val.detail_product.price * val.quantity;
  return (
    <div className="flex-col">
      <div className="mt-[40px]">
        <div>
          <div className="flex justify-between w-[302px] md:w-[680px]">
            <img
              src={`${API_URL}${val.image}`}
              alt=""
              className="w-[71px] h-[72px] object-cover"
            />
            <div className="mr-[48px] md:mr-[188px]">
              <p className="text-xs w-[77px] md:text-base md:w-[167px]">
                {val.detail_product.name}
              </p>
              <p className="text-[10px] mt-1 md:text-xs">
                {val.quantity} {val.detail_product.unit}
              </p>
            </div>

            <div className="text-sm font-bold">{Rupiah(totalHargaProduct)}</div>
          </div>
        </div>
        <div className="flex justify-between items-center w-[326px] md:w-[700px] md:pl-[430px]"></div>
      </div>
    </div>
  );
};

export default CardCheckoutDetail;
