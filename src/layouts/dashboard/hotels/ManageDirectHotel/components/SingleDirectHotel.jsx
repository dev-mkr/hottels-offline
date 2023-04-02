import { Stack, TableCell, TableRow, Typography, Button } from "@mui/material";
import addDirectHotelToHotel from "../helpers/addDirectHotelToHotel";

const SingleDirectHotel = ({
  name,
  email,
  direct_hotel_id,
  hotelId,
  token,
  isDisabled,
  setSelectedId,
  selectedDirectHotelName,
  mutate,
}) => {
  return (
    <TableRow hover key={direct_hotel_id}>
      <TableCell padding="checkbox" align="center">
        {direct_hotel_id}
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2" align="center">
          {name}
        </Typography>
      </TableCell>
      <TableCell align="center">{email}</TableCell>

      <TableCell width="50%">
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            onClick={() =>
              addDirectHotelToHotel(
                hotelId,
                direct_hotel_id,
                token,
                setSelectedId,
                selectedDirectHotelName,
                mutate
              )
            }
            disabled={isDisabled}
          >
            Add
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default SingleDirectHotel;
