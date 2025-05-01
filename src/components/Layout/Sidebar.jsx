import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { Dashboard, Settings } from "@mui/icons-material";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
    { text: "Settings", icon: <Settings />, path: "/admin/settings" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          mt: 8,
        },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <React.Fragment key={item.text}>
            <NavLink
              to={item.path}
              style={{ textDecoration: "none" }}
              end  
            >
              {({ isActive }) => (
                <ListItemButton
                  sx={{
                    backgroundColor: isActive ? "#1976d2" : "inherit",
                    color: isActive ? "#ffffff" : "#000000",
                    "&:hover": {
                      backgroundColor: isActive ? "#1565c0" : "#f5f5f5",
                    },
                    "& .MuiListItemIcon-root": {
                      color: isActive ? "#ffffff" : "#000000",
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              )}
            </NavLink>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
