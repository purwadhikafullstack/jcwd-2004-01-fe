import AddAddress from "../components/addAddressForm";
import Footer from "../components/footer";
import Head from "next/head";
import PageLoading from "../components/pageLoading";
import { useState, useEffect } from "react";

const Address = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <PageLoading />;
  }
  return (
    <div>
      <Head>
        <title>Tambah Alamat Pengiriman | Healthymed</title>
      </Head>
      <div className="pb-44">
        <AddAddress />
      </div>
      <div className="hidden lg:inline">
        <Footer />
      </div>
    </div>
  );
};

export default Address;
