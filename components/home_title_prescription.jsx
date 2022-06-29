import { Button } from "@chakra-ui/react";

const HomePrescriptionCard = () => {
  return (
    <div className="w-[1244px] h-[168px] rounded-2xl bg-white drop-shadow-lg">
      <img className="absolute left-0" src="HomePrescritptionCard.svg" alt="" />
      <div className="absolute right-80 top-12">
        <div className="text-[20px] font-bold">Punya Resep Dokter?</div>
        <div className="text-[14px] pt-2 w-[400px]">
          Tak perlu antre & obat langsung dikirimkan ke lokasi anda! Foto tidak
          boleh lebih dari 10 MB
        </div>
      </div>
      <div className="absolute right-7 top-16">
        <Button variant={"fillCustom"} h={"48px"} w={"274px"}>
          Unggah Resep
        </Button>
      </div>
    </div>
  );
};

export default HomePrescriptionCard;
