// component
import NavbarAdmin from "../../components/NavbarAdmin";
import NavbarAdminTop from "../../components/NavbarAdminTop";

//lib
import updateTerahir from "../../lib/dayjs";
import { Rupiah, formatThousand } from "../../lib/convertRupiah";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

// chakra
import { Select, Spinner } from "@chakra-ui/react";

const laporanLabaRugi = () => {
  //updated at
  const update = updateTerahir(new Date());

  return (
    <>
      {/* navbar */}
      <div className="absolute">
        <NavbarAdmin />
      </div>
      <NavbarAdminTop />

      {/* dashboard body */}
      <div className="pl-[275px] pt-4">
        <div className="flex-row">
          <div className="text-xl font-[#213360] font-bold">
            Laporan Laba & Rugi
          </div>
          <div className="flex text-base text-[#737A8D] items-baseline">
            Update terakhir: &nbsp;{" "}
            <div className="font-bold text-base">{update}</div>
          </div>
        </div>

        {/* filter */}
        <div className="flex gap-8">
          <div>
            <div>Periode</div>
            <Select></Select>
          </div>
          <div>
            <div>Bulan</div>
            <Select></Select>
          </div>
          <div>
            <div>Tahun</div>
            <Select></Select>
          </div>
        </div>
      </div>
    </>
  );
};

export default laporanLabaRugi;
