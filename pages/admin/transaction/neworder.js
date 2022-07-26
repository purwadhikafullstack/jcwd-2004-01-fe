import NewOrderTransaction from "../../../components/transaction_neworder";
import NavbarAdmin from "../../../components/NavbarAdmin";
import NavbarAdminTop from "../../../components/NavbarAdminTop";
import PageLoading from "../../../components/pageLoading";
import { useEffect, useState } from "react";

const NewOrder = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <PageLoading />;
  }
  return (
    <>
      {/* navbar admin */}
      <div className="fixed top-0 left-0 bottom-0 z-20">
        <NavbarAdmin />
      </div>
      <div className="fixed top-0 right-0 left-0 z-10">
        <NavbarAdminTop />
      </div>

      <NewOrderTransaction />
    </>
  );
};

export default NewOrder;
