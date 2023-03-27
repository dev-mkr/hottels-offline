import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "../../../api/axios";
import { useAuthUser } from "react-auth-kit";
import useSWR from "swr";

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

  if (isLoading) return <CircularProgress sx={{ inset: "50% 50%", position: "relative" }} />;

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
