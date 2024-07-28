const yamljs = require("yamljs");
const { resolveRefs } = require("json-refs");
const path = require("path");

const swaggerFolder = "./swagger";
const root = yamljs.load(path.join(swaggerFolder, "swagger.yaml"));

const options = {
    filter: ["relative", "remote"],
    loaderOptions: {
        processContent: function (res, callback) {
            callback(null, yamljs.parse(res.text));
        },
    },
};

const swaggerDocument = async () => {
    const results = await resolveRefs(root, options);
    return results.resolved;
};

module.exports = swaggerDocument;
