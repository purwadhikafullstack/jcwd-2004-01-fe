import PrescriptionUpload from "../components/upload_prescription";
import axios from "axios";
import API_URL from "../helpers/apiurl";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Head from "next/head";

const UploadPrescription = () => {
  const [userAddress, setUserAddress] = useState([]);

  const { isLogin, fullname, profile_picture } = useUser();

  const router = useRouter();

  let token = Cookies.get("token");

  //Get User Address
  const getUserAddress = async () => {
    let res = await axios.get(`${API_URL}/profile/getuseraddresses`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log("ini kedua");
    console.log(res.data);
    setUserAddress([...res.data]);
  };

  //Upload Prescription
  const uploadPrescription = async (values) => {
    try {
      await axios.post(`${API_URL}/transaction/prescriptionupload`, values, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      toast.success("Prescription uploaded!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: { backgroundColor: "#48BB78" },
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
        style: { backgroundColor: "#e85362" },
      });
    }
  };

  useEffect(() => {
    if (!isLogin) {
      router.push("/login");
    } else {
      getUserAddress();
    }
  }, []);

  //LOADING DIBUAT YA

  return (
    <div>
      <Head>
        <title>Unggah Resep | Healthymed</title>
      </Head>
      <PrescriptionUpload
        uploadPrescription={uploadPrescription}
        userAddress={userAddress}
        fullname={fullname}
        profile_picture={profile_picture}
      />
    </div>
  );
};

export default UploadPrescription;
