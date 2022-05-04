const Product = require("../models/products")
const { createCustomError } = require("../utils/exception")

const getProducts = async (req, res) => {
    const { name, company, featured, numericFilters } = req.query
    const queryObject = {}

    if (name) {
        queryObject.name = { $regex: name, $options: "i" }
    }
    if (featured) {
        if (["true", "false"].includes(featured)){
            queryObject.featured = featured === "true" ? true : false
        } else {
            throw createCustomError(`"${featured}" is not a valid input for featured. "featured" can only be true or false`, 400)
        }
    }
    if (company) {
        queryObject.company = company
    }
    if (numericFilters) {
        const operators = {
            ">": "$gt",
            ">=": "$gte",
            "<": "$lt",
            "<=": "$lte",
            "=": "$eq"
        }
        const regex = /\b(>|>=|<|<=|=)\b/g
        const filters = numericFilters.replace(regex, (match) => `--${operators[match]}--`)
        filters.split(",").forEach(item => {
            const [field, op, value] = item.split("--")
            if (["price", "rating"].includes(field)) {
                if (!(field in queryObject)) {
                    queryObject[field] = {}
                }
                queryObject[field][op] = Number(value)
            }
        })
    }
    
    let pQueryObject = Product.find(queryObject)

    const sort = req.query.sort ? req.query.sort.split(",").join(" ") : "-rating"
    const fields = req.query.fields ? req.query.fields.split(",").joint(" ") : ""
    const limit = Number(req.query.limit) || 10
    const page = Number(req.query.page) || 1
    const skip = (page - 1) * limit
    
    pQueryObject = pQueryObject.sort(sort).select(fields).skip(skip).limit(limit)

    const products = await pQueryObject
    return res.json({ count: products.length, products })
}

const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id)
    return res.json({ product })
}

module.exports = { getProducts, getProductById }