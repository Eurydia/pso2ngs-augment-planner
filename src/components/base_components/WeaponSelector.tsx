import { Component } from "react";
import Select, { SingleValue } from "react-select";
import Weapon, { WeaponGroup } from "../info/weapon/_base";
import ALL_WEAPON from "../info/weapon/_all";
import NON_ELEMENTAL from "../info/weapon/non_elemental";

// -------------------------------------------------------------------------
// Helper functions to help create select options
function unitToSelectOption(weapon: Weapon): WeaponSelectorOption {
    return {
        label: weapon.name,
        value: weapon,
    };
}

function augGroupToSelectOptionGroup(
    weapon_group: WeaponGroup,
): WeaponSelectorOptionGroup {
    return {
        label: `${weapon_group.name} weapons`,
        options: weapon_group.weapons.map((weapon) => {
            return unitToSelectOption(weapon);
        }),
    };
}
// -------------------------------------------------------------------------

// -------------------------------------------------------------------------
export type WeaponSelectorOption = {
    label: string;
    value: Weapon;
};

type WeaponSelectorOptionGroup = {
    label: string;
    options: WeaponSelectorOption[];
};
// convert unit gruops to select option groups
const OPTIONS = ALL_WEAPON.map((weapon_group) => {
    return augGroupToSelectOptionGroup(weapon_group);
});
// -------------------------------------------------------------------------

// -------------------------------------------------------------------------
// component definition starts here
type WeaponSelectorProps = {
    _id: string;
    value: WeaponSelectorOption | undefined;
    onOptionChange: Function;
};

class WeaponSelector extends Component<WeaponSelectorProps, {}> {
    constructor(props: WeaponSelectorProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value: SingleValue<WeaponSelectorOption>) {
        this.props.onOptionChange(value);
    }

    render() {
        const { _id, value } = this.props;
        return (
            <div>
                <label htmlFor={_id}>Select your weapon.</label>
                <Select
                    id={_id}
                    value={value}
                    defaultValue={unitToSelectOption(
                        NON_ELEMENTAL.weapons[0],
                    )}
                    options={OPTIONS}
                    isMulti={false}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

export default WeaponSelector;
