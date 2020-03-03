/**
 * Making it possible to retrieve models available in middlewares.
 */
module.exports = function (objectRepository, propertyName) {
    if (objectRepository && objectRepository[propertyName]) {
        return objectRepository[propertyName];
    }
    throw new TypeError(propertyName + ' required');
}