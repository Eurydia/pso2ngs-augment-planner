// ---------------------------------
// Checking if preset name is available
export const checkNameAvailability = (
    name: string,
    used_name: string[],
) => {
    let temp_name = name;
    let counter = 1;
    const name_seen = new Set(used_name);
    while (name_seen.has(temp_name)) {
        temp_name = `${name} (${counter})`;
        counter++;
    }
    return temp_name;
};
// ---------------------------------
