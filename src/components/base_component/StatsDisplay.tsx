import { Component } from "react";
import { Effect, EFFECTS, EffectType } from "../info/_effect";

function statsToDisplays(
    stats: StatsDisplayValue = {},
    ref: { [key: string]: EffectType } = {},
): { [key: string]: string } {
    let effects: { [key: string]: string } = {};
    for (const _key in ref) {
        const { name, stacking } = ref[_key];
        // const FORMATTED_NAME = name
        //     .toLowerCase()
        //     .replaceAll("_", " ");

        let amount: number;
        if (stats[name] !== undefined) {
            amount = stats[name].amount;
        } else {
            amount = stacking === "multiply" ? 1 : 0;
        }

        let sign: string;
        let formatted_amount: string;
        if (stacking === "multiply") {
            const new_amount = (amount - 1) * 1000;
            const rounded = Math.round(new_amount) / 10;
            let prec: number;
            if (rounded < 10) {
                prec = 2;
            } else {
                prec = 3;
            }
            sign = amount >= 1 ? "+" : "";
            formatted_amount = `${rounded.toPrecision(prec)}%`;
        } else {
            sign = amount >= 0 ? "+" : "";
            formatted_amount = amount.toString();
        }
        effects[name] = `${sign}${formatted_amount}`;
    }
    return effects;
}

export type StatsDisplayValue = {
    [key: string]: Effect;
};

type StatsDisplayProps = {
    stats: StatsDisplayValue;
    statsFor: string;
};

class StatsDisplay extends Component<StatsDisplayProps, {}> {
    render() {
        const { stats, statsFor } = this.props;
        const f_stats = statsToDisplays(stats, EFFECTS);
        console.log(f_stats);
        return (
            <div>
                <div>{statsFor} stats</div>
                <div className="h-fit min-w-full mx-auto rounded-md border-2 text-lg capitalize divide-y-2 divide-solid px-4 shadow-lg shadow-blue-400/40">
                    <div className="container py-2 grid grid-cols-2">
                        <div>🩸 HP: {f_stats.HP}</div>
                        <div>
                            💦 PP: <span>{f_stats.PP}</span>
                        </div>
                    </div>
                    <div className="container py-2 grid grid-cols-2">
                        <div>
                            🔪 MEL potency: {f_stats.MEL_POTENCY}
                        </div>
                        <div>
                            🔫 RNG potency: {f_stats.RNG_POTENCY}
                        </div>
                        <div>
                            🔮 TEC potency: {f_stats.TEC_POTENCY}
                        </div>
                    </div>
                    <div className="container py-2 grid grid-cols-2">
                        <div>
                            📈 floor potency: {f_stats.FLOOR_POTENCY}{" "}
                            (max: 100%)
                        </div>
                        <div>💪 DMG resist: {f_stats.DMG_RESIST}</div>
                    </div>
                    <div className="container py-2 grid grid-cols-2">
                        <div>
                            🥵 burn resist: {f_stats.BURN_RESIST}
                        </div>
                        <div>
                            🥶 freeze resist: {f_stats.FREEZE_RESIST}
                        </div>
                        <div>
                            😱 shock resist: {f_stats.SHOCK_RESIST}
                        </div>
                        <div>
                            😵 blind resist: {f_stats.BLIND_RESIST}
                        </div>
                        <div>
                            😳 panic resist: {f_stats.PANIC_RESIST}
                        </div>
                        <div>
                            🤢 poison resist: {f_stats.POISON_RESIST}
                        </div>
                        <div>
                            🤕 physical down resist:{" "}
                            {f_stats.PHYSICAL_DOWN_RESIST}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default StatsDisplay;
