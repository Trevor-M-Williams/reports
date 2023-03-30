import { useState, useContext, useEffect } from "react";
import { ReportsContext } from "../contexts/ReportsContext";
import { deleteReport, postReport } from "../../firebase";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function InfoPanel() {
  const { reports, currentReport, setCurrentReport, statusColors } =
    useContext(ReportsContext);
  const [editing, setEditing] = useState(false);
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const drawerWidth = isMobile ? "100%" : 400;

  const details = [
    ["name", "title"],
    ["URL", "url"],
    ["category", "category"],
    ["email", "email"],
    ["phone", "phoneNumber"],
    ["rating", "rating"],
    ["reviews", "reviewCount"],
  ];

  const scores = [
    ["P", "performance"],
    ["A", "accessibility"],
    ["BP", "bestPractices"],
    ["SEO", "seo"],
  ];

  const handleDrawerClose = () => {
    setCurrentReport(false);
  };

  const handleChevron = (direction) => {
    let index = reports.findIndex((r) => r.title === currentReport.title);
    if (direction === "left") {
      if (index === 0) {
        setCurrentReport(reports[reports.length - 1]);
      } else {
        setCurrentReport(reports[index - 1]);
      }
    } else {
      if (index === reports.length - 1) {
        setCurrentReport(reports[0]);
      } else {
        setCurrentReport(reports[index + 1]);
      }
    }
  };

  return (
    <Drawer
      sx={{
        position: "absolute",
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
        },
      }}
      variant="persistent"
      anchor="right"
      open={currentReport}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          <CloseRoundedIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />

      <div className="px-2">
        {currentReport && (
          <div className="flex h-full w-full flex-col">
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center">
                <div className="my-4 text-xl font-bold">
                  {currentReport.title}
                </div>
              </div>
              <div className="flex w-20 items-center justify-between">
                <ChevronLeftIcon onClick={() => handleChevron("left")} />
                <div
                  className={` h-5 w-5 cursor-pointer rounded-full border-2 border-white outline outline-1 outline-gray-700 ${
                    statusColors[currentReport.status]
                  }`}
                ></div>
                <ChevronRightIcon onClick={() => handleChevron("right")} />
              </div>
            </div>

            <div className="mx-auto mt-6 flex w-full flex-col text-xs md:text-base">
              {details.map((detail, i) => {
                const label = detail[0];
                const key = detail[1];
                let textTransform = "";
                if (key === "email") textTransform = "normal-case";
                return (
                  <div className={`flex border-b capitalize`} key={i}>
                    <div className="ml-2 w-1/4 border-r py-1 font-medium md:ml-4">
                      {label}:
                    </div>
                    <input
                      className={`flex w-full select-none pl-2 focus:outline-0 md:pl-4 ${textTransform} ${
                        editing ? "" : "pointer-events-none"
                      }`}
                      value={currentReport[key] || ""}
                      onChange={(e) => handleInputChange(e, key)}
                      readOnly={editing ? false : true}
                    />
                  </div>
                );
              })}
            </div>

            <div className="mt-8">
              {scores.map((score, i) => {
                const label = score[0];
                const key = score[1];
                return (
                  <div className={`flex border-b capitalize`} key={i}>
                    <div className="ml-2 w-1/4 border-r py-1 font-medium md:ml-4">
                      {label}:
                    </div>
                    <input
                      className={`flex w-full select-none pl-2 focus:outline-0 md:pl-4 ${
                        editing ? "" : "pointer-events-none"
                      }`}
                      value={Math.round(currentReport[key] * 100) || ""}
                      onChange={(e) => handleInputChange(e, key)}
                      readOnly={editing ? false : true}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
}
