import { Stack, TableCell, TableRow, Typography, Button } from "@mui/material";
import addAccOwnerToHotel from "../helpers/addAccOwnerToHotel";

const SingleAccountOwner = ({
  hotelId,
  name,
  email,
  id,
  token,
  isDisabled,
  setAccountOwner,
  selectedAccountOwnerName,
  mutate,
}) => {
  return (
    <TableRow hover key={id}>
      <TableCell padding="checkbox" align="center">
        {id}
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
              addAccOwnerToHotel(
                hotelId,
                id,
                token,
                setAccountOwner,
                selectedAccountOwnerName,
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

export default SingleAccountOwner;
