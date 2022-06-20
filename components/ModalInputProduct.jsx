import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { useRef, useState } from "react";
import { GrNext } from "react-icons/gr";
import API_URL from "../helpers/apiurl";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import CreateTableSelect from "react-select/creatable";
import { useEffect } from "react";

const ModalInputDrugs = ({ isOpen, onClose }) => {
  const [page, setPage] = useState(0);
  console.log(page);
  let token = Cookies.get("token");
  const mounted = useRef(false);

  const formik = useFormik({
    initialValues: {
      name: "", //product table
      original_price: "", //product table
      price: "", //product table
      unit: "", //product table
      no_bpom: "", //product table
      no_obat: "", //product table
      indication: "", //description table
      composition: "", //description table
      packaging: "", //description table
      med_classification: "", //description table
      need_receipt: "", //description table
      storage_method: "", //description table
      principal: "", //description table
      nomor_ijin_edar: "", //description table
      warning: "", //description table
      usage: "", //description table
      brand_name: "", //brand table
      quantity: "", //stock table
      expired_at: "", //stock table
      type_name: "", //type table
      symptom_name: [], //symptom table
      category_name: [], //symptom table
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .max(255, "Must contain 25 characters or less")
        .required("Required"),
      original_price: Yup.string()
        .min(8, "Must contain 8 characters or more")
        .required("Required"),
    }),

    // onSubmit: async (values) => {
    //   const valArr = Object.keys(values);
    //   const formData = new FormData();
    //   valArr.forEach((key) => {
    //     formData.append(key, JSON.stringify(values[key]));
    //   });

    //   try {
    //     console.log(values);
    //     axios.post(`${API_URL}/product/input-product`, formData, {
    //       headers: {
    //         authorization: `Bearer ${token}`,
    //       },
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   } finally {
    //   }
    // },
  });

  const submitHandler = () => {
    const valArr = Object.keys(formik.values); //
    const formData = new FormData();
    valArr.forEach((key) => {
      if (["symptom_name", "category_name"].includes(key)) {
        let data = formik.values[key].map((val) => {
          console.log(val);
          return val.values.toLowerCase();
        });

        formData.append(key, JSON.stringify(data));
      } else {
        formData.append(key, formik.values[key]);
      }
    });

    try {
      console.log("aku kena");
      axios.post(`${API_URL}/product/input-product`, formData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  // get category
  let optionsCategory = [];
  const getCategory = async () => {
    let res = await axios.get(`${API_URL}/product/get-category`);
    let categoryData = res.data;
    optionsCategory = categoryData.map((val) => ({
      value: val.name,
      label: val.name,
    }));

    console.log(categoryData);
  };

  console.log(optionsCategory, "options");

  useEffect(() => {
    if (mounted.current) {
      return getCategory();
    }
    mounted.current = true;
    return () => {};
  }, []);

  // react select category
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={formik.handleSubmit}>
          <ModalContent maxWidth="792px">
            <ModalHeader>Tambah Obat</ModalHeader>
            <ModalCloseButton _focus={{ boxShadow: "none" }} />

            <ModalBody display="flex" flexDirection="column">
              {/* Bread Crumbs */}
              <div className="flex items-center pb-[28px]">
                <div className="flex items-center">
                  <div
                    className={`flex w-[18px] h-[18px] rounded-full ${
                      page == 0 ? "bg-blackPrimary" : "bg-grayDisable"
                    } bg-blackPrimary justify-center text-white text-xs font-bold`}
                  >
                    1
                  </div>
                  <div
                    className={`ml-1 ${
                      page == 0 ? "text-blackPrimary" : "text-grayDisable"
                    } font-normal text-sm`}
                  >
                    Detail Obat
                  </div>
                </div>
                <GrNext className="w-[10px] ml-2" />
                <div className="flex items-center">
                  <div
                    className={`ml-2 flex w-[18px] h-[18px] rounded-full  ${
                      page == 1 ? "bg-blackPrimary" : "bg-grayDisable"
                    } justify-center text-white text-xs font-bold`}
                  >
                    2
                  </div>
                  <div
                    className={`ml-1 ${
                      page == 1 ? "text-blackPrimary" : "text-grayDisable"
                    } font-normal text-sm`}
                  >
                    Detail Deskripsi
                  </div>
                </div>
                <GrNext className="w-[10px] ml-2" />
                <div className="flex items-center">
                  <div
                    className={`ml-2 flex w-[18px] h-[18px] rounded-full  ${
                      page == 2 ? "bg-blackPrimary" : "bg-grayDisable"
                    } justify-center text-white text-xs font-bold`}
                  >
                    3
                  </div>
                  <div
                    className={`ml-1 ${
                      page == 2 ? "text-blackPrimary" : "text-grayDisable"
                    } font-normal text-sm`}
                  >
                    Detail Kuantitas & Harga
                  </div>
                </div>
                <GrNext className="w-[10px] ml-2" />
                <div className="flex items-center">
                  <div
                    className={`ml-2 flex w-[18px] h-[18px] rounded-full  ${
                      page == 3 ? "bg-blackPrimary" : "bg-grayDisable"
                    } justify-center text-white text-xs font-bold`}
                  >
                    4
                  </div>
                  <div
                    className={`ml-1 ${
                      page == 3 ? "text-blackPrimary" : "text-grayDisable"
                    } font-normal text-sm`}
                  >
                    Upload Gambar
                  </div>
                </div>
              </div>
              <div className="flex">
                <div></div>
              </div>

              {/* Input */}
              {/* page Detail Obat */}
              <div className={`flex-col ${page !== 0 ? "hidden" : null}`}>
                <div className="flex items-center">
                  <p className="w-[154px]">Nama Obat</p>
                  <Input
                    name="name"
                    w="226px"
                    h="32px"
                    size="xs"
                    rounded="md"
                    placeholder="Masukan nama obat"
                    mb="12px"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                </div>
                <div className="flex items-center">
                  <p className="w-[154px]">No. Obat</p>
                  <Input
                    w="226px"
                    h="32px"
                    size="xs"
                    rounded="md"
                    placeholder="Masukan nama obat"
                    mb="12px"
                  />
                </div>
                <div className="flex items-center">
                  <p className="w-[154px]">No. BPOM</p>
                  <Input
                    w="226px"
                    h="32px"
                    size="xs"
                    rounded="md"
                    placeholder="Masukan nama obat"
                    mb="12px"
                  />
                </div>
                <div className="flex items-center">
                  <p className="w-[154px]">Kategori</p>
                  <CreateTableSelect
                    className="w-[226px] h-[32px]"
                    isMulti
                    onChange={(value) =>
                      formik.setFieldValue("category_name", value)
                    }
                    onBlur={() => formik.setFieldTouched("category_name", true)}
                    value={formik.values.category_name}
                    options={options}
                  />
                </div>
              </div>
              {/* page Detail Kuantitas */}
              <div className={`flex-row ${page !== 1 ? "hidden" : null}`}>
                <div className="flex items-center">
                  <p className="w-[154px]">2</p>
                  <Input w="226px" h="32px" placeholder="Masukan nama obat" />
                </div>
              </div>
              {/* page Upload Gambar */}
              <div className={`flex-row ${page !== 2 ? "hidden" : null}`}>
                <div className="flex items-center">
                  <p className="w-[154px]">3</p>
                  <Input w="226px" h="32px" placeholder="Masukan nama obat" />
                </div>
              </div>
              {/* page gatau */}
              <div className={`flex-row ${page !== 3 ? "hidden" : null}`}>
                <div className="flex items-center">
                  <p className="w-[154px]">4</p>
                  <Input w="226px" h="32px" placeholder="Masukan nama obat" />
                </div>
              </div>
            </ModalBody>

            <ModalFooter>
              {page == 0 ? null : (
                <Button
                  variant="outlineCustom"
                  mr="16px"
                  w="156px"
                  h="42px"
                  onClick={() => setPage(page - 1)}
                >
                  Kembali
                </Button>
              )}
              {page == 3 ? (
                <Button
                  variant="fillCustom"
                  w="156px"
                  h="42px"
                  onClick={submitHandler}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  variant="fillCustom"
                  w="156px"
                  h="42px"
                  onClick={() => setPage(page + 1)}
                >
                  Lanjutkan
                </Button>
              )}
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default ModalInputDrugs;
