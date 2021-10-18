import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import {
  Announcement as AnnouncementIcon,
  TableChart as TableChartIcon,
} from "@mui/icons-material";

export default function SecondaryList() {
  return (
    <List>
      <ListSubheader inset>General</ListSubheader>
      <ListItem button>
        <ListItemIcon>
          <AnnouncementIcon />
        </ListItemIcon>
        <ListItemText primary="News" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <TableChartIcon />
        </ListItemIcon>
        <ListItemText primary="Routine" />
      </ListItem>
    </List>
  );
}
