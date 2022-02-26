import { Component } from "react";
import Select, { SingleValue } from "react-select";
import Unit, { UnitGroup } from "../info/unit/_base";
import ALL_UNITS from "../info/unit/_all";
import ZERO_STAR_UNTIS from "../info/unit/zero_star";

// -------------------------------------------------------------------------
// Helper functions to help create select options
function unitToSelectOption(unit: Unit): UnitSelectorOption {
    return {
        label: unit.name,
        value: unit,
    };
}

function augGroupToSelectOptionGroup(
    unit_group: UnitGroup,
): UnitSelectorOptionGroup {
    return {
        label: `${unit_group.rarity}* Units`,
        options: unit_group.units.map((unit) => {
            return unitToSelectOption(unit);
        }),
    };
}
// -------------------------------------------------------------------------

// -------------------------------------------------------------------------
export type UnitSelectorOption = {
    label: string;
    value: Unit;
};

type UnitSelectorOptionGroup = {
    label: string;
    options: UnitSelectorOption[];
};
// convert unit gruops to select option groups
const OPTIONS = ALL_UNITS.map((unit_group) => {
    return augGroupToSelectOptionGroup(unit_group);
});
// -------------------------------------------------------------------------

// -------------------------------------------------------------------------
// component definition starts here
type UnitSelectorProps = {
    _id: string;
    value: UnitSelectorOption | undefined;
    onOptionChange: Function;
};

class UnitSelector extends Component<UnitSelectorProps, {}> {
    constructor(props: UnitSelectorProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value: SingleValue<UnitSelectorOption>) {
        this.props.onOptionChange(value);
    }

    render() {
        const { _id, value } = this.props;
        return (
            <div>
                <label htmlFor={_id} className="text-xl">
                    Select your unit.
                </label>
                <Select
                    id={_id}
                    value={value}
                    defaultValue={unitToSelectOption(
                        ZERO_STAR_UNTIS.units[0],
                    )}
                    options={OPTIONS}
                    isMulti={false}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

export default UnitSelector;
