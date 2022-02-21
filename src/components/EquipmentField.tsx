import { Component } from "react";
import AugmentMultiSelect from "./AugmentMultiSelect";
import StatDisplay from "./StatDisplay";

class EquipmentField extends Component {
    render() {
        return (
            <div>
                <StatDisplay />
                <AugmentMultiSelect />
            </div>
        );
    }
}

export default EquipmentField;
