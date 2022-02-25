import { Component } from "react";
import { Effect, EFFECTS as eff, EffectType } from "../info/_effect";

function statsToDisplays(
    ref: { [key: string]: EffectType },
    to_display: StatsDisplayValue = {},
    display_class_name: string = "",
): { [key: string]: JSX.Element[] } {
    const resource = [eff.HP, eff.PP];
    const weapon = [eff.MEL_POTENCY, eff.RNG_POTENCY, eff.TEC_POTENCY];
    const whatever = [eff.FLOOR_POTENCY, eff.DMG_RESIST];

    let divs: { [key: string]: JSX.Element[] } = {
        resource: [],
        weapon: [],
        whatever: [],
        ailment: [],
    };
    let i = 0;
    for (const _key in ref) {
        const { name, stacking } = ref[_key];
        const FORMATTED_NAME = name.toLowerCase().replaceAll("_", " ");

        let amount: number;
        if (to_display[name] !== undefined) {
            amount = to_display[name].amount;
        } else {
            amount = stacking === "add" ? 0 : 1;
        }

        // const SIGN = amount >= BASE ? "+" : "";
        let formatted_amount: string;
        if (stacking === "multiply") {
            const new_amount = amount * 1000;
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

        let category: string;
        if (resource.indexOf(ref[_key]) !== -1) {
            category = "resource";
        } else if (weapon.indexOf(ref[_key]) !== -1) {
            category = "weapon";
        } else if (whatever.indexOf(ref[_key]) !== -1) {
            category = "whatever";
        } else {
            category = "ailment";
        }

        divs[category].push(
            <div key={i} className={display_class_name}>
                <img
                    src="https://pso2na.arks-visiphone.com/images/8/8d/NGSUIItemSchwarzrossoArmor.png"
                    crossOrigin="anonymous"
                    alt="melee icon"
                />
                <span>
                    {FORMATTED_NAME}: {/* {SIGN} */}
                    {formatted_amount}
                </span>
            </div>,
        );
        i++;
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
        const { resource, weapon, whatever, ailment } = statsToDisplays(
            eff,
            stats,
            "px-4 py-2",
        );

        return (
            <div className="container gap-4 text-lg text-left capitalize border-2 rounded-md border-blue-300 divide-y-2 divide-solid">
                <div className="grid grid-cols-2">{resource}</div>
                <div className="grid grid-cols-2">{weapon}</div>
                <div className="grid grid-cols-2">{whatever}</div>
                <div className="grid grid-cols-2">{ailment}</div>
            </div>
        );
    }
}

export default StatsDisplay;
