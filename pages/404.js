import Link from "next/link";
import PageLoading from "../components/pageLoading";
import { useState, useEffect } from "react";

const NotFound = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <PageLoading />;
  }
  return (
    <div className="w-full h-[620px] bg-[#f9fafc]">
      <div className="flex justify-center">
        <div className="flex flex-col">
          <img className="h-[620px] object-cover" src="/404.jpg" />
          <div className="w-fit text-[24px] font-bold absolute bottom-20">
            Maaf halaman yang kamu tuju tidak ada, kembali ke&nbsp;
            <Link href="/">
              <span className="underline underline-offset-2 hover:cursor-pointer text-blackPrimary hover:text-opacity-60 duration-300">
                beranda
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
