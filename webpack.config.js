module.exports = {
    entry: {
        dev: "./src/index.tsx",
    },
    output: {
        filename: "./build/index.js",
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        modules: ["src", "node_modules"],
    },
};
