import { useState } from "react";
import useSWR from "swr";
import { useAuthUser } from "react-auth-kit";

import {
  Box,
  Button,
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
import { Scrollbar } from "src/components/Scrollbar";
import SingleDirectHotel from "./components/SingleDirectHotel";
import removeDirectHotelFromHotel from "./helpers/removeDirectHotelFromHotel";
import Loading from "src/components/Loading";

const fetcher = ([url, token]) =>
  axios({
    url,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  }).then((res) => res.data);

const ManageDirectHotel = ({ currentDirectHotel, hotelName, hotelId, mutate }) => {
  const authUserData = useAuthUser();
  const { authorisation } = authUserData();
  const token = authorisation.token;

  const [selectedId, setSelectedId] = useState(currentDirectHotel?.id);
  const [selectedDirectHotelName, setSelectedDirectHotelName] = useState(currentDirectHotel?.name);

  const [pageIndex, setPageIndex] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // get all direct hotels
  const { data, error, isLoading } = useSWR(
    [`/api/admins/hotel-director?page=${pageIndex}&per-page=${rowsPerPage}`, token],
    fetcher
    // { suspense: true }
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

  if (isLoading) return <Loading />;

  const accountOwners = data.response.data.map(({ name, email, id }) => {
    return (
      <SingleDirectHotel
        key={id}
        name={name}
        email={email}
        direct_hotel_id={id}
        hotelId={hotelId}
        token={token}
        isDisabled={Boolean(selectedId)}
        setSelectedId={setSelectedId}
        selectedDirectHotelName={setSelectedDirectHotelName}
        mutate={mutate}
      />
    );
  });

  return (
    <>
      <Typography variant="h5">Manage direct hotel</Typography>
      <div
        variant="body1"
        direction="row"
        sx={{ display: "flex", alignItems: "center", columnGap: 1 }}
      >
        {selectedDirectHotelName ? (
          <>
            <Typography>
              The current direct hotel for <b>"{hotelName}"</b> is <b>{selectedDirectHotelName}</b>
            </Typography>
            <Button
              onClick={() => {
                removeDirectHotelFromHotel(
                  hotelId,
                  token,
                  setSelectedId,
                  setSelectedDirectHotelName,
                  mutate
                );
              }}
              color="error"
            >
              Remove
            </Button>
          </>
        ) : (
          "There is no direct hotel for this hotel"
        )}
      </div>
      <Card>
        <Scrollbar>
          <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox" align="center">
                    id
                  </TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Email</TableCell>

                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{accountOwners}</TableBody>
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
    </>
  );
};

export default ManageDirectHotel;
