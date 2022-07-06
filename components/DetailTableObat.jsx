import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  SkeletonText,
} from "@chakra-ui/react";

import { FaSort } from "react-icons/fa";
import { useSortBy, useTable } from "react-table";

const DetailTableObat = ({ columns, data, isLoading }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data, manualPagination: true }, useSortBy);

  const arrayKosong = [...new Array(10)];

  return (
    <div className="mt-[25px]">
      <TableContainer
        rounded="lg"
        className="scrollbar-thin scroll scrollbar-thumb-blackPrimary scrollbar-track-slate-300 overflow-y-scroll 
        scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
      >
        <Table
          {...getTableProps()}
          variant="striped"
          colorScheme="blackAlpha"
          size="sm"
        >
          <Thead>
            {headerGroups.map((headerGroups, i) => (
              <Tr
                {...headerGroups.getHeaderGroupProps()}
                backgroundColor="blackPrimary"
                key={i}
              >
                {headerGroups.headers.map((column, i) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    textTransform={"capitalize"}
                    textColor={"white"}
                    isNumeric={column.isNumeric}
                    className="truncate"
                    key={i}
                  >
                    <div className="flex jus">
                      {column.render("Header")}
                      <FaSort />
                    </div>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} key={i}>
                  {row.cells.map((cell, i) => (
                    <Td
                      {...cell.getCellProps()}
                      maxWidth="200px"
                      className="truncate"
                      isNumeric={cell.column.isNumeric}
                      key={i}
                    >
                      {!isLoading ? (
                        <>{cell.render("Cell")}</>
                      ) : (
                        <SkeletonText noOfLines={1} mt={2} mb={1} />
                      )}
                    </Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DetailTableObat;
