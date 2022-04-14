import TextField from "@mui/material/TextField";
import React from "react";

interface PresetInputProps {
    value: string;
    color?:
        | "error"
        | "primary"
        | "secondary"
        | "info"
        | "success"
        | "warning";
    maxLength: number;
    onChange: (value: string) => void;
}
export const NameInputField = (props: PresetInputProps) => {
    let color: "primary" | "warning" = "primary";
    if (props.value === "") {
        color = "warning";
    }
    return (
        <TextField
            color={color}
            required
            variant="filled"
            label="Name"
            helperText={`(max ${props.maxLength} characters)`}
            value={props.value}
            onChange={(e) => {
                const value = e.target.value
                    .normalize()
                    .substring(0, props.maxLength);
                props.onChange(value);
            }}
        />
    );
};

export const DescInputField = (props: PresetInputProps) => {
    return (
        <TextField
            multiline
            rows={5}
            variant="filled"
            label="Description"
            helperText={`(max ${props.maxLength} characters)`}
            // color={props.color}
            value={props.value}
            onChange={(e) => {
                const value = e.target.value
                    .normalize()
                    .substring(0, props.maxLength);
                props.onChange(value);
            }}
        />
    );
};
