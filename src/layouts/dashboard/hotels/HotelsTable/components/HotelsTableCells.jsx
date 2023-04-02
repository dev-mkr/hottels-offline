import { lazy } from "react";
import { TableCell, TableRow, Typography } from "@mui/material";
import AccountOwnerPopover from "../../AccountOwnerPopover";
const HotelDmcPopover = lazy(() => import("../../HotelDmcPopover"));
const HotelsActions = lazy(() => import("./HotelsActions"));

const HotelsTable = ({ hotels, token, isAdmin, userId, isNotDmc, mutate }) => {
  const hotelsCells = hotels.map((hotel) => {
    const { id, country, city, name, direct_hotel, account_owner } = hotel;
    console.log(hotel);
    return (
      <TableRow hover key={id}>
        <TableCell padding="checkbox" align="center">
          {id}
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2" align="center">
            {country}
          </Typography>
        </TableCell>
        <TableCell align="center">{city}</TableCell>
        <TableCell align="center">{name}</TableCell>
        <TableCell align="center">
          <AccountOwnerPopover account_owner={account_owner} hotelName={name} />
        </TableCell>
        <TableCell align="center" name="contracts">
          {Math.floor(Math.random() * 100000)}
        </TableCell>
        <TableCell align="center" name="rooms">
          {Math.floor(Math.random() * 100000)}
        </TableCell>
        {isAdmin && (
          <TableCell align="center" name="dmc">
            <HotelDmcPopover hotelId={id} token={token} />
          </TableCell>
        )}
        {isAdmin && (
          <TableCell align="center" neme="direct">
            {direct_hotel?.id ? "YES" : "NO"}
          </TableCell>
        )}
        <HotelsActions
          hotel={hotel}
          token={token}
          userId={userId}
          mutate={mutate}
          isAdmin={isAdmin}
        />
      </TableRow>
    );
  });

  return hotelsCells;
};

export default HotelsTable;
