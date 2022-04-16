import TextField from "@mui/material/TextField";
import useTheme from "@mui/material/styles/useTheme";

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
    const theme = useTheme();
    let color: "primary" | "warning" = "primary";
    if (props.value === "") {
        color = "warning";
    }
    return (
        <TextField
            required
            variant="filled"
            label="Name"
            color={color}
            helperText={`(max ${props.maxLength} characters)`}
            value={props.value}
            onChange={(e) => {
                const value = e.target.value
                    .normalize()
                    .slice(0, props.maxLength);
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
            value={props.value}
            onChange={(e) => {
                const value = e.target.value
                    .normalize()
                    .slice(0, props.maxLength);
                props.onChange(value);
            }}
        />
    );
};
