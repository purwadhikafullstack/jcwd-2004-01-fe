import AddAddress from "../components/addAddressForm";
import Footer from "../components/footer";
import Head from "next/head";

const Address = () => {
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
