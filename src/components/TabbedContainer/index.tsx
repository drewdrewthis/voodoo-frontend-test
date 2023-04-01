import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "./TabPanel";

interface Props {
  panels: {
    label: string;
    content: React.ReactNode;
  }[];
  value?: number;
  onTabChange: (newValue: number) => void;
}

export default function TabedContainer(props: Props) {
  const { panels, value, onTabChange } = props;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    onTabChange(newValue);
  };

  return (
    <div className="h-full flex flex-col">
      <Tabs
        className="mb-5"
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        {panels.map((panel, index) => (
          <Tab label={panel.label} {...a11yProps(index)} key={index} />
        ))}
      </Tabs>
      {panels.map((panel, index) => (
        <TabPanel value={value} index={index} key={index}>
          {panel.content}
        </TabPanel>
      ))}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
