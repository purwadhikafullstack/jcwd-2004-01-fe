import {
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Button,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spinner,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { GoSearch } from "react-icons/go";
import { HiOutlineDownload, HiOutlineDotsVertical } from "react-icons/hi";
import { debounce } from "lodash";
import DetailTableObat from "./DetailTableObat";
import ModalInputDrugs from "./ModalInputProduct";
import { useState, useMemo, useCallback, useEffect } from "react";
import PaginationProductAdmin from "./PaginationProductAdmin";
import API_URL from "../helpers/apiurl";
import axios from "axios";
import Link from "next/link";

const MedicineTable = () => {
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [input, setInput] = useState({
    search: "",
    category: "",
    order: "",
  });
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [component, setComponent] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(data, "inidata");

  const Categories = ({ val }) => {
    return (
      <div className="overflow-y-hidden scrollbar-hide">
        {val.map((category, i) => {
          return (
            <>
              <span
                key={i}
                className="bg-blackPrimary w-fit text-white font-semibold capitalize py-1 px-2 mr-1 text-sm rounded-xl"
              >
                {category.name}
              </span>
            </>
          );
        })}
      </div>
    );
  };

  const DeleteButton = ({ val }) => {
    const deleteProductHandler = async () => {
      try {
        let response = await axios.patch(
          `${API_URL}/product/delete-product?id=${val}`
        );
        toast({
          title: "success!",
          description: response.data.message || "product deleted!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        console.log(response);
      } catch (error) {
        console.log(error);
        toast({
          title: "error",
          description: error.response.data.message || "network error",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      } finally {
        debounceAll();
      }
    };

    const {
      isOpen: isOpenDelete,
      onOpen: onOpenDelete,
      onClose: onCloseDelete,
    } = useDisclosure();

    return (
      <div className="flex items-center">
        <Link href={`detailproduct/${val}`}>
          <Button variant="outlineCustom" w="80px" h="20px" fontSize="xs">
            Lihat Detail
          </Button>
        </Link>
        <Menu>
          <MenuButton>
            <HiOutlineDotsVertical className="hover:cursor-pointer h-[20px] w-[20px]" />
          </MenuButton>
          <MenuList>
            <MenuItem textColor="red.500" onClick={onOpenDelete}>
              Delete
            </MenuItem>
            <Link href={`detailproduct/${val}`}>
              <MenuItem>Edit</MenuItem>
            </Link>
            <MenuItem>Close</MenuItem>
          </MenuList>
        </Menu>
        {/* Modal */}
        <Modal isOpen={isOpenDelete} onClose={onCloseDelete}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Keluar</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div>Apakah anda yakin untuk hapus produk yang anda pilih?</div>
            </ModalBody>

            <ModalFooter>
              <Button variant="fillCustom" mr={3} onClick={onCloseDelete}>
                Batal
              </Button>
              <Button
                onClick={() => {
                  deleteProductHandler();
                  onCloseDelete();
                }}
                variant="outlineCustom"
              >
                Ya
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    );
  };

  const columns = useMemo(() => [
    {
      Header: "No",
      accessor: "num",
      isNumeric: true,
    },
    {
      Header: "Nama Obat",
      accessor: "name",
    },
    {
      Header: "No Obat",
      accessor: "no_obat",
    },
    {
      Header: "No BPOM",
      accessor: "no_bpom",
    },
    {
      Header: "Kategori",
      accessor: "categories",
      Cell: ({ cell: { value } }) => <Categories val={value} />,
    },
    {
      Header: "Stok",
      accessor: "total_stock",
      isNumeric: true,
    },
    {
      Header: "Satuan",
      accessor: "unit",
    },
    {
      Header: "Nilai Barang",
      accessor: "original_price",
    },
    {
      Header: "Nilai Jual",
      accessor: "price",
    },
    {
      Header: "Atur",
      // accessor: "id",
      Cell: (data) => <DeleteButton val={data.row.original.id} />,
    },
  ]);

  const updateLimit = (e) => {
    setLimit(parseInt(e.target.value));
  };

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setPage(0);
    // console.log(input);
  };

  const getComponent = async () => {
    let response = await axios.get(`${API_URL}/product/get-category`);
    setComponent([...response.data]);

    // console.log(comp, "inicom");
  };

  const getDaftarProduk = async (page, input, limit, cb) => {
    let response = await axios.get(
      `${API_URL}/product/get-all-product?page=${page}&limit=${limit}&search=${input.search}&category=${input.category}&orderName=${input.order}`
    );
    console.log(response);
    cb(response);
  };

  //http://localhost:5000/product/get-all-product?search=&page=&category=&orderName=&orderPrice=DESC

  const debouncedFetchData = useCallback(
    debounce((page, input, limit, cb) => {
      getDaftarProduk(page, input, limit, cb);
    }, 100),
    []
  );

  useEffect(() => {
    getComponent();
    setLoading(false);
  }, []);

  const debounceAll = () => {
    debouncedFetchData(page, input, limit, (response) => {
      setTotalData(parseInt(response.headers["x-total-product"]));
      setData([...response.data]);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    debounceAll();
  }, [page, input, limit]);

  return (
    <>
      <div className="shadow-xl rounded-lg w-[72.6%] h-[78vh] ml-80 mt-[19px]">
        <div className="flex border-0 border-slate-900 h-[42px] justify-between mx-4">
          <div className="flex gap-4 mt-4">
            <InputGroup w="328px" h="42px">
              <Input
                placeholder="Cari nama obat"
                focusBorderColor="blackPrimary"
                name="search"
                value={input.search}
                onChange={(e) => handleInput(e)}
              />
              <InputRightElement>
                <GoSearch />
              </InputRightElement>
            </InputGroup>
            <Select
              w="156px"
              h="42px"
              focusBorderColor="blackPrimary"
              placeholder="Filter"
              name="category"
              value={input.category}
              onChange={(e) => handleInput(e)}
            >
              <option value="">All</option>
              {component.map(({ id, name }) => {
                return (
                  <option value={id} key={id}>
                    {name}
                  </option>
                );
              })}
            </Select>
            <Select
              w="156px"
              h="42px"
              focusBorderColor="blackPrimary"
              placeholder="Sort"
              name="order"
              value={input.order}
              onChange={(e) => handleInput(e)}
            >
              <option value="ASC">A-Z</option>
              <option value="DESC">Z-A</option>
            </Select>
          </div>
          <Button
            onClick={onOpen}
            variant="fillCustom"
            leftIcon={<HiOutlineDownload />}
            fontSize="12px"
            fontWeight="700"
            w="159px"
            h="42px"
            mt="16px"
          >
            Tambah Obat
          </Button>
        </div>
        <ModalInputDrugs
          isOpen={isOpen}
          onClose={onClose}
          debounceAll={debounceAll}
        />
        <DetailTableObat columns={columns} data={data} isLoading={isLoading} />
        <div className="mt-[10px]">
          <PaginationProductAdmin
            page={page}
            totalData={totalData}
            limit={limit}
            setLimit={setLimit}
            updateLimit={updateLimit}
            pageChangeHandler={setPage}
            isAdmin={true}
          />
        </div>
      </div>
    </>
  );
};

export default MedicineTable;
