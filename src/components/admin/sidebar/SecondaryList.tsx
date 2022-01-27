import React from "react";
import NextLink from "next/link";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";

import { CENTRAL_ACHIEVEMENTS_SCHEMA_MAP } from "../../../data/schema";

export default function SecondaryList({ section }: { section: string }) {
  return (
    <List>
      <ListSubheader inset>General</ListSubheader>
      {Array.from(CENTRAL_ACHIEVEMENTS_SCHEMA_MAP).map(
        ([_, _schema], index) => (
          <NextLink key={index} href={`/admin/${_schema.key}`}>
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
        )
      )}
    </List>
  );
}
