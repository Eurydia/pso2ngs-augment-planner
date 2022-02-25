import { AugmentGroup } from "./_base";
import BASIC from "./basic";
import BASIC_FUSED from "./basic_fused";
import DUALBLE from "./dualble";
import WARD from "./ward";
import SOUL from "./soul";
import NOTE from "./note";
import DOMINA from "./domina";
import SECRETA from "./secreta";
import DREAD from "./dread";
import GIGAS from "./gigas";
import ELEMENTAL from "./elemental";
import FUSIA from "./fusia";
import ADDI from "./addi";

const ALL_AUGMENTS: AugmentGroup[] = [
    BASIC,
    BASIC_FUSED,
    DUALBLE,
    WARD,
    SOUL,
    NOTE,
    DOMINA,
    SECRETA,
    DREAD,
    GIGAS,
    ELEMENTAL,
    FUSIA,
    ADDI,
];

export default ALL_AUGMENTS;

// fs.writeFileSync(
//     "./src/components/augment_info/augments_data.json",
//     JSON.stringify(all_augments),
// );
