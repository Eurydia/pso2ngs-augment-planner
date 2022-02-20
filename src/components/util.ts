export function intToRoman(num: number): string {
    const MAP: { [key: string]: number } = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1,
    };
    let result: string = "";

    for (const key in MAP) {
        const repeatCounter = Math.floor(num / MAP[key]);

        if (repeatCounter !== 0) {
            result += key.repeat(repeatCounter);
        }

        num %= MAP[key];

        if (num === 0) return result;
    }

    return result;
}
