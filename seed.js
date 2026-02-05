require('dotenv').config();
const mongoose = require('mongoose');

const Expense = require('./models/Expense');
const Category = require('./models/Category');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB Connected');

    // ลบข้อมูลเก่า (กันข้อมูลซ้ำ)
    await Expense.deleteMany({});
    await Category.deleteMany({});

    // ===== สร้างหมวดหมู่ =====
    const food = await Category.create({ name: 'อาหาร' });
    const travel = await Category.create({ name: 'เดินทาง' });
    const shopping = await Category.create({ name: 'ช้อปปิ้ง' });

    // ===== สร้างรายจ่าย =====
    await Expense.insertMany([
      // 📅 4/2/2569
      {
        title: 'ข้าวกลางวัน',
        amount: 60,
        category: food._id,
        createdAt: new Date('2026-02-04T12:00:00')
      },
      {
        title: 'รถเมล์',
        amount: 15,
        category: travel._id,
        createdAt: new Date('2026-02-04T08:00:00')
      },

      // 📅 5/2/2569
      {
        title: 'กาแฟ',
        amount: 45,
        category: food._id,
        createdAt: new Date('2026-02-05T09:00:00')
      },
      {
        title: 'เสื้อ',
        amount: 399,
        category: shopping._id,
        createdAt: new Date('2026-02-05T18:30:00')
      },

      // 📅 6/2/2569
      {
        title: 'ข้าวเย็น',
        amount: 70,
        category: food._id,
        createdAt: new Date('2026-02-06T19:00:00')
      },
      {
        title: 'รถไฟฟ้า',
        amount: 45,
        category: travel._id,
        createdAt: new Date('2026-02-06T07:30:00')
      }
    ]);

    console.log('✅ Seed data inserted');
    process.exit();
  })
  .catch(err => console.error(err));
