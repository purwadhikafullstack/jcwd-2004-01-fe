// react icon
import { IoNotificationsSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import Cookies from "js-cookie";
//lib

const NavbarAdminTop = () => {
  const {
    isOpen: isOpenLogout,
    onOpen: onOpenLogout,
    onClose: onCloseLogout,
  } = useDisclosure();

  //Logout
  const router = useRouter();
  const dispatch = useDispatch();
  const logout = () => {
    Cookies.remove("token");
    dispatch({ type: "LOGOUT" });
    router.push("/");
    onCloseLogout();
  };
  return (
    <>
      <div className="flex-row w-full bg-white h-16 drop-shadow-md sticky">
        <div className="flex justify-end mr-8">
          <BiLogOut
            onClick={onOpenLogout}
            className="w-8 mt-6 hover:cursor-pointer text-blackPrimary"
          />
          <IoNotificationsSharp className="w-8 mt-6 hover:cursor-pointer text-blackPrimary" />
          <FaUserCircle className="w-8 mt-6 hover:cursor-pointer text-blackPrimary" />
        </div>

        {/* Modal Logout */}
        <Modal isOpen={isOpenLogout} onClose={onCloseLogout}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Keluar</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div>Apakah anda yakin untuk keluar?</div>
            </ModalBody>

            <ModalFooter>
              <Button variant="fillCustom" mr={3} onClick={onCloseLogout}>
                Batal
              </Button>
              <Button
                onClick={() => {
                  logout();
                }}
                variant="outlineCustom"
              >
                Ya
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default NavbarAdminTop;
