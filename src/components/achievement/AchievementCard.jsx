import React, { Fragment } from "react";
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
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import DisplayNode from "./../nodes/DisplayNode";
import { MASTER_SCHEMA } from "../../data/schema";
import { WIDTH_TYPE } from "../../data/types/types";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function AchievementCard({
  achievement,
  achievementIndex,
  achievementCategory,
  cardActions,
  cardContent,
  expanded,
  setExpanded,
}) {
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
          <Fragment>
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          </Fragment>
        }
        title={achievement[MASTER_SCHEMA[achievementCategory].display_title]}
        subheader={new Date(
          achievement[MASTER_SCHEMA[achievementCategory].display_date]
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
