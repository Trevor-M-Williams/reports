import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const DrawerFooter = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 1),
}));

export default function Menu() {
  const { logout } = useAuth();
  const router = useRouter();

  const open = false;
  const icons = [
    <AssignmentOutlinedIcon />,
    <AssessmentOutlinedIcon />,
    <SearchOutlinedIcon />,
    <SettingsOutlinedIcon />,
  ];

  async function handleLogout() {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Drawer
      variant="permanent"
      open={open}
      className="flex flex-col justify-between"
    >
      <div className="flex h-full flex-col justify-between">
        <div className="flex justify-center border-b py-4">
          <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-sky-500 font-bold text-white hover:border-sky-500 hover:bg-white hover:text-sky-500">
            LD
          </div>
        </div>

        <List>
          {["Reports", "Analytics", "Search", "Settings"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "rgb(14 165 233)",
                  }}
                >
                  {icons[index]}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <div className="flex justify-center border-t py-4">
          <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-sky-500 font-bold text-white hover:border-sky-500 hover:bg-white hover:text-sky-500">
            LO
          </div>
        </div>
      </div>
    </Drawer>
  );
}
