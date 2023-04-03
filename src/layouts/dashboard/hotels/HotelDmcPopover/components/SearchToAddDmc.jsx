import { useState } from "react";
import { TextField, Menu, MenuItem, Autocomplete, ListItemText, Button } from "@mui/material";
import axios from "src/api/axios";
import useSWR from "swr";
import { useAuthUser } from "react-auth-kit";
import SearchResultItem from "./SearchResultItem";

const fetcher = ([url, token]) =>
  axios({
    url,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  }).then((res) => res.data);

const SearchToAddDmc = ({ hotelId, mutate }) => {
  const authUserData = useAuthUser();
  const { authorisation } = authUserData();
  const token = authorisation.token;

  const [query, setQuery] = useState("");
  const url = query ? `/api/users/search-by/name/users/${query}` : null;
  const { data, error } = useSWR([url, token], fetcher);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const options = data ? (
    <>
      {data.response?.data.map((dmc) => (
        <SearchResultItem dmc={dmc} hotelId={hotelId} token={token} key={dmc.id} mutate={mutate} />
      ))}
    </>
  ) : error ? (
    <div>Error: {error.message}</div>
  ) : (
    <div>Loading...</div>
  );

  return (
    <div>
      <TextField
        sx={{ p: 0.5 }}
        fullWidth
        label="Search to add dmc"
        name="Search to add dmc"
        value={query}
        onChange={handleQueryChange}
      />

      {options}

      {/* {data ? (
        <List>
          {data.response?.data.map((result) => (
            <ListItem key={result.id}>{result.name}</ListItem>
          ))}
        </List>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>Loading...</div>
      )} */}

      {/* <TextField
        label="Search"
        variant="outlined"
        value={query}
        onChange={handleQueryChange}
        fullWidth
      /> */}
      {/* {data.response.data.length > 0 && (
        <List>
          {data.response.data.map(({ id, name }) => (
            <ListItem button key={id} onClick={() => handleListItemClick(item)}>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
      )} */}
      {/* <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={top100Films.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      /> */}
    </div>
  );
};

export default SearchToAddDmc;
