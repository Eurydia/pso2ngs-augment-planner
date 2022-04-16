import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import useTheme from "@mui/material/styles/useTheme";

import { StatsGroup, StatItem, StatItemValue } from "./helper";
import { EFFECT_NAME_TRANSLATE as name } from "../../util";

interface StatsProps {
    HP?: StatItemValue;
    PP?: StatItemValue;
    MEL_POT?: StatItemValue;
    RNG_POT?: StatItemValue;
    TEC_POT?: StatItemValue;
    FLOOR_POT?: StatItemValue;
    DAMAGE_RES?: StatItemValue;
    BURN_RES?: StatItemValue;
    FREEZE_RES?: StatItemValue;
    SHOCK_RES?: StatItemValue;
    BLIND_RES?: StatItemValue;
    PANIC_RES?: StatItemValue;
    POISON_RES?: StatItemValue;
    PHYDOWN_RES?: StatItemValue;
}

export default function StatsDisplay(props: StatsProps) {
    const theme = useTheme();
    return (
        <Stack
            spacing={1}
            divider={<Divider orientation="horizontal" flexItem />}
            sx={{
                paddingY: theme.spacing(1),
                textTransform: "capitalize",
            }}
        >
            <StatsGroup>
                <StatItem isAdd head={name.HP} value={props.HP} />
                <StatItem isAdd head={name.PP} value={props.PP} />
            </StatsGroup>
            <StatsGroup>
                <StatItem head={name.MEL_POT} value={props.MEL_POT} />
                <StatItem head={name.RNG_POT} value={props.RNG_POT} />
                <StatItem head={name.TEC_POT} value={props.TEC_POT} />
            </StatsGroup>
            <StatsGroup>
                <StatItem
                    head={name.FLOOR_POT}
                    value={props.FLOOR_POT}
                />
                <StatItem
                    head={name.DAMAGE_RES}
                    value={props.DAMAGE_RES}
                />
            </StatsGroup>
            <StatsGroup>
                <StatItem
                    head={name.BURN_RES}
                    value={props.BURN_RES}
                />
                <StatItem
                    head={name.FREEZE_RES}
                    value={props.FREEZE_RES}
                />
                <StatItem
                    head={name.SHOCK_RES}
                    value={props.SHOCK_RES}
                />
                <StatItem
                    head={name.BLIND_RES}
                    value={props.BLIND_RES}
                />
                <StatItem
                    head={name.PANIC_RES}
                    value={props.PANIC_RES}
                />
                <StatItem
                    head={name.POISON_RES}
                    value={props.POISON_RES}
                />
                <StatItem
                    column={2}
                    head={name.PHYDOWN_RES}
                    value={props.PHYDOWN_RES}
                />
            </StatsGroup>
        </Stack>
    );
}
