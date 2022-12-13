const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    type: {
        type: String,
        default: "expense"
    },
    color: {
        type: String,
        default: "#FCBE44"
    }
})

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;