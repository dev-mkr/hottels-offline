import { useParams, useLocation } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
import { Box, Container, Stack, Typography } from "@mui/material";

import AddDmc from "src/layouts/dashboard/hotels/AddDmc";

const ManageHotel = () => {
  const { hotelId } = useParams();
  const location = useLocation();
  const authUserData = useAuthUser();
  const { authorisation, user } = authUserData();

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
          <Stack spacing={3}>
            <Typography variant="h4">Manage {location.state.hotelName}</Typography>

            {/* handel role here */}
            <AddDmc token={authorisation.token} hotelId={hotelId} />
          </Stack>
        </Container>
      </Box>
    </div>
  );
};

export default ManageHotel;
