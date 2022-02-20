import { Component } from "react";
import Select from "react-select";
import { AugmentInteface } from "./augment_info/_base";
import { all_augments } from "./augment_info/_all_augments";
import { intToRoman } from "./util";

type Option = {
    label: string;
    value: string;
    aug?: AugmentInteface;
};

let options: Array<Option> = [];
all_augments.forEach((aug) => {
    const aug_level = intToRoman(aug.level);
    const label = `${aug.name} ${aug_level}`;
    const value = label;
    options.push({ label, value, aug });
});

class MultiSelect extends Component<any, any> {
    state = {
        selectedOption: null,
    };

    handleChange = (new_: Array<Option>) => {
        let sel_augs: Array<Option> = new_;
        this.setState({ selectedOption: sel_augs });

        if (sel_augs.length < 2) {
            return;
        }
        const new_aug = sel_augs.pop();
        const n_info = new_aug?.aug;

        let to_remove = [];
        for (let i = 0; i < sel_augs.length; i++) {
            const o_info = sel_augs[i]?.aug;

            // Remove duplicate name
            if (n_info?.name === o_info?.name) {
                to_remove.push(i);
            }
            // Remove duplicate in group, except basic
            else if (
                n_info?.group !== "BASIC" &&
                n_info?.group === o_info?.group
            ) {
                to_remove.push(i);
            }
            // If new group is "BASIC",
            // remove any "BASIC_FUSED"
            else if (
                n_info?.group === "BASIC" &&
                o_info?.group === "BASIC_FUSED"
            ) {
                to_remove.push(i);
            }
            // If new group is "BASIC_FUSED",
            // remove any"BASIC"
            else if (
                n_info?.group === "BASIC_FUSED" &&
                o_info?.group === "BASIC"
            ) {
                to_remove.push(i);
            }
        }

        // Removing index from the front
        // I use offset to adjust the index
        // Or Just do a reverse() then splice()?
        let offset = 0;
        to_remove.forEach((index) => {
            sel_augs.splice(index - offset, 1);
            offset++;
        });
        // add the popped item back to the array
        sel_augs.push(new_aug || { label: "", value: "" });

        // remove the first augment if the sixth is selected
        if (sel_augs.length > 5) {
            sel_augs.shift();
        }
        this.setState({ selectedAugs: sel_augs });
    };

    render() {
        const { selectedOption } = this.state;

        return (
            <Select
                value={selectedOption}
                // I'm not dealing with this
                onChange={this.handleChange}
                options={options}
                placeholder="No augment selected"
                closeMenuOnSelect={false}
                isMulti
            />
        );
    }
}

export default MultiSelect;
