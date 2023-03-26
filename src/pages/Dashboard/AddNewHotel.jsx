import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";
import { Input, TextField } from "@mui/material";

const AddNewHotel = () => {
  // const { ref: materialRef } = usePlacesWidget({
  //   apiKey: import.meta.env.GOOGLE_MAPS_API_KEY,
  //   onPlaceSelected: (place) => console.log(place),
  // });
  // // const { ref } = usePlacesWidget({
  // //   apiKey: YOUR_GOOGLE_MAPS_API_KEY,
  // //   onPlaceSelected: (place) => console.log(place),
  // // });
  // return <TextField fullWidth color="secondary" variant="outlined" inputRef={materialRef} />;
  return (
    <Autocomplete
      apiKey={"AIzaSyAfFUn_SFiAXZwXQ0-GQCjd-Okdfxy3mqA"}
      onPlaceSelected={(selected) => console.log(selected)}
    />
  );
};

export default AddNewHotel;
