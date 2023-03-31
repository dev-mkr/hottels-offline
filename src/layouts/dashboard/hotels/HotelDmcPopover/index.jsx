import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Box,
  Button,
  Typography,
  Modal,
  Card,
} from "@mui/material";
import { Scrollbar } from "src/components/Scrollbar";
import useSWR from "swr";
import axios from "src/api/axios";
import Loading from "src/components/Loading";
import SingleDmc from "./components/SingleDmc";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  maxHeight: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: "15px",
  overflow: "auto",
};

const fetcher = ([url, token]) =>
  axios({
    url,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  }).then((res) => res.data);

export default function HotelDmcPopover({ hotelId, token }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [pageIndex, setPageIndex] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const onPageChange = (event, value) => {
    setPageIndex(value);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageIndex(1);
  };

  const { data, error, isLoading, mutate } = useSWR(
    [`/api/admin/hotels/${hotelId}/dmc?page=${pageIndex}?per-page=${rowsPerPage}`, token],
    fetcher
  );

  if (error)
    return (
      <Typography sx={{ color: "red" }}>Failed to fetch {error.response.data.error}</Typography>
    );

  if (isLoading) return <Loading />;
  const dmcs = data.response.data.map(({ name, email, id }) => {
    return (
      <SingleDmc
        key={id}
        name={name}
        mutate={mutate}
        email={email}
        id={id}
        hotelId={hotelId}
        token={token}
      />
    );
  });

  return (
    <div>
      <Button onClick={handleOpen}>Open</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {data.response.data.length !== 0 ? (
          <Card sx={style}>
            <Scrollbar>
              <Box sx={{ minWidth: 600 }}>
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
                  <TableBody>{isLoading ? <Loading /> : dmcs}</TableBody>
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
        ) : (
          <Typography sx={style}>please add dmcs from manage button</Typography>
        )}
      </Modal>
    </div>
  );
}
