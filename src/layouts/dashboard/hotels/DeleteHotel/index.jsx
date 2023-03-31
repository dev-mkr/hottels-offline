import { useState } from "react";
import { Button, Typography, Modal, Alert, Card } from "@mui/material";
import axios from "src/api/axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  maxHeight: 200,
  bgcolor: "",
  boxShadow: 24,
  p: 2,
  borderRadius: "15px",
  overflow: "auto",
  display: "flex",
  columnGap: "10px",
  justifyContent: "space-between",
};

const DeleteHotel = ({ hotelName, hotelId, token, mutate }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const confirmDelete = () => {
    let data = new FormData();
    data.append("_method", "DELETE");
    axios
      .request({
        method: "POST",
        url: `/api/admin/hotels/${hotelId}`,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: data,
      })
      .then((res) => {
        res?.status === 200 && handleClose();
        mutate();
      });
  };

  return (
    <>
      <Button variant="contained" color="error" onClick={handleOpen}>
        Archive
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
          <Alert variant="outlined" severity="error">
            Are you sure you want to Archive {hotelName}?
          </Alert>
          <Button variant="contained" color="error" onClick={confirmDelete}>
            Archive
          </Button>
        </Card>
      </Modal>
    </>
  );
};
export default DeleteHotel;
