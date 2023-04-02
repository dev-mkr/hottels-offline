import { useState } from "react";
import { Button, Typography, Modal, Stack, Card } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import useSWR from "swr";
import axios from "src/api/axios";
import Loading from "src/components/Loading";
import ViewActivDmcs from "./components/ViewActivDmcs";
import SearchToAddDmc from "./components/SearchToAddDmc";
import { Scrollbar } from "src/components/Scrollbar";
import AddDmc from "../AddDmc";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100vw",
  maxWidth: 600,
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
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const onPageChange = (event, value) => {
    setPageIndex(value);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageIndex(1);
  };

  const { data, error, isLoading, mutate } = useSWR(
    [`/api/admin/hotels/${hotelId}/dmc?page=${pageIndex}&per-page=${rowsPerPage}`, token],
    fetcher
  );

  if (error)
    return (
      <Typography sx={{ color: "red" }}>Failed to fetch {error.response.data.error}</Typography>
    );

  if (isLoading) return <Loading />;

  return (
    <>
      <Button onClick={handleOpen}>{data.response.data.length}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
          <Scrollbar>
            <Stack spacing={3}>
              <ClearIcon onClick={handleClose} />

              <SearchToAddDmc />
              <ViewActivDmcs
                hotelId={hotelId}
                token={token}
                data={data}
                mutate={mutate}
                pageIndex={pageIndex}
                rowsPerPage={rowsPerPage}
                onPageChange={onPageChange}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
              />
              <AddDmc />
            </Stack>
          </Scrollbar>
        </Card>
      </Modal>
    </>
  );
}
