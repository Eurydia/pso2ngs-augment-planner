import { Component } from "react";
import Select, { SingleValue } from "react-select";
import Weapon, { WeaponGroup } from "../info/weapon/_base";
import ALL_WEAPON from "../info/weapon/_all";
import NO_WEAPON from "../info/weapon/no_weapon";

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

const STYLE = {
    labelText: "👉Select your weapon.",
    className: "text-lg capitalize text-left",
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
        const { labelText, className } = STYLE;
        return (
            <div>
                <label htmlFor={_id}>{labelText}</label>
                <Select
                    id={_id}
                    value={value}
                    defaultValue={unitToSelectOption(NO_WEAPON.weapons[0])}
                    options={OPTIONS}
                    className={className}
                    isMulti={false}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

export default WeaponSelector;