import React from "react";

import { GridContainer, GridItem } from "./helper";

interface TwobyTwoGridLayoutProps {
    children: React.ReactNode[] | React.ReactNode;
    // augmentPresets: AugmentPreset[];
    // weapon: EquipmentWithAugments;
    // unitOne: EquipmentWithAugments;
    // unitTwo: EquipmentWithAugments;
    // unitThree: EquipmentWithAugments;
    // onWeaponChange: (value: EquipmentWithAugments) => void;
    // onUnitOneChange: (value: EquipmentWithAugments) => void;
    // onUnitTwoChange: (value: EquipmentWithAugments) => void;
    // onUnitThreeChange: (value: EquipmentWithAugments) => void;
}

const TwobyTwoGridLayout = (props: TwobyTwoGridLayoutProps) => {
    const children = React.Children.toArray(props.children);

    return (
        <GridContainer>
            <GridItem>{children[0]}</GridItem>
            <GridItem>{children[1]}</GridItem>
            <GridItem>{children[2]}</GridItem>
            <GridItem>{children[3]}</GridItem>
        </GridContainer>
    );
};

export default React.memo(TwobyTwoGridLayout);
