import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { useSWRInfinite } from "swr";

const PAGE_SIZE = 10;

const fetcher = async (url) => {
  const res = await fetch(url);
  return res.json();
};

const TablePaginationExample = () => {
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null;
    return `/api/data?page=${pageIndex + 1}&pageSize=${PAGE_SIZE}`;
  };

  const { data, error, size, setSize, isValidating } = useSWRInfinite(getKey, fetcher);

  const flattenedData = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === "undefined");
  const      =
    isLoadingMore || (data && data[data.length - 1]?.length < PAGE_SIZE);

  const handleChangePage = (event, newPage) => {
    setSize(newPage + 1);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {flattenedData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        rowsPerPageOptions={[PAGE_SIZE]}
        count={flattenedData.length}
        rowsPerPage={PAGE_SIZE}
        page={size - 1}
        onChangePage={handleChangePage}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} of ${count !== -1 ? count : "more than " + to}`
        }
        labelRowsPerPage=""
        disabled={isLoadingMore || isValidating}
      />
    </TableContainer>
  );
};

export default TablePaginationExample;