import { Tabs, Tab, useMediaQuery } from "@mui/material";
import TabLabel from "./TabLabel";
import { AllTabs, Device, TabColors } from "../constants";

type Props = {
  value: number;
  onChange: (event: React.SyntheticEvent, value: number) => void;
};

// const TABS = [
//   {
//     label: "All",
//     color: "primary.main",
//   },
//   {
//     label: "Personal",
//     color: "#388e3c",
//   },
//   {
//     label: "Work",
//     color: "#77637f",
//   },
//   {
//     label: "Others",
//     color: "#f57c00",
//   },
// ];

export default function NoteTabs({ value, onChange }: Props) {
  const isMobile = useMediaQuery(Device.Mobile);
  return (
    <Tabs
      value={value}
      onChange={onChange}
      variant={isMobile ? "scrollable" : "standard"}
      scrollButtons={isMobile ? "auto" : false}
      sx={{
        color: "text.primary",
        mb: 2,
        "& .MuiTab-root": {
          textTransform: "none",
          minWidth: isMobile ? 100 : "120px !important",
          fontSize: { xs: "0.8rem", sm: "1rem" },
          px: { xs: 1, sm: 2 },
        },
        "& .Mui-selected": {
          fontWeight: 600,
        },
      }}
    >
      {Object.values(AllTabs).map((tab, index) => {
        const isActiveTab = value === index;
        return (
          <Tab
            key={tab}
            label={
              <TabLabel
                indicatorColor={isActiveTab ? undefined : TabColors[tab]}
                label={tab}
                color={isActiveTab ? "text.activeTab" : "text.primary"}
              />
            }
            sx={{
              backgroundColor: isActiveTab ? TabColors[tab] : "transparent",
            }}
          />
        );
      })}
    </Tabs>
  );
}
