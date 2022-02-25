import { Component } from "react";
import { MultiValue, SingleValue } from "react-select";

import UnitSelector, {
    UnitSelectorOption,
} from "../base_component/UnitSelector";

import AugmentSelector, {
    AugmentSelectorOption,
} from "../base_component/AugmentSelector";

import StatsDisplay, {
    StatsDisplayValue,
} from "../base_component/StatsDisplay";

type UnitPlannerProps = {
    _id: string;
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
        const { _id, augmentValue, unitValue, stats } = this.props;
        return (
            <div className="container grid-cols-1 gap-4">
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
