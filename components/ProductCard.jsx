import { Box } from "@chakra-ui/react";
import {
  useMediaQuery,
  Center,
  Button,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";
import API_URL from "../helpers/apiurl";

const ProductCard = ({
  variant,
  imageUrl,
  imageAlt,
  title,
  discount,
  originalPrice,
  formattedPrice,
  unit,
  id,
}) => {
  const [lg] = useMediaQuery("(min-width: 1024px)");
  const router = useRouter();
  let token = Cookies.get("token");
  const toast = useToast();

  console.log(id, "ini id");

  const buyHandler = async () => {
    try {
      if (!token) {
        router.push("/login");
        throw "You Need to Login!";
      } else {
        let response = await axios.post(
          `${API_URL}/product/input-cart`,
          { product_id: id, quantity: 1 },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        toast({
          title: "success!",
          description: response.data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
      router.push("/cart");
    } catch (error) {
      console.log(error);
      toast({
        title: "error",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  switch (variant) {
    case "discount":
      return (
        <>
          {lg ? (
            <Box
              w="194px"
              h="331px"
              rounded="2xl"
              className="relative"
              display="flex"
              flexDirection="column"
              position="relative"
              shadow="lg"
              bg="white"
            >
              {/* image */}
              <Link href={`/produk/${id}`}>
                <div className="w-[114px] h-[114px] relative overflow-hidden mx-auto hover:cursor-pointer">
                  <img
                    src={imageUrl}
                    alt={imageAlt}
                    layout="fill"
                    objectfit="cover"
                  />
                </div>
              </Link>
              {/* like button */}
              <div className="absolute top-4 right-4">
                <div className="flex justify-center w-[44px] h-[44px] rounded-full shadow-gray-100 bg-white shadow-md hover:cursor-pointer">
                  <FaHeart className="text-gray-300 mt-4" />
                </div>
              </div>

              {/* Title */}
              <div className="absolute top-40 left-5 right-5">
                <p className="font-sans text-sm font-bold text-blackPrimary">
                  {title}
                </p>
              </div>
              {/* Discount */}
              <div className="flex absolute top-[207px] left-5">
                <div className="border-[1px] border-[#FF6B6B] w-9 h-6 rounded-md flex justify-center">
                  <p className="text-xs font-bold text-[#FF6B6B] mt-[2px]">
                    17%
                  </p>
                </div>
                {/* Original Price */}
                <p className="text-gray-400 font-normal line-through text-sm ml-3">
                  {originalPrice}
                </p>
              </div>
              {/* Price/unit */}
              <div className="flex absolute left-5 top-[238px] justify-between text-blackPrimary text-base">
                <p className="font-bold">{formattedPrice}</p>
                <p className="font-normal">/{unit}</p>
              </div>
              {/* Button */}
              <Button
                variant="outlineCustom"
                width="139px"
                height="30px"
                mx="auto"
                bottom="24px"
                left="0px"
                right="0px"
                position="absolute"
                fontSize="12px"
                onClick={() => buyHandler()}
              >
                Keranjang
              </Button>
            </Box>
          ) : (
            <Box
              w="121px"
              h="253px"
              rounded="2xl"
              className="relative"
              display="flex"
              flexDirection="column"
              position="relative"
              shadow="lg"
            >
              {/* image */}
              <Link href={`/produk/${id}`}>
                <div className="w-[70px] h-[70px] relative overflow-hidden mx-auto hover:cursor-pointer">
                  <img
                    src={imageUrl}
                    alt={imageAlt}
                    layout="fill"
                    objectfit="cover"
                  />
                </div>
              </Link>
              {/* like button */}
              <div className="absolute top-3 right-3">
                <div className="flex justify-center w-[28px] h-[28px] rounded-full shadow-gray-100 bg-white shadow-md hover:cursor-pointer">
                  <FaHeart className="text-gray-300 mt-2 text-sm" />
                </div>
              </div>

              {/* Title */}
              <div className="absolute top-[88px] w-[105px] h-[34px] left-2 right-2">
                <Tooltip label={title} fontSize="xs" placement="top">
                  <p className="font-sans text-[12px] line-clamp-2 font-bold text-blackPrimary">
                    {title}
                  </p>
                </Tooltip>
              </div>
              {/* Discount */}
              <div className="flex absolute top-[130px] left-2">
                <div className="border-[1px] border-[#FF6B6B] w-7 h-[21px] rounded-md flex justify-center">
                  <p className="text-[8px] font-bold text-[#FF6B6B] mt-[3.5px]">
                    17%
                  </p>
                </div>
                {/* Original Price */}
                <p className="text-gray-400 font-normal line-through text-[10px] ml-3">
                  {originalPrice}
                </p>
              </div>
              {/* Price/unit */}
              <div className="flex absolute w-[28px] h-[28px] left-2 top-[155px] justify-between text-blackPrimary text-sm">
                <span className="font-bold">
                  {formattedPrice}
                  <p className="font-normal text-[10px]">/{unit}</p>
                </span>
              </div>
              {/* Button */}
              <Button
                variant="outlineCustom"
                width="105px"
                height="32px"
                mx="auto"
                bottom="14px"
                left="0px"
                right="0px"
                position="absolute"
                fontSize="10px"
                fontWeight="bold"
                onClick={() => buyHandler()}
              >
                Keranjang
              </Button>
            </Box>
          )}
        </>
      );
    case "popular":
      return (
        <>
          {lg ? (
            <Box
              w="195px"
              h="331px"
              rounded="2xl"
              className="relative"
              display="flex"
              flexDirection="column"
              position="relative"
              shadow="lg"
              bg="white"
            >
              {/* image */}
              <Link href={`/produk/${id}`}>
                <div className="w-[114px] h-[114px] relative overflow-hidden mx-auto hover:cursor-pointer">
                  <img
                    src={imageUrl}
                    alt={imageAlt}
                    layout="fill"
                    objectfit="cover"
                  />
                </div>
              </Link>
              {/* like button */}
              <div className="absolute top-4 right-4">
                <div className="flex justify-center w-[44px] h-[44px] rounded-full shadow-gray-100 bg-white shadow-md hover:cursor-pointer">
                  <FaHeart className="text-gray-300 mt-4" />
                </div>
              </div>

              {/* Title */}
              <div className="absolute top-40 left-5 right-5">
                <p className="font-sans text-sm font-bold text-blackPrimary">
                  {title}
                </p>
              </div>
              {/* Discount */}
              <div className="flex absolute top-[207px] left-5">
                <div className="border-[1px] border-[#FF6B6B] w-9 h-6 rounded-md flex justify-center">
                  <p className="text-xs font-bold text-[#FF6B6B] mt-[2px]">
                    17%
                  </p>
                </div>
                {/* Original Price */}
                <p className="text-gray-400 font-normal line-through text-sm ml-3">
                  {originalPrice}
                </p>
              </div>
              {/* Price/unit */}
              <div className="flex absolute left-5 top-[238px] justify-between w-[155px] text-blackPrimary text-base">
                <p className="font-bold">{formattedPrice}</p>
                <p className="font-normal">/{unit}</p>
              </div>
              {/* Button */}
              <Button
                variant="outlineCustom"
                width="139px"
                height="30px"
                mx="auto"
                bottom="24px"
                left="0px"
                right="0px"
                position="absolute"
                fontSize="12px"
                onClick={() => buyHandler()}
              >
                Keranjang
              </Button>
            </Box>
          ) : (
            <Box
              w="140px"
              h="245px"
              rounded="2xl"
              className="relative"
              display="flex"
              flexDirection="column"
              position="relative"
              shadow="lg"
            >
              {/* image */}
              <Link href={`/produk/${id}`}>
                <div className="w-[70px] h-[70px] relative overflow-hidden mx-auto hover:cursor-pointer">
                  <img
                    src={imageUrl}
                    alt={imageAlt}
                    layout="fill"
                    objectfit="cover"
                  />
                </div>
              </Link>
              {/* like button */}
              <div className="absolute top-3 right-3">
                <div className="flex justify-center w-[28px] h-[28px] rounded-full shadow-gray-100 bg-white shadow-md hover:cursor-pointer">
                  <FaHeart className="text-gray-300 mt-2 text-sm" />
                </div>
              </div>

              {/* Title */}
              <div className="absolute top-[98px] w-[105px] h-[34px] left-3 right-3">
                <Tooltip label={title} fontSize="xs" placement="top">
                  <p className="font-sans text-[12px] line-clamp-2 font-bold text-blackPrimary">
                    {title}
                  </p>
                </Tooltip>
              </div>
              {/* Discount */}
              <div className="flex absolute top-[140px] left-3">
                <div className="border-[1px] border-[#FF6B6B] w-7 h-[21px] rounded-md flex justify-center">
                  <p className="text-[8px] font-bold text-[#FF6B6B] mt-[3.5px]">
                    17%
                  </p>
                </div>
                {/* Original Price */}
                <p className="text-gray-400 font-normal line-through text-[10px] ml-3">
                  {originalPrice}
                </p>
              </div>
              {/* Price/unit */}
              <div className="flex absolute w-[28px] h-[28px] left-3 top-[165px] justify-between text-blackPrimary text-sm">
                <p className="font-bold">{formattedPrice}</p>
                <p className="font-normal text-[10px]">/{unit}</p>
              </div>
              {/* Button */}
              <Button
                variant="outlineCustom"
                width="105px"
                height="32px"
                mx="auto"
                bottom="12px"
                left="0px"
                right="0px"
                position="absolute"
                fontSize="10px"
                fontWeight="bold"
                onClick={() => buyHandler()}
              >
                Keranjang
              </Button>
            </Box>
          )}
        </>
      );
    case "list":
      return (
        <>
          {lg ? (
            <Box
              w="213px"
              h="331px"
              rounded="2xl"
              className="relative"
              display="flex"
              flexDirection="column"
              position="relative"
              shadow="lg"
              bg="white"
            >
              {/* image */}
              <Link href={`/produk/${id}`}>
                <div className="w-[114px] h-[114px] relative overflow-hidden mx-auto hover:cursor-pointer">
                  <img
                    src={imageUrl}
                    alt={imageAlt}
                    layout="fill"
                    objectfit="cover"
                  />
                </div>
              </Link>
              {/* like button */}
              <div className="absolute top-4 right-4">
                <div className="flex justify-center w-[44px] h-[44px] rounded-full shadow-gray-100 bg-white shadow-md hover:cursor-pointer">
                  <FaHeart className="text-gray-300 mt-4" />
                </div>
              </div>

              {/* Title */}
              <div className="absolute top-40 left-6 right-6">
                <p className="font-sans text-sm font-bold text-blackPrimary">
                  {title}
                </p>
              </div>
              {/* Discount */}
              <div className="flex absolute top-[207px] left-6">
                <div className="border-[1px] border-[#FF6B6B] w-9 h-6 rounded-md flex justify-center">
                  <p className="text-xs font-bold text-[#FF6B6B] mt-[2px]">
                    17%
                  </p>
                </div>
                {/* Original Price */}
                <p className="text-gray-400 font-normal line-through text-sm ml-3">
                  {originalPrice}
                </p>
              </div>
              {/* Price/unit */}
              <div className="flex absolute w-[165px] left-6 top-[238px] justify-between text-blackPrimary text-base">
                <p className="font-bold">{formattedPrice}</p>
                <p className="font-normal">/{unit}</p>
              </div>
              {/* Button */}
              <Button
                variant="outlineCustom"
                width="165px"
                height="32px"
                mx="auto"
                bottom="24px"
                left="0px"
                right="0px"
                position="absolute"
                fontSize="12px"
                onClick={() => buyHandler()}
              >
                Keranjang
              </Button>
            </Box>
          ) : (
            <Box
              w="158px"
              h="247px"
              rounded="2xl"
              className="relative"
              display="flex"
              flexDirection="column"
              position="relative"
              shadow="lg"
              bg="white"
            >
              {/* image */}
              <Link href={`/produk/${id}`}>
                <div className="w-[70px] h-[70px] relative overflow-hidden mx-auto hover:cursor-pointer">
                  <img
                    src={imageUrl}
                    alt={imageAlt}
                    layout="fill"
                    objectfit="cover"
                  />
                </div>
              </Link>
              {/* like button */}
              <div className="absolute top-3 right-3">
                <div className="flex justify-center w-[28px] h-[28px] rounded-full shadow-gray-100 bg-white shadow-md hover:cursor-pointer">
                  <FaHeart className="text-gray-300 mt-2 text-sm" />
                </div>
              </div>

              {/* Title */}
              <div className="absolute top-[98px] w-[105px] h-[34px] left-3 right-3">
                <Tooltip label={title} fontSize="xs" placement="top">
                  <p className="font-sans text-[12px] line-clamp-2 font-bold text-blackPrimary">
                    {title}
                  </p>
                </Tooltip>
              </div>
              {/* Discount */}
              <div className="flex absolute top-[140px] left-3">
                <div className="border-[1px] border-[#FF6B6B] w-7 h-[21px] rounded-md flex justify-center">
                  <p className="text-[8px] font-bold text-[#FF6B6B] mt-[3.5px]">
                    17%
                  </p>
                </div>
                {/* Original Price */}
                <p className="text-gray-400 font-normal line-through text-[10px] ml-3">
                  {originalPrice}
                </p>
              </div>
              {/* Price/unit */}
              <div className="flex absolute w-[134px] h-[28px] left-3 top-[165px] justify-between text-blackPrimary text-sm">
                <p className="font-bold">{formattedPrice}</p>
                <p className="font-normal text-[10px]">/{unit}</p>
              </div>
              {/* Button */}
              <Button
                variant="outlineCustom"
                width="134px"
                height="36px"
                mx="auto"
                bottom="14px"
                left="0px"
                right="0px"
                position="absolute"
                fontSize="10px"
                fontWeight="bold"
                onClick={() => buyHandler()}
              >
                Keranjang
              </Button>
            </Box>
          )}
        </>
      );
  }
};

export default ProductCard;
