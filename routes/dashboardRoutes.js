const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');


router.get('/dashboard', async (req, res) => {
  const { start, end, sort } = req.query;

  let filter = {};
  let sortOption = { createdAt: -1 }; 

  
  if (start && end) {
    const startDate = new Date(start);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(end);
    endDate.setHours(23, 59, 59, 999);

    filter.createdAt = {
      $gte: startDate,
      $lte: endDate
    };
  }

 
  if (sort === 'date_asc') sortOption = { createdAt: 1 };
  if (sort === 'amount_desc') sortOption = { amount: -1 };
  if (sort === 'amount_asc') sortOption = { amount: 1 };

  const expenses = await Expense.find(filter)
    .populate('category')
    .sort(sortOption);

  
  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);

  res.render('dashboard', {
    expenses,
    totalAmount,
    query: req.query,
    currentPath: '/dashboard'
  });
});

module.exports = router;
