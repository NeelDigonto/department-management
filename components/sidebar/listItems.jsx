import React from "react";
import NextLink from "next/link";
import { ListItem, ListItemIcon, ListItemText, ListSubheader } from "@material-ui/core";
import { Announcement as AnnouncementIcon, TableChart as TableChartIcon } from "@material-ui/icons";

import { sidebarOptions } from "../../data/schema";

export const getMainListItems = () => (
  <div>
    {sidebarOptions.map((item, index) => (
      <NextLink key={index} href={`/${item.urlSuffix}`}>
        <ListItem button>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.menuDisplay} />
        </ListItem>
      </NextLink>
    ))}
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

/* <NextLink href={"/education"}>
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
    </NextLink>
    <NextLink href={"/experience"}>
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
    </NextLink>
    */
