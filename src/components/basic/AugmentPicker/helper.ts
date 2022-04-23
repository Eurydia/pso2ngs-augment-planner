import { AugmentData } from "../../../types";

// ---------------------------------------------
// for validating selected augments
export const validateAugments = (
    values: (string | AugmentData)[],
) => {
    let validated: AugmentData[] = [];
    for (let i = values.length - 1; i >= 0; i--) {
        const curr_value = values[i];

        if (typeof curr_value === "string") {
            continue;
        }
        let is_valid = true;

        for (const prev_value of validated) {
            // can't have the same name
            const same_name = curr_value.name === prev_value.name;
            // can't conflict with group
            const group_conflict = prev_value.conflict.includes(
                curr_value.group,
            );
            // exception for mastery
            const mastery_aug_exception =
                prev_value.group === "FUSED" &&
                curr_value.name === "mastery";
            if (
                same_name ||
                (group_conflict && !mastery_aug_exception)
            ) {
                is_valid = false;
                break;
            }
        }
        if (is_valid && validated.length < 5) {
            validated.push(curr_value);
        }
    }
    validated.reverse();
    return validated;
};
// ---------------------------------------------
