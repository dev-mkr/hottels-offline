import { Suspense } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
import { Box, Container, Stack, Typography } from "@mui/material";

import Loading from "src/components/Loading";
import AddDmc from "src/layouts/dashboard/hotels/AddDmc";
import ManageAccountOwner from "src/layouts/dashboard/hotels/ManageAccountOwner";

const ManageHotel = () => {
  const { hotelId } = useParams();
  const location = useLocation();
  const authUserData = useAuthUser();
  const { authorisation, user } = authUserData();

  let options;

  if (user.role === "super_admin" || user.role === "admin") {
    options = (
      <>
        <Suspense fallback={<Loading />}>
          <AddDmc token={authorisation.token} />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <ManageAccountOwner
            hotelName={location.state?.hotelName}
            currentAccountOwner={location.state?.account_owner}
          />
        </Suspense>
      </>
    );
  }
  if (user.role === "account_owner") {
    options = (
      <>
        <Suspense fallback={<Loading />}>
          <AddDmc token={authorisation.token} />
        </Suspense>

        {/* <option>Add Direct Hotel</option> */}
      </>
    );
  }
  if (user.role === "hotel_director") {
    options = (
      <>
        <Suspense fallback={<Loading />}>
          <AddDmc token={authorisation.token} />
        </Suspense>
      </>
    );
  }
  if (!options) {
    options = <div color="error">Not authorised</div>; // or display an error message for unknown roles
  }

  return (
    <div>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Typography variant="h4">Manage {location.state?.hotelName}</Typography>
            {options}
          </Stack>
        </Container>
      </Box>
    </div>
  );
};

export default ManageHotel;
