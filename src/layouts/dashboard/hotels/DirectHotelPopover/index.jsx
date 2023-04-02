import { useState } from "react";
import { Button, Modal, Stack, Card } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import { Scrollbar } from "src/components/Scrollbar";
import SearchToAddDirectHotel from "./components/SearchToAddDirectHotel";
import ManageDirectHotel from "../ManageDirectHotel";

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

export default function DirectHotelPopover({ direct_hotel, hotelName, hotelId, mutate }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen} color="inherit">
        {direct_hotel?.name ? "Yes" : "No"}
      </Button>
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
              <SearchToAddDirectHotel />
              <ManageDirectHotel
                hotelName={hotelName}
                currentDirectHotel={direct_hotel}
                hotelId={hotelId}
                mutate={mutate}
              />
            </Stack>
          </Scrollbar>
        </Card>
      </Modal>
    </>
  );
}
