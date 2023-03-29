import { useState } from "react";
import { Box, Button, Typography, Modal, List, ListItem, ListItemText } from "@mui/material";
import useSWR from "swr";
import axios from "src/api/axios";
import { useAuthUser } from "react-auth-kit";
import Loading from "src/components/Loading";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxHeight: 400,
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

export default function HotelDmcPopover({ HotelId }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const authUserData = useAuthUser();
  const { authorisation } = authUserData();
  const { data, error, isLoading } = useSWR(
    [`/api/admin/hotels/${HotelId}/dmc`, authorisation.token],
    fetcher
  );
  if (error)
    return (
      <Typography sx={{ color: "red" }}>Failed to fetch {error.response.data.error}</Typography>
    );
  if (isLoading) return <Loading />;

  return (
    <div>
      <Button onClick={handleOpen}>Open</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <List>
            {data.response.data.map((user, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${index + 1}. ${user.name}`}
                  secondary={`Email: ${user.email}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Modal>
    </div>
  );
}
