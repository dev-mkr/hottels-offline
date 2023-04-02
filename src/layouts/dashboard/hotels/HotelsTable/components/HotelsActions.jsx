import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";

import DeleteHotel from "../../DeleteHotel";
import EditHotel from "../../EditHotel";

import { TableCell, Button, Menu, MenuItem, Divider } from "@mui/material";

import { styled, alpha } from "@mui/material/styles";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === "light" ? "rgb(55, 65, 81)" : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));

const HotelsActions = ({ hotel, mutate, token, isAdmin }) => {
  const authUserData = useAuthUser();
  const { user } = authUserData();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const showDeleteAction = ["account_owner", "super_admin", "admin"].includes(user.role);
  return (
    <TableCell>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Options
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Link
          to={`/manage-hotel/${hotel.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
          state={{ hotelName: hotel.name, account_owner: hotel.account_owner }}
        >
          <MenuItem disableRipple>
            <ManageAccountsIcon />
            Manage
          </MenuItem>
        </Link>
        {isAdmin && <EditHotel {...hotel} token={token} admin_id={user.id} />}

        <Divider sx={{ my: 0.5 }} />

        {showDeleteAction && (
          <DeleteHotel hotelName={hotel.name} hotelId={hotel.id} token={token} mutate={mutate} />
        )}
      </StyledMenu>
    </TableCell>
  );
};

export default HotelsActions;
