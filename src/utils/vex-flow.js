export const getDurationFromValue = (value) => {
    return {
        1: "1",
        2: "h",
        4: "q",
        8: "8",
        16: "16",
        32: "32",
        64: "64",
    }[value]
}
