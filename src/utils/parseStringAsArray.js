module.exports = function parseStringAsArray(arrayAsString) {
    return arrayAsString.split(',').map(x => x.trim().toLowerCase());
}