// import { subDays, subHours } from "date-fns";
// import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
// import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
// import { useSelection } from "../../../hooks/use-selection";
// import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { HotelsTable } from "src/layouts/dashboard/hotels/HotelsTable";
import { CustomersSearch } from "../../sections/customer/Customers-search";
import { Link } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";

const Page = () => {
  const authUserData = useAuthUser();
  const { user } = authUserData();
  const isNotDmc = ["account_owner", "hotel_director", "super_admin", "admin"].includes(user.role);

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Hotels overview</Typography>
              </Stack>
              {isNotDmc && (
                <Link to="/add-new-hotel" style={{ textDecoration: "none" }}>
                  <Button
                    startIcon={
                      <SvgIcon fontSize="small">
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                  >
                    Add
                  </Button>
                </Link>
              )}
            </Stack>
            <CustomersSearch />
            <HotelsTable />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
