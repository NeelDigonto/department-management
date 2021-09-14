import React from "react";
import NextLink from "next/link";
import clsx from "clsx";
import { ListItem, ListItemIcon, ListItemText, ListSubheader, makeStyles } from "@material-ui/core";
import { Announcement as AnnouncementIcon, TableChart as TableChartIcon } from "@material-ui/icons";

import { sidebarOptions } from "../../data/schema";

const useStyles = makeStyles((theme) => ({
  selectedCategory: { color: theme.palette.primary.main },
  selectedIcon: { color: "inherit" },
}));

export const MainListItems = ({ section }) => {
  const classes = useStyles();
  return (
    <div>
      {sidebarOptions.map((item, index) => (
        <NextLink key={index} href={`/${item.urlSuffix}`}>
          <ListItem
            button
            className={clsx({ [classes.selectedCategory]: item.urlSuffix === section })}
          >
            <ListItemIcon className={classes.selectedIcon}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.menuDisplay} />
          </ListItem>
        </NextLink>
      ))}
    </div>
  );
};

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
