const express = require('express');
const router = express.Router();

const Expense = require('../models/Expense');
const Category = require('../models/Category');


router.get('/expense/new', async (req, res) => {
  const categories = await Category.find();

  res.render('expense_form', {
    categories,
    currentPath: '/expense/new',
    query: req.query   
  });
});


router.post('/expense', async (req, res) => {
  const { title, amount, category } = req.body;

  await Expense.create({
    title,
    amount,
    category
  });

  res.redirect('/expense/success');
});


router.get('/expense/success', (req, res) => {
  res.render('expense_success');
});


router.post('/category', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.redirect('/expense/new?msg=empty');
  }
  const exists = await Category.findOne({ name });

  if (exists) {
    return res.redirect('/expense/new?msg=exists');
  }
  await Category.create({ name });
  res.redirect('/expense/new?msg=success');
});


module.exports = router;
