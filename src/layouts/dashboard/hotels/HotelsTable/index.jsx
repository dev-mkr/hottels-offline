import { useState } from "react";
import useSWR from "swr";

import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "src/api/axios";
import { useAuthUser } from "react-auth-kit";
//components
import { Scrollbar } from "src/components/Scrollbar";
import HotellsTableCells from "./components/HotelsTableCells";

const fetcher = ([url, token]) =>
  axios({
    url,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  }).then((res) => res.data);

export const HotelsTable = () => {
  const authUserData = useAuthUser();
  const { authorisation, user } = authUserData();
  const isNotDmc = ["account_owner", "hotel_director", "super_admin", "admin"].includes(user.role);
  const isAdmin = ["account_owner", "super_admin", "admin"].includes(user.role);

  const [pageIndex, setPageIndex] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data, error, mutate } = useSWR(
    [
      `/api/${isNotDmc ? "admin" : "dmc"}/hotels?page=${pageIndex}&per-page=${rowsPerPage}`,
      authorisation.token,
    ],
    fetcher,
    { suspense: true }
  );
  const onPageChange = (event, value) => {
    setPageIndex(value);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageIndex(1);
  };
  if (error)
    return (
      <Typography sx={{ color: "red" }}>Failed to fetch {error.response.data.error}</Typography>
    );

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" align="center">
                  S/N
                </TableCell>
                <TableCell align="center">Country</TableCell>
                <TableCell align="center">City</TableCell>
                <TableCell align="center">Hotel</TableCell>
                <TableCell align="center">Contracts</TableCell>
                <TableCell align="center">Rooms</TableCell>
                {isNotDmc && <TableCell align="center">Dmc’s</TableCell>}
                {isAdmin && <TableCell align="center">Direct</TableCell>}
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <HotellsTableCells
                hotels={data.response.data}
                token={authorisation.token}
                isAdmin={isAdmin}
                isNotDmc={isNotDmc}
                mutate={mutate}
                userId={user.id}
              />
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={data.response.meta.total}
        onPageChange={onPageChange}
        page={pageIndex}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
};
