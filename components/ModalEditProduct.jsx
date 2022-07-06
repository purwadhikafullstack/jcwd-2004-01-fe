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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useNumberInput,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useRef, useState } from "react";
import { GrNext } from "react-icons/gr";
import API_URL from "../helpers/apiurl";
import { useFormik, useField } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import CreateTableSelect from "react-select/creatable";
import { useEffect } from "react";
import DatePicker from "react-datepicker/dist/react-datepicker";
import { BsPlusCircle } from "react-icons/bs";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import Image from "next/image";

const ModalEditProduct = ({ isOpen, onClose, id }) => {
  const toast = useToast();
  const [page, setPage] = useState(0);
  let token = Cookies.get("token");
  const mounted = useRef(false);

  const [loading, setLoading] = useState(true);

  const [optionsCategory, setOptionsCategory] = useState([]);
  const [optionsSymptom, setOptionsSymptom] = useState([]);
  const [optionsType, setOptionsType] = useState([]);

  const [buttonLoadingSubmit, setButtonLoadingSubmit] = useState(false);

  const [kuantitas, setKuantitas] = useState(0);

  function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
  }

  const [selectedImage, setselectedImage] = useState([]);

  // postingan

  const [allValid, setAllValid] = useState(false);

  const onFileChange = (e) => {
    console.log("e.target.files[0]", e.target.files[0]);
    if (e.target && e.target.files[0]) {
      setselectedImage([
        ...selectedImage,
        {
          file: e.target.files[0],
          filePreview: URL.createObjectURL(e.target.files[0]),
          url: null,
          path: null,
        },
      ]);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "", //product table
      original_price: 0, //product table
      price: 0, //product table
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
      //? quantity: 0, //stock table
      expired_at: new Date(), //stock table
      type_name: "", //type table
      symptom_name: [], //symptom table
      category_name: [], //symptom table
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      original_price: Yup.number().required("Required").nullable(),
      price: Yup.number().required("Required").nullable(),
      unit: Yup.string().required("Required"),
      no_bpom: Yup.string().required("Required"),
      no_obat: Yup.string().required("Required"),
      indication: Yup.string().required("Required"),
      composition: Yup.string().required("Required"),
      packaging: Yup.string().required("Required"),
      med_classification: Yup.string().required("Required"),
      need_receipt: Yup.string().required("Required"),
      storage_method: Yup.string().required("Required"),
      principal: Yup.string().required("Required"),
      nomor_ijin_edar: Yup.string().required("Required"),
      warning: Yup.string().required("Required"),
      usage: Yup.string().required("Required"),
      brand_name: Yup.string().required("Required"),
      expired_at: Yup.date("Input Date!").required("Required").nullable(),
      type_name: Yup.object().required("Required"),
      symptom_name: Yup.array().min(1, "Pick at least 1"),
      category_name: Yup.array().min(1, "Pick at least 1"),
    }),
  });

  console.log(kuantitas);
  console.log(formik.values.symptom_name, "simptom");
  console.log(formik.values.category_name, "kategori");
  console.log(formik.values.type_name, "kategori");

  const submitHandler = async () => {
    const valArr = Object.keys(formik.values); //
    const formData = new FormData();
    console.log(selectedImage, "line 135");
    valArr.forEach((key) => {
      if (["symptom_name", "category_name"].includes(key)) {
        let data = formik.values[key].map((val) => {
          return val.value.toLowerCase();
        });

        formData.append(key, JSON.stringify(data));
      } else if (["expired_at"].includes(key)) {
        let data = Date.parse(formik.values[key]) / 1000;

        formData.append(key, JSON.stringify(data));
      } else if (["type_name"].includes(key)) {
        let data = formik.values[key].value;
        formData.append(key, data);
      } else {
        formData.append(key, formik.values[key]);
      }
    });
    formData.append("quantity", kuantitas);
    let notSelectedImageArr = [];
    for (let i = 0; i < selectedImage.length; i++) {
      if (selectedImage[i].file) {
        formData.append(`image`, selectedImage[i].file);
      } else {
        notSelectedImageArr.push(selectedImage[i].path);
      }
    }
    formData.append("product_id", id);
    formData.append(`notDeletedImage`, JSON.stringify(notSelectedImageArr));

    try {
      setButtonLoadingSubmit(true);
      let res = await axios.patch(`${API_URL}/product/edit-product`, formData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      setPage(4);
    } catch (error) {
      console.log(error);
      toast({
        title: "error",
        description: error.response.data.message || "network error",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setButtonLoadingSubmit(false);
    }
  };

  // get category
  const getCategory = async () => {
    let res = await axios.get(`${API_URL}/product/get-category`);
    let categoryData = res.data;
    let optionsCategory = categoryData.map((val) => ({
      value: val.name,
      label: capitalize(val.name),
    }));

    setOptionsCategory(optionsCategory);
  };

  const getSymptom = async () => {
    let res = await axios.get(`${API_URL}/product/get-symptom`);
    let symptomData = res.data;
    let optionsSymptom = symptomData.map((val) => ({
      value: val.name,
      label: capitalize(val.name),
    }));

    setOptionsSymptom(optionsSymptom);
  };

  const getType = async () => {
    let res = await axios.get(`${API_URL}/product/get-type`);
    let typeData = res.data;
    let optionsType = typeData.map((val) => ({
      value: val.name,
      label: capitalize(val.name),
    }));

    setOptionsType(optionsType);
  };

  const getProduct = async () => {
    try {
      let res = await axios.get(`${API_URL}/product/get-product?id=${id}`);
      const { data } = res;
      console.log(data);
      let symptom = data.symptom.map((val) => ({
        value: val.name,
        label: capitalize(val.name),
      }));

      let category = data.categories.map((val) => ({
        value: val.name,
        label: capitalize(val.name),
      }));

      let imageProducts = data.imageProduct.map((val) => {
        return {
          file: null,
          filePreview: null,
          url: `${API_URL}${val.image}`,
          path: val.image,
        };
      });
      setselectedImage([...imageProducts]);
      formik.setValues({
        name: data.name,
        original_price: data.original_price, //product table
        price: data.price, //product table
        unit: data.unit, //product table
        no_bpom: data.no_bpom, //product table
        no_obat: data.no_obat, //product table
        indication: data.indication, //description table
        composition: data.composition, //description table
        packaging: data.packaging, //description table
        med_classification: data.med_classification, //description table
        need_receipt: data.need_receipt, //description table
        storage_method: data.storage_method, //description table
        principal: data.principal, //description table
        nomor_ijin_edar: data.nomor_ijin_edar, //description table
        warning: data.warning, //description table
        usage: data.usage, //description table
        brand_name: data.brand, //brand table
        //? quantity: 0, //stock table
        expired_at: new Date(), //stock table
        type_name: { label: capitalize(data.type_name), value: data.type_name }, //type table
        symptom_name: symptom, //symptom table
        category_name: category, //symptom table
      });

      setKuantitas(data.total_stock);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mounted.current) {
      getCategory();
      getSymptom();
      getType();
      getProduct();
    }
    mounted.current = true;
    () => {};
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
            <ModalHeader>{page == 4 ? null : `Edit Produk ${id}`}</ModalHeader>
            <ModalCloseButton
              _focus={{ boxShadow: "none" }}
              onClick={() => {
                setPage(0);
              }}
            />

            <ModalBody display="flex" flexDirection="column">
              {/* Bread Crumbs */}
              <div
                className={`flex items-center pb-[28px] ${
                  page == 4 ? "hidden" : null
                }`}
              >
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
                <div className="flex items-center my-2">
                  <p className="w-[154px]">Nama Obat</p>
                  <Input
                    name="name"
                    w="226px"
                    h="32px"
                    size="xs"
                    rounded="md"
                    placeholder="Masukan Nama obat"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <p className="text-sm ml-3 text-red-500 pt-1">
                      {formik.errors.name}
                    </p>
                  ) : null}
                </div>
                <div className="flex items-center my-2">
                  <p className="w-[154px]">No. Obat</p>
                  <Input
                    name="no_obat"
                    w="226px"
                    h="32px"
                    size="xs"
                    rounded="md"
                    placeholder="Masukan No. Obat"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.no_obat}
                  />
                  {formik.touched.no_obat && formik.errors.no_obat ? (
                    <p className="text-sm ml-3 text-red-500 pt-1">
                      {formik.errors.no_obat}
                    </p>
                  ) : null}
                </div>
                <div className="flex items-center my-2">
                  <p className="w-[154px]">No. BPOM</p>
                  <Input
                    name="no_bpom"
                    w="226px"
                    h="32px"
                    size="xs"
                    rounded="md"
                    placeholder="Masukan No. BPOM"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.no_bpom}
                  />
                  {formik.touched.no_bpom && formik.errors.no_bpom ? (
                    <p className="text-sm ml-3 text-red-500 pt-1">
                      {formik.errors.no_bpom}
                    </p>
                  ) : null}
                </div>
                <div className="flex items-center my-2">
                  <p className="w-[154px]">Merk Obat</p>
                  <Input
                    name="brand_name"
                    w="226px"
                    h="32px"
                    size="xs"
                    rounded="md"
                    placeholder="Masukan Merk Obat"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.brand_name}
                  />
                  {formik.touched.brand_name && formik.errors.brand_name ? (
                    <p className="text-sm ml-3 text-red-500 pt-1">
                      {formik.errors.brand_name}
                    </p>
                  ) : null}
                </div>
                <div className="flex items-center my-2">
                  <p className="w-[154px]">Kategori</p>
                  <CreateTableSelect
                    className="w-[452px] h-[32px]"
                    isMulti
                    onChange={(value) =>
                      formik.setFieldValue("category_name", value)
                    }
                    onBlur={() => formik.setFieldTouched("category_name", true)}
                    value={formik.values.category_name}
                    options={optionsCategory}
                  />
                  {formik.touched.category_name &&
                  formik.errors.category_name ? (
                    <p className="text-sm ml-3 text-red-500 pt-1">
                      {formik.errors.category_name}
                    </p>
                  ) : null}
                </div>
                <div className="flex items-center my-2">
                  <p className="w-[154px]">Gejala</p>
                  <CreateTableSelect
                    className="w-[452px] h-[32px]"
                    isMulti
                    onChange={(value) =>
                      formik.setFieldValue("symptom_name", value)
                    }
                    onBlur={() => formik.setFieldTouched("symptom_name", true)}
                    value={formik.values.symptom_name}
                    options={optionsSymptom}
                  />
                  {formik.touched.symptom_name && formik.errors.symptom_name ? (
                    <p className="text-sm ml-3 text-red-500 pt-1">
                      {formik.errors.symptom_name}
                    </p>
                  ) : null}
                </div>
                <div className="flex items-center my-2">
                  <p className="w-[154px]">Tipe Obat</p>
                  <CreateTableSelect
                    className="w-[452px] h-[32px]"
                    onChange={(value) =>
                      formik.setFieldValue("type_name", value)
                    }
                    onBlur={() => formik.setFieldTouched("type_name", true)}
                    value={formik.values.type_name}
                    options={optionsType}
                  />
                  {formik.touched.type_name && formik.errors.type_name ? (
                    <p className="text-sm ml-3 text-red-500 pt-1">
                      {formik.errors.type_name}
                    </p>
                  ) : null}
                </div>
                <div className="flex items-center my-2">
                  <p className="w-[154px]">Expired</p>
                  <DatePicker
                    name="expired_at"
                    className="ml-7 pl-2 w-[226px] h-[32px] border-[1px] border-grayDisable rounded-md focus:outline-blue-500 transition ease-in-out delay-150 duration-300"
                    onChange={(value) =>
                      formik.setFieldValue("expired_at", value)
                    }
                    selected={formik.values.expired_at}
                    onBlur={() => formik.setFieldTouched("expired_at", true)}
                    value={formik.values.expired_at}
                    dateFormat="dd-MM-yyyy"
                  />
                  {formik.touched.expired_at && formik.errors.expired_at ? (
                    <p className="text-sm ml-3 text-red-500 pt-1">
                      {formik.errors.expired_at}
                    </p>
                  ) : null}
                </div>
              </div>
              {/* page Detail Deskripsi */}
              <div className={`flex-row ${page !== 1 ? "hidden" : null}`}>
                <div className="flex items-center my-2">
                  <p className="w-[154px]">Indikasi</p>
                  <Input
                    name="indication"
                    w="226px"
                    h="32px"
                    size="xs"
                    rounded="md"
                    placeholder="Masukan Indikasi"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.indication}
                  />{" "}
                  {formik.touched.indication && formik.errors.indication ? (
                    <p className="text-sm ml-3 text-red-500 pt-1">
                      {formik.errors.indication}
                    </p>
                  ) : null}
                </div>
                <div className="flex items-center my-2">
                  <p className="w-[154px]">Komposisi</p>
                  <Input
                    name="composition"
                    w="226px"
                    h="32px"
                    size="xs"
                    rounded="md"
                    placeholder="Masukan Komposisi"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.composition}
                  />
                  {formik.touched.composition && formik.errors.composition ? (
                    <p className="text-sm ml-3 text-red-500 pt-1">
                      {formik.errors.composition}
                    </p>
                  ) : null}
                </div>
                <div className="flex items-center my-2">
                  <p className="w-[154px]">Kemasan</p>
                  <Input
                    name="packaging"
                    w="226px"
                    h="32px"
                    size="xs"
                    rounded="md"
                    placeholder="Masukan Kemasan"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.packaging}
                  />
                  {formik.touched.packaging && formik.errors.packaging ? (
                    <p className="text-sm ml-3 text-red-500 pt-1">
                      {formik.errors.packaging}
                    </p>
                  ) : null}
                </div>
                <div className="flex items-center my-2">
                  <p className="w-[154px]">Golongan</p>
                  <Input
                    name="med_classification"
                    w="226px"
                    h="32px"
                    size="xs"
                    rounded="md"
                    placeholder="Masukan Golongan Obat"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.med_classification}
                  />
                  {formik.touched.med_classification &&
                  formik.errors.med_classification ? (
                    <p className="text-sm ml-3 text-red-500 pt-1">
                      {formik.errors.med_classification}
                    </p>
                  ) : null}
                </div>
                <div className="flex items-center my-2">
                  <p className="w-[154px]">Butuh Resep</p>
                  <Input
                    name="need_receipt"
                    w="226px"
                    h="32px"
                    size="xs"
                    rounded="md"
                    placeholder="Masukan Butuh Resep (IYA/TIDAK)"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.need_receipt}
                  />{" "}
                  {formik.touched.need_receipt && formik.errors.need_receipt ? (
                    <p className="text-sm ml-3 text-red-500 pt-1">
                      {formik.errors.need_receipt}
                    </p>
                  ) : null}
                </div>
                <div className="flex items-center my-2">
                  <p className="w-[154px]">Tempat Penyimpanan</p>
                  <Input
                    name="storage_method"
                    w="226px"
                    h="32px"
                    size="xs"
                    rounded="md"
                    placeholder="Masukan Tempat Penyimpanan"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.storage_method}
                  />
                  {formik.touched.storage_method &&
                  formik.errors.storage_method ? (
                    <p className="text-sm ml-3 text-red-500 pt-1">
                      {formik.errors.storage_method}
                    </p>
                  ) : null}
                </div>
                <div className="flex items-center my-2">
                  <p className="w-[154px]">Principal</p>
                  <Input
                    name="principal"
                    w="226px"
                    h="32px"
                    size="xs"
                    rounded="md"
                    placeholder="Masukan Principal"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.principal}
                  />
                  {formik.touched.principal && formik.errors.principal ? (
                    <p className="text-sm ml-3 text-red-500 pt-1">
                      {formik.errors.principal}
                    </p>
                  ) : null}
                </div>
                <div className="flex items-center my-2">
                  <p className="w-[154px]">No Ijin Edar</p>
                  <Input
                    name="nomor_ijin_edar"
                    w="226px"
                    h="32px"
                    size="xs"
                    rounded="md"
                    placeholder="Masukan No Ijin Edar"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.nomor_ijin_edar}
                  />
                  {formik.touched.nomor_ijin_edar &&
                  formik.errors.nomor_ijin_edar ? (
                    <p className="text-sm ml-3 text-red-500 pt-1">
                      {formik.errors.nomor_ijin_edar}
                    </p>
                  ) : null}
                </div>
                <div className="flex items-center my-2">
                  <p className="w-[154px]">Peringatan</p>
                  <Input
                    name="warning"
                    w="226px"
                    h="32px"
                    size="xs"
                    rounded="md"
                    placeholder="Masukan Peringatan"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.warning}
                  />
                  {formik.touched.warning && formik.errors.warning ? (
                    <p className="text-sm ml-3 text-red-500 pt-1">
                      {formik.errors.warning}
                    </p>
                  ) : null}
                </div>
                <div className="flex items-center my-2">
                  <p className="w-[154px]">Cara Pakai</p>
                  <Input
                    name="usage"
                    w="226px"
                    h="32px"
                    size="xs"
                    rounded="md"
                    placeholder="Masukan Cara Pakai"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.usage}
                  />
                  {formik.touched.usage && formik.errors.usage ? (
                    <p className="text-sm ml-3 text-red-500 pt-1">
                      {formik.errors.usage}
                    </p>
                  ) : null}
                </div>
              </div>
              {/* page Detail Kuantitas */}
              <div className={`flex-row ${page !== 2 ? "hidden" : null}`}>
                <div className="flex items-center my-2">
                  <p className=" flex w-[154px]">Kuantitas</p>

                  <Button
                    isDisabled={kuantitas == 0}
                    roundedRight="none"
                    h="32px"
                    w="32px"
                    onClick={() => {
                      let angka = parseInt(kuantitas) - 1;
                      angka = angka + "";
                      setKuantitas(angka);
                    }}
                  >
                    -
                  </Button>
                  <NumberInput
                    min={0}
                    onChange={(value) => setKuantitas(value)}
                    value={kuantitas}
                  >
                    <NumberInputField
                      name="kuantitas"
                      rounded="none"
                      w="100px"
                      h="32px"
                    />
                  </NumberInput>
                  <Button
                    roundedLeft="none"
                    h="32px"
                    w="32px"
                    onClick={() => {
                      let angka = parseInt(kuantitas) + 1;
                      angka = angka + "";
                      setKuantitas(angka);
                    }}
                  >
                    +
                  </Button>
                </div>
                <div className="flex items-center my-2">
                  <p className="w-[154px]">Satuan</p>
                  <Input
                    name="unit"
                    w="226px"
                    h="32px"
                    size="xs"
                    rounded="md"
                    placeholder="Masukan Satuan"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.unit}
                  />
                  {formik.touched.unit && formik.errors.unit ? (
                    <p className="text-sm ml-3 text-red-500 pt-1">
                      {formik.errors.unit}
                    </p>
                  ) : null}
                </div>
                <div className="flex items-center my-2">
                  <p className="w-[154px]">Nilai Barang (Rp)</p>
                  <NumberInput
                    className="flex"
                    name="original_price"
                    min={0}
                    onChange={(value) =>
                      formik.setFieldValue("original_price", value)
                    }
                    value={formik.values.original_price}
                  >
                    <NumberInputField w="226px" h="32px" />
                  </NumberInput>
                  {formik.touched.original_price &&
                  formik.errors.original_price ? (
                    <p className="text-sm ml-3 text-red-500 pt-1">
                      {formik.errors.original_price}
                    </p>
                  ) : null}
                </div>
                <div className="flex items-center my-2">
                  <p className="w-[154px]">Nilai Jual (Rp)</p>
                  <NumberInput
                    className="flex"
                    name="price"
                    min={0}
                    onChange={(value) => formik.setFieldValue("price", value)}
                    value={formik.values.price}
                  >
                    <NumberInputField w="226px" h="32px" />
                  </NumberInput>
                  {formik.touched.price && formik.errors.price ? (
                    <p className="text-sm ml-3 text-red-500 pt-1">
                      {formik.errors.price}
                    </p>
                  ) : null}
                  <input
                    className="hidden"
                    type="file"
                    id="image"
                    onChange={onFileChange}
                  />
                </div>
              </div>
              {/* page Upload Gambar */}
              <div
                className={`flex justify-center gap-5 ${
                  page !== 3 ? "hidden" : null
                }`}
              >
                {!selectedImage.length ? (
                  <div className="w-[300px]">
                    <Tooltip label="Click me to upload your image">
                      <label htmlFor="image">
                        <BsPlusCircle className="w-2/4 h-2/4 mx-auto my-20 hover:cursor-pointer hover:scale-105 transition-all duration-150 ease-out mb-14" />
                      </label>
                    </Tooltip>
                  </div>
                ) : null}
                {selectedImage.map((val, index) => {
                  return (
                    <div className="relative w-[200px]" key={index}>
                      <img
                        src={
                          val.filePreview == null ? val.url : val.filePreview
                        }
                        className="object-cover w-full aspect-square relative"
                      />
                      {selectedImage.length < 3 ? (
                        <label htmlFor="image">
                          <AiOutlinePlusCircle className="navBtn absolute left-9 top-3 text-white hover:cursor-pointer" />
                        </label>
                      ) : null}
                      <AiOutlineMinusCircle
                        z={10}
                        className="navBtn absolute left-3 top-3 text-white hover:cursor-pointer"
                        onClick={() => {
                          setselectedImage(
                            selectedImage.filter((e) => e !== val)
                          );
                        }}
                      />
                      <div className="absolute top-3 right-3 text-xs w-5 h-5 bg-blue-600 rounded-full text-white text-center">
                        {index + 1}
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Page Success */}
              <div
                className={`flex-col items-center mx-auto ${
                  page !== 4 ? "hidden" : null
                }`}
              >
                <Image
                  className=""
                  src="/successInputProduct.svg"
                  width="300px"
                  height="300px"
                />

                <p className="font-bold text-lg text-center">
                  Obat Berhasil Ditambahkan!
                </p>
                <p className="text-md text-center">
                  Jumlah stok diperbaharui secara otomatis
                </p>
              </div>
            </ModalBody>

            <ModalFooter>
              {page == 0 || page == 4 ? null : (
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
                  isLoading={buttonLoadingSubmit}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  hidden={page == 4}
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

export default ModalEditProduct;
