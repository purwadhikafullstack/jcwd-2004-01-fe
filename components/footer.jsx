import { IoLogoWhatsapp } from "react-icons/io";
import { FaEnvelope } from "react-icons/fa";
import { CgPhone } from "react-icons/cg";
import { CgFacebook } from "react-icons/cg";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="w-[1349px] h-[480px] bg-white relative">
      <div className="flex justify-between items-center mx-16">
        <div className="flex flex-col mt-16">
          <img src="LogoHealthyMedBW.svg" alt="" />
          <div className="flex items-center gap-5 mt-7">
            <div className="text-5xl text-[#6B6B6B]">
              <IoLogoWhatsapp />
            </div>
            <div className="flex flex-col">
              <div className="text-[14px] font-bold">Chat Whatsapp</div>
              <div className="text-[16px]">+62 12345</div>
            </div>
          </div>
          <div className="flex items-center gap-5 mt-4">
            <div className="text-5xl text-[#6B6B6B]">
              <FaEnvelope />
            </div>
            <div className="flex flex-col">
              <div className="text-[14px] font-bold">Email</div>
              <div className="text-[16px]">contact@healthymed.com</div>
            </div>
          </div>
          <div className="flex items-center gap-5 mt-4">
            <div className="text-5xl text-[#6B6B6B]">
              <CgPhone />
            </div>
            <div className="flex flex-col">
              <div className="text-[14px] font-bold">Call Center</div>
              <div className="text-[16px]">+62 123451313</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col text-[14px] gap-10 mt-16">
          <button className="text-left">Tentang Kami</button>
          <button className="text-left">FAQ</button>
          <button className="text-left">Kebijakan Privasi</button>
          <button className="text-left">Syarat & Ketentuan</button>
          <button className="text-left">Karir</button>
        </div>
        <div className="flex flex-col text-[14px] gap-10">
          <button className="text-left">Blog</button>
          <button className="text-left">Cara Belanja</button>
          <button className="text-left">Promo</button>
          <button className="text-left">Diagnosis</button>
        </div>
        <div className="flex flex-col text-[14px]">
          <div className="text-[24px] font-bold">Ikuti Kami</div>
          <div className="flex items-center gap-3 mt-6">
            <div className="text-3xl text-[#6B6B6B]">
              <CgFacebook />
            </div>
            <div className="font-bold">Facebook</div>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <div className="text-3xl text-[#6B6B6B]">
              <AiOutlineTwitter />
            </div>
            <div className="font-bold">Twitter</div>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <div className="text-3xl text-[#6B6B6B]">
              <AiFillInstagram />
            </div>
            <div className="font-bold">Instagram</div>
          </div>
        </div>
      </div>
      <div className="w-[1349px] h-[100px] absolute bottom-0 bg-[#F7F7F7]"></div>
    </div>
  );
};

export default Footer;
