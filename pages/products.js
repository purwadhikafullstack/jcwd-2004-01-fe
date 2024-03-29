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
import Head from "next/head";
import { useRouter } from "next/router";
import PageLoading from "../components/pageLoading";

const Products = () => {
  const router = useRouter();
  let cat = router.query["category"];
  const [categoryList, setcategoryList] = useState({});
  // const [productsHome, setproductsHome] = useState([]);
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [limit, setLimit] = useState(12);
  const [input, setInput] = useState({
    search: "",
    category: cat || "",
    type: [],
    symptom: [],
    brand: [],
    orderName: "asc",
    orderPrice: "",
    minPrice: "",
    maxPrice: "",
  });
  const [loading, setLoading] = useState(true);

  const { isLogin, fullname, profile_picture } = useUser();

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
    let url = `${API_URL}/product/get-home-product?page=${page}`;
    if (input.search) {
      url += `&search=${input.search}`;
    }
    if (input.symptom) {
      url += `&symptom=${input.symptom}`;
    }
    if (input.category) {
      if (input.category === "vitamin & suplemen") {
        url += `&category=vitamin%20%26%20suplemen`;
      } else if (input.category === "ibu & anak") {
        url += `&category=ibu%20%26%20anak`;
      } else {
        url += `&category=${input.category || cat}`;
      }
    }
    // else if (input.category == "vitamin & suplemen") {
    //   url += `&category=vitamin%20%26%20suplemen`;
    // } else if (input.category == "ibu & anak") {
    //   url = +`&category=ibu%20%26%20anak`;
    // }
    if (input.type) {
      url += `&type=${input.type}`;
    }
    if (input.orderName) {
      url += `&orderName=${input.orderName}`;
    }
    if (input.brand) {
      url += `&brand=${input.brand}`;
    }
    if (input.orderPrice) {
      url += `&orderPrice=${input.orderPrice}`;
    }
    if (input.minPrice) {
      url += `&minPrice=${input.minPrice}`;
    }
    if (input.maxPrice) {
      url += `&maxPrice=${input.maxPrice}`;
    }
    let response = await axios.get(url); //! Dipersingkat querynya (dibuat conditional)
    console.log(response, "ini response");
    console.log(cat, "inicat");
    console.log(input.category, "ini input caategory");
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
    // if (e.target.name == "orderPrice") {
    //   setInput({ ...input, orderName: "" });
    // } else if (e.target.name == "orderName") {
    //   setInput({ ...input, orderPrice: "" });
    // }
    setPage(0);
    console.log(input.category);
    // console.log(data, "ini data");
    // console.log(input.orderPrice);
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

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <PageLoading />;
  }

  function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  return (
    <div className="flex flex-col">
      <Head>
        <title>Products | Healthymed</title>
      </Head>
      {/* Header */}
      <div className="bg-white drop-shadow-lg pb-4">
        <div className="mx-8">
          <MobileHeader
            firstProp={null}
            secondProp={<SearchBar placeholder={"Search"} />}
            thirdProp={
              isLogin ? (
                <FaShoppingCart />
              ) : (
                <Link href={"/login"}>
                  <Button variant={"outlineCustom"} h={"44px"} w={"114px"}>
                    Masuk
                  </Button>
                </Link>
              )
            }
            fourthProp={
              isLogin ? (
                <Link href="/userprofile/biodata">
                  <div className="flex items-center gap-2">
                    {profile_picture ? (
                      <img
                        className="rounded-full w-[25px] h-[25px] object-cover"
                        src={`${API_URL}${profile_picture}`}
                      />
                    ) : (
                      <FaUserCircle />
                    )}
                    <div className="text-base w-[80px] truncate">
                      {fullname}
                    </div>
                  </div>
                </Link>
              ) : (
                <Link href="/register">
                  <Button variant={"fillCustom"} h={"44px"} w={"114px"}>
                    Daftar
                  </Button>
                </Link>
              )
            }
            classExtend={"hidden lg:flex"}
          />
        </div>
      </div>

      <div className="w-[1244px] h-fit mx-16 pt-10 pb-10 flex justify-between">
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
                  setInput({
                    ...input,
                    type: [],
                    symptom: [],
                    brand: [],
                    orderName: "asc",
                    orderPrice: "",
                    minPrice: "",
                    maxPrice: "",
                    search: "",
                    category: "",
                  });
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
              <div
                className="collapse-content text-black bg-white text-[14px] h-[200px] scrollbar-thin scroll scrollbar-thumb-blackPrimary scrollbar-track-slate-300 overflow-y-scroll 
        scrollbar-thumb-rounded-full scrollbar-track-rounded-full flex flex-col gap-1 items-start"
              >
                {categoryList.symptom?.map((val, index) => {
                  return (
                    <Checkbox
                      value={val.id}
                      onChange={(e) => handleCheckbox(e, "symptom")}
                      key={index}
                      id={val.id}
                      isChecked={input.symptom.includes(val.id)}
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
                  <InputLeftAddon>
                    <div>Rp</div>
                  </InputLeftAddon>
                  <Input
                    value={input.minPrice}
                    onChange={(e) => handleInput(e)}
                    name="minPrice"
                    type="tel"
                    placeholder="Harga Minimum"
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon>
                    <div>Rp</div>
                  </InputLeftAddon>
                  <Input
                    value={input.maxPrice}
                    onChange={(e) => handleInput(e)}
                    name="maxPrice"
                    type="tel"
                    placeholder="Harga Maksimal"
                  />
                </InputGroup>
              </div>
            </div>

            <div className="collapse collapse-arrow border-b-2 border-[#D5D7DD]">
              <input type="checkbox" className="peer" />
              <div className="collapse-title text-black bg-white text-[16px] font-bold">
                Jenis Obat
              </div>
              <div
                className="collapse-content text-black bg-white text-[14px] h-[200px] scrollbar-thin scroll scrollbar-thumb-blackPrimary scrollbar-track-slate-300 overflow-y-scroll 
        scrollbar-thumb-rounded-full scrollbar-track-rounded-full flex flex-col gap-1 items-start"
              >
                {categoryList.type?.map((val, index) => {
                  return (
                    <Checkbox
                      key={index}
                      id={val.id}
                      value={val.id}
                      onChange={(e) => handleCheckbox(e, "type")}
                      isChecked={input.type.includes(val.id)}
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
              <div
                className="collapse-content text-black bg-white text-[14px] h-[200px] scrollbar-thin scroll scrollbar-thumb-blackPrimary scrollbar-track-slate-300 overflow-y-scroll 
        scrollbar-thumb-rounded-full scrollbar-track-rounded-full flex flex-col gap-1 items-start"
              >
                {categoryList.brand?.map((val, index) => {
                  return (
                    <Checkbox
                      key={index}
                      id={val.id}
                      value={val.id}
                      onChange={(e) => handleCheckbox(e, "brand")}
                      isChecked={input.brand.includes(val.id)}
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

        <div className="w-[900px] h-[1245px] pb-10">
          <div className="w-full h-[50px] text-[24px] font-bold border-b-2 border-[#D5D7DD]">
            {/* {cat ? <div hidden={input.category}>{capitalize(cat)}</div> : null}
            {input.category ? (
              <div hidden={cat}>{capitalize(input.category)}</div>
            ) : (
              "Semua"
            )} */}
            {input.category ? capitalize(input.category) : "Semua"}
          </div>
          <div className="flex justify-between w-full items-center py-5 text-[14px]">
            <div>
              <span>{data.length}</span> Produk di{" "}
              <span>
                {input.category ? capitalize(input.category) : "Semua"}
              </span>
            </div>
            <div className="flex gap-4 items-center">
              <div className="w-[300px]">
                <Input
                  placeholder={
                    input.category || cat
                      ? `Cari produk di ${input.category || cat}`
                      : "Cari produk"
                  }
                  focusBorderColor="blackPrimary"
                  name="search"
                  value={input.search}
                  onChange={(e) => handleInput(e)}
                />
              </div>
              <div>Urutkan</div>
              <Select
                value={input.orderPrice}
                name="orderPrice"
                fontSize={"14px"}
                onClick={() => setInput({ ...input, orderName: "" })}
                onChange={(e) => {
                  handleInput(e);
                }}
                width="120px"
                placeholder="Harga"
              >
                <option value="asc">Termurah</option>
                <option value="desc">Termahal</option>
              </Select>
              <Select
                value={input.orderName}
                onClick={() => setInput({ ...input, orderPrice: "" })}
                name="orderName"
                fontSize={"14px"}
                onChange={(e) => {
                  handleInput(e);
                }}
                width="90px"
                placeholder="Nama"
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
                          ? `${API_URL}${val.images[0].image}`
                          : "/defaultprofilepicture.png"
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
