import { useState } from "react";
import useSWR from "swr";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
} from "@mui/material";
import { Scrollbar } from "../../components/Scrollbar";
import axios from "../../api/axios";
import { useAuthUser } from "react-auth-kit";

const fetcher = ([url, token]) =>
  axios({
    url,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  }).then((res) => res.data);

export const CustomersTable = () => {
  const authUserData = useAuthUser();
  const { authorisation, user } = authUserData();
  const [pageIndex, setPageIndex] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data, error } = useSWR(
    [`/api/admin/hotels?page=${pageIndex}?per-page=${rowsPerPage}`, authorisation.token],
    fetcher,
    { suspense: true }
  );
  const onPageChange = (event, value) => {
    setPageIndex(value);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  if (error)
    return (
      <Typography sx={{ color: "red" }}>Failed to fetch {error.response.data.error}</Typography>
    );

  const isNotDmc = ["account_owner", "hotel_director", "super_admin", "admin"].includes(user.role);
  const isAdmin = ["account_owner", "super_admin", "admin"].includes(user.role);
  const hotels = data.response.data.map(({ id, country, city, name }) => {
    return (
      <TableRow hover key={id}>
        <TableCell padding="checkbox" align="center">
          {id}
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2" align="center">
            {country}
          </Typography>
        </TableCell>
        <TableCell align="center">{city}</TableCell>
        <TableCell align="center">{name}</TableCell>
        <TableCell align="center">{Math.floor(Math.random() * 100000)}</TableCell>
        <TableCell align="center">{Math.floor(Math.random() * 100000)}</TableCell>
        <TableCell align="center">{Math.floor(Math.random() * 100000)}</TableCell>
        <TableCell align="center">{Math.floor(Math.random() * 100000)}</TableCell>
        {/* <TableCell>{contracts}</TableCell>
        <TableCell>{rooms}</TableCell> */}
        {/* {isAdmin && <TableCell align="center">{dmc}</TableCell>} */}
        {/* {isAdmin && <TableCell>{account_owner}</TableCell>} */}

        <TableCell width="70%">
          <Stack direction="row" spacing={1}>
            <Button variant="contained">Manage</Button>
            {isAdmin && <Button variant="contained">Edit</Button>}
            {isAdmin && (
              <Button variant="contained" color="error">
                Archive
              </Button>
            )}
          </Stack>
        </TableCell>
      </TableRow>
    );
  });

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
            <TableBody>{hotels}</TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        rowsPerPageOptions={[10, 25]}
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

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
