const routeNotFound = (req, res) => {
    return res.status(404).json({msg: "ruote does not exists"})
}

module.exports = routeNotFound