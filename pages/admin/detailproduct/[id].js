import {
  Button,
  useDisclosure,
  Select,
  Input,
  Divider,
} from "@chakra-ui/react";

// commponent
import ModalEditProduct from "../../../components/ModalEditProduct";
import ModalEditQuantityProduct from "../../../components/ModalEditQuantityProduct";
import TableLog from "../../../components/TableLog";
import PaginationProductAdmin from "../../../components/PaginationProductAdmin";
import PageLoading from "../../../components/pageLoading";

// roter
import { useRouter } from "next/router";

// icon
import { MdOutlineFileDownload } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";
import { GrFormPrevious } from "react-icons/gr";

// react Hook
import { useMemo, useState, useEffect, useCallback } from "react";

//else
import axios from "axios";
import API_URL from "../../../helpers/apiurl";

//lodash
import { debounce } from "lodash";

const DetailProduct = () => {
  const router = useRouter();
  const { id } = router.query;

  const [pageLoading, setPageLoading] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isQuantityOpen,
    onOpen: onQuantityOpen,
    onClose: onQuantityClose,
  } = useDisclosure();

  // filter year 3 th kebelakang
  var currentTime = new Date();
  let yearNow = currentTime.getFullYear();
  let yearArr = [yearNow, yearNow - 1, yearNow - 2];

  //state
  const [input, setInput] = useState({
    month: "",
    year: "",
    activity: "",
  });
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [detailProduct, setDetailProduct] = useState({
    name: null,
    total_quantity: 0,
  });

  console.log(input.month, "month");

  // handle filter
  const updateLimit = (e) => {
    setLimit(parseInt(e.target.value));
  };

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setPage(0);
    // console.log(input);
  };

  // get data
  const getLogData = async (page, input, limit, cb) => {
    try {
      let response = await axios.get(
        `${API_URL}/product/get-log?product_id=${id}&year=${input.year}&month=${input.month}&page=${page}&limit=${limit}`,
        {
          params: {
            activity: input.activity,
          },
        }
      );
      console.log(response);
      cb(response);
    } catch (error) {
      console.log(error);
    }
  };

  const debouncedFetchData = useCallback(
    debounce((page, input, limit, cb) => {
      getLogData(page, input, limit, cb);
    }, 200),
    []
  );

  const debounceAll = () => {
    debouncedFetchData(page, input, limit, (response) => {
      setTotalData(parseInt(response.headers["x-total-product"]));
      console.log(response, "ini response di debounce");
      setData(response.data.result);
      setDetailProduct(response.data.detailProduct);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    setPageLoading(false);
  }, []);

  useEffect(() => {
    debounceAll();
  }, [page, input, limit]);

  const columns = useMemo(() => [
    {
      Header: "No",
      accessor: "num",
      isNumeric: true,
    },
    {
      Header: "Tanggal",
      accessor: "created_at",
    },
    {
      Header: "Aktivitas",
      accessor: "activity",
    },
    {
      Header: "Petugas",
      accessor: "fullname",
    },
    {
      Header: "Keluar",
      accessor: "keluar",
      isNumeric: true,
    },
    {
      Header: "Masuk",
      accessor: "masuk",
      isNumeric: true,
    },
    {
      Header: "Sisa",
      accessor: "stock",
      isNumeric: true,
    },
    {
      Header: "Tgl. Kadaluwarsa",
      accessor: "expired_at",
    },
  ]);

  if (pageLoading) {
    return <PageLoading />;
  }

  return (
    <>
      <div>
        {/* navbar admin */}
        <div className="flex w-full bg-white h-16 drop-shadow-md sticky items-center">
          <span className="flex items-center text-xl font-bold gap-4 ml-12">
            <GrFormPrevious className="text-lg" /> Obat Detail:{" "}
            {detailProduct?.name}
          </span>
        </div>
        {/* card detail prodyct */}
        <div className="w-[90vw] mx-auto h-[500px] mt-[28px] shadow-xl rounded-xl ">
          <div className="pl-[32px] flex justify-between  pt-[10px] ">
            <div className="flex gap-[24px] items-end">
              <div className="">
                <p className="text-sm">Bulan</p>
                <Select
                  placeholder="Bulan"
                  w="141px"
                  h="30px"
                  name="month"
                  onChange={(e) => handleInput(e)}
                >
                  <option value="1">Januari</option>
                  <option value="2">Februari</option>
                  <option value="3">Maret</option>
                  <option value="4">April</option>
                  <option value="5">Mei</option>
                  <option value="6">Juni</option>
                  <option value="7">Juli</option>
                  <option value="8">Agustus</option>
                  <option value="9">September</option>
                  <option value="10">Oktober</option>
                  <option value="11">Novemvber</option>
                  <option value="12">Desember</option>
                </Select>
              </div>
              <div className="">
                <p className="text-sm">Tahun</p>
                <Select
                  placeholder="Tahun"
                  w="141px"
                  h="30px"
                  name="year"
                  onChange={(e) => handleInput(e)}
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
              <div>
                <p className="text-sm">Filter</p>
                <Select
                  placeholder="Filter"
                  w="141px"
                  h="30px"
                  name="activity"
                  onChange={(e) => handleInput(e)}
                >
                  <option value="UPDATE_STOCK">Update Stock</option>
                  <option value="TRANSACTION_BY_USER">
                    Transaction by User
                  </option>
                </Select>
              </div>
              <div className="pb-[6px]">
                <p className="text-sm font-bold">
                  Total Product : {detailProduct?.total_quantity}
                </p>
              </div>
            </div>
            <div className="flex gap-[24px] items-end">
              <Button
                variant="outlineCustom"
                fontSize="xs"
                h="32px"
                onClick={onOpen}
              >
                Edit
              </Button>
              <Button
                variant="fillCustom"
                fontSize="xs"
                onClick={onQuantityOpen}
                h="32px"
              >
                Edit Kuantitas
              </Button>
            </div>
          </div>
          <Divider my="15px" />
          {/* table log */}
          <TableLog columns={columns} data={data} isLoading={isLoading} />
          <PaginationProductAdmin
            page={page}
            totalData={totalData}
            limit={limit}
            updateLimit={updateLimit}
            pageChangeHandler={setPage}
            isAdmin={true}
          />
        </div>

        {/* ini modal edit gitu deh hehehehehe */}

        <ModalEditProduct isOpen={isOpen} onClose={onClose} id={id} />
        <ModalEditQuantityProduct
          isOpen={isQuantityOpen}
          onClose={onQuantityClose}
          id={id}
          getLogData={debounceAll}
        />
      </div>
    </>
  );
};

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default DetailProduct;
