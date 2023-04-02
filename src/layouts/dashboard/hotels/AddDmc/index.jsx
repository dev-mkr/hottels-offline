import { useState } from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";

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
} from "@mui/material";
import axios from "src/api/axios";
import { Scrollbar } from "src/components/Scrollbar";
import SingleDmc from "./components/SingleDmc";
import Loading from "src/components/Loading";
//components
// import { Link } from "react-router-dom";

const fetcher = ([url, token]) =>
  axios({
    url,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  }).then((res) => res.data);

const AddDmc = () => {
  const authUserData = useAuthUser();
  const { authorisation } = authUserData();
  const token = authorisation.token;
  const { hotelId } = useParams();

  const [pageIndex, setPageIndex] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data, error, isLoading } = useSWR(
    [`/api/users/unique/dmc?allowed-types=dmc&page=${pageIndex}&per-page=${rowsPerPage}`, token],
    fetcher
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

  const dmcs = data.response.data.map(({ name, email, id }) => {
    return <SingleDmc key={id} name={name} email={email} id={id} hotelId={hotelId} token={token} />;
  });

  return (
    <>
      <Stack spacing={2}>
        <Typography variant="h5">Available Dmcs</Typography>

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
                <TableBody>{dmcs}</TableBody>
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
      </Stack>
    </>
  );
};

export default AddDmc;
