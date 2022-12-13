const { createCategory, getCategories, createTransaction, getTransactions, deleteTransaction, getLabels } = require('../controllers/controllers.js');
const router = require('express').Router();

router.post('/categories/create', createCategory);
router.get('/categories/get', getCategories);
// transaction routes
router.post("/transactions/create", createTransaction);
router.get("/transactions/get", getTransactions);
router.delete("/transactions/delete/:id", deleteTransaction);
// get labels 
router.get("/transactions/labels", getLabels);
module.exports = router
