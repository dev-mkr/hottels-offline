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
import SingleAccountOwner from "./components/SingleAccountOwner";
import removeAccOwnerFromHotel from "./helpers/removeAccOwnerFromHotel";
import Loading from "src/components/Loading";

const fetcher = ([url, token]) =>
  axios({
    url,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  }).then((res) => res.data);

const ManageAccountOwner = ({ currentAccountOwner, hotelName, hotelId, mutate }) => {
  const authUserData = useAuthUser();
  const { authorisation } = authUserData();
  const token = authorisation.token;

  const [selectedAccountOwnerId, setSelectedAccountOwnerId] = useState(currentAccountOwner?.id);
  const [selectedAccountOwnerName, setSelectedAccountOwnerName] = useState(
    currentAccountOwner?.name
  );

  const [pageIndex, setPageIndex] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // get all account owners
  const { data, error, isLoading } = useSWR(
    [`/api/admins/account-owner?page=${pageIndex}&per-page=${rowsPerPage}`, token],
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
      <SingleAccountOwner
        hotelId={hotelId}
        key={id}
        name={name}
        email={email}
        id={id}
        token={token}
        isDisabled={Boolean(selectedAccountOwnerId)}
        setAccountOwner={setSelectedAccountOwnerId}
        selectedAccountOwnerName={setSelectedAccountOwnerName}
        mutate={mutate}
      />
    );
  });

  return (
    <>
      <Typography variant="h5">Manage account owner</Typography>
      <Typography
        variant="body1"
        direction="row"
        sx={{ display: "flex", alignItems: "center", columnGap: 1 }}
      >
        {selectedAccountOwnerName ? (
          <>
            <Typography>
              The current account owner for <b>"{hotelName}"</b> is{" "}
              <b>{selectedAccountOwnerName}</b>
            </Typography>
            <Button
              onClick={() => {
                removeAccOwnerFromHotel(
                  hotelId,
                  token,
                  setSelectedAccountOwnerId,
                  setSelectedAccountOwnerName,
                  mutate
                );
              }}
              color="error"
            >
              Remove
            </Button>
          </>
        ) : (
          "There is no account owner for this hotel"
        )}
      </Typography>
      {/* call remove with setslected and accid and hotelid */}
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

export default ManageAccountOwner;
