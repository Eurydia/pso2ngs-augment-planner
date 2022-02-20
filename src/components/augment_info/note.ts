import { Augment, EFFECTS as eff } from "./_base";

const GROUP = "NOTE";

export let note: Array<Array<Augment>> = [];

let ael_note: Array<Augment> = [];
const AEL_NOTE_POT = 1.01;
const AEL_COMBAT_POT = 1.015;
ael_note.push(
    new Augment(
        "ael note A",
        0,
        {
            [eff.HP]: 5,
            [eff.PP]: 3,
        },
        5,
        GROUP,
    ),
);

ael_note.push(
    new Augment(
        "ael note B",
        0,
        {
            [eff.MEL_POTENCY]: AEL_NOTE_POT,
            [eff.RNG_POTENCY]: AEL_NOTE_POT,
        },
        4,
        GROUP,
    ),
);

ael_note.push(
    new Augment(
        "ael note C",
        0,
        {
            [eff.MEL_POTENCY]: AEL_NOTE_POT,
            [eff.TEC_POTENCY]: AEL_NOTE_POT,
        },
        4,
        GROUP,
    ),
);

ael_note.push(
    new Augment(
        "ael note D",
        0,
        {
            [eff.RNG_POTENCY]: AEL_NOTE_POT,
            [eff.TEC_POTENCY]: AEL_NOTE_POT,
        },
        4,
        GROUP,
    ),
);

ael_note.push(
    new Augment(
        "magnus note",
        0,
        {
            [eff.MEL_POTENCY]: AEL_COMBAT_POT,
        },
        5,
        GROUP,
    ),
);

ael_note.push(
    new Augment(
        "lab note",
        0,
        {
            [eff.RNG_POTENCY]: AEL_COMBAT_POT,
        },
        5,
        GROUP,
    ),
);

ael_note.push(
    new Augment(
        "resola note",
        0,
        {
            [eff.TEC_POTENCY]: AEL_COMBAT_POT,
        },
        5,
        GROUP,
    ),
);

note.push(ael_note);

let ret_note: Array<Augment> = [];
const RET_NOTE_POT = 1.0075;
ret_note.push(
    new Augment(
        "ret note A",
        0,
        {
            [eff.HP]: 10,
        },
        5,
        GROUP,
    ),
);

ret_note.push(
    new Augment(
        "ret note B",
        0,
        {
            [eff.HP]: 5,
            [eff.MEL_POTENCY]: RET_NOTE_POT,
            [eff.RNG_POTENCY]: RET_NOTE_POT,
        },
        4,
        GROUP,
    ),
);

ret_note.push(
    new Augment(
        "ret note C",
        0,
        {
            [eff.HP]: 5,
            [eff.MEL_POTENCY]: RET_NOTE_POT,
            [eff.TEC_POTENCY]: RET_NOTE_POT,
        },
        4,
        GROUP,
    ),
);

ret_note.push(
    new Augment(
        "ret note D",
        0,
        {
            [eff.HP]: 5,
            [eff.RNG_POTENCY]: RET_NOTE_POT,
            [eff.TEC_POTENCY]: RET_NOTE_POT,
        },
        4,
        GROUP,
    ),
);

ret_note.push(
    new Augment(
        "alno note",
        0,
        {
            [eff.HP]: 10,
            [eff.PP]: 3,
            [eff.FLOOR_POTENCY]: 1.02,
        },
        5,
        GROUP,
    ),
);

ret_note.push(
    new Augment(
        "maqea note",
        0,
        {
            [eff.MEL_POTENCY]: 1.0125,
            [eff.RNG_POTENCY]: 1.0125,
            [eff.TEC_POTENCY]: 1.0125,
        },
        5,
        GROUP,
    ),
);
note.push(ret_note);
