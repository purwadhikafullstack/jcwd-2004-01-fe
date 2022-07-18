import MobileHeader from "../components/mobile_header";
import Footer from "../components/footer";
import SearchBar from "../components/searchbar";
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import useUser from "../hooks/useUser";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  Checkbox,
  Input,
  InputLeftAddon,
  InputGroup,
  Select,
} from "@chakra-ui/react";
import ProductCardMap from "../components/ProductCardMap";
import API_URL from "../helpers/apiurl";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import PaginationProductAdmin from "../components/PaginationProductAdmin";
import { debounce } from "lodash";
import { Rupiah } from "../lib/convertRupiah";
import Capitalize from "../lib/capitalize";
import Link from "next/link";

const Products = () => {
  const [categoryList, setcategoryList] = useState({});
  // const [productsHome, setproductsHome] = useState([]);
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [limit, setLimit] = useState(12);
  const [input, setInput] = useState({
    search: "",
    category: "ibu dan anak",
    type: [],
    symptom: [],
    brand: [],
    orderName: "asc",
    orderPrice: "asc",
  });

  const { isLogin, fullname } = useUser();

  const getCategoryList = async () => {
    let res = await axios.get(`${API_URL}/product/get-category-list`);
    console.log(res.data);
    setcategoryList(res.data);
  };

  // const getProductsHome = async (category_id) => {
  //   let res = await axios.get(
  //     `${API_URL}/product/get-home-product/${category_id}`
  //   );
  //   console.log(res.data, "ini data card");
  //   setTimeout(setproductsHome([...res.data]), 500);
  // };

  const getProductsHome = async (page, input, cb) => {
    let response = await axios.get(
      `${API_URL}/product/get-home-product?page=${page}&search=${input.search}&symptom=${input.symptom}&type=${input.type}&brand=${input.brand}&category=${input.category}&orderName=${input.orderName}&orderPrice=${input.orderPrice}`
    ); //! Dipersingkat querynya (dibuat conditional)
    console.log(response, "ini response");
    cb(response);
  };

  const debouncedFetchData = useCallback(
    debounce((page, input, cb) => {
      getProductsHome(page, input, cb);
    }, 1000),
    []
  );

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setPage(0);
    // console.log(input);
    console.log(data, "ini data");
    console.log(input.orderPrice);
  };

  const handleCheckbox = (e, prop) => {
    let tempArr = input[prop];
    if (e.target.checked) {
      tempArr.push(parseInt(e.target.value));
    } else {
      tempArr = tempArr.filter((id) => id !== parseInt(e.target.value));
    }
    console.log(tempArr);
    setInput({ ...input, [prop]: tempArr });
    console.log(input, "ini input");
    console.log(tempArr, "ini tempArr");
  };

  const updateLimit = (e) => {
    setLimit(parseInt(e.target.value));
  };

  useEffect(() => {
    debouncedFetchData(page, input, (response) => {
      setTotalData(parseInt(response.headers["x-total-product"]));
      setData([...response.data]);
    });
  }, [page, input]);

  useEffect(() => {
    getCategoryList();
  }, []);

  function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="bg-white drop-shadow-lg pb-4">
        <div className="mx-8">
          <MobileHeader
            firstProp={null}
            secondProp={<SearchBar placeholder={"Hayo mau cari apa"} />}
            thirdProp={
              isLogin ? (
                <FaShoppingCart />
              ) : (
                <Button variant={"outlineCustom"} h={"44px"} w={"114px"}>
                  Masuk
                </Button>
              )
            }
            fourthProp={
              isLogin ? (
                <div className="flex items-center gap-2">
                  <FaUserCircle />
                  <div className="text-base">{fullname}</div>
                </div>
              ) : (
                <Button variant={"fillCustom"} h={"44px"} w={"114px"}>
                  Daftar
                </Button>
              )
            }
            classExtend={"hidden lg:flex"}
          />
        </div>
      </div>

      <div className="w-[1244px] h-[2497px] mx-16 pt-10 flex justify-between">
        <div className="w-[300px] h-[60px]">
          {/* Category Menu */}
          <div className="collapse collapse-arrow rounded-box drop-shadow-lg">
            <input type="checkbox" className="peer" />
            <div className="collapse-title text-black bg-white text-[16px] font-bold">
              Kategori
            </div>
            <div className="collapse-content text-black bg-white text-[14px] flex flex-col gap-1 items-start">
              {categoryList.category?.map((val, index) => {
                return (
                  <button
                    onClick={(e) => {
                      handleInput(e);
                    }}
                    key={index}
                    id={val.id}
                    value={val.name}
                    name="category"
                  >
                    {capitalize(val.name)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filter */}
          <div className="w-[300px] pb-3 mt-4 rounded-2xl bg-white drop-shadow-lg">
            <div className="px-[44px] py-[20px] border-b-2 border-[#D5D7DD]">
              <Button
                variant={"fillCustom"}
                h={"46px"}
                w={"211px"}
                onClick={() => {
                  setInput({ ...input, type: [], symptom: [], brand: [] });
                }}
              >
                Hapus semua filter
              </Button>
            </div>
            {/* Collapse Keluhan */}
            <div className="collapse collapse-arrow border-b-2 border-[#D5D7DD]">
              <input type="checkbox" className="peer" />
              <div className="collapse-title text-black bg-white text-[16px] font-bold">
                Keluhan
              </div>
              <div className="collapse-content text-black bg-white text-[14px] flex flex-col gap-1 items-start">
                {categoryList.symptom?.map((val, index) => {
                  return (
                    <Checkbox
                      value={val.id}
                      onChange={(e) => handleCheckbox(e, "symptom")}
                      key={index}
                      id={val.id}
                      name="symptom"
                    >
                      {capitalize(val.name)}
                    </Checkbox>
                  );
                })}
              </div>
            </div>
            {/* Filter Harga */}
            <div className="collapse collapse-arrow border-b-2 border-[#D5D7DD]">
              <input type="checkbox" className="peer" />
              <div className="collapse-title text-black bg-white text-[16px] font-bold">
                Harga
              </div>
              <div className="collapse-content text-black bg-white text-[14px] flex flex-col gap-1 items-start">
                <InputGroup>
                  {/* <InputLeftAddon children="Rp" /> */}
                  <Input type="tel" placeholder="Harga Minimum" />
                </InputGroup>
                <InputGroup>
                  {/* <InputLeftAddon children="Rp" /> */}
                  <Input type="tel" placeholder="Harga Maksimal" />
                </InputGroup>
              </div>
            </div>

            <div className="collapse collapse-arrow border-b-2 border-[#D5D7DD]">
              <input type="checkbox" className="peer" />
              <div className="collapse-title text-black bg-white text-[16px] font-bold">
                Jenis Obat
              </div>
              <div className="collapse-content text-black bg-white text-[14px] flex flex-col gap-1 items-start">
                {categoryList.type?.map((val, index) => {
                  return (
                    <Checkbox
                      key={index}
                      id={val.id}
                      value={val.id}
                      onChange={(e) => handleCheckbox(e, "symptom")}
                      name="type"
                    >
                      {capitalize(val.name)}
                    </Checkbox>
                  );
                })}
              </div>
            </div>

            <div className="collapse collapse-arrow">
              <input type="checkbox" className="peer" />
              <div className="collapse-title text-black bg-white text-[16px] font-bold">
                Brand Obat
              </div>
              <div className="collapse-content text-black bg-white text-[14px] flex flex-col gap-1 items-start">
                {categoryList.brand?.map((val, index) => {
                  return (
                    <Checkbox
                      key={index}
                      id={val.id}
                      value={val.id}
                      onChange={(e) => handleCheckbox(e, "symptom")}
                      name="brand"
                    >
                      {capitalize(val.name)}
                    </Checkbox>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="w-[900px] h-[2283px]">
          <div className="w-full h-[50px] text-[24px] font-bold border-b-2 border-[#D5D7DD]">
            Obat
          </div>
          <div className="flex justify-between w-full items-center py-5 text-[14px]">
            <div>
              <span>{data.length}</span> Produk di{" "}
              <span>{capitalize(input.category)}</span>
            </div>
            <div className="flex gap-4 items-center">
              <div>Urutkan</div>
              <Select
                value={input.orderPrice}
                name="orderPrice"
                fontSize={"14px"}
                onChange={(e) => {
                  handleInput(e);
                }}
                width="120px"
              >
                <option value="asc">Termurah</option>
                <option value="desc">Termahal</option>
              </Select>
              <Select
                value={input.orderName}
                name="orderName"
                fontSize={"14px"}
                onChange={(e) => {
                  handleInput(e);
                }}
                width="90px"
              >
                <option value="asc">A - Z</option>
                <option value="desc">Z - A</option>
              </Select>
            </div>
          </div>
          <div>
            <PaginationProductAdmin
              page={page}
              totalData={totalData}
              limit={limit}
              setLimit={setLimit}
              updateLimit={updateLimit}
              pageChangeHandler={setPage}
            />
          </div>

          <div className="grid grid-cols-4 gap-4 mt-[20px]">
            {data.map((val, index) => {
              return (
                <Link key={index} href={`/produk/${val.id}`}>
                  <div className="hover:cursor-pointer">
                    <ProductCardMap
                      variant="list"
                      title={Capitalize(val.name)}
                      formattedPrice={Rupiah(parseInt(val.price))}
                      unit={Capitalize(val.unit)}
                      imgsrc={
                        val.images.length
                          ? `${API_URL}${val.images[0]}`
                          : `${API_URL}/photos/defaultprofilepicture.png`
                      }
                      imgalt={val.name}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Products;
