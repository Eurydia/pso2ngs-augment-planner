import { ReactNode, memo } from "react";

import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

interface TabComboProps {
    labels: { icon?: JSX.Element; text: string }[];
    children: ReactNode[] | ReactNode;
    value: number;
    onTabChange: (value: number) => void;
}
const TabCombo = (props: TabComboProps) => {
    const tab_labels = props.labels.map((label, index) => {
        return (
            <Tab
                key={`${index}${index}`}
                icon={label.icon}
                iconPosition="start"
                label={label.text}
                value={index}
            />
        );
    });
    let child_to_render = props.children;
    if (Array.isArray(props.children)) {
        child_to_render = props.children[props.value];
    }
    return (
        <Stack spacing={2}>
            <Tabs
                value={props.value}
                onChange={(e, v) => props.onTabChange(v)}
            >
                {tab_labels}
            </Tabs>
            {child_to_render}
        </Stack>
    );
};
export default TabCombo;
