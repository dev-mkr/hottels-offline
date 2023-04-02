import { useState } from "react";
import { Button, Typography, Modal, Stack, Card } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import useSWR from "swr";
import axios from "src/api/axios";
import Loading from "src/components/Loading";

import { Scrollbar } from "src/components/Scrollbar";
import SearchToAddAccOwner from "./components/SearchToAddAccOwner";
import ManageAccountOwner from "../ManageAccountOwner";

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

export default function AccountOwnerPopover({ account_owner, hotelName }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen} color="inherit">
        {account_owner?.name ? account_owner.name : "None"}
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
              <SearchToAddAccOwner />
              <ManageAccountOwner hotelName={hotelName} currentAccountOwner={account_owner} />
            </Stack>
          </Scrollbar>
        </Card>
      </Modal>
    </>
  );
}
