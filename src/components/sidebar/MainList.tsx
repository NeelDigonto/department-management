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
import VpnKeyIcon from "@mui/icons-material/VpnKey";

import { ACHIEVEMENTS_SCHEMA_MAP } from "@data/schema";

export default function MainList({ section }: { section: string }) {
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
      <NextLink href={`/change-password`}>
        <ListItem
          button
          sx={{
            color: section === "change-password" ? "primary.main" : "inherit",
          }}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <VpnKeyIcon />
          </ListItemIcon>
          <ListItemText primary={"Password"} />
        </ListItem>
      </NextLink>
      {Array.from(ACHIEVEMENTS_SCHEMA_MAP).map(([_, _schema], index) => (
        <NextLink key={index} href={`/${_schema.key}`}>
          <ListItem
            button
            sx={{
              color: section === _schema.key ? "primary.main" : "inherit",
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              {_schema.icon}
            </ListItemIcon>
            <ListItemText primary={_schema.diplay_name} />
          </ListItem>
        </NextLink>
      ))}
    </List>
  );
}
