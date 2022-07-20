const PaymentMethod = () => {
  return (
    <div className="w-full h-[160px] bg-[#F7F7F7]">
      <div className="flex justify-center text-[16px] font-bold pt-6">
        Metode Pembayaran
      </div>
      <div className="flex justify-between items-center mx-36 pt-4">
        <img src="BCA.svg" alt="" />
        <img src="Mandiri.svg" alt="" />
        <img src="Permata.svg" alt="" />
        <img src="OVO.svg" alt="" />
        <img src="Gopay.svg" alt="" />
        <img src="ShopeePay.svg" alt="" />
      </div>
    </div>
  );
};

export default PaymentMethod;
