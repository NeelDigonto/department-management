import React from "react";
import NextLink from "next/link";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import SchoolIcon from "@material-ui/icons/School";
import BookIcon from "@material-ui/icons/Book";
import ComputerIcon from "@material-ui/icons/Computer";
import TableChartIcon from "@material-ui/icons/TableChart";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import AddBoxIcon from "@material-ui/icons/AddBox";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

export const mainListItems = (
  <div>
    <NextLink href={"/admin/download"}>
      <ListItem button>
        <ListItemIcon>
          <CloudDownloadIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
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
