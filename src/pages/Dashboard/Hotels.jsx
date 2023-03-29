// import { subDays, subHours } from "date-fns";
// import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
// import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
// import { useSelection } from "../../../hooks/use-selection";
// import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { HotelsTable } from "../../layouts/dashboard/hotels/HotelsTable";
import { CustomersSearch } from "../../sections/customer/Customers-search";
import { Link } from "react-router-dom";
const Page = () => {
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
              <Link to="/add-new-hotel">
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
