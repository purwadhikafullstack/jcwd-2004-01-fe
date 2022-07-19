// component
import NavbarAdmin from "../../components/NavbarAdmin";
import NavbarAdminTop from "../../components/NavbarAdminTop";

// react hooks
import { useState, useEffect, useRef } from "react";

//lib
import updateTerahir from "../../lib/dayjs";
import { Rupiah, formatThousand } from "../../lib/convertRupiah";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "chart.js/auto";
import { ChartData, ChartArea } from "chart.js";
import { Chart } from "react-chartjs-2";

//react icon
import {
  BsFillArrowUpRightCircleFill,
  BsFillArrowDownRightCircleFill,
} from "react-icons/bs";

// chakra
import { Select, Spinner } from "@chakra-ui/react";

// axios
import axios from "axios";
import API_URL from "../../helpers/apiurl";

const data = (canvas) => {
  const ctx = canvas.getContext("2d");
  let gradient = ctx.createLinearGradient(0, 0, 0, 150);
  gradient.addColorStop(0, "rgba(0,124,194,0.1)");
  gradient.addColorStop(0.5, "rgba(0,124,194,0.3)");
  gradient.addColorStop(1, "rgba(0,124,194,0.7)");

  return {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Ags",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ],
    datasets: [
      {
        data: [2.5, 3, 5, 3, 2, 1, 4, 6, 4, 4, 2, 4],
        // fill: false,
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 1,
        borderRadius: 100,
        borderSkipped: false,
        backgroundColor: gradient,
      },
    ],
  };
};

