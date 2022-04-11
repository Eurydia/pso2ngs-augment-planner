import StyledAutocompleteOption from "../StyledAutocompleteOption";
import { convertToRoman, AugmentData } from "../util";

// ---------------------------------------------
// For rendering options on dropdown
export const renderOption = (props: any, option: AugmentData) => {
    const roman_level = convertToRoman(option.level);
    let name = option.name;
    if (roman_level !== "") {
        name += ` ${roman_level}`;
    }
    const { effs, condition } = option;
    return (
        <StyledAutocompleteOption
            s_props={props}
            name={name}
            effs={effs}
            condition={condition}
            key={name}
        />
    );
};
// ---------------------------------------------

// ---------------------------------------------
// For rendering input on input field
export const getOptionLabel = (option: AugmentData) => {
    return `${option.name} ${convertToRoman(option.level)}`;
};
// ---------------------------------------------

// ---------------------------------------------
// for validating selected augments
export const validateValues = (values: (string | AugmentData)[]) => {
    let _values: AugmentData[] = [];
    for (let i = values.length - 1; i >= 0; i--) {
        const current_value = values[i];

        if (typeof current_value === "string") {
            continue;
        }

        let is_valid = true;
        for (let j = 0; j < _values.length; j++) {
            const previous_value = _values[j];
            if (
                current_value.name === previous_value.name ||
                previous_value.conflict.includes(current_value.group)
            ) {
                is_valid = false;
                break;
            }
        }
        if (is_valid && _values.length < 5) {
            _values.push(current_value);
        }
    }
    _values.reverse();
    return _values;
};
// ---------------------------------------------
