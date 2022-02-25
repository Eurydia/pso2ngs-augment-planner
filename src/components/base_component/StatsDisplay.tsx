import { Component } from "react";
import { Effect, EFFECTS, EffectType } from "../info/_effect";

function statsToDisplays(
    ref: { [key: string]: EffectType },
    to_display: StatsDisplayValue = {},
    display_class_name: string = "",
): JSX.Element[] {
    let divs: JSX.Element[] = [];
    let k = 0;
    for (const key in ref) {
        const FORMATTED_NAME = key.toLowerCase().replaceAll("_", " ");

        const BASE = ref[key].stacking === "add" ? 0 : 1;

        let amount: number;
        if (to_display[key] !== undefined) {
            amount = to_display[key].amount;
        } else {
            amount = BASE;
        }

        const SIGN = amount >= BASE ? "+" : "";
        let formatted_amount: string;
        if (ref[key].stacking === "multiply") {
            const new_amount = (amount - 1) * 1000;
            const rounded = Math.round(new_amount) / 10;
            let prec: number;
            if (rounded < 10) {
                prec = 2;
            } else {
                prec = 3;
            }
            formatted_amount = `${rounded.toPrecision(prec)}%`;
        } else {
            formatted_amount = amount.toString();
        }

        divs.push(
            <div key={k} className={display_class_name}>
                {FORMATTED_NAME}: {SIGN}
                {formatted_amount}
            </div>,
        );
        k++;
    }

    return divs;
}

export type StatsDisplayValue = {
    [key: string]: Effect;
};

type StatsDisplayProps = {
    stats: StatsDisplayValue;
};

class StatsDisplay extends Component<StatsDisplayProps, {}> {
    render() {
        const { stats } = this.props;
        const DISPLAYS = statsToDisplays(EFFECTS, stats);
        return (
            <div className="container min-w-fit grid grid-cols-3 text-lg gap-4 text-left capitalize shadow-lg shadow-blue-300 indent-5">
                {DISPLAYS}
            </div>
        );
    }
}

export default StatsDisplay;
