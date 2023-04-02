import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Stack,
} from "@mui/material";
import SingleDmc from "./SingleDmc";

export default function ViewActivDmcs({
  mutate,
  data,
  hotelId,
  token,
  pageIndex,
  rowsPerPage,
  onPageChange,
  handleChangeRowsPerPage,
}) {
  const activeDmcs = data.response.data.map(({ name, email, id }) => {
    return (
      <SingleDmc
        key={id}
        name={name}
        mutate={mutate}
        email={email}
        id={id}
        hotelId={hotelId}
        token={token}
      />
    );
  });

  return (
    <div>
      <Stack spacing={2}>
        <Typography variant="h5">Activ Dmcs</Typography>
        {data.response.data.length !== 0 ? (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox" align="center">
                    id
                  </TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Email</TableCell>

                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{activeDmcs}</TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[]}
              component="div"
              count={data.response.meta.total}
              onPageChange={onPageChange}
              page={pageIndex}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        ) : (
          <Typography>Activate dmcs for this hotel from the search above</Typography>
        )}
      </Stack>
    </div>
  );
}
