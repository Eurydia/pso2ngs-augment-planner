import React from "react";
import TextField from "@mui/material/TextField";

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
    rows?: number;
    onChange: (value: string) => void;
}

export const NameInputField = React.memo(
    (props: PresetInputProps) => {
        let color: "primary" | "warning" = "primary";
        if (props.value === "") {
            color = "warning";
        }

        const handleChange = (
            e: React.ChangeEvent<
                HTMLTextAreaElement | HTMLInputElement
            >,
        ) => {
            const value = e.target.value.slice(0, props.maxLength);
            props.onChange(value);
        };

        return (
            <TextField
                required
                variant="filled"
                label="Name"
                helperText={`(max ${props.maxLength} characters)`}
                value={props.value}
                color={color}
                onChange={handleChange}
            />
        );
    },
);

export const DescInputField = React.memo(
    (props: PresetInputProps) => {
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
    },
);
