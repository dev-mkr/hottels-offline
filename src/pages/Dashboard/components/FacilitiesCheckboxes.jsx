import { Checkbox, FormControl, FormControlLabel, FormGroup, Typography } from "@mui/material";
import { useAuthUser } from "react-auth-kit";
import useSWR from "swr";
import axios from "../../../api/axios";
import Loading from "../../../components/Loading";

const fetcher = ([url, token]) =>
  axios({
    url,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  }).then((res) => res.data);

const FacilitiesCheckboxes = ({ handleChange }) => {
  const authUserData = useAuthUser();
  const { authorisation } = authUserData();
  const { data, error, isLoading } = useSWR(
    [`/api/admin/facilities`, authorisation.token],
    fetcher
  );

  if (error)
    return (
      <Typography sx={{ color: "red" }}>Failed to fetch {error.response.data.error}</Typography>
    );

  if (isLoading) return <Loading />;

  return (
    <FormControl component="fieldset">
      <Typography variant="h6">Facilities</Typography>
      <FormGroup sx={{ position: "flex", flexDirection: "row", mt: 1 }}>
        {data.response.data.map((facility) => (
          <FormControlLabel
            onChange={(e) => handleChange(e.target.value)}
            value={facility.id}
            control={<Checkbox />}
            label={facility.name}
            key={facility.id}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default FacilitiesCheckboxes;
