import { MenuItem, Button, ListItemText } from "@mui/material";
import { useState } from "react";
import addDmc from "../../AddDmc/helpers/addDmc";

const SearchResultItem = ({ dmc, hotelId, token, mutate }) => {
  const [isAdded, setIsAdded] = useState(false);

  return (
    <MenuItem
      key={dmc.id}
      sx={{ display: "flex", justifyContent: "space-between" }}
      disabled={isAdded}
    >
      <ListItemText primary={dmc.name} secondary={dmc.email} />
      <Button onClick={() => addDmc(hotelId, dmc.id, token, setIsAdded, mutate)}>
        {isAdded ? "Activated!" : "Activate"}
      </Button>
    </MenuItem>
  );
};

export default SearchResultItem;
