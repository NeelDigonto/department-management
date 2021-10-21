import React from "react";
import NextLink from "next/link";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import TableChartIcon from "@mui/icons-material/TableChart";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import AddBoxIcon from "@mui/icons-material/AddBox";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

export const mainListItems = (
  <div>
    <NextLink href={"/admin/dashboard"}>
      <ListItem button>
        <ListItemIcon>
          <CloudDownloadIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </NextLink>
    <NextLink href={"/admin/create-user"}>
      <ListItem button>
        <ListItemIcon>
          <AddBoxIcon />
        </ListItemIcon>
        <ListItemText primary="Create User" />
      </ListItem>
    </NextLink>
    <NextLink href={"/admin/delete-user"}>
      <ListItem button>
        <ListItemIcon>
          <RemoveCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Delete User" />
      </ListItem>
    </NextLink>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>General</ListSubheader>
    <NextLink href={"/admin/news"}>
      <ListItem button>
        <ListItemIcon>
          <AnnouncementIcon />
        </ListItemIcon>
        <ListItemText primary="News" />
      </ListItem>
    </NextLink>
    <NextLink href={"/admin/routine"}>
      <ListItem button>
        <ListItemIcon>
          <TableChartIcon />
        </ListItemIcon>
        <ListItemText primary="Routine" />
      </ListItem>
    </NextLink>
  </div>
);
