import { useState } from "react";
import { Stack, TableCell, TableRow, Typography, Button } from "@mui/material";
import addDmc from "../helpers/addDmc";

const SingleDmc = ({ name, email, id, hotelId, token }) => {
  const [isAdded, setIsAdded] = useState(false);

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
          <Button onClick={() => addDmc(hotelId, id, token, setIsAdded)} disabled={isAdded}>
            {isAdded ? "Activated!" : "Activate"}
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default SingleDmc;
