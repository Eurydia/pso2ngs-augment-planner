import { Component } from "react";
import Select, { MultiValue } from "react-select";

import Augment, { AugmentGroup } from "../info/augment/_base";
import { GROUP as BASIC_GROUP } from "../info/augment/basic";
import { GROUP as BASIC_FUSED_GROUP } from "../info/augment/basic_fused";
import ALL_AUGMENTS from "../info/augment/_all";

// -------------------------------------------------------------------------
// Helper functions to help create select options
function intToRoman(num: number): string {
    const MAP: { [key: string]: number } = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1,
    };
    let result: string = "";
    for (const key in MAP) {
        const repeatCounter = Math.floor(num / MAP[key]);

        if (repeatCounter !== 0) {
            result += key.repeat(repeatCounter);
        }

        num %= MAP[key];

        if (num === 0) return result;
    }
    return result;
}

function augToSelectOption(aug: Augment): AugmentSelectorOption {
    return {
        label: `${aug.name} ${intToRoman(aug.level)}`,
        value: aug,
    };
}

function augGroupToSelectOptionGroup(
    aug_group: AugmentGroup,
): AugmentSelectorOptionGroup {
    const { name, augments } = aug_group;

    let formatted_name = `${name.replaceAll("_", " ")} augments`;
    if (name === BASIC_FUSED_GROUP) {
        formatted_name = `${formatted_name} (${BASIC_GROUP})`;
    }

    return {
        label: formatted_name,
        options: augments.map((aug) => {
            return augToSelectOption(aug);
        }),
    };
}
// --------------------------------------------------------------------------

// --------------------------------------------------------------------------
export type AugmentSelectorOption = {
    label: string;
    value: Augment;
};

type AugmentSelectorOptionGroup = {
    label: string;
    options: AugmentSelectorOption[];
};

// convert augment gruops to select option groups
const OPTIONS: AugmentSelectorOptionGroup[] = ALL_AUGMENTS.map(
    (aug_group) => {
        return augGroupToSelectOptionGroup(aug_group);
    },
);
// --------------------------------------------------------------------------

// --------------------------------------------------------------------------
// component definition starts here
type AugmentSelectorProps = {
    _id: string;
    values: AugmentSelectorOption[];
    onOptionChange: Function;
};

class AugmentSelector extends Component<AugmentSelectorProps, {}> {
    constructor(props: AugmentSelectorProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(values: MultiValue<AugmentSelectorOption>) {
        this.props.onOptionChange(values);
    }

    render() {
        const { _id, values } = this.props;

        return (
            <div>
                <label htmlFor={_id}>Select your augments.</label>
                <Select
                    value={values}
                    options={OPTIONS}
                    id={_id}
                    placeholder="No augment"
                    onChange={this.handleChange}
                    isMulti={true}
                />
            </div>
        );
    }
}

export default AugmentSelector;
