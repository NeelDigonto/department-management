import React from "react";
import NextLink from "next/link";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";

import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import AddBoxIcon from "@mui/icons-material/AddBox";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import TimelineIcon from "@mui/icons-material/Timeline";

export default function MainList({ section }: { section: string }) {
  return (
    <List>
      <NextLink href={"/admin/dashboard"}>
        <ListItem
          button
          sx={{
            color: section === "dashboard" ? "primary.main" : "inherit",
          }}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <CloudDownloadIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </NextLink>
      <NextLink href={"/admin/create-user"}>
        <ListItem
          button
          sx={{
            color: section === "create-user" ? "primary.main" : "inherit",
          }}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <AddBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Create User" />
        </ListItem>
      </NextLink>
      <NextLink href={"/admin/delete-user"}>
        <ListItem
          button
          sx={{
            color: section === "delete-user" ? "primary.main" : "inherit",
          }}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <RemoveCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Delete User" />
        </ListItem>
      </NextLink>
      <NextLink href={"/admin/graph"}>
        <ListItem
          button
          sx={{
            color: section === "graph" ? "primary.main" : "inherit",
          }}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <TimelineIcon />
          </ListItemIcon>
          <ListItemText primary="Graph" />
        </ListItem>
      </NextLink>
    </List>
  );
}
