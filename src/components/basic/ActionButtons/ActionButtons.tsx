import { Fragment } from "react";

import useTheme from "@mui/material/styles/useTheme";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import Edit from "@mui/icons-material/Edit";
import CopyAll from "@mui/icons-material/CopyAll";
import Delete from "@mui/icons-material/Delete";
import Download from "@mui/icons-material/Download";

// -------------------------------------------------------
// icon with tool tip
interface IconWithTooltipProps {
    icon: React.ReactElement;
    title: string;
    onClick: () => void;
}
const IconWithTooltip = (props: IconWithTooltipProps) => {
    return (
        <Tooltip title={props.title}>
            <IconButton size="medium" onClick={props.onClick}>
                {props.icon}
            </IconButton>
        </Tooltip>
    );
};
// -------------------------------------------------------

// -------------------------------------------------------
interface ActionButtonProps {
    onEdit: () => void;
    onDuplicate: () => void;
    onExport: () => void;
    onDelete: () => void;
}
const ActionButtons = (props: ActionButtonProps) => {
    const theme = useTheme();
    const icon_sx = {
        color: theme.palette.primary.light,
    };
    const delete_sx = {
        color: theme.palette.secondary.main,
    };

    return (
        <Fragment>
            <IconWithTooltip
                onClick={props.onEdit}
                title="Edit"
                icon={<Edit sx={icon_sx} />}
            />
            <IconWithTooltip
                onClick={props.onDuplicate}
                title="Duplicate"
                icon={<CopyAll sx={icon_sx} />}
            />
            <IconWithTooltip
                onClick={props.onExport}
                title="Save"
                icon={<Download sx={icon_sx} />}
            />
            <IconWithTooltip
                onClick={props.onDelete}
                title="Delete"
                icon={<Delete sx={delete_sx} />}
            />
        </Fragment>
    );
};
export default ActionButtons;
