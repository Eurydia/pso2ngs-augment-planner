import { Component } from "react";
import Select, { MultiValue } from "react-select";
import { GROUP as BASIC_GROUP } from "./augment_info/basic";
import { GROUP as BASIC_FUSED_GROUP } from "./augment_info/basic_fused";
import { Option, OptionGroup, NEVER_OPTION } from "./_util";

// // Turning augments into options in option group
// let options_group: Array<OptionGroup> = [];
// all_augments.forEach((group) => {
//     let opts: Array<Option> = [];

//     const AUGS = group.augments;
//     AUGS.forEach((aug) => {
//         const lvl_roman = intToRoman(aug.level);
//         const label = `${aug.name} ${lvl_roman}`;
//         const value = label;
//         opts.push({ label, value, aug });
//     });

//     options_group.push({
//         label: group.group.replace("_", " "),
//         options: opts,
//     });
// });

function isSame(aug_one: string, aug_two: string): boolean {
    return aug_one === aug_two;
}

function checkOptions(new_opt: MultiValue<Option>): Array<Option> {
    let selected: Array<Option> = [];
    new_opt.forEach((opt) => {
        selected.push(opt);
    });

    if (selected.length < 2) {
        return selected;
    }

    const NEWEST = selected.pop() || NEVER_OPTION;
    const NEW_AUG = NEWEST.aug;
    const NEW_AUG_NAME = NEW_AUG.name;
    const NEW_AUG_GROUP = NEW_AUG.group;

    let to_remove: Array<number> = [];
    for (let i = 0; i < selected.length; i++) {
        const PREVIOUS_AUG = selected[i].aug;
        const PREVIOUS_AUG_NAME = PREVIOUS_AUG.name;
        const PREVIOUS_AUG_GROUP = PREVIOUS_AUG.group;

        // check same name
        const IS_SAME_NAME = isSame(NEW_AUG_NAME, PREVIOUS_AUG_NAME);

        // Check same group except "BASIC"
        const IS_SAME_GROUP =
            isSame(NEW_AUG_GROUP, PREVIOUS_AUG_GROUP) &&
            !isSame(NEW_AUG_GROUP, BASIC_GROUP);

        // If new group is "BASIC",
        // remove any "BASIC_FUSED"
        const IS_BASIC_ON_FUSED =
            isSame(NEW_AUG_GROUP, BASIC_GROUP) &&
            isSame(PREVIOUS_AUG_GROUP, BASIC_FUSED_GROUP);

        // If new group is "BASIC_FUSED",
        // remove any "BASIC"
        const IS_FUSED_ON_BASIC =
            isSame(NEW_AUG_GROUP, BASIC_FUSED_GROUP) &&
            isSame(PREVIOUS_AUG_GROUP, BASIC_GROUP);

        if (
            IS_SAME_NAME ||
            IS_SAME_GROUP ||
            IS_BASIC_ON_FUSED ||
            IS_FUSED_ON_BASIC
        ) {
            to_remove.push(i);
        }
    }

    // Removing index from the front
    // I use offset to adjust the index
    // Or Just do a reverse() then splice()?
    let offset = 0;
    to_remove.forEach((index) => {
        selected.splice(index - offset, 1);
        offset++;
    });

    // add the popped item back to the array
    selected.push(NEWEST);

    // remove the first augment if the sixth is selected
    if (selected.length > 5) {
        selected.shift();
    }
    return selected;
}

type AugmentMultiSelectProps = {
    id: string;
    classname: string;
    placeholder: string;
    options: Array<OptionGroup>;
};

class AugmentMultiSelect extends Component<
    AugmentMultiSelectProps,
    {
        selectedOption: null | Array<Option>;
        augmentEffects: null;
    }
> {
    constructor(props: AugmentMultiSelectProps) {
        super(props);
        this.state = {
            selectedOption: null,
            augmentEffects: null,
        };
    }

    handleChange = (options: MultiValue<Option>) => {
        this.setState({ selectedOption: checkOptions(options) });
    };

    updateDisplay = () => {
        const OPTIONS = this.state.selectedOption || [NEVER_OPTION];
        let augments_effects: { [key: string]: number } = {};
        OPTIONS.forEach((opt) => {
            opt.aug.effects.forEach((eff) => {
                const { name, amount } = eff;

                if (!(name in augments_effects)) {
                    augments_effects[name] = amount;
                } else {
                    if (Number.isInteger(amount)) {
                        augments_effects[name] =
                            augments_effects[name] + amount;
                    } else {
                        augments_effects[name] =
                            augments_effects[name] * amount;
                    }
                }
            });
        });
        console.log(augments_effects);
    };

    render() {
        const { selectedOption } = this.state;

        return (
            <Select
                id={this.props.id}
                className={this.props.classname}
                placeholder={this.props.placeholder}
                options={this.props.options}
                value={selectedOption}
                onChange={this.handleChange}
                isMulti
            />
        );
    }
}

export default AugmentMultiSelect;
