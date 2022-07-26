import UserTransaction from "../../components/user_transaction";
import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../helpers/apiurl";
import Cookies from "js-cookie";
import useUser from "../../hooks/useUser";
import Head from "next/head";
import PageLoading from "../../components/pageLoading";

const Transaction = () => {
  const { isLogin, fullname } = useUser();
  //Loading
  const [loading, setLoading] = useState(true);

  //UserData
  const [userData, setUserData] = useState({
    fullname: "",
    profile_picture: "",
  });

  //Card Data
  const [cardData, setCardData] = useState([]);

  //Query
  const [page, setPage] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [limit, setLimit] = useState(5);
  const [input, setInput] = useState({
    menunggu: "",
    diproses: "",
    dikirim: "",
    selesai: "",
    dibatalkan: "",
    prescription: "",
    non_prescription: "",
    orderByDate: "",
  });

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setPage(0);
  };

  const updateLimit = (e) => {
    setLimit(parseInt(e.target.value));
  };

  //Get token
  let token = Cookies.get("token");

  //Get Card Data
  const getCardData = async () => {
    try {
      let res = await axios.get(
        `${API_URL}/transaction/get-transaction-user-list?page=${page}&menunggu=${input.menunggu}&diproses=${input.diproses}&dikirim=${input.dikirim}&selesai=${input.selesai}&dibatalkan=${input.dibatalkan}&prescription=${input.prescription}&non%5Fprescription=${input.non_prescription}&orderByDate=${input.orderByDate}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setCardData(res.data);
      setTotalData(res.headers["x-total-product"]);
    } catch (error) {
      console.log(error);
    }
  };

  //Get Fullname and username
  const getUserData = async () => {
    let res = await axios.get(`${API_URL}/profile/getuserprofile`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    setUserData(res.data);
  };

  //Filter
  const clickMenunggu = () => {
    setInput({
      ...input,
      menunggu: true,
      diproses: "",
      dikirim: "",
      selesai: "",
      dibatalkan: "",
      orderByDate: "",
    });
  };
  const clickSemua = () => {
    setInput({
      ...input,
      menunggu: "",
      diproses: "",
      dikirim: "",
      selesai: "",
      dibatalkan: "",
      orderByDate: "",
    });
  };
  const clickDiproses = () => {
    setInput({
      ...input,
      menunggu: "",
      diproses: true,
      dikirim: "",
      selesai: "",
      dibatalkan: "",
      orderByDate: "",
    });
  };
  const clickDikirim = () => {
    setInput({
      ...input,
      menunggu: "",
      diproses: "",
      dikirim: true,
      selesai: "",
      dibatalkan: "",
      orderByDate: "",
    });
  };
  const clickSelesai = () => {
    setInput({
      ...input,
      menunggu: "",
      diproses: "",
      dikirim: "",
      selesai: true,
      dibatalkan: "",
      orderByDate: "",
    });
  };
  const clickDibatalkan = () => {
    setInput({
      ...input,
      menunggu: "",
      diproses: "",
      dikirim: "",
      selesai: "",
      dibatalkan: true,
      orderByDate: "",
    });
  };
  const clickPrescription = () => {
    setInput({
      ...input,
      prescription: true,
      non_prescription: "",
    });
  };
  const clickNonPrescription = () => {
    setInput({
      ...input,
      prescription: "",
      non_prescription: true,
    });
  };
  const clickSemuaJenis = () => {
    setInput({
      ...input,
      prescription: "",
      non_prescription: "",
    });
  };

  useEffect(() => {
    getCardData();
    console.log("masuk sini brodie");
  }, [page, input]);

  useEffect(() => {
    getUserData();
    setLoading(false);
  }, []);

  if (loading) {
    return <PageLoading />;
  }

  return (
    <div>
      <Head>
        <title>Daftar Pemesanan | Healthymed</title>
      </Head>
      <UserTransaction
        userData={userData}
        cardData={cardData}
        page={page}
        totalData={totalData}
        limit={limit}
        setLimit={setLimit}
        updateLimit={updateLimit}
        setPage={setPage}
        handleInput={handleInput}
        clickMenunggu={clickMenunggu}
        clickSemua={clickSemua}
        clickDiproses={clickDiproses}
        clickSemuaJenis={clickSemuaJenis}
        clickDikirim={clickDikirim}
        clickSelesai={clickSelesai}
        clickDibatalkan={clickDibatalkan}
        clickPrescription={clickPrescription}
        clickNonPrescription={clickNonPrescription}
        getCardData={getCardData}
        orderByDate={input.orderByDate}
        fullname={fullname}
      />
    </div>
  );
};

export default Transaction;
