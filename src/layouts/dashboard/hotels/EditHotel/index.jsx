import { useAuthUser } from "react-auth-kit";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Stack, Typography, TextField, MenuItem, Modal, Card } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "src/api/axios";
import { useState } from "react";
// import FacilitiesCheckboxes from "./components/FacilitiesCheckboxes";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  maxHeight: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: "15px",
  overflow: "auto",
};

const EditHotel = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const authUserData = useAuthUser();
  const { authorisation, user } = authUserData();

  const [selectedImage, setSelectedImage] = useState();
  const [isImgUpload, setIsImgUpload] = useState(false);

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", selectedImage[0]);
    formData.append("upload_preset", "n8unzryk");
    axios
      .post("https://api.cloudinary.com/v1_1/dqc35wpti/image/upload", formData)
      .then((res) => {
        setSelectedImage("");
        setIsImgUpload(false);
        formik.setFieldValue("image", res.data.url);
      })
      .catch(() => formik.setFieldError("image", "could not upload"));
  };
  const formik = useFormik({
    initialValues: { admin_id: user.id, ...props },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("Hotel name is required"),
      location: Yup.string().max(255).required("Hotel location is required"),
      code: Yup.number().required("code is required"),
      latitude: Yup.number().required("latitude location is required"),
      longitude: Yup.number().required("longtude location is required"),
      city: Yup.string().max(255).required("City is required"),
      country: Yup.string().max(255).required("Country name is required"),
      description: Yup.string().max(2000).required("Description is required"),
    }),
    onSubmit: async (values, helpers) => {
      values["_method"] = "PUT";
      console.log(values);
      try {
        const res = await axios.request({
          method: "POST",
          url: `/api/admin/hotels/${props.id}`,
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${authorisation.token}`,
          },
          data: JSON.stringify(values),
        });
        console.log(res);
        if (res.status === 200) {
          setOpen(false);
        }
      } catch (err) {
        console.log(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.response.data.message });
        helpers.setSubmitting(false);
      }
    },
  });
  const handleFacilitiesChange = (newId) => {
    const facilities = formik.values.facilities;
    const newFacilitiesArr = [...facilities];
    //checking weather array contain the id
    if (!newFacilitiesArr.includes(newId)) {
      newFacilitiesArr.push(newId); //adding to array because value doesnt exists
    } else {
      newFacilitiesArr.splice(newFacilitiesArr.indexOf(newId), 1); //deleting
    }
    formik.setFieldValue("facilities", newFacilitiesArr);
  };

  return (
    <>
      <Button onClick={handleOpen} variant="contained">
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
          <form noValidate onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
              <Typography variant="h4">Edit Hotel</Typography>
              <Stack sx={{ display: "flex", flexDirection: "row", columnGap: 1 }}>
                <TextField
                  error={!!(formik.touched.latitude && formik.errors.latitude)}
                  fullWidth
                  helperText={formik.touched.latitude && formik.errors.latitude}
                  label="latitude"
                  name="latitude"
                  type="number"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.latitude}
                />
                <TextField
                  error={!!(formik.touched.longitude && formik.errors.longitude)}
                  fullWidth
                  helperText={formik.touched.longitude && formik.errors.longitude}
                  label="longitude"
                  name="longitude"
                  type="number"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.longitude}
                />
              </Stack>

              <TextField
                error={!!(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="Hotel name"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              <TextField
                error={!!(formik.touched.city && formik.errors.city)}
                fullWidth
                helperText={formik.touched.city && formik.errors.city}
                label="Hotel city"
                name="city"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.city}
              />
              <TextField
                error={!!(formik.touched.country && formik.errors.country)}
                fullWidth
                helperText={formik.touched.country && formik.errors.country}
                label="Hotel country"
                name="country"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.country}
              />
              <TextField
                error={!!(formik.touched.location && formik.errors.location)}
                fullWidth
                helperText={formik.touched.location && formik.errors.location}
                label="Full Hotel location"
                name="location"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.location}
              />
              <TextField
                error={!!(formik.touched.code && formik.errors.code)}
                fullWidth
                helperText={formik.touched.code && formik.errors.code}
                label="S/N"
                name="code"
                type="number"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.code}
              />
              <TextField
                error={!!(formik.touched.description && formik.errors.description)}
                fullWidth
                helperText={formik.touched.description && formik.errors.description}
                label="Hotel description"
                name="description"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="description"
                value={formik.values.description}
                multiline
                rows={8}
              />
              <TextField
                fullWidth
                label="Select Hotel level"
                name="Hotel level"
                onBlur={formik.handleBlur}
                onChange={(e) => formik.setFieldValue("stars", e.target.value)}
                select
                value={formik.values.stars}
              >
                {[1, 2, 3, 4, 5, 6, 7].map((level) => (
                  <MenuItem key={level} value={level}>
                    {level} Start
                  </MenuItem>
                ))}
              </TextField>
              <Box sx={{ display: "flex", alignItems: "center", columnGap: "10px" }}>
                <Typography variant="subtitle1">Upload an image</Typography>
                <input
                  accept="image/*"
                  multiple
                  type="file"
                  onChange={(e) => setSelectedImage(e.target.files)}
                />
                <LoadingButton
                  variant="outlined"
                  disabled={!selectedImage}
                  component="label"
                  onClick={() => {
                    uploadImage();
                    setIsImgUpload(true);
                  }}
                  loading={isImgUpload}
                >
                  {!formik.errors.image && formik.values.image ? "Success" : "Upload"}
                </LoadingButton>
              </Box>
              {/* <FacilitiesCheckboxes handleChange={handleFacilitiesChange} /> */}
            </Stack>
            {formik.errors.submit && (
              <Typography color="error" sx={{ mt: 3 }} variant="body2">
                {formik.errors.submit}
              </Typography>
            )}
            <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
              Submit
            </Button>
          </form>
        </Card>
      </Modal>
    </>
  );
};

export default EditHotel;
