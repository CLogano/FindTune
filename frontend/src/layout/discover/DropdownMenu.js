import React, { useState } from "react";
import { AppBar, Toolbar, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

/**
 * DropdownMenu component that renders a menu for selecting different sections.
 * @param {object} props - Props passed to the component.
 * @param {function} props.onMenuSelect - Function to handle menu item selection.
 * @returns {JSX.Element} The rendered dropdown menu component.
 */
const DropdownMenu = (props) => {

  // Destructuring props
  const { onMenuSelect } = props;

  // State to manage the anchor element for the menu
  const [anchorElement, setAnchorElement] = useState(null);

  // Handler for menu icon click to open the menu
  const onMenuClickHandler = (event) => {
    setAnchorElement(event.currentTarget);
  };

  // Handler to close the menu
  const onCloseHandler = () => {
    setAnchorElement(null);
  };

  // Handler for menu item click to close the menu and select the menu item
  const onMenuItemClickHandler = (menuItem) => {
    onCloseHandler();
    setTimeout(() => {
      onMenuSelect(menuItem);
    }, 150); // small delay to ensure menu closes before updating state
  };

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
        <Toolbar style={{ padding: 0, marginLeft: "1rem" }}>
            <MenuIcon style={{ cursor: "pointer", fontSize: 40 }} onClick={onMenuClickHandler} />
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorElement}
        keepMounted
        open={Boolean(anchorElement)}
        onClose={onCloseHandler}
      >
        <MenuItem onClick={() => onMenuItemClickHandler("Recommendations")} sx={{ fontFamily: "Poppins, sans-serif", fontWeight: 400 }}>Recommendations</MenuItem>
        <MenuItem onClick={() => onMenuItemClickHandler("Playlists")} sx={{ fontFamily: "Poppins, sans-serif", fontWeight: 400 }}>Playlists</MenuItem>
        <MenuItem onClick={() => onMenuItemClickHandler("Filters")} sx={{ fontFamily: "Poppins, sans-serif", fontWeight: 400 }}>Filters</MenuItem>
      </Menu>
    </div>
  );
};

export default DropdownMenu;