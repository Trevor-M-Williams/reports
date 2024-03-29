import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";

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

export default function Menu() {
  const { logout } = useAuth();
  const router = useRouter();

  const open = false;
  const icons = [
    <AssignmentOutlinedIcon key={0} />,
    <AssessmentOutlinedIcon key={1} />,
    <SearchOutlinedIcon key={2} />,
    <SettingsOutlinedIcon key={3} />,
  ];

  async function handleLogout() {
    try {
      await logout();
      router.push("/login");
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
          <div className="flex h-8 w-8 select-none items-center justify-center rounded-full bg-sky-500 font-bold text-white">
            LD
          </div>
        </div>

        <List>
          {["Reports", "Analytics", "Search", "Settings"].map((text, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
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
          <LogoutIcon
            onClick={handleLogout}
            className="cursor-pointer text-sky-500"
          />
        </div>
      </div>
    </Drawer>
  );
}
