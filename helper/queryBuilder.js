module.exports.arrayToFilter = (name, array) => {
    return {
        name: { $in: array}
    }
}