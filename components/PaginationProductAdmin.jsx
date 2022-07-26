import { Select } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const PaginationProductAdmin = ({
  page,
  totalData,
  limit,
  updateLimit,
  pageChangeHandler,
  isAdmin,
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  let totalPage = Math.ceil(totalData / limit);

  const [pageFirstRecord, setPageFirstRecord] = useState(1);
  const [pageLastRecord, setPageLastRecord] = useState(limit);

  const onNextPage = () => setCurrentPage(currentPage + 1);
  const onPrevPage = () => setCurrentPage(currentPage - 1);
  const onPageSelect = (page) => setCurrentPage(page);

  const [pagination, setPagination] = useState([]);
  const [disabledPage, setDisabledPage] = useState([]);

  const PaginationBar = () => {
    if (totalPage < 6) {
      if (totalPage == 1) {
        let page = [1];
        setPagination([...page]);
      } else if (totalPage == 2) {
        let page = [1, 2];
        setPagination([...page]);
      } else if (totalPage == 3) {
        let page = [1, 2, 3];
        setPagination([...page]);
      } else if (totalPage == 4) {
        let page = [1, 2, 3, 4];
        setPagination([...page]);
      } else if (totalPage == 5) {
        let page = [1, 2, 3, 4, 5];
        setPagination([...page]);
      }
    } else {
      if (currentPage <= 2) {
        let page = [1, 2, 3, "...", totalPage];
        setPagination([...page]);
      } else if (2 < currentPage && currentPage < totalPage - 3) {
        setPagination([...[1, "...", currentPage + 1, "...", totalPage]]);
      } else if (currentPage >= totalPage - 3) {
        setPagination([...[1, "...", totalPage - 2, totalPage - 1, totalPage]]);
      }
    }
  };

  useEffect(() => {
    const skipFactor = currentPage * limit;
    pageChangeHandler(currentPage);
    setPageFirstRecord(skipFactor + 1);
    PaginationBar();
  }, [currentPage, limit, totalData]);

  useEffect(() => {
    const count = pageFirstRecord + limit;
    setPageLastRecord(count > totalData ? totalData : count - 1);
    console.log("page first & data & total");
  }, [pageFirstRecord, limit, totalData]);

  return (
    <>
      {totalPage >= 1 ? (
        <div className="flex text-sm items-center justify-between mx-5">
          <div>
            <p>
              Menampilkan {pageFirstRecord} - {pageLastRecord} dari {totalData}
              &nbsp;
            </p>
          </div>
          {isAdmin ? (
            <div className="flex items-center  w-[200px]">
              <p>Baris per halaman</p>
              <Select
                focusBorderColor="blackPrimary"
                w="70px"
                ml="10px"
                value={limit}
                onChange={(e) => {
                  updateLimit(e), setCurrentPage(0);
                }}
              >
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </Select>
            </div>
          ) : null}
          <div className="flex">
            <button
              onClick={onPrevPage}
              disabled={currentPage === 0}
              className="cursor-pointer"
            >
              <IoIosArrowBack />
            </button>
            <div className="flex ">
              {pagination.map((val, index) => {
                return (
                  <div className="flex" key={index}>
                    {val == currentPage + 1 ? (
                      <button className="w-[26px] shadow-md text-white text-sm p-1 font-semibold rounded-full bg-blackPrimary mx-1">
                        {val}
                      </button>
                    ) : (
                      <button
                        key={index}
                        onClick={() => onPageSelect(val - 1)}
                        className="w-[28px] text-sm  text-slate-500 font-semibold mx-1"
                      >
                        {val}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
            <button
              onClick={onNextPage}
              disabled={totalPage - 1 === currentPage}
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PaginationProductAdmin;
