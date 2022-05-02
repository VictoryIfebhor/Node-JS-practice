const routeNotFound = (req, res) => {
    return res.status(404).json({msg: "Route does not exists"})
}

module.exports = routeNotFound