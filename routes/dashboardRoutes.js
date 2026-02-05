const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const Category = require('../models/Category');

router.get('/', (req, res) => {
  res.redirect('/dashboard');
});

router.get('/dashboard', async (req, res) => {
  const { start, end, sort, category } = req.query;

  let filter = {};

  
  if (start || end) {
    filter.createdAt = {};
    if (start) filter.createdAt.$gte = new Date(start);
    if (end) {
      const endDate = new Date(end);
      endDate.setHours(23, 59, 59, 999);
      filter.createdAt.$lte = endDate;
    }
  }

  
  if (category) {
    filter.category = category;
  }

  
  let sortOption = { createdAt: -1 };
  if (sort === 'date_asc') sortOption = { createdAt: 1 };
  if (sort === 'amount_desc') sortOption = { amount: -1 };
  if (sort === 'amount_asc') sortOption = { amount: 1 };

  const expenses = await Expense.find(filter)
    .populate('category')
    .sort(sortOption);

  
  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);

  
  const categories = await Category.find();

  res.render('dashboard', {
    expenses,
    categories,
    totalAmount,
    query: req.query
  });
});

module.exports = router;
