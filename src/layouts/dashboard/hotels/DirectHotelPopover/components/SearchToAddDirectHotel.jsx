import { useState } from "react";
import { TextField, List, ListItem, ListItemText } from "@mui/material";
import useSWR from "swr";

const SearchInput = () => {
  const [query, setQuery] = useState("");
  const { data: d, error } = useSWR(query ? `/api/search?q=${query}` : null);
  // const data = [{ id: 1, name: "mohaemd" }];
  const data = [];
  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleListItemClick = (selectedItem) => {
    setQuery(selectedItem);
  };

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        value={query}
        onChange={handleQueryChange}
        fullWidth
      />
      {data.length > 0 && (
        <List>
          {data.map(({ id, name }) => (
            <ListItem button key={id} onClick={() => handleListItemClick(item)}>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default SearchInput;
