import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  SkeletonText,
  Spinner,
} from "@chakra-ui/react";

import { FaSort } from "react-icons/fa";
import { useSortBy, useTable } from "react-table";

const TableLog = ({ columns, data, isLoading }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data, manualPagination: true }, useSortBy);

  const arrayKosong = [...new Array(10)];

  return (
    <div className="mt-[25px]">
      {!data ? (
        <Spinner />
      ) : (
        <TableContainer
          rounded="lg"
          minH="355px"
          maxH="355px"
          overflowY="auto"
          className="scrollbar-thin scroll scrollbar-thumb-blackPrimary scrollbar-track-slate-300 scrollbar-thumb-rounded-full scrollbar-track-rounded-full mx-12"
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
                      <div className="flex justify-center">
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
                        textAlign="center"
                        className="truncate"
                        isNumeric={cell.column.isNumeric}
                        key={i}
                      >
                        {!isLoading ? <>{cell.render("Cell")}</> : <Spinner />}
                      </Td>
                    ))}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default TableLog;
