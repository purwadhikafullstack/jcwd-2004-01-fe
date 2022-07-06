import PrescriptionUpload from "../components/upload_prescription";
import axios from "axios";
import API_URL from "../helpers/apiurl";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const UploadPrescription = () => {
  const [userAddress, setUserAddress] = useState([]);

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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserAddress();
  }, []);

  return (
    <div>
      <PrescriptionUpload
        uploadPrescription={uploadPrescription}
        userAddress={userAddress}
      />
    </div>
  );
};

export default UploadPrescription;
