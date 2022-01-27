import { signIn, signOut, useSession, getSession } from "next-auth/client";
import React, { Fragment } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import {
  Box,
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  Toolbar,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import MainList from "../../../src/components/admin/sidebar/MainList";
import SecondaryList from "../../../src/components/admin/sidebar/SecondaryList";
import Dashboard from "../../../src/components/admin/dashboard/Dashboard";
import CreateUser from "../../../src/components/admin/createUser/CreateUser";
import DeleteUser from "../../../src/components/admin/deleteUser/DeleteUser";
import Copyright from "../../../src/components/copyright/Copyright";
import {
  CENTRAL_ACHIEVEMENTS_SCHEMA_MAP,
  getAchievementValidationSchema,
} from "../../../src/data/schema";
import Achievements from "../../../src/components/achievement/Achievements";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Test() {
  const router = useRouter();
  const { section }: { section: string } = router.query;
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const memoizedMainViewComponents = React.useMemo(() => {
    if (section === "dashboard") return <Dashboard />;
    if (section === "create-user")
      return (
        <Container maxWidth="lg">
          <CreateUser />
        </Container>
      );
    if (section === "delete-user")
      return (
        <Container maxWidth="lg">
          <DeleteUser />
        </Container>
      );

    if (CENTRAL_ACHIEVEMENTS_SCHEMA_MAP.has(section))
      return (
        <Achievements
          key={section}
          achievementCategory={section}
          getAchievementValidationSchema={getAchievementValidationSchema(
            section
          )}
          isAdmin={true}
        />
      );
  }, [section]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar
          sx={{
            flexDirection: "row",
            alignContent: "space-between",
          }}
        >
          <IconButton
            color="secondary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {"FACULTY BOOK"}
          </Typography>
          <IconButton
            color="inherit"
            onClick={() => {
              signOut();
            }}
          >
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <MainList {...{ section }} />
        <Divider />
        <SecondaryList section={section} />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, px: 1, py: 2 }}>
        <DrawerHeader />
        {memoizedMainViewComponents}
        {/*        <Copyright sx={{ mt: 10 }} /> */}
      </Box>
    </Box>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    return {
      props: { session },
    };
  }
}
