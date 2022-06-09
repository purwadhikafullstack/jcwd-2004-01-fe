import InputForm from "../components/input_form";
import MobileHeader from "../components/mobile_header";
import { Button } from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { AiFillLock } from "react-icons/ai";
import { BsEyeSlashFill } from "react-icons/bs";
import { BsEyeFill } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

const Register = () => {

    const line = "/Line30.svg"

    return (
       
        <div className="w-[375px] h-[812px] flex flex-col items-center mx-auto">
            <div className="w-[327px]">
                <MobileHeader
                firstProp={<IoIosArrowBack/>}
                classExtend={"w-full"}
                secondPropClassExtend={"white"}/>
            </div>
            
            <div className="w-[327px] text-2xl font-bold lg:hidden">Register</div>
            <div className="w-[327px] text-2xl font-bold hidden lg:inline-block">Mari kita mulai</div>
            <div className="w-[327px] mt-1">Sudah punya akun? <Link href=""><span className="underline hover:cursor-pointer text-teal-500">Masuk</span></Link></div>

            <div className="mt-8">
                <Button w="327px" h="48px" variant={"outlineCustom"} leftIcon={<div className="text-2xl"><FcGoogle/></div>}>Google</Button>
            </div>

            <div className="flex items-center mt-7">
                <div><img src={line} alt=""/></div>
                <div>atau</div>
                <div><img src={line} alt=""/></div>
            </div>

            <div className="mt-7">
                <p className="text-orangeprimary font-bold">Nama</p>
                <InputForm 
                leftIcon={<FaUserCircle/>}
                placeholder={"Username"}
                size={true}/>
            </div>

            <div className="mt-2">
                <p className="text-orangeprimary font-bold">Email</p>
                    <InputForm 
                leftIcon={<FaEnvelope/>}
                placeholder={"Email"}
                size={true}/>
            </div>

            <div className="mt-3">
                <p className="text-orangeprimary font-bold">Password</p>
                <InputForm 
                leftIcon={<AiFillLock/>}
                placeholder={"Password"}
                rightIcon={<BsEyeSlashFill/>}
                altIcon={<BsEyeFill/>}
                size={true}/>
            </div> 

            <div className="flex items-center gap-2 w-[327px] mt-6">
                <input type="checkbox"/>
                <p className="text-sm">Saya setuju dengan <span className="text-orangeprimary">persyaratan</span> dan <span className="text-orangeprimary">ketentuan</span></p>
            </div>

            <div className="w-[327px] py-20">
                <Button w="full" h="48px" variant={"fillCustom"}>Register</Button>
            </div>
        </div>
       
    );
}
 
export default Register;