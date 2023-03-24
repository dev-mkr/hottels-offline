import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Link as LinkComponent, Stack, TextField, Typography } from "@mui/material";

import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const handleMethodChange = () => null;

const Page = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const res = await axios.request({
          method: "POST",
          url: "/api/user/login",
          headers: { "content-type": "application/json" },
          data: JSON.stringify(values),
        });

        if (res.status === 200) {
          signIn({
            token: res.data.response.authorisation.token,
            expiresIn: 3600,
            tokenType: "Bearer",
            authState: res.data.response.user,
          });
          navigate("/");

          //   signIn({
          //     token: res.data.response.authorisation.token,
          //
          //     tokenType: "Bearer",
          //     // authState: res.data.response.user,
          //   });

          // }
        }
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
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
          py: "100px",
          width: "100%",
        }}
      >
        <div>
          <Stack spacing={1} sx={{ mb: 3 }}>
            <Typography variant="h4">Login</Typography>
            <Typography color="text.secondary" variant="body2">
              Don&apos;t have an account? &nbsp;
              <Link
                component={LinkComponent}
                to="/auth/register"
                underline="hover"
                variant="subtitle2"
              >
                Register
              </Link>
            </Typography>
          </Stack>
          {/* <Tabs onChange={handleMethodChange} sx={{ mb: 3 }}>
            <Tab label="Email" value="email" />
          </Tabs> */}

          <form noValidate onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
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

          {/* {method === "phoneNumber" && (
            <div>
              <Typography sx={{ mb: 1 }} variant="h6">
                Not available in the demo
              </Typography>
              <Typography color="text.secondary">
                To prevent unnecessary costs we disabled this feature in the demo.
              </Typography>
            </div>
          )} */}
        </div>
      </Box>
    </Box>
  );
};

export default Page;
