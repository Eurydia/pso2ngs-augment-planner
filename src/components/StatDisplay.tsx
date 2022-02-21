import { Component } from "react";

const MAJOR_GRID = (col: number) => {
    return `grid grid-cols-${col} bg-blue-400`;
};

const MINOR_GRID = () => {
    return `bg-blue-200 rounded-xl h-fit`;
};

const EFFECTS = [
    ["battlepower"],
    ["hp", "pp"],
    ["mel potency", "rng potency", "tec potency"],
    ["dmg adjustment", "dmg resist"],
    [
        "burn resist",
        "freeze resist",
        "shock resist",
        "blind resist",
        "poison resist",
        "panic resist",
        "physical down resist",
    ],
];

const EFFECT_DIVS = class StatDisplay extends Component {
    render() {
        return (
            <div className="container xl text-left indent-4 capitalize"></div>
        );
    }
};

export default StatDisplay;
