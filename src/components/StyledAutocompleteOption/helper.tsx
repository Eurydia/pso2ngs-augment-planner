import { EFFECT_NAME_TRANSLATE, isAddEffect, Effect } from "../util";
// ---------------------------------------------
// For effects on an option
export const parseEffect = (effect: Effect) => {
    const { eff, amt } = effect;

    let value: string;
    let sign: string = "+";
    if (isAddEffect(eff)) {
        if (amt === 0) {
            return <></>;
        } else if (amt < 0) {
            sign = "";
        }
        value = amt.toString();
    } else {
        if (amt === 1) {
            return <></>;
        } else if (amt < 1) {
            sign = "";
        }
        const temp_value = (amt - 1) * 100;
        value = `${temp_value.toPrecision(3)}%`;
    }

    const name = EFFECT_NAME_TRANSLATE[eff];
    const text = `${name} ${sign}${value}`;

    return text;
};
// ---------------------------------------------
