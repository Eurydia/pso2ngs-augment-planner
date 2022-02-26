import { Component } from "react";
import { MultiValue, SingleValue } from "react-select";

import UnitSelector, {
    UnitSelectorOption,
} from "../base_components/UnitSelector";

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
    unitValue: UnitSelectorOption | undefined;
    stats: StatsDisplayValue;
    onAugmentChange: Function;
    onUnitChange: Function;
};

class UnitPlanner extends Component<UnitPlannerProps, {}> {
    constructor(props: UnitPlannerProps) {
        super(props);
        this.handleAugmentChange = this.handleAugmentChange.bind(this);
        this.handleUnitChange = this.handleUnitChange.bind(this);
    }

    handleAugmentChange(values: MultiValue<AugmentSelectorOption>) {
        this.props.onAugmentChange(values, this.props._id);
    }

    handleUnitChange(values: SingleValue<UnitSelectorOption>) {
        this.props.onUnitChange(values, this.props._id);
    }

    render() {
        const { _id, plannerName, augmentValue, unitValue, stats } =
            this.props;
        return (
            <div className="grid gap-2 p-4 text-xl bg-white/80 rounded-lg shadow-lg shadow-gray-500/80">
                <div className="font-bold">{plannerName} config</div>
                <UnitSelector
                    _id={`${_id}-unit-selector`}
                    value={unitValue}
                    onOptionChange={this.handleUnitChange}
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
