import React from "react";
import NextLink from "next/link";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";

import { ACHIEVEMENTS } from "../../data/schema";

export default function MainList({ section }) {
  return (
    <List>
      <NextLink href={`/profile`}>
        <ListItem
          button
          sx={{
            color: section === "profile" ? "primary.main" : "inherit",
          }}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={"Profile"} />
        </ListItem>
      </NextLink>
      {ACHIEVEMENTS.map((_category, index) => (
        <NextLink key={index} href={`/${_category.SCHEMA.key}`}>
          <ListItem
            button
            sx={{
              color:
                section === _category.SCHEMA.key ? "primary.main" : "inherit",
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              {_category.SCHEMA.icon}
            </ListItemIcon>
            <ListItemText primary={_category.SCHEMA.diplay_name} />
          </ListItem>
        </NextLink>
      ))}
    </List>
  );
}
