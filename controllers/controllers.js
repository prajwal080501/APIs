
const Category = require('../models/Category');
const Transaction = require('../models/Transaction');
exports.createCategory = async (req, res) => {
    const category = new Category({
        type: req.body.type,
        color: req.body.color
    });
    await category.save((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Error creating category"
            })
        }
        res.json(category);
    })
}

exports.getCategories = async (req, res) => {
    const categories = await Category.find();

    !categories ? res.status(400).json({ error: "Error getting categories" }) : res.json(categories);
}

exports.createTransaction = async (req, res) => {
    const transaction = new Transaction({
        name: req.body.name,
        type: req.body.type,
        amount: req.body.amount,
    });
    await transaction.save((err, transaction) => {
        if (err) {
            return res.status(400).json({
                error: "Error creating transaction"
            })
        }
        res.json(transaction);
    })
}

exports.getTransactions = async (req, res) => {
    const transactions = await Transaction.find();

    !transactions ? res.status(400).json({ error: "Error getting transactions" }) : res.json(transactions);
}

exports.deleteTransaction = async (req, res) => {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);

    !transaction ? res.status(400).json({ error: "Error deleting transaction" }) : res.json(transaction);
}

exports.getLabels = async (req, res) => {
    Transaction.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: "type",
                foreignField: "type",
                as: "category_info"
            }
        },
        {
            $unwind: "$category_info"
        },
    ]).then(result => {
        let data = result.map(item => Object.assign({}, {id:item._id, name:item.name, type:item.type, amount:item.amount, color: item.category_info['color'] }))
        res.json(data)
    }).catch(err => {
        res.json(err)
    }
    )


}

