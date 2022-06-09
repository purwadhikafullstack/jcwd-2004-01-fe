import { AiFillHome } from "react-icons/ai";
import { GiMedicines } from "react-icons/gi";
import { BsHeadset } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi";

const MobileNavbar = () => {

    return (
        <div className="container-mobile-navbar lg:hidden">
            <button className="button-mobile-navbar">
                <div><AiFillHome/></div>
                <div className="button-text-mobile-navbar">Beranda</div>
            </button>
            <button className="button-mobile-navbar">
                <div><GiMedicines/></div>
                <div className="button-text-mobile-navbar">Kategori</div>
            </button>
            <button className="button-mobile-navbar">
                <div><HiDocumentText/></div>
                <div className="button-text-mobile-navbar">Transaksi</div>
            </button>
            <button className="button-mobile-navbar">
                <div><BsHeadset/></div>
                <div className="button-text-mobile-navbar">Bantuan</div>
            </button>
            <button className="button-mobile-navbar">
                <div><FaUserCircle/></div>
                <div className="button-text-mobile-navbar">Profile</div>
            </button>
        </div>
    );
}
 
export default MobileNavbar;