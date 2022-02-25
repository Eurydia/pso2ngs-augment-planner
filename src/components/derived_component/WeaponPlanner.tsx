import { Component } from "react";
import { MultiValue, SingleValue } from "react-select";

import WeaponSelector, {
    WeaponSelectorOption,
} from "../base_component/WeaponSelector";
import AugmentSelector, {
    AugmentSelectorOption,
} from "../base_component/AugmentSelector";

import StatsDisplay, {
    StatsDisplayValue,
} from "../base_component/StatsDisplay";

type UnitPlannerProps = {
    _id: string;
    augmentValue: AugmentSelectorOption[];
    weaponValue: WeaponSelectorOption | undefined;
    stats: StatsDisplayValue;
    onAugmentChange: Function;
    onWeaponChange: Function;
};

class UnitPlanner extends Component<UnitPlannerProps, {}> {
    constructor(props: UnitPlannerProps) {
        super(props);
        this.handleAugmentChange =
            this.handleAugmentChange.bind(this);
        this.handleWeaponChange = this.handleWeaponChange.bind(this);
    }

    handleAugmentChange(values: MultiValue<AugmentSelectorOption>) {
        this.props.onAugmentChange(values, this.props._id);
    }

    handleWeaponChange(values: SingleValue<WeaponSelectorOption>) {
        this.props.onWeaponChange(values, this.props._id);
    }

    render() {
        const { _id, augmentValue, weaponValue, stats } = this.props;
        return (
            <div>
                <WeaponSelector
                    _id={`${_id}-unit-selector`}
                    value={weaponValue}
                    onOptionChange={this.handleWeaponChange}
                />
                <AugmentSelector
                    _id={`${_id}-augment-selector`}
                    values={augmentValue}
                    onOptionChange={this.handleAugmentChange}
                />
                <StatsDisplay stats={stats} />
            </div>
        );
    }
}

export default UnitPlanner;
