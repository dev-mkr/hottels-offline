import { usePlacesWidget } from "react-google-autocomplete";
import { TextField } from "@mui/material";
import { useState } from "react";

function extractLocationInfo(locationObject, setFieldValue) {
  // Extracting the address components
  const addressComponents = locationObject?.address_components;

  // Initializing variables for storing the extracted information
  let country = null;
  let city = null;
  let location = null;
  let latitude = null;
  let longitude = null;
  let name = null;

  // Looping through the address components to extract the relevant information
  for (let i = 0; i < addressComponents.length; i++) {
    const component = addressComponents[i];
    if (component.types.includes("country")) country = component.long_name;

    if (component.types.includes("administrative_area_level_2")) city = component.long_name;

    if (component.types.includes("administrative_area_level_1")) city += `, ${component.long_name}`;

    if (component.types.includes("locality")) name = component.long_name;
  }
  // Extracting the location
  location = locationObject.formatted_address;
  // Extracting the coordinates
  const geometry = locationObject.geometry;
  if (geometry.location) {
    latitude = geometry.location.lat();
    longitude = geometry.location.lng();
  }
  setFieldValue("country", country);
  setFieldValue("city", city);
  setFieldValue("location", location);
  setFieldValue("latitude", latitude);
  setFieldValue("longitude", longitude);
  setFieldValue("name", name);
}

const GoogleMapsInput = ({ setFieldValue }) => {
  const { ref } = usePlacesWidget({
    apiKey: `${import.meta.env.VITE_API_KEY}`,
    onPlaceSelected: (place) => extractLocationInfo(place, setFieldValue),
    // types: ["(lodging)"],
    options: {
      types: ["lodging", "hotel"],
    },
  });

  return <TextField fullWidth color="secondary" variant="outlined" inputRef={ref} />;
};

export default GoogleMapsInput;
