import { Effect } from "../_effect";

type Augment = {
    name: string;
    level: number;
    effects: Array<Effect>;
    battlepower: number;
    group: string;
};

export type AugmentGroup = {
    name: string;
    augments: Augment[];
};

export default Augment;
