import { Button } from "@chakra-ui/react";
import Link from "next/link";

const HomePrescriptionCard = () => {
  return (
    <div className="w-[1244px] h-[168px] rounded-2xl bg-white drop-shadow-lg">
      <img className="absolute left-0" src="HomePrescritptionCard.svg" alt="" />
      <div className="absolute right-80 top-10">
        <div className="text-[20px] font-bold">Punya Resep Dokter?</div>
        <div className="text-[14px] pt-2 w-[400px]">
          Tak perlu antre & obat langsung dikirimkan ke lokasi anda! Foto tidak
          boleh lebih dari 10 MB
        </div>
      </div>
      <div className="absolute right-7 top-14">
        <Link href="/uploadprescription">
          <Button variant={"fillCustom"} h={"48px"} w={"274px"}>
            Unggah Resep
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePrescriptionCard;
