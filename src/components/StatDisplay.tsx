import { Component, HTMLProps } from "react";

const MAJOR_GRID = (col: number) => {
    return `grid grid-cols-${col} bg-blue-400 gap-3`;
};

const MINOR_GRID = () => {
    return `grid bg-blue-200 rounded-xl`;
};

const POT = ["MEL", "RNG", "TEC"];

const AILMENT_RESIST = [
    "burn",
    "freeze",
    "shock",
    "blind",
    "panic",
    "poison",
    "physical down",
];

class StatDisplay extends Component {
    render() {
        return (
            <div className="grid grid-cols-1 gap-2 container xl text-left indent-4 capitalize">
                <div className={MAJOR_GRID(1)}>
                    <div className={MINOR_GRID()}>battle power</div>
                </div>
                <div className={MAJOR_GRID(2)}>
                    <div className={MINOR_GRID()}>HP</div>
                    <div className={MINOR_GRID()}>PP</div>
                </div>
                <div className={MAJOR_GRID(3)}>
                    <div className={MINOR_GRID()}>MEL potency</div>
                    <div className={MINOR_GRID()}>RNG potency</div>
                    <div className={MINOR_GRID()}>TEC potency</div>
                </div>
                <div className={MAJOR_GRID(2)}>
                    <div className={MINOR_GRID()}>otency floor</div>
                    <div className={MINOR_GRID()}>
                        Damage resistance
                    </div>
                </div>
                <div className={MAJOR_GRID(3)}>
                    {AILMENT_RESIST.map((ailment, index) => {
                        return (
                            <div className={MINOR_GRID()}>
                                {ailment}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default StatDisplay;
