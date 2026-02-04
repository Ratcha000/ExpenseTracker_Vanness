const express = require('express');
const router = express.Router();

const Expense = require('../models/Expense');
const Category = require('../models/Category');


router.get('/', async (req, res) => {
  const expenses = await Expense.find()
    .populate('category')
    .sort({ createdAt: -1 });

  const success = req.query.success;

  res.render('expense_list', {
    expenses,
    success,
    currentPath: '/'   
  });
});


router.get('/expense/new', async (req, res) => {
  const categories = await Category.find();

  res.render('expense_form', {
    categories,
    currentPath: '/expense/new'   
  });
});


router.post('/expense', async (req, res) => {
  const { title, amount, category } = req.body;

  await Expense.create({
    title,
    amount,
    category
  });

  res.redirect('/?success=true');
});


router.post('/category', async (req, res) => {
  const { name } = req.body;
  if (name) {
    await Category.create({ name });
  }
  res.redirect('/expense/new');
});

module.exports = router;
