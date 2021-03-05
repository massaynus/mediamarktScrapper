const fetch = require("node-fetch");


module.exports.extractData = async (res) => {
    if (res.ok)
    {
        return (await res.json());
    }
}