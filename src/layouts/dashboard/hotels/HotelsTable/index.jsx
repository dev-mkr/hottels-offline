import { useState, lazy } from "react";
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
import axios from "src/api/axios";
import { useAuthUser } from "react-auth-kit";
//components
import { Scrollbar } from "src/components/Scrollbar";
import { Link } from "react-router-dom";
import DeleteHotel from "../DeleteHotel";
const EditHotel = lazy(() => import("../EditHotel"));
const HotelDmcPopover = lazy(() => import("../HotelDmcPopover"));

const fetcher = ([url, token]) =>
  axios({
    url,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  }).then((res) => res.data);

export const HotelsTable = () => {
  const authUserData = useAuthUser();
  const { authorisation, user } = authUserData();
  const [pageIndex, setPageIndex] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data, error, mutate } = useSWR(
    [`/api/admin/hotels?page=${pageIndex}?per-page=${rowsPerPage}`, authorisation.token],
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

  const isNotDmc = ["account_owner", "hotel_director", "super_admin", "admin"].includes(user.role);
  const isAdmin = ["account_owner", "super_admin", "admin"].includes(user.role);

  const hotels = data.response.data.map((props) => {
    const { id, country, city, name } = props;
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
        <TableCell align="center" name="contracts">
          {Math.floor(Math.random() * 100000)}
        </TableCell>
        <TableCell align="center" name="rooms">
          {Math.floor(Math.random() * 100000)}
        </TableCell>
        {isAdmin && (
          <TableCell align="center" name="dmc">
            <HotelDmcPopover hotelId={id} token={authorisation.token} />
          </TableCell>
        )}
        {isAdmin && (
          <TableCell align="center" neme="direct">
            {2}
          </TableCell>
        )}

        <TableCell>
          <Stack direction="row" spacing={1}>
            <Link
              to={`/manage-hotel/${id}`}
              style={{ textDecoration: "none" }}
              state={{ hotelName: name }}
            >
              <Button variant="contained">Manage</Button>
            </Link>
            {isAdmin && <EditHotel {...props} token={authorisation.token} />}
            {isAdmin && (
              <DeleteHotel
                hotelName={name}
                hotelId={id}
                token={authorisation.token}
                mutate={mutate}
              />
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

HotelsTable.propTypes = {
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
