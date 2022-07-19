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

const Dashboard = () => {
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
    let gradient = ctx?.createLinearGradient(0, 0, 0, 350);

    gradient?.addColorStop(0, "rgba(0, 95, 175, 1)");
    gradient?.addColorStop(1, "rgba(33, 205, 192, 0.6)");

    return gradient;
  }

  // state
  const [todayReportData, setTodayReportData] = useState();
  console.log(todayReportData, "ini today report data");

  //updated at
  const [update, setUpdate] = useState();
  const getUpdate = () => {
    const update = updateTerahir(new Date());
    setUpdate(update);
  };
  useEffect(() => {
    getUpdate();
  }, []);

  // chart profit
  const chartRef = useRef(null);
  const [chartDataProfit, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [filterProfit, setFilterProfit] = useState("bulan");

  const getProfitChart = async (chart) => {
    let response = await axios.get(
      `${API_URL}/report/get-chart-profit?filter=${filterProfit}&variant=`
    );
    setChartData({
      labels: response.data.label,
      datasets: [
        {
          data: response.data.data,
          borderRadius: 100,
          borderSkipped: false,
          backgroundColor: createGradient(chart.ctx),
          barThickness: 10,
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

  const getPenjualanChart = async (chart) => {
    let response = await axios.get(
      `${API_URL}/report/get-chart-penjualan?filter=${filterPenjualan}`
    );
    setChartDataPenjualan({
      labels: response.data.label,
      datasets: [
        {
          data: response.data.data,
          borderColor: "rgba(0, 95, 175, 1)",
          tension: 0.4,
          borderWidth: 1,
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
      <div className="fixed top-0 left-0 bottom-0 z-20">
        <NavbarAdmin />
      </div>
      <div className="fixed top-0 right-0 left-0 z-10">
        <NavbarAdminTop />
      </div>

      {/* Dashboard body */}
      <div className="pl-[275px] pt-24">
        <div className="flex-row">
          <div className="text-xl font-[#213360] font-bold">
            Analisis Produk & Toko
          </div>
          <div className="flex text-base text-[#737A8D] items-baseline">
            Update terakhir: &nbsp;{" "}
            <div className="font-bold text-base">{update}</div>
          </div>
        </div>

        {/* profit, pemesanan, sisa stok hari ini */}
        <div className="mt-2 flex gap-2">
          <div className="w-[350px] h-[121px] rounded-lg shadow-lg hover:shadow-xl hover:scale-103 duration-500 flex items-center justify-between px-4">
            <div className="flex-col mt-4 ">
              <div className="text-[#737A8D] font-bold text-xs">
                Profit Hari Ini
              </div>
              <div className="text-[#213360] font-bold text-2xl mt-2">
                {!todayReportData ? (
                  <Spinner size="md" />
                ) : (
                  Rupiah(todayReportData.profit.todayProfit)
                )}
              </div>
              <div
                className={`flex items-center gap-1 mt-2 font-bold text-2xs ${
                  todayReportData?.profit.profitDifference > 0
                    ? ""
                    : "text-[#D95E53]"
                }`}
              >
                {todayReportData?.profit.profitDifference > 0 ? (
                  <BsFillArrowUpRightCircleFill />
                ) : (
                  <BsFillArrowDownRightCircleFill className="" />
                )}

                {!todayReportData ? (
                  <Spinner size="xs" />
                ) : todayReportData.profit.profitDifference > 0 ? (
                  `+${formatThousand(todayReportData.profit.profitDifference)}`
                ) : (
                  `${formatThousand(todayReportData.profit.profitDifference)}`
                )}
              </div>
            </div>
            <div
              style={{ width: "65px", height: "65px" }}
              className="font-bold"
            >
              {!todayReportData ? (
                <Spinner size="md" />
              ) : todayReportData.profit.precentageDifference > 0 ? (
                <CircularProgressbar
                  value={todayReportData.profit.precentageDifference}
                  text={`+${todayReportData.profit.precentageDifference}%`}
                  styles={buildStyles({
                    strokeLinecap: "round",
                    textSize: "16px",
                    pathTransitionDuration: 0.5,
                    pathColor: "#213360",
                    textColor: "#213360",
                    trailColor: "#cbd5e1",
                    backgroundColor: "#3e98c7",
                  })}
                />
              ) : (
                <CircularProgressbar
                  value={todayReportData.profit.precentageDifference * -1}
                  text={`${todayReportData.profit.precentageDifference}%`}
                  styles={buildStyles({
                    strokeLinecap: "round",
                    textSize: "16px",
                    pathTransitionDuration: 0.5,
                    pathColor: "#D95E53",
                    textColor: "#D95E53",
                    trailColor: "#cbd5e1",
                    backgroundColor: "#3e98c7",
                  })}
                />
              )}
            </div>
          </div>
          <div className="w-[350px] h-[121px] rounded-lg shadow-lg hover:shadow-xl hover:scale-103 duration-500 flex items-center justify-between px-4">
            <div className="flex-col mt-4 ">
              <div className="text-[#737A8D] font-bold text-xs">
                Total Pemasanan Hari Ini
              </div>
              <div className="text-[#213360] font-bold text-2xl mt-2">
                {!todayReportData ? (
                  <Spinner size="md" />
                ) : (
                  formatThousand(todayReportData.transaction.totalToday)
                )}
              </div>
              <div
                className={`flex items-center gap-1 mt-2 font-bold text-2xs ${
                  todayReportData?.profit.profitDifference > 0
                    ? ""
                    : "text-[#D95E53]"
                }`}
              >
                {todayReportData?.transaction.totalTrasactionDifference > 0 ? (
                  <BsFillArrowUpRightCircleFill />
                ) : (
                  <BsFillArrowDownRightCircleFill className="" />
                )}

                {!todayReportData ? (
                  <Spinner size="xs" />
                ) : todayReportData.transaction.totalTrasactionDifference >
                  0 ? (
                  `+${formatThousand(
                    todayReportData.transaction.totalTrasactionDifference
                  )}`
                ) : (
                  `${formatThousand(
                    todayReportData.transaction.totalTrasactionDifference
                  )}`
                )}
              </div>
            </div>
            <div
              style={{ width: "65px", height: "65px" }}
              className="font-bold"
            >
              {!todayReportData ? (
                <Spinner size="md" />
              ) : todayReportData.transaction.precentageTotalDifference > 0 ? (
                <CircularProgressbar
                  value={todayReportData.transaction.precentageTotalDifference}
                  text={`+${todayReportData.transaction.precentageTotalDifference}%`}
                  styles={buildStyles({
                    strokeLinecap: "round",
                    textSize: "16px",
                    pathTransitionDuration: 0.5,
                    pathColor: "#213360",
                    textColor: "#213360",
                    trailColor: "#cbd5e1",
                    backgroundColor: "#3e98c7",
                  })}
                />
              ) : (
                <CircularProgressbar
                  value={
                    todayReportData.transaction.precentageTotalDifference * -1
                  }
                  text={`${todayReportData.transaction.precentageTotalDifference}%`}
                  styles={buildStyles({
                    strokeLinecap: "round",
                    textSize: "16px",
                    pathTransitionDuration: 0.5,
                    pathColor: "#D95E53",
                    textColor: "#D95E53",
                    trailColor: "#cbd5e1",
                    backgroundColor: "#3e98c7",
                  })}
                />
              )}
            </div>
          </div>
          <div className="w-[350px] h-[121px] rounded-lg shadow-lg hover:shadow-xl hover:scale-103 duration-500 flex items-center justify-between px-4">
            <div className="flex-col mt-4 ">
              <div className="text-[#737A8D] font-bold text-xs">
                Profit Hari Ini
              </div>
              <div className="text-[#213360] font-bold text-2xl mt-2">
                {!todayReportData ? (
                  <Spinner size="md" />
                ) : (
                  formatThousand(todayReportData.totalStock.stockToday)
                )}
              </div>
              <div
                className={`flex items-center gap-1 mt-2 font-bold text-2xs ${
                  todayReportData?.profit.profitDifference > 0
                    ? ""
                    : "text-[#D95E53]"
                }`}
              >
                {todayReportData?.totalStock.stockDifference > 0 ? (
                  <BsFillArrowUpRightCircleFill />
                ) : (
                  <BsFillArrowDownRightCircleFill className="" />
                )}

                {!todayReportData ? (
                  <Spinner size="xs" />
                ) : todayReportData.totalStock.stockDifference > 0 ? (
                  `+${formatThousand(
                    todayReportData.totalStock.stockDifference
                  )}`
                ) : (
                  `${formatThousand(
                    todayReportData.totalStock.stockDifference
                  )}`
                )}
              </div>
            </div>
            <div
              style={{ width: "65px", height: "65px" }}
              className="font-bold"
            >
              {!todayReportData ? (
                <Spinner size="md" />
              ) : todayReportData.totalStock.stockPrecentageDifference > 0 ? (
                <CircularProgressbar
                  value={todayReportData.totalStock.stockPrecentageDifference}
                  text={`+${todayReportData.totalStock.stockPrecentageDifference}%`}
                  styles={buildStyles({
                    strokeLinecap: "round",
                    textSize: "16px",
                    pathTransitionDuration: 0.5,
                    pathColor: "#213360",
                    textColor: "#213360",
                    trailColor: "#cbd5e1",
                    backgroundColor: "#3e98c7",
                  })}
                />
              ) : (
                <CircularProgressbar
                  value={
                    todayReportData.totalStock.stockPrecentageDifference * -1
                  }
                  text={`${todayReportData.totalStock.stockPrecentageDifference}%`}
                  styles={buildStyles({
                    strokeLinecap: "round",
                    textSize: "16px",
                    pathTransitionDuration: 0.5,
                    pathColor: "#D95E53",
                    textColor: "#D95E53",
                    trailColor: "#cbd5e1",
                    backgroundColor: "#3e98c7",
                  })}
                />
              )}
            </div>
          </div>
        </div>
        <div>
          {/* Penting Hari ini */}
          <div className="flex gap-4">
            <div className="w-[540px] mt-2">
              <div className="flex-row">
                <div className="text-xl font-[#213360] font-bold">
                  Penting Hari Ini
                </div>
                <div className="flex text-base text-[#737A8D] items-baseline">
                  Aktivitas yang perlu kamu ketahui untuk menjaga kepuasan
                  pelanggan
                </div>
              </div>
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

            {/* Kadaluarsa Obat */}
            <div className="w-[460px] mt-2">
              <div className="flex-row">
                <div className="text-xl font-[#213360] font-bold">
                  Kadaluwarsa Obat
                </div>
                <div className="flex text-base text-[#737A8D] items-baseline">
                  Cek tanggal kedaluwarsa untuk mengorganisir stok obat
                </div>
              </div>
              <div className="w-[353px] h-[202px] rounded-lg mt-4 shadow-lg hover:shadow-xl hover:scale-103 duration-500">
                <div className="flex justify-between mx-4 font-bold text-xl pt-[24px]">
                  <div>Telah Kadaluwarsa</div>
                  <div className="text-[#D95E53]">
                    {!todayReportData ? (
                      <Spinner size="sm" />
                    ) : (
                      todayReportData.expired.expired
                    )}
                  </div>
                </div>
                <div className="flex justify-between mx-4 font-bold text-xl mt-[32px]">
                  <div>Kadaluwarsa Bulan Ini</div>
                  <div className="text-[#F4C15B]">
                    {!todayReportData ? (
                      <Spinner size="sm" />
                    ) : (
                      todayReportData.expired.expired_this_month
                    )}
                  </div>
                </div>
                <div className="flex justify-between mx-4 font-bold text-xl mt-[32px]">
                  <div>Kadaluwarsa 3 Bulan Kedepan</div>
                  <div className="">
                    {!todayReportData ? (
                      <Spinner size="sm" />
                    ) : (
                      todayReportData.expired.three_month_expired
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* chart profit dan penjualan obat */}
          <div className="flex gap-4">
            <div className="w-[537px] h-[380px] rounded-lg mt-4 shadow-lg hover:shadow-xl hover:scale-103 duration-500">
              <div className="flex justify-between pt-4 mx-4">
                <div className="">
                  <div className="text-xl font-bold">Profit</div>
                  <div className="text-xs font-[#737A8D]">
                    Data dinyatakan dalam jutaan rupiah
                  </div>
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
                  type="bar"
                  data={chartDataProfit}
                  width="400"
                  height="200"
                  options={options}
                ></Chart>
              </div>
            </div>
            <div className="w-[537px] h-[380px] rounded-lg mt-4 shadow-lg hover:shadow-xl hover:scale-103 duration-500">
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
              <div className="mt-12 mx-4">
                <Chart
                  ref={chartRefPenjualan}
                  type="line"
                  data={chartDataPenjualan}
                  width="400"
                  height="200"
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

export default Dashboard;
