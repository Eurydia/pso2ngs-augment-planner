const complimentary_presets = [
    {
        name: "🐳Fearless Erasing",
        description: "ranger moment.",
        augments: [
            { name: "spi precision", level: 0 },
            { name: "pettas soul", level: 3 },
            { name: "dread keeper", level: 3 },
            { name: "addi spira", level: 0 },
            { name: "ael domina", level: 0 },
        ],
    },
    {
        name: "Try PP😔",
        description: "Humorous name courtesy of MoonRunestar#3939!",
        augments: [
            { name: "addi guara", level: 0 },
            { name: "gua precision", level: 0 },
            { name: "dread keeper", level: 3 },
            { name: "alts soul", level: 3 },
            { name: "gigas precision", level: 3 },
        ],
    },
    {
        name: "Memetank's delight",
        description: "Become a gigantix's worst nightmare",
        augments: [
            { name: "addi stara", level: 0 },
            { name: "gigas precision", level: 3 },
            { name: "dread keeper", level: 3 },
            { name: "ragras soul", level: 3 },
            { name: "sta precision", level: 0 },
        ],
    },
];

export default function giveGift() {
    const gift = localStorage.getItem("gift");
    if (gift === null) {
        localStorage.set(
            "augmentPreset",
            JSON.stringify(complimentary_presets),
        );
        localStorage.set("gift", "given");
    }
}
