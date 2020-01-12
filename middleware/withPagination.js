module.exports = async function(req, res, next) {
    req.page = +req.query.page;
    req.size = +req.query.size;
    next();
}