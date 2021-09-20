import React from "react";
import NextLink from "next/link";
import clsx from "clsx";
import { ListItem, ListItemIcon, ListItemText, ListSubheader, makeStyles } from "@material-ui/core";
import { Announcement as AnnouncementIcon, TableChart as TableChartIcon } from "@material-ui/icons";
import DashboardIcon from "@material-ui/icons/Dashboard";

import { ACHIEVEMENTS } from "../../data/schema";

const useStyles = makeStyles((theme) => ({
  selectedCategory: { color: theme.palette.primary.main },
  selectedIcon: { color: "inherit" },
}));

export const MainListItems = ({ section }) => {
  const classes = useStyles();
  return (
    <div>
      <NextLink href={`/profile`}>
        <ListItem button className={clsx({ [classes.selectedCategory]: "profile" === section })}>
          <ListItemIcon className={classes.selectedIcon}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={"Profile"} />
        </ListItem>
      </NextLink>
      {ACHIEVEMENTS.map((_category, index) => (
        <NextLink key={index} href={`/${_category.SCHEMA.key}`}>
          <ListItem
            button
            className={clsx({ [classes.selectedCategory]: _category.SCHEMA.key === section })}
          >
            <ListItemIcon className={classes.selectedIcon}>{_category.SCHEMA.icon}</ListItemIcon>
            <ListItemText primary={_category.SCHEMA.diplay_name} />
          </ListItem>
        </NextLink>
      ))}
    </div>
  );
};

export const secondaryListItems = (
  <div>
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
  </div>
);
