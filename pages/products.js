import MobileHeader from "../components/mobile_header";
import Footer from "../components/footer";
import SearchBar from "../components/searchbar";
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import useUser from "../hooks/useUser";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  Checkbox,
  Input,
  InputLeftAddon,
  InputGroup,
} from "@chakra-ui/react";

const Products = () => {
  const { isLogin, fullname } = useUser();

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="bg-white drop-shadow-lg pb-4">
        <div className="mx-8">
          <MobileHeader
            firstProp={null}
            secondProp={<SearchBar placeholder={"Hayo mau cari apa"} />}
            thirdProp={
              isLogin ? (
                <FaShoppingCart />
              ) : (
                <Button variant={"outlineCustom"} h={"44px"} w={"114px"}>
                  Masuk
                </Button>
              )
            }
            fourthProp={
              isLogin ? (
                <div className="flex items-center gap-2">
                  <FaUserCircle />
                  <div className="text-base">{fullname}</div>
                </div>
              ) : (
                <Button variant={"fillCustom"} h={"44px"} w={"114px"}>
                  Daftar
                </Button>
              )
            }
            classExtend={"hidden lg:flex"}
          />
        </div>
      </div>

      <div className="w-[1244px] h-[2497px] mx-16 pt-10 flex justify-between">
        <div className="w-[300px] h-[60px]">
          {/* Category Menu */}
          <div class="collapse collapse-arrow rounded-box drop-shadow-lg">
            <input type="checkbox" class="peer" />
            <div class="collapse-title text-black bg-white text-[16px] font-bold">
              Kategori
            </div>
            <div class="collapse-content text-black bg-white text-[14px] flex flex-col gap-1 items-start">
              <button>Obat-Obatan</button>
              <button>Nutrisi</button>
              <button>Herbal</button>
              <button>Vitamin & Suplemen</button>
              <button>Alat Kesehatan</button>
              <button>Perawatan Tubuh</button>
              <button>Ibu & Anak</button>
            </div>
          </div>

          {/* Filter */}
          <div className="w-[300px] pb-3 mt-4 rounded-2xl bg-white drop-shadow-lg">
            <div className="px-[44px] py-[20px] border-b-2 border-[#D5D7DD]">
              <Button variant={"fillCustom"} h={"46px"} w={"211px"}>
                Hapus semua filter
              </Button>
            </div>
            {/* Collapse Keluhan */}
            <div class="collapse collapse-arrow border-b-2 border-[#D5D7DD]">
              <input type="checkbox" class="peer" />
              <div class="collapse-title text-black bg-white text-[16px] font-bold">
                Keluhan
              </div>
              <div class="collapse-content text-black bg-white text-[14px] flex flex-col gap-1 items-start">
                <Checkbox>Batuk & Flu</Checkbox>
                <Checkbox>Demam</Checkbox>
                <Checkbox>Imun Booster</Checkbox>
                <Checkbox>Kesehatan Seksual</Checkbox>
                <Checkbox>Mata & Mulut</Checkbox>
                <Checkbox>Obat Diare</Checkbox>
                <Checkbox>Pelancar BAB</Checkbox>
                <Checkbox>Sakit Gigi</Checkbox>
              </div>
            </div>
            {/* Filter Harga */}
            <div class="collapse collapse-arrow border-b-2 border-[#D5D7DD]">
              <input type="checkbox" class="peer" />
              <div class="collapse-title text-black bg-white text-[16px] font-bold">
                Harga
              </div>
              <div class="collapse-content text-black bg-white text-[14px] flex flex-col gap-1 items-start">
                <InputGroup>
                  <InputLeftAddon children="Rp" />
                  <Input type="tel" placeholder="Harga Minimum" />
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon children="Rp" />
                  <Input type="tel" placeholder="Harga Maksimal" />
                </InputGroup>
              </div>
            </div>

            <div class="collapse collapse-arrow border-b-2 border-[#D5D7DD]">
              <input type="checkbox" class="peer" />
              <div class="collapse-title text-black bg-white text-[16px] font-bold">
                Jenis Obat
              </div>
              <div class="collapse-content text-black bg-white text-[14px] flex flex-col gap-1 items-start">
                <Checkbox>Drop</Checkbox>
                <Checkbox>Gel</Checkbox>
                <Checkbox>Strip</Checkbox>
                <Checkbox>Emulsi</Checkbox>
                <Checkbox>Balsem</Checkbox>
                <Checkbox>Cairan</Checkbox>
                <Checkbox>Koyo</Checkbox>
                <Checkbox>Serbuk</Checkbox>
              </div>
            </div>

            <div class="collapse collapse-arrow">
              <input type="checkbox" class="peer" />
              <div class="collapse-title text-black bg-white text-[16px] font-bold">
                Brand Obat
              </div>
              <div class="collapse-content text-black bg-white text-[14px] flex flex-col gap-1 items-start">
                <Checkbox>Miracloven</Checkbox>
                <Checkbox>912</Checkbox>
                <Checkbox>Ovtelis</Checkbox>
                <Checkbox>1001</Checkbox>
                <Checkbox>Dexpain</Checkbox>
                <Checkbox>LVN</Checkbox>
                <Checkbox>Urdex</Checkbox>
                <Checkbox>Sasso</Checkbox>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[900px] h-[2283px]">
          <div className="w-full h-[50px] text-[24px] font-bold border-b-2 border-[#D5D7DD]">
            Obat
          </div>
        </div>
      </div>

      {/* Footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Products;
