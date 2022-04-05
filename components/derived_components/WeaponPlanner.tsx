import { Component } from "react";
import { MultiValue, SingleValue } from "react-select";

import WeaponSelector, {
    WeaponSelectorOption,
} from "../base_components/WeaponSelector";
import AugmentSelector, {
    AugmentSelectorOption,
} from "../base_components/AugmentSelector";

import StatsDisplay, {
    StatsDisplayValue,
} from "../base_components/StatsDisplay";

type UnitPlannerProps = {
    _id: string;
    plannerName: string;
    augmentValue: AugmentSelectorOption[];
    weaponValue: WeaponSelectorOption | undefined;
    stats: StatsDisplayValue;
    onAugmentChange: Function;
    onWeaponChange: Function;
};

class UnitPlanner extends Component<UnitPlannerProps, {}> {
    constructor(props: UnitPlannerProps) {
        super(props);
        this.handleAugmentChange = this.handleAugmentChange.bind(this);
        this.handleWeaponChange = this.handleWeaponChange.bind(this);
    }

    handleAugmentChange(values: MultiValue<AugmentSelectorOption>) {
        this.props.onAugmentChange(values, this.props._id);
    }

    handleWeaponChange(values: SingleValue<WeaponSelectorOption>) {
        this.props.onWeaponChange(values, this.props._id);
    }

    render() {
        const { _id, plannerName, augmentValue, weaponValue, stats } =
            this.props;
        return (
            <div className="grid gap-2 p-4 text-xl bg-white/80 rounded-lg shadow-lg shadow-gray-500/80">
                <div className="font-bold">{plannerName} config</div>
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
