import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

import { StatsGroup, StatItem } from "./helper";
import { EFFECT_NAME_TRANSLATE as name } from "../util";

interface StatsProps {
    HP?: string;
    PP?: string;
    MEL_POT?: string;
    RNG_POT?: string;
    TEC_POT?: string;
    FLOOR_POT?: string;
    DAMAGE_RES?: string;
    BURN_RES?: string;
    FREEZE_RES?: string;
    SHOCK_RES?: string;
    BLIND_RES?: string;
    PANIC_RES?: string;
    POISON_RES?: string;
    PHYDOWN_RES?: string;
}

export default function StatsDisplay(props: StatsProps) {
    return (
        <Stack
            textTransform="capitalize"
            spacing={2}
            divider={<Divider orientation="horizontal" flexItem />}
        >
            <StatsGroup>
                <StatItem isAdd name={name.HP} value={props.HP} />
                <StatItem isAdd name={name.PP} value={props.PP} />
            </StatsGroup>
            <StatsGroup>
                <StatItem name={name.MEL_POT} value={props.MEL_POT} />
                <StatItem name={name.RNG_POT} value={props.RNG_POT} />
                <StatItem name={name.TEC_POT} value={props.TEC_POT} />
            </StatsGroup>
            <StatsGroup>
                <StatItem
                    name={name.FLOOR_POT}
                    value={props.FLOOR_POT}
                />
                <StatItem
                    name={name.DAMAGE_RES}
                    value={props.DAMAGE_RES}
                />
            </StatsGroup>
            <StatsGroup>
                <StatItem
                    name={name.BURN_RES}
                    value={props.BURN_RES}
                />
                <StatItem
                    name={name.FREEZE_RES}
                    value={props.FREEZE_RES}
                />
                <StatItem
                    name={name.SHOCK_RES}
                    value={props.SHOCK_RES}
                />
                <StatItem
                    name={name.BLIND_RES}
                    value={props.BLIND_RES}
                />
                <StatItem
                    name={name.PANIC_RES}
                    value={props.PANIC_RES}
                />
                <StatItem
                    name={name.POISON_RES}
                    value={props.POISON_RES}
                />
                <StatItem
                    xs={2}
                    name={name.PHYDOWN_RES}
                    value={props.PHYDOWN_RES}
                />
            </StatsGroup>
        </Stack>
    );
}
