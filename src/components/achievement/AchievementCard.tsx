import React from "react";
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { ACHIEVEMENTS_SCHEMA_MAP } from "@data/schema";

const ExpandMore = styled((props: any) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface AchievementCardProps {
  achievement: any;
  achievementIndex: number;
  achievementCategory: string;
  cardActions: JSX.Element;
  cardContent: JSX.Element;
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AchievementCard({
  achievement,
  achievementIndex,
  achievementCategory,
  cardActions,
  cardContent,
  expanded,
  setExpanded,
}: AchievementCardProps) {
  return (
    <Card
      sx={{
        // maxWidth: 345
        width: "100%",
        m: 2,
        boxShadow: 15,
        borderRadius: 5,
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "secondary.main" }} aria-label="index number">
            {achievementIndex + 1}
          </Avatar>
        }
        action={
          <React.Fragment>
            <IconButton
              aria-label="settings"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertIcon />
            </IconButton>
          </React.Fragment>
        }
        title={
          achievement[
            ACHIEVEMENTS_SCHEMA_MAP.get(achievementCategory).display_title
          ]
        }
        subheader={new Date(
          achievement[
            ACHIEVEMENTS_SCHEMA_MAP.get(achievementCategory).display_date
          ]
        ).toDateString()}
        onClick={() => {
          setExpanded((state) => !state);
        }}
        sx={{ cursor: "pointer" }}
      />
      {/* <CardMedia
        component="img"
        height="194"
        image="https://source.unsplash.com/random"
        alt="Paella dish"
      /> */}
      {/*  <CardContent>
               <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography> 
      </CardContent> */}
      <CardActions
        disableSpacing
        onClick={() => {
          setExpanded((state) => !state);
        }}
        sx={{ cursor: "pointer" }}
      >
        {cardActions}
        <ExpandMore
          expand={expanded}
          onClick={(e) => {
            e.stopPropagation();
            setExpanded((state) => !state);
          }}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>{cardContent}</CardContent>
      </Collapse>
    </Card>
  );
}
