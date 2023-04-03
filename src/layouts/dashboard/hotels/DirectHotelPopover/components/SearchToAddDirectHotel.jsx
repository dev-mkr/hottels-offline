import { useState } from "react";
import { TextField, List, ListItem, ListItemText } from "@mui/material";
import useSWR from "swr";
import { useAuthUser } from "react-auth-kit";

const fetcher = ([url, token]) =>
  axios({
    url,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  }).then((res) => res.data);

const SearchToAddDirectHotel = () => {
  const authUserData = useAuthUser();
  const { authorisation } = authUserData();
  const token = authorisation.token;

  const [query, setQuery] = useState("");
  const url = query ? `/api/users/search-by/name/users/${query}` : null;
  const { data, error } = useSWR([url, token], fetcher);

  const handleQueryChange = (event) => {
    console.log(event.target.value);
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

export default SearchToAddDirectHotel;
