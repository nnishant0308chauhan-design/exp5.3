const express = require("express");

const app = express();

const products = [
  {
    name: "Premium Headphones",
    category: "Electronic",
    variants: [
      { sku: "HP-BL-001", color: "Black", price: 199.99, stock: 15 },
      { sku: "HP-WH-001", color: "White", price: 209.99, stock: 8 }
    ],
    reviews: [
      { userId: "u1", rating: 5, comment: "Excellent sound quality" }
    ]
  },
  {
    name: "T-Shirt",
    category: "Clothing",
    variants: [
      { sku: "12345-S", color: "Red", price: 19.99, stock: 5 }
    ],
    reviews: [
      { userId: "u2", rating: 4, comment: "Good quality" }
    ]
  },
  {
    name: "Outdoor Speakers",
    category: "Electronic",
    variants: [
      { sku: "96765-B", color: "Black", price: 35.99, stock: 2 }
    ],
    reviews: [
      { userId: "u3", rating: 3, comment: "Average sound" }
    ]
  }
];

app.get("/", (req, res) => {
  res.send("E-commerce Catalog API Running");
});

app.get("/low-stock", (req, res) => {
  const lowStock = [];

  products.forEach(p => {
    p.variants.forEach(v => {
      if (v.stock <= 5) {
        lowStock.push({
          name: p.name,
          sku: v.sku,
          stock: v.stock
        });
      }
    });
  });

  res.json(lowStock);
});

app.get("/category-ratings", (req, res) => {

  const categoryMap = {};

  products.forEach(p => {

    const ratings = p.reviews.map(r => r.rating);

    if (!categoryMap[p.category]) {
      categoryMap[p.category] = [];
    }

    categoryMap[p.category].push(...ratings);

  });

  const result = [];

  for (let cat in categoryMap) {

    const arr = categoryMap[cat];

    const avg = arr.reduce((a,b)=>a+b,0)/arr.length;

    result.push({
      category: cat,
      avgRating: avg.toFixed(2)
    });

  }

  res.json(result);

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});