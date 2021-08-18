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

export const mainListItems = (
  <div>
    <NextLink href={"/profile"}>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
    </NextLink>
    {/*     <NextLink href={"/education"}>
      <ListItem button>
        <ListItemIcon>
          <SchoolIcon />
        </ListItemIcon>
        <ListItemText primary="Education" />
      </ListItem>
    </NextLink>
    <NextLink href={"/conferences"}>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Conferences" />
      </ListItem>
    </NextLink> */}
    <NextLink href={"/publications"}>
      <ListItem button>
        <ListItemIcon>
          <BookIcon />
        </ListItemIcon>
        <ListItemText primary="Publications" />
      </ListItem>
    </NextLink>
    <NextLink href={"/journal_publications"}>
      <ListItem button>
        <ListItemIcon>
          <BookIcon />
        </ListItemIcon>
        <ListItemText primary="Journal Publications" />
      </ListItem>
    </NextLink>
    {/*  <NextLink href={"/experience"}>
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Experience" />
      </ListItem>
    </NextLink>
    <NextLink href={"/seminars"}>
      <ListItem button>
        <ListItemIcon>
          <ComputerIcon />
        </ListItemIcon>
        <ListItemText primary="Seminars" />
      </ListItem>
    </NextLink>
    <NextLink href={"/projects"}>
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Projects" />
      </ListItem>
    </NextLink> */}
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>General</ListSubheader>
    <NextLink href={"/news"}>
      <ListItem button>
        <ListItemIcon>
          <AnnouncementIcon />
        </ListItemIcon>
        <ListItemText primary="News" />
      </ListItem>
    </NextLink>
    <NextLink href={"/routine"}>
      <ListItem button>
        <ListItemIcon>
          <TableChartIcon />
        </ListItemIcon>
        <ListItemText primary="Routine" />
      </ListItem>
    </NextLink>
  </div>
);
