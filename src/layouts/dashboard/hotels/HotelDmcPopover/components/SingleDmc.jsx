import { useState } from "react";
import { Stack, TableCell, TableRow, Typography, Button } from "@mui/material";
import deleteDmc from "../helpers/deleteDmc";

const SingleDmc = ({ name, email, id, hotelId, token, mutate }) => {
  const [isDeleted, setIsDeleted] = useState(false);

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

      <TableCell width="30%">
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            color="error"
            disabled={isDeleted}
            onClick={() => deleteDmc(hotelId, id, token, setIsDeleted, mutate)}
          >
            {isDeleted ? "UnActivated!" : "UnActivate"}
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default SingleDmc;
