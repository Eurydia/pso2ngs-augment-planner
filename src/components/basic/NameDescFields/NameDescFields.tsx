import React from "react";

import TextField from "@mui/material/TextField";

// ----------------------------------------------
interface InputProps {
    value: string;
    maxLength: number;
    rows?: number;
    onChange: (value: string) => void;
}
const NameField = (props: InputProps) => {
    let color: "primary" | "warning" = "primary";
    if (props.value === "") {
        color = "warning";
    }
    return (
        <TextField
            required
            variant="filled"
            label="Name"
            helperText={`(max ${props.maxLength} characters)`}
            value={props.value}
            color={color}
            onChange={(e) => {
                const value = e.target.value.slice(
                    0,
                    props.maxLength,
                );
                props.onChange(value);
            }}
        />
    );
};
const DescField = (props: InputProps) => {
    return (
        <TextField
            multiline
            rows={props.rows || 5}
            variant="filled"
            label="Description"
            helperText={`(max ${props.maxLength} characters)`}
            value={props.value}
            onChange={(e) => {
                const value = e.target.value.slice(
                    0,
                    props.maxLength,
                );
                props.onChange(value);
            }}
        />
    );
};
// ----------------------------------------------

// ----------------------------------------------
interface NameDescFieldsProps {
    nameValue: string;
    nameLength: number;
    onNameChange: (value: string) => void;
    descValue: string;
    descRows?: number;
    descLength: number;
    onDescChange: (value: string) => void;
}
const NameDescFields = (props: NameDescFieldsProps) => {
    return (
        <React.Fragment>
            <NameField
                value={props.nameValue}
                maxLength={props.nameLength}
                onChange={props.onNameChange}
            />
            <DescField
                value={props.descValue}
                maxLength={props.descLength}
                onChange={props.onDescChange}
                rows={props.descRows}
            />
        </React.Fragment>
    );
};
export default NameDescFields;
// ----------------------------------------------
