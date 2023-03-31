import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "./TabPanel";

interface Props {
  panels: {
    label: string;
    content: React.ReactNode;
  }[];
}

export default function TabedContainer(props: Props) {
  const { panels } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          classes={{
            flexContainer: "w-full justify-end",
          }}
        >
          {panels.map((panel, index) => (
            <Tab label={panel.label} {...a11yProps(index)} key={index} />
          ))}
        </Tabs>
      </Box>
      {panels.map((panel, index) => (
        <TabPanel value={value} index={index} key={index}>
          {panel.content}
        </TabPanel>
      ))}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
