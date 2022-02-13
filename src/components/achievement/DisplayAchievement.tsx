import React, { Fragment } from "react";
import { Grid, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useUserContext } from "@contexts/UserContext";
import DisplayNode from "@components/nodes/DisplayNode";
import { ACHIEVEMENTS_SCHEMA_MAP } from "@data/schema";
import { deleteAchievementHandler } from "./handlers";
import AchievementCard from "./AchievementCard";

interface DisplayAchievementProps {
  achievementCategory: string;
  achievement: any;
  index: number;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  isAdmin: boolean;
}

const DisplayAchievement = ({
  achievementCategory,
  achievement,
  index,
  setIsEditing,
  expanded,
  setExpanded,
  isAdmin,
}: DisplayAchievementProps) => {
  const { user, setUser } = useUserContext();
  return (
    <Fragment>
      <AchievementCard
        {...{
          achievementIndex: index,
          achievement,
          achievementCategory,
          setIsEditing,
          expanded,
          setExpanded,
        }}
        cardActions={
          !isAdmin &&
          ACHIEVEMENTS_SCHEMA_MAP.get(achievementCategory).isCentral ? null : (
            <Fragment>
              <IconButton
                sx={{ pl: "1rem", pr: "1rem" }}
                color="primary"
                aria-label="edit"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                color="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteAchievementHandler(
                    user["profile"].employeeID,
                    achievement.id,
                    setUser,
                    achievementCategory
                  );
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Fragment>
          )
        }
        cardContent={
          <Grid container>
            {ACHIEVEMENTS_SCHEMA_MAP.get(achievementCategory).fields.map(
              (field, index) => {
                const value = achievement[field.db_field];

                return (
                  <Grid
                    item
                    {...{ xs: 12, sm: 12, md: 12, lg: 6 }}
                    key={field.db_field}
                  >
                    <DisplayNode field={field} value={value}></DisplayNode>
                  </Grid>
                );
              }
            )}
          </Grid>
        }
      />
    </Fragment>
  );
};

export default DisplayAchievement;