const options = {
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

function createGradient(ctx) {
  console.log(ctx, "ini ctx");
  let gradient = ctx?.createLinearGradient(0, 0, 0, 200);

  gradient?.addColorStop(0, "rgba(51, 83, 204, 0.3)");
  gradient?.addColorStop(1, "rgba(51, 83, 204, 0)");

  return gradient;
}

const RingkasanStatistik = () => {
  // state
  const [todayReportData, setTodayReportData] = useState();
  console.log(todayReportData, "ini today report data");

  //updated at
  const update = updateTerahir(new Date());

  // chart profit
  const chartRef = useRef(null);
  const [chartDataProfit, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [filterProfit, setFilterProfit] = useState("bulan");

  const getProfitChart = async (chart) => {
    let response = await axios.get(
      `${API_URL}/report/get-chart-profit?filter=${filterProfit}&variant=gross`
    );
    setChartData({
      labels: response.data.label,
      datasets: [
        {
          data: response.data.data,
          borderColor: "#3353CC",
          tension: 0.4,
          borderWidth: 1.5,
          pointBorderWidth: 0.5,
          pointRadius: 2,
          backgroundColor: createGradient(chart.ctx),
          fill: "start",
        },
      ],
    });
  };

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      getProfitChart(chart);
    }
  }, [filterProfit]);

  // chart profit
  const chartRefPenjualan = useRef(null);
  const [chartDataPenjualan, setChartDataPenjualan] = useState({
    labels: [],
    datasets: [],
  });
  const [filterPenjualan, setFilterPenjualan] = useState("bulan");
  const [average, setAverage] = useState(0);

  const getPenjualanChart = async (chart) => {
    let response = await axios.get(
      `${API_URL}/report/get-chart-penjualan?filter=${filterPenjualan}`
    );
    setAverage(response.data.average);
    setChartDataPenjualan({
      labels: response.data.label,
      datasets: [
        {
          data: response.data.data,
          borderColor: "#3353CC",
          tension: 0.4,
          borderWidth: 1.5,
          pointBorderWidth: 0.5,
          pointRadius: 2,
        },
      ],
    });
  };

  useEffect(() => {
    const chart = chartRefPenjualan.current;
    if (chart) {
      getPenjualanChart(chart);
    }
  }, [filterPenjualan]);

  // getTodayReport
  const getTodayReport = async () => {
    try {
      const response = await axios.get(`${API_URL}/report/get-today-report`);
      setTodayReportData(response.data.result);
      console.log(response, "ini responsenya");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodayReport();
  }, []);

  return (
    <>
      {/* <div className="absolute top-0 left-0 w-full h-full bg-teal-300 -z-[1]"></div> */}

      {/* navbar */}
      <div className="absolute">
        <NavbarAdmin />
      </div>
      <NavbarAdminTop />

      {/* ringkasanStatistik body */}
      <div className="pl-[275px] pt-4">
        <div className="flex-row">
          <div className="text-xl font-[#213360] font-bold">
            Ringkasan Statistik
          </div>
          <div className="flex text-base text-[#737A8D] items-baseline">
            Update terakhir: &nbsp;{" "}
            <div className="font-bold text-base">{update}</div>
          </div>
        </div>

        <div>
          {/* Penting Hari ini */}
          <div className="flex gap-4">
            <div className="w-[1080px] mt-2">
              <div className="flex-wrap flex gap-4 mt-4">
                <div className="w-[160px] h-[93px] rounded-lg shadow-lg hover:shadow-xl hover:scale-103 duration-500">
                  <div className="text-[#737A8D] text-sm font-bold ml-[22px] pt-[16px]">
                    Pesanan Baru
                  </div>
                  <div className="text-[28px] font-bold ml-[22px]">
                    {!todayReportData ? (
                      <Spinner size="sm" />
                    ) : (
                      todayReportData.importantToday.pesanan_baru
                    )}
                  </div>
                </div>
                <div className="w-[160px] h-[93px] rounded-lg shadow-lg hover:shadow-xl hover:scale-103 duration-500">
                  <div className="text-[#737A8D] text-sm font-bold ml-[22px] pt-[16px]">
                    Siap Dikirim
                  </div>
                  <div className="text-[28px] font-bold ml-[22px]">
                    {!todayReportData ? (
                      <Spinner size="sm" />
                    ) : (
                      todayReportData.importantToday.siap_dikirim
                    )}
                  </div>
                </div>
                <div className="w-[160px] h-[93px] rounded-lg shadow-lg hover:shadow-xl hover:scale-103 duration-500">
                  <div className="text-[#737A8D] text-sm font-bold ml-[22px] pt-[16px]">
                    Sedang Dikirim
                  </div>
                  <div className="text-[28px] font-bold ml-[22px]">
                    {!todayReportData ? (
                      <Spinner size="sm" />
                    ) : (
                      todayReportData.importantToday.sedang_dikirim
                    )}
                  </div>
                </div>
                <div className="w-[160px] h-[93px] rounded-lg shadow-lg hover:shadow-xl hover:scale-103 duration-500">
                  <div className="text-[#737A8D] text-sm font-bold ml-[22px] pt-[16px]">
                    Selesai
                  </div>
                  <div className="text-[28px] font-bold ml-[22px]">
                    {!todayReportData ? (
                      <Spinner size="sm" />
                    ) : (
                      todayReportData.importantToday.selesai
                    )}
                  </div>
                </div>
                <div className="w-[160px] h-[93px] rounded-lg shadow-lg hover:shadow-xl hover:scale-103 duration-500">
                  <div className="text-[#737A8D] text-sm font-bold ml-[22px] pt-[16px]">
                    Dibatalkan
                  </div>
                  <div className="text-[28px] font-bold ml-[22px]">
                    {!todayReportData ? (
                      <Spinner size="sm" />
                    ) : (
                      todayReportData.importantToday.dibatalkan
                    )}
                  </div>
                </div>
                <div className="w-[160px] h-[93px] rounded-lg shadow-lg hover:shadow-xl hover:scale-103 duration-500">
                  <div className="text-[#737A8D] text-sm font-bold ml-[22px] pt-[16px]">
                    Chat Baru
                  </div>
                  <div className="text-[28px] font-bold ml-[22px]">0</div>
                </div>
              </div>
            </div>
          </div>

          {/* chart profit dan penjualan obat */}
          <div className="flex gap-4">
            <div className="w-[1080px] h-[338px] rounded-lg mt-4 shadow-lg hover:shadow-xl hover:scale-103 duration-500">
              <div className="flex justify-between pt-4 mx-4">
                <div className="">
                  <div className="text-xl font-bold">Penjualan Obat</div>
                </div>
                <Select
                  w="141px"
                  h="24px"
                  onChange={(e) => {
                    console.log(e);
                    setFilterPenjualan(e.target.value);
                  }}
                >
                  <option value="bulan">Bulan</option>
                  <option value="tahun">Tahun</option>
                </Select>
              </div>
              <div className="flex mx-3">
                <div className="mt-12 mx-4">
                  <Chart
                    ref={chartRefPenjualan}
                    type="line"
                    data={chartDataPenjualan}
                    width="800"
                    height="200"
                    options={options}
                  ></Chart>
                </div>
                <div className="w-[252px] h-[93px] shadow-lg rounded-lg mt-[50px]">
                  <div className="flex-col my-[16px] mx-[10px]">
                    <div className="text-[#737A8D] font-bold text-sm">
                      Rata-rata penjualan per {filterPenjualan}
                    </div>
                    <div className="text-[#213360] font-bold text-[28px]">
                      {average}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-[537px] h-[337px] rounded-lg mt-4 shadow-lg hover:shadow-xl hover:scale-103 duration-500">
              <div className="flex justify-between pt-4 mx-4">
                <div className="">
                  <div className="text-xl font-bold">Tren Pendapatan</div>
                </div>
                <Select
                  w="141px"
                  h="24px"
                  onChange={(e) => {
                    console.log(e);
                    setFilterProfit(e.target.value);
                  }}
                >
                  <option value="bulan">Bulan</option>
                  <option value="tahun">Tahun</option>
                </Select>
              </div>
              <div className="mt-9 mx-4">
                <Chart
                  ref={chartRef}
                  type="line"
                  data={chartDataProfit}
                  width="400"
                  height="180"
                  options={options}
                ></Chart>
              </div>
            </div>
            <div className="w-[537px] h-[337px] rounded-lg mt-4 shadow-lg hover:shadow-xl hover:scale-103 duration-500">
              <div className="flex justify-between pt-4 mx-4">
                <div className="">
                  <div className="text-xl font-bold">Tren Pembatalan</div>
                </div>
                <Select
                  w="141px"
                  h="24px"
                  onChange={(e) => {
                    console.log(e);
                    setFilterProfit(e.target.value);
                  }}
                >
                  <option value="bulan">Bulan</option>
                  <option value="tahun">Tahun</option>
                </Select>
              </div>
              <div className="mt-9 mx-4">
                <Chart
                  type="bar"
                  data={chartDataProfit}
                  width="400"
                  height="180"
                  options={options}
                ></Chart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RingkasanStatistik;
