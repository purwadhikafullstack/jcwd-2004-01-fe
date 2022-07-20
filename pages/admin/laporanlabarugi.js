// component
import NavbarAdmin from "../../components/NavbarAdmin";
import NavbarAdminTop from "../../components/NavbarAdminTop";

//lib
import updateTerahir from "../../lib/dayjs";
import { Rupiah, formatThousand } from "../../lib/convertRupiah";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

// chakra
import { Select, Spinner, Divider } from "@chakra-ui/react";

// axios
import axios from "axios";
import API_URL from "../../helpers/apiurl";

// react hook
import { useState, useEffect } from "react";

// laporan laba rugi

function toMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString("id-ID", {
    month: "long",
  });
}

const LaporanLabaRugi = () => {
  //updated at
  const [update, setUpdate] = useState();
  const getUpdate = () => {
    const update = updateTerahir(new Date());
    setUpdate(update);
  };

  // filter year 3 th kebelakang
  var currentTime = new Date();
  let yearNow = currentTime.getFullYear();
  let monthNow = currentTime.getMonth();
  let yearArr = [yearNow, yearNow - 1, yearNow - 2];

  // filter
  const [year, setYear] = useState(yearNow);
  const [month, setMonth] = useState(monthNow);
  const [periode, setPeriode] = useState("bulanan");

  console.log(year, month);

  // get data laporan
  const [reportData, setReportData] = useState({
    total_capital: 0,
    total_gross_sale: 0,
    total_net_profit: 0,
  });

  const getReport = async () => {
    try {
      let response = await axios.get(
        `${API_URL}/report/get-report?periode=${periode}&year=${year}&month=${month}`
      );

      console.log(response.data.result);
      setReportData(response.data.result);
    } catch (error) {
      setReportData();
      console.log(error);
    }
  };

  useEffect(() => {
    getReport();
  }, [year, month, periode]);

  useEffect(() => {
    getUpdate();
  }, []);

  return (
    <>
      {/* navbar */}
      <div className="fixed top-0 left-0 bottom-0 z-20">
        <NavbarAdmin />
      </div>
      <div className="fixed top-0 right-0 left-0 z-10">
        <NavbarAdminTop />
      </div>

      {/* dashboard body */}
      <div className="pl-[275px] pt-24">
        <div className="flex-row">
          <div className="text-xl font-[#213360] font-bold">
            Laporan Laba & Rugi
          </div>
          <div className="flex text-base text-[#737A8D] items-baseline">
            Update terakhir: &nbsp;{" "}
            <div className="font-bold text-base">
              {!update ? <Spinner /> : update}
            </div>
          </div>
        </div>

        {/* filter */}
        <div className="flex gap-8 mt-[49px]">
          <div className="flex-row">
            <div className="text-[#737A8D] text-[12px] ">Periode</div>
            <Select
              w="141px"
              h="24px"
              onChange={(e) => {
                console.log(e);
                setPeriode(e.target.value);
              }}
            >
              <option value="bulanan">Bulanan</option>
              <option value="tahunan">Tahunan</option>
            </Select>
          </div>
          <div>
            <div className="text-[#737A8D] text-[12px] ">Bulan</div>
            <Select
              w="141px"
              h="24px"
              onChange={(e) => {
                console.log(e);
                setMonth(e.target.value);
              }}
              disabled={periode == "tahunan"}
            >
              <option value="1" selected={monthNow == 1 ? "selected" : ""}>
                Januari
              </option>
              <option value="2" selected={monthNow == 2 ? "selected" : ""}>
                Februari
              </option>
              <option value="3" selected={monthNow == 3 ? "selected" : ""}>
                Maret
              </option>
              <option value="4" selected={monthNow == 4 ? "selected" : ""}>
                April
              </option>
              <option value="5" selected={monthNow == 5 ? "selected" : ""}>
                Mei
              </option>
              <option value="6" selected={monthNow == 6 ? "selected" : ""}>
                Juni
              </option>
              <option value="7" selected={monthNow == 7 ? "selected" : ""}>
                Juli
              </option>
              <option value="8" selected={monthNow == 8 ? "selected" : ""}>
                Agustus
              </option>
              <option value="9" selected={monthNow == 9 ? "selected" : ""}>
                September
              </option>
              <option value="10" selected={monthNow == 10 ? "selected" : ""}>
                Oktober
              </option>
              <option value="11" selected={monthNow == 11 ? "selected" : ""}>
                Novemvber
              </option>
              <option value="12" selected={monthNow == 12 ? "selected" : ""}>
                Desember
              </option>
            </Select>
          </div>
          <div>
            <div className="text-[#737A8D] text-[12px] ">Tahun</div>
            <Select
              w="141px"
              h="24px"
              onChange={(e) => {
                console.log(e);
                setYear(e.target.value);
              }}
            >
              {yearArr.map((val, i) => {
                return (
                  <option value={val} key={i}>
                    {val}
                  </option>
                );
              })}
            </Select>
          </div>
        </div>

        {/* laporan laba rugi */}
        <div className="w-[980px] rounded-xl shadow-xl py-[64px] px-[32px]">
          {/* Head */}
          {!reportData ? (
            <div className="text-center text-[#1A1E2B] font-bold text-3xl">
              Tidak Ada Laporan
            </div>
          ) : (
            <>
              <div className="text-center">
                <div className="text-[#1A1E2B] font-bold text-3xl">
                  Laporan Laba & Rugi
                </div>
                <div className="text-[#1A1E2B] text-sm">
                  {periode == "bulanan"
                    ? `Periode Bulan ${toMonthName(month)} Tahun ${year}`
                    : `Periode Tahun ${year}`}
                </div>
                {/* <div className="text-[#1A1E2B] text-sm">
                  Terbit: Minggu 13 Februari, 2022 pukul 18.14 (GMT +07.00)
                </div> */}
              </div>
              {/* Body */}
              <div>
                {/* penjualan */}
                <div>
                  <div className="flex justify-between font-bold text-xl">
                    <div>Penjualan</div>
                    <div>dalam rupiah</div>
                  </div>
                  <div className="mt-[16px]">
                    <div className="flex justify-between text-sm">
                      <div>1. Penjualan Barang</div>
                      <div>{formatThousand(reportData.total_gross_sale)}</div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div>2. Total Service</div>
                      <div>{formatThousand(0)}</div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div>3. Total Embalance</div>
                      <div>{formatThousand(0)}</div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div>4. Ongkos Kirim</div>
                      <div>{formatThousand(0)}</div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div>5. Diskon Penjualan</div>
                      <div>{formatThousand(0)}</div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div>6. Retur Penjualan</div>
                      <div>{formatThousand(0)}</div>
                    </div>
                  </div>
                  <Divider my="16px" />
                  <div className="flex justify-between text-sm font-bold">
                    <div>Penjualan</div>
                    <div>{formatThousand(reportData.total_gross_sale)}</div>
                  </div>
                  {/* Laba */}
                  <div className="flex justify-between font-bold text-xl mt-[32px]">
                    <div>Penjualan Kotor</div>
                    <div>dalam rupiah</div>
                  </div>
                  <div className="mt-[16px]">
                    <div className="flex justify-between text-sm">
                      <div>1. Penjualan</div>
                      <div>{formatThousand(reportData.total_gross_sale)}</div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div>2. Modal Produk</div>
                      <div>{formatThousand(reportData.total_capital)}</div>
                    </div>
                    <Divider my="16px" />
                    <div className="flex justify-between text-sm font-bold">
                      <div>Penjualan Kotor</div>
                      <div>{formatThousand(reportData.total_net_profit)}</div>
                    </div>
                  </div>
                  {/* Pengeluaran Operasional */}
                  <div className="flex justify-between font-bold text-xl mt-[32px]">
                    <div>Pengeluaran Operasional</div>
                    <div>dalam rupiah</div>
                  </div>
                  <div className="mt-[16px]">
                    <div className="flex justify-between text-sm">
                      <div>1. Gaji Karyawan</div>
                      <div>{formatThousand(0)}</div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div>2. Listrik</div>
                      <div>{formatThousand(0)}</div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div>3. Air</div>
                      <div>{formatThousand(0)}</div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div>4. Telepon</div>
                      <div>{formatThousand(0)}</div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div>5. Internet</div>
                      <div>{formatThousand(0)}</div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div>6. Sewa Tempat</div>
                      <div>{formatThousand(0)}</div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div>7. Peralatan Kantor</div>
                      <div>{formatThousand(0)}</div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div>8. Biaya Pengadaan</div>
                      <div>{formatThousand(0)}</div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div>9. Biaya Operasional Lainnya</div>
                      <div>{formatThousand(0)}</div>
                    </div>
                    <Divider my="16px" />
                    <div className="flex justify-between text-sm font-bold">
                      <div>Pengeluaran Operasional</div>
                      <div>{formatThousand(0)}</div>
                    </div>
                  </div>
                  {/* Pendapatan Lainnya */}
                  <div className="flex justify-between font-bold text-xl mt-[32px]">
                    <div>Pendapatan Lainnya</div>
                    <div>dalam rupiah</div>
                  </div>
                  <div className="mt-[16px]">
                    <div className="flex justify-between text-sm">
                      <div>1. Cashback Pembelian</div>
                      <div>{formatThousand(0)}</div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div>2. Keuntungan Konsiyasi</div>
                      <div>{formatThousand(0)}</div>
                    </div>
                    <Divider my="16px" />
                    <div className="flex justify-between text-sm font-bold">
                      <div>Pendapatan Lainnya</div>
                      <div>{formatThousand(0)}</div>
                    </div>
                  </div>
                  {/* total */}
                  <div className="flex justify-between font-bold text-xl mt-[32px]">
                    <div>Laba Bersih</div>
                    <div>dalam rupiah</div>
                  </div>
                  <div className="mt-[16px]">
                    <div className="flex justify-between text-sm">
                      <div>1. Laba Kotor</div>
                      <div>{formatThousand(reportData.total_net_profit)}</div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div>2. Pengeluaran Operasional</div>
                      <div>{formatThousand(0)}</div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div>3. Pendapatan Lainnya</div>
                      <div>{formatThousand(0)}</div>
                    </div>
                    <Divider my="16px" />
                    <div className="flex justify-between text-sm font-bold">
                      <div>Laba Bersih</div>
                      <div>{formatThousand(reportData.total_net_profit)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LaporanLabaRugi;
