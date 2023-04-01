import { Link } from "react-router-dom";
import { useFormik, useFormikContext, useField } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Link as LinkComponent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const Page = ({ roles, url }) => {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      role: "",
      is_active: "0",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().max(255).required("First name is required"),
      lastname: Yup.string().max(255).required("Last name is required"),
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
      role: Yup.string().required("The role is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const res = await axios.request({
          method: "POST",
          url,
          headers: { "content-type": "application/json" },
          data: JSON.stringify(values),
        });
        if (res.status === 200) {
          signIn({
            token: res.data.response.authorisation.token,
            expiresIn: 3600,
            tokenType: "Bearer",
            authState: res.data.response,
          });
          navigate("/");
        }
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.response.data.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <>
      <Box
        sx={{
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Register</Typography>
              <Typography color="text.secondary" variant="body2">
                Already have an account? &nbsp;
                <Link
                  component={LinkComponent}
                  to="/auth/login"
                  underline="hover"
                  variant="subtitle2"
                >
                  Log in
                </Link>
              </Typography>
            </Stack>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.firstname && formik.errors.firstname)}
                  fullWidth
                  helperText={formik.touched.firstname && formik.errors.firstname}
                  label="firstname"
                  name="firstname"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.firstname}
                />
                <TextField
                  error={!!(formik.touched.lastname && formik.errors.lastname)}
                  fullWidth
                  helperText={formik.touched.lastname && formik.errors.lastname}
                  label="lastname"
                  name="lastname"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.lastname}
                />
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  // value={formik.values.email}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  autoComplete="on"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  // value={formik.values.password}
                />

                <TextField
                  select
                  error={!!(formik.touched.role && formik.errors.role)}
                  helperText={formik.touched.role && formik.errors.role}
                  onBlur={formik.handleBlur}
                  onChange={(e) => formik.setFieldValue("role", e.target.value)}
                  value={formik.values.role}
                  id="Role"
                  name="user role"
                  label="You are?"
                >
                  {roles.map((role) => (
                    <MenuItem key={role} value={role.toLowerCase()}>
                      {role}
                    </MenuItem>
                  ))}
                </TextField>

                <Typography color="text.secondary" variant="body2">
                  Are you an admin? &nbsp;
                  <Link
                    component={LinkComponent}
                    to="/auth/admin-register"
                    underline="hover"
                    variant="subtitle2"
                  >
                    Register here
                  </Link>
                </Typography>
              </Stack>
              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
              <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
                Continue
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Page;
