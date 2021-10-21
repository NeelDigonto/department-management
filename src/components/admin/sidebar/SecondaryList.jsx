import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import TableChartIcon from "@mui/icons-material/TableChart";

export default function SecondaryList({ section }) {
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
