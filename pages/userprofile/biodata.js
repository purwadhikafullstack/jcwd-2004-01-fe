import NavbarProfile from "../../components/NavbarProfile";
import NavbarAdminTop from "../../components/NavbarAdminTop";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { BsEyeSlashFill } from "react-icons/bs";
import { BsEyeFill, BsCashStack } from "react-icons/bs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../helpers/apiurl";
import Cookies from "js-cookie";
import useUser from "../../hooks/useUser";
import { toast } from "react-toastify";
import Link from "next/link";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const dayjs = require("dayjs");
import { IoIosArrowBack } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { FaShoppingCart, FaListUl } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import SearchBar from "../../components/searchbar";
import Footer from "../../components/footer";
import Head from "next/head";
import Capitalize from "../../lib/capitalize";

const Biodata = () => {
  //Modal Hook
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenFullname,
    onOpen: onOpenFullname,
    onClose: onCloseFullname,
  } = useDisclosure();
  const {
    isOpen: isOpenUsername,
    onOpen: onOpenUsername,
    onClose: onCloseUsername,
  } = useDisclosure();
  const {
    isOpen: isOpenEmail,
    onOpen: onOpenEmail,
    onClose: onCloseEmail,
  } = useDisclosure();
  const {
    isOpen: isOpenPhonenumber,
    onOpen: onOpenPhonenumber,
    onClose: onClosePhonenumber,
  } = useDisclosure();
  const {
    isOpen: isOpenDOB,
    onOpen: onOpenDOB,
    onClose: onCloseDOB,
  } = useDisclosure();
  const {
    isOpen: isOpenGender,
    onOpen: onOpenGender,
    onClose: onCloseGender,
  } = useDisclosure();

  //Toggle password
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [show1, setShow1] = useState(false);
  const handleClick1 = () => setShow1(!show1);

  const [show2, setShow2] = useState(false);
  const handleClick2 = () => setShow2(!show2);

  //Disable button hook
  const [disable, setDisable] = useState(false);
  const [disableFullname, setDisableFullname] = useState(false);
  const [disableUsername, setDisableUsername] = useState(false);
  const [disableEmail, setDisableEmail] = useState(false);
  const [disablePhonenumber, setDisablePhonenumber] = useState(false);
  const [disableGender, setDisableGender] = useState(false);
  const [disableDOB, setDisableDOB] = useState(false);

  //User Data state
  const [userData, setUserData] = useState({
    fullname: "",
    username: "",
    profile_picture: "",
    phonenumber: "",
    email: "",
  });
  const userDataHandleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const { is_verified, fullname } = useUser();

  let token = Cookies.get("token");

  const getUserData = async () => {
    let res = await axios.get(`${API_URL}/profile/getuserprofile`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    setUserData(res.data);
  };

  useEffect(() => {
    getUserData();
  }, []);

  //Edit input fullname
  const submitFullname = async (e) => {
    e.preventDefault();
    try {
      setDisableFullname(true);
      await axios.post(
        `${API_URL}/profile/updatefullname`,
        { fullname: userData.fullname },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Name successfully changed!", {
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
      getUserData();
      setDisableFullname(false);
      onCloseFullname();
    }
  };
  const closeFullname = () => {
    onCloseFullname();
  };

  //Edit input email
  const submitEmail = async (e) => {
    e.preventDefault();
    try {
      setDisableEmail(true);
      await axios.post(
        `${API_URL}/profile/updateemail`,
        { email: userData.email },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Email successfully changed!", {
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
      getUserData();
      setDisableEmail(false);
      onCloseEmail();
    }
  };
  const closeEmail = () => {
    onCloseEmail();
  };

  //Edit input username
  const submitUsername = async (e) => {
    e.preventDefault();
    try {
      setDisableUsername(true);
      await axios.post(
        `${API_URL}/profile/updateusername`,
        { username: userData.username },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Username successfully changed!", {
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
      getUserData();
      setDisableUsername(false);
      onCloseUsername();
    }
  };
  const closeUsername = () => {
    onCloseUsername();
  };

  //Edit input phonenumber
  const submitPhonenumber = async (e) => {
    e.preventDefault();
    try {
      setDisablePhonenumber(true);
      await axios.post(
        `${API_URL}/profile/updatephonenumber`,
        { phonenumber: userData.phonenumber },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Phonenumber successfully changed!", {
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
      getUserData();
      setDisablePhonenumber(false);
      onClosePhonenumber();
    }
  };
  const closePhonenumber = () => {
    onClosePhonenumber();
  };

  //Input Gender
  const [gender, setinputGender] = useState("");
  const handleInputGender = (e) => {
    setinputGender(e.target.value);
  };
  const submitGender = async (e) => {
    e.preventDefault();
    try {
      setDisableGender(true);
      await axios.post(
        `${API_URL}/profile/updategender`,
        { gender },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Gender successfully changed!", {
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
      getUserData();
      setDisableGender(false);
      onCloseGender();
    }
  };
  const closeGender = () => {
    onCloseGender();
  };

  //Input Date of Birth
  const [date_of_birth, setinputDOB] = useState(null);
  const submitDOB = async (e) => {
    e.preventDefault();
    try {
      setDisableDOB(true);
      // console.log(Date.parse(date_of_birth) / 1000);
      // console.log(typeof date_of_birth);
      await axios.post(
        `${API_URL}/profile/updatebirthdate`,
        { date_of_birth },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Date of birth successfully changed!", {
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
      getUserData();
      setDisableDOB(false);
      onCloseDOB();
    }
  };
  const closeDOB = () => {
    setinputDOB("");
    onCloseDOB();
  };

  //Input Profile Picture
  const [selectedImage, setselectedImage] = useState({
    file: [],
  });
  const onFileChange = async (e) => {
    console.log(e.target.files[0]);
    if (e.target && e.target.files[0]) {
      try {
        setselectedImage({
          ...selectedImage,
          file: e.target.files[0],
        });
        let formData = new FormData();
        formData.append("profile_picture", e.target.files[0]);
        if (e.target.files.length == 0) {
          throw "Please select images to submit!";
        }
        await axios.post(`${API_URL}/profile/updateprofilepicture`, formData, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setselectedImage({ ...selectedImage, file: [] });
        toast.success("Profile picture successfully changed!", {
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
        getUserData();
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },

    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Required"),
      newPassword: Yup.string()
        .min(8, "Must contain 8 characters or more")
        .matches(/[A-Z]/g, "Should contain at least an uppercase letter")
        .matches(/[a-z]/g, "Should contain at least a lowercase letter")
        .matches(/[0-9]/g, "Should contain at least a number letter")
        .matches(
          /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/g,
          "Should contain at least a special character"
        )
        .matches(/^\S*$/, "Should not contain spaces"),
      confirmNewPassword: Yup.string().oneOf(
        [Yup.ref("newPassword"), null],
        "Passwords must match"
      ),
    }),

    onSubmit: async (values) => {
      try {
        setDisable(true);
        await changeNewPassword(values);
        console.log("masuk sini");
      } catch (error) {
        console.log(error);
      } finally {
        console.log("finally");
        setDisable(false);
        onClose();
      }
    },
  });

  const verifyMe = async () => {
    try {
      await axios.get(`${API_URL}/auth/verifyme`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      toast.success("Email sent!", {
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
    }
  };

  const changeNewPassword = async (values) => {
    try {
      console.log(token);
      await axios.post(`${API_URL}/auth/changepassword`, values, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      toast.success("Password changed!", {
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
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const renderUserprofileData = () => {
    return (
      <div className="flex flex-col">
        <div className="w-96 text-lg font-bold">Ubah Biodata Diri</div>
        <div className="mt-4 flex gap-10 text-sm">
          <div className="w-28">Nama</div>
          <div>{userData.fullname ? userData.fullname : "-"}</div>
          <button onClick={onOpenFullname} className="text-cyan-500">
            Ubah
          </button>
        </div>
        <div className="mt-5 flex gap-10 text-sm">
          <div className="w-28">Username</div>
          <div>{userData.username ? userData.username : "-"}</div>
          <button onClick={onOpenUsername} className="text-cyan-500">
            Ubah
          </button>
        </div>
        <div className="mt-5 flex gap-10 text-sm">
          <div className="w-28">Gender</div>
          <div>{userData.gender ? Capitalize(userData.gender) : "-"}</div>
          <button onClick={onOpenGender} className="text-cyan-500">
            Ubah
          </button>
        </div>
        <div className="mt-5 flex gap-10 text-sm">
          <div className="w-28">Tanggal Lahir</div>
          <div>
            {userData.date_of_birth
              ? dayjs(userData.date_of_birth).format("DD/MM/YYYY")
              : "-"}
          </div>
          <button onClick={onOpenDOB} className="text-cyan-500">
            Ubah
          </button>
        </div>
        <div className="w-96 text-lg font-bold mt-6">Ubah Kontak</div>
        <div className="mt-4 flex gap-10 text-sm">
          <div className="w-28">Email</div>
          <div>{userData.email}</div>
          <button onClick={onOpenEmail} className="text-cyan-500">
            Ubah
          </button>
        </div>
        <div className="mt-5 flex gap-10 text-sm">
          <div className="w-28">Nomor HP</div>
          <div>{userData.phonenumber ? userData.phonenumber : "-"}</div>
          <button onClick={onOpenPhonenumber} className="text-cyan-500">
            Ubah
          </button>
        </div>
      </div>
    );
  };

  const renderUserProfilePhoto = () => {
    return (
      <div className="">
        <img
          className="w-56 h-72 object-cover rounded-lg"
          src={
            userData.profile_picture
              ? `${API_URL}${userData.profile_picture}`
              : `${API_URL}/photos/defaultprofilepicture.png`
          }
        />
      </div>
    );
  };

  return (
    <>
      {/* Navbar */}
      <div className="w-[375px] lg:w-[1349px] h-[812px] lg:h[1366px]">
        <Head>
          <title>Biodata | Healthymed</title>
        </Head>
        <div className="bg-white w-full h-[92px] lg:h-[109px] flex items-center drop-shadow-lg">
          <Link href="/">
            <div className="ml-[16px] lg:ml-[76px] text-lg hover:cursor-pointer">
              <div className="lg:hidden">
                <IoIosArrowBack />
              </div>
              <img
                className="hidden lg:inline-block"
                src="/LogoHealthymedBW.svg"
                alt=""
              />
            </div>
          </Link>
          <div className="ml-[36px] w-[744px] hidden lg:inline-block">
            <SearchBar
              placeholder={"Cari Obat, Suplemen, Vitamin, Produk Kesehatan"}
            />
          </div>
          <div className="ml-[60px] text-2xl hidden lg:inline-block">
            <FaShoppingCart />
          </div>
          <div className="mr-[16px] ml-[50px] text-2xl hidden lg:inline-block">
            <div className="flex items-center gap-2">
              <FaUserCircle />
              <div className="text-base">{fullname}</div>
            </div>
          </div>
        </div>

        {/* Biodata */}
        <div className="flex mx-[96px] mt-[56px] gap-[46px]">
          <div className="w-[300px] h-[484px] rounded-2xl bg-white drop-shadow-lg">
            <div className="w-full h-[80px] border-b-2 border-gray-400">
              <div className="w-[220px] mx-[40px] pt-[28px] flex gap-[40px] items-center">
                <img
                  className="rounded-full w-[20px] h-[20px] object-cover"
                  src={
                    userData.profile_picture
                      ? `${API_URL}${userData.profile_picture}`
                      : `${API_URL}/photos/defaultprofilepicture.png`
                  }
                />
                <div>{userData.fullname}</div>
              </div>
            </div>
            <div className="w-full h-full">
              <Link href="/userprofile/biodata">
                <div className="w-[220px] mx-[40px] pt-[28px] flex items-center gap-[48px] text-[14px] font-bold hover:cursor-pointer">
                  <FaUserCircle /> Profil
                </div>
              </Link>
              <Link href="/userprofile/transactions">
                <div className="w-[220px] mx-[40px] pt-[28px] flex items-center gap-[48px] text-[14px] hover:cursor-pointer">
                  <FaListUl /> Proses Pemesanan
                </div>
              </Link>

              <div className="w-[220px] mx-[40px] pt-[28px] flex items-center gap-[48px] text-[14px] hover:cursor-pointer">
                <BsCashStack /> Metode Pembayaran
              </div>

              <Link href="/userprofile/address">
                <div className="w-[220px] mx-[40px] pt-[28px] flex items-center gap-[48px] text-[14px] hover:cursor-pointer">
                  <IoLocationSharp /> Alamat Pengiriman
                </div>
              </Link>
            </div>
          </div>
          <div>
            <div className="flex gap-10">
              {/* Profile Picture Section */}
              <div className="flex flex-col p-5 border-2 border-gray-400 rounded-xl">
                {renderUserProfilePhoto()}
                <input
                  className="hidden"
                  type="file"
                  id="profilePic"
                  onChange={onFileChange}
                />
                <label
                  htmlFor="profilePic"
                  type="submit"
                  className="p-2 mt-2 w-56 border-2 border-gray-400 rounded-md hover:cursor-pointer text-center font-bold bg-white hover:bg-opacity-10 hover:bg-blackPrimary duration-300"
                >
                  Pilih Foto
                </label>
                <button
                  onClick={onOpen}
                  className="p-2 mt-2 w-56 border-2 border-gray-400 rounded-md font-bold bg-white hover:bg-opacity-10 hover:bg-blackPrimary duration-300"
                >
                  Ubah Kata Sandi
                </button>
                {is_verified === 0 ? (
                  <button
                    onClick={() => {
                      verifyMe();
                    }}
                    className="font-bold text-white file:border-2 border-green-500 rounded-md p-2 mt-2 w-56 hover:bg-opacity-75 duration-300 bg-green-500"
                  >
                    Verifikasi Akun
                  </button>
                ) : null}
              </div>

              {/* Profile Detail Section */}
              <div className="">
                <div className="flex h-[32px] items-center w-[72.6%] gap-9">
                  <Link href="/userprofile/biodata">
                    <button className="text-xl font-bold text-blackPrimary">
                      Biodata
                    </button>
                  </Link>
                  <Link href="/userprofile/address">
                    <button className="text-xl font-bold text-gray-400">
                      Alamat
                    </button>
                  </Link>
                </div>
                <div className="mt-5">{renderUserprofileData()}</div>
              </div>
            </div>

            {/* Modal Change Password */}
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Change Password</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={formik.handleSubmit}>
                  <ModalBody pb={6}>
                    <FormControl>
                      <FormLabel>Old Password</FormLabel>
                      <InputGroup>
                        <Input
                          type={show ? "text" : "password"}
                          placeholder="Old Password"
                          name="oldPassword"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.oldPassword}
                        />
                        <InputRightElement width="4.5rem">
                          <Button h="1.75rem" size="md" onClick={handleClick}>
                            {show ? <BsEyeFill /> : <BsEyeSlashFill />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>New Password</FormLabel>
                      <InputGroup>
                        <Input
                          type={show1 ? "text" : "password"}
                          placeholder="New Password"
                          name="newPassword"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.newPassword}
                        />
                        <InputRightElement width="4.5rem">
                          <Button h="1.75rem" size="md" onClick={handleClick1}>
                            {show1 ? <BsEyeFill /> : <BsEyeSlashFill />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Confirm New Password</FormLabel>
                      <InputGroup>
                        <Input
                          type={show2 ? "text" : "password"}
                          placeholder="Confirm New Password"
                          name="confirmNewPassword"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.confirmNewPassword}
                        />
                        <InputRightElement width="4.5rem">
                          <Button h="1.75rem" size="md" onClick={handleClick2}>
                            {show2 ? <BsEyeFill /> : <BsEyeSlashFill />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      isDisabled={disable}
                      type="submit"
                      colorScheme="blue"
                      mr={3}
                    >
                      Save
                    </Button>
                    <Button type="button" onClick={onClose}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </form>
              </ModalContent>
            </Modal>

            {/* Modal Fullname */}
            <Modal isOpen={isOpenFullname} onClose={closeFullname}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Ubah Nama</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={submitFullname}>
                  <ModalBody pb={6}>
                    <FormControl mt={4}>
                      <FormLabel>Nama</FormLabel>
                      <Input
                        type="text"
                        placeholder="Masukkan nama"
                        name="fullname"
                        onChange={userDataHandleChange}
                        // onBlur={""}
                        value={userData.fullname}
                      />
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      isDisabled={disableFullname}
                      type="submit"
                      colorScheme="blue"
                      mr={3}
                    >
                      Save
                    </Button>
                    <Button type="button" onClick={closeFullname}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </form>
              </ModalContent>
            </Modal>

            {/* Modal Username */}
            <Modal isOpen={isOpenUsername} onClose={closeUsername}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Ubah Username</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={submitUsername}>
                  <ModalBody pb={6}>
                    <FormControl mt={4}>
                      <FormLabel>Username</FormLabel>
                      <Input
                        type="text"
                        placeholder="Masukkan nama"
                        name="username"
                        onChange={userDataHandleChange}
                        // onBlur={""}
                        value={userData.username}
                      />
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      isDisabled={disableUsername}
                      type="submit"
                      colorScheme="blue"
                      mr={3}
                    >
                      Save
                    </Button>
                    <Button type="button" onClick={closeUsername}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </form>
              </ModalContent>
            </Modal>

            {/* Modal Email */}
            <Modal isOpen={isOpenEmail} onClose={closeEmail}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Ubah Email</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={submitEmail}>
                  <ModalBody pb={6}>
                    <FormControl mt={4}>
                      <FormLabel>Email</FormLabel>
                      <Input
                        type="text"
                        placeholder="Masukkan email"
                        name="email"
                        onChange={userDataHandleChange}
                        // onBlur={""}
                        value={userData.email}
                      />
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      isDisabled={disableEmail}
                      type="submit"
                      colorScheme="blue"
                      mr={3}
                    >
                      Save
                    </Button>
                    <Button type="button" onClick={closeEmail}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </form>
              </ModalContent>
            </Modal>

            {/* Modal Phonenumber */}
            <Modal isOpen={isOpenPhonenumber} onClose={closePhonenumber}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Ubah No. telepon</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={submitPhonenumber}>
                  <ModalBody pb={6}>
                    <FormControl mt={4}>
                      <FormLabel>Nomor</FormLabel>
                      <Input
                        type="text"
                        placeholder="Masukkan nomor telepon"
                        name="phonenumber"
                        onChange={userDataHandleChange}
                        // onBlur={""}
                        value={userData.phonenumber}
                      />
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      isDisabled={disablePhonenumber}
                      type="submit"
                      colorScheme="blue"
                      mr={3}
                    >
                      Save
                    </Button>
                    <Button type="button" onClick={closePhonenumber}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </form>
              </ModalContent>
            </Modal>

            {/* Modal Gender */}
            <Modal isOpen={isOpenGender} onClose={closeGender}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Ubah Gender</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={submitGender}>
                  <ModalBody pb={1}>
                    <RadioGroup defaultValue="2" name="gender">
                      <Stack spacing={5} direction="row">
                        <Radio
                          isChecked={gender === "pria"}
                          onChange={handleInputGender}
                          colorScheme="green"
                          value="pria"
                        >
                          Pria
                        </Radio>
                        <Radio
                          isChecked={gender === "wanita"}
                          onChange={handleInputGender}
                          colorScheme="green"
                          value="wanita"
                        >
                          Wanita
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      isDisabled={disableGender}
                      type="submit"
                      colorScheme="blue"
                      mr={3}
                    >
                      Save
                    </Button>
                    <Button type="button" onClick={closeGender}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </form>
              </ModalContent>
            </Modal>

            {/* Modal Date of Birth */}
            <Modal isOpen={isOpenDOB} onClose={closeDOB}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Ubah Tanggal Lahir</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={submitDOB}>
                  <ModalBody pb={6}></ModalBody>
                  <DatePicker
                    className="ml-6 border-2 border-gray-200 w-[400px] px-2 py-2 rounded-md"
                    name="date_of_birth"
                    dateFormat="dd-MM-yyyy"
                    value={date_of_birth}
                    selected={date_of_birth}
                    onChange={(date) => setinputDOB(date)}
                    disabledKeyboardNavigation
                    placeholderText="Pilih tanggal lahir"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                  />
                  <ModalFooter>
                    <Button
                      isDisabled={disableDOB}
                      type="button"
                      colorScheme="blue"
                      mr={3}
                      onClick={submitDOB}
                    >
                      Save
                    </Button>
                    <Button type="button" onClick={closeDOB}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </form>
              </ModalContent>
            </Modal>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Biodata;
