import { AugmentData } from "../../types";

// ---------------------------------------------
/**
 * Validate augment selection.
 * @param values
 * @returns
 */
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
            // augment has the same name
            const same_name = curr_value.name === prev_value.name;
            // augment group conflict
            const group_conflict = prev_value.conflict.includes(
                curr_value.group,
            );
            // mastery and fused can be used together
            const fused_and_mastery_exception =
                (curr_value.name === "mastery" &&
                    prev_value.group === "fused") ||
                (curr_value.group === "fused" &&
                    prev_value.name === "mastery");
            if (
                same_name ||
                (group_conflict && !fused_and_mastery_exception)
            ) {
                is_valid = false;
                break;
            }
        }
        if (is_valid && validated.length < 5) {
            validated.push(curr_value);
        }
    }
    // I iterated over the array from the back so I have to put it back.
    validated.reverse();
    return validated;
};
// ---------------------------------------------
