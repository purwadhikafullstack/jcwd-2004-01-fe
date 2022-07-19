import { MdOutlineFileDownload } from "react-icons/md";
import { BsChatDotsFill } from "react-icons/bs";
import { IoDocumentText } from "react-icons/io5";
import { Button, Input, Select, Checkbox } from "@chakra-ui/react";
import TransactionCard from "./transaction_card";
import axios from "axios";
import API_URL from "../helpers/apiurl";
import { useEffect, useState, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PaginationProductAdmin from "./PaginationProductAdmin";
import { debounce } from "lodash";
import { toast } from "react-toastify";
const dayjs = require("dayjs");
import Cookies from "js-cookie";

const NewOrderTransaction = () => {
  const [cardData, setCardData] = useState([]);
  const [input, setInput] = useState({
    search: "",
    orderDate: "",
    orderPrice: "",
  });
  const [options, setOptions] = useState([]);
  const [drugs, setDrugs] = useState([]);
  const [page, setPage] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [limit, setLimit] = useState(5);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    getProductList();
  }, []);

  let token = Cookies.get("token");

  //Get Transaction Card
  const getTransactionCard = async (page, input, startDate, endDate, cb) => {
    let response = await axios.get(
      `${API_URL}/transaction/get-transaction-prescription-list?page=${page}&search=${
        input.search
      }&transaction_date_from=${
        startDate ? dayjs(startDate).format("YYYY-MM-DD HH:mm:ss") : ""
      }&transaction_date_end=${
        endDate ? dayjs(endDate).format("YYYY-MM-DD HH:mm:ss") : ""
      }&orderDate=${input.orderDate}&orderPrice=${input.orderPrice}`
    );
    // setCardData(res.data);
    cb(response);
    console.log(response.data, "ini transaction card");
    // console.log(
    //   dayjs(startDate).format("YYYY-MM-DD HH:mm:ss"),
    //   "ini startDate"
    // );
  };

  //Get Product List
  const getProductList = async () => {
    let res = await axios.get(`${API_URL}/product/get-prescription-product`);
    console.log(res.data);
    let drugsMap = res.data;
    //Select List
    const drugsData = drugsMap.map((val, index) => {
      return {
        value: {
          category: val.categories.map((category) => {
            return category.name;
          }),
          unit: val.unit,
          id_obat: val.id,
          drug_name: val.name,
          total_stock: val.total_stock,
          original_price: val.original_price,
        },
        label: val.name,
      };
    });
    setDrugs(drugsMap);
    setOptions(drugsData);
    // console.log(drugsData, "ini options");
  };

  //Submit Prescription Copy
  const submitPrescription = async (id, dataDrugs) => {
    try {
      await axios.post(
        `${API_URL}/transaction/submitprescription/${id}`,
        {
          prescription_values: dataDrugs,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Prescription successfully submitted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Network Error", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      debouncedFetchData(page, input, startDate, endDate, (response) => {
        setTotalData(parseInt(response.headers["x-total-product"]));
        setCardData([...response.data]);
      });
    }
  };

  //Reject Prescription
  const rejectPrescription = async (id) => {
    try {
      await axios.post(`${API_URL}/transaction/rejectprescription/${id}`);
      toast.success("Prescription successfully rejected!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Network Error", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      debouncedFetchData(page, input, startDate, endDate, (response) => {
        setTotalData(parseInt(response.headers["x-total-product"]));
        setCardData([...response.data]);
      });
    }
  };

  //Reject Transaction
  const rejectTransaction = async (id) => {
    try {
      await axios.post(`${API_URL}/transaction/rejectorder/${id}`, null, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      toast.success("Transaction successfully rejected!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Network Error", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      debouncedFetchData(page, input, startDate, endDate, (response) => {
        setTotalData(parseInt(response.headers["x-total-product"]));
        setCardData([...response.data]);
      });
    }
  };

  //Accept Transaction
  const acceptTransaction = async (id) => {
    try {
      await axios.post(`${API_URL}/transaction/acceptorder/${id}`);
      toast.success("Transaction accepted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Network Error", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      debouncedFetchData(page, input, startDate, endDate, (response) => {
        setTotalData(parseInt(response.headers["x-total-product"]));
        setCardData([...response.data]);
      });
    }
  };

  //Send Order
  const sendOrder = async (id) => {
    try {
      await axios.post(`${API_URL}/transaction/sendorder/${id}`);
      toast.success("Order sent!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Network Error", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      debouncedFetchData(page, input, startDate, endDate, (response) => {
        setTotalData(parseInt(response.headers["x-total-product"]));
        setCardData([...response.data]);
      });
    }
  };

  //Handle Change
  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setPage(0);
  };

  const updateLimit = (e) => {
    setLimit(parseInt(e.target.value));
  };

  //Debounce
  const debouncedFetchData = useCallback(
    debounce((page, input, startDate, endDate, cb) => {
      getTransactionCard(page, input, startDate, endDate, cb);
    }, 1000),
    []
  );

  useEffect(() => {
    debouncedFetchData(page, input, startDate, endDate, (response) => {
      setTotalData(parseInt(response.headers["x-total-product"]));
      setCardData([...response.data]);
    });
  }, [page, input, startDate, endDate]);

  return (
    <div className="ml-64 mt-16 w-[1093px] h-fit pb-16">
      <div className="mx-[48px] mt-24">
        <div className="flex justify-between">
          <p className="text-xl font-bold">Pesanan Baru</p>
        </div>

        <div className="flex justify-between mt-[68px]">
          <div className="flex gap-3">
            <Input
              placeholder="Cari transaksi"
              w="fit"
              h="42px"
              name="search"
              value={input.search}
              onChange={(e) => handleInput(e)}
            />
            <div>
              <DatePicker
                className="w-fit h-[42px] rounded-md border-2 border-[#e2e8f0] px-3"
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                  setDateRange(update);
                }}
                isClearable={true}
                placeholderText="01/01/20XX - 01/02/20XX"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <Select
              value={input.orderDate}
              placeholder="Urutkan Waktu"
              w="fit"
              h="42px"
              name="orderDate"
              onChange={(e) => handleInput(e)}
            >
              <option value="asc">Terlama</option>
              <option value="desc">Terbaru</option>
            </Select>
            <Select
              value={input.orderPrice}
              placeholder="Urutkan Harga"
              w="fit"
              h="42px"
              name="orderPrice"
              onChange={(e) => handleInput(e)}
            >
              <option value="asc">Termurah</option>
              <option value="desc">Termahal</option>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between mt-[38px]">
          <div className="flex items-center gap-[12px]">
            <Checkbox />
            <p className="text-[14px]">Pilih Semua</p>
          </div>
          <PaginationProductAdmin
            page={page}
            totalData={totalData}
            limit={limit}
            setLimit={setLimit}
            updateLimit={updateLimit}
            pageChangeHandler={setPage}
          />
        </div>

        <TransactionCard
          getTransactionCard={getTransactionCard}
          submitPrescription={submitPrescription}
          rejectPrescription={rejectPrescription}
          rejectTransaction={rejectTransaction}
          acceptTransaction={acceptTransaction}
          sendOrder={sendOrder}
          cardData={cardData}
          options={options}
        />
      </div>
    </div>
  );
};

export default NewOrderTransaction;
