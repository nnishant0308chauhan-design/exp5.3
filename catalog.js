// Simulated E-commerce Catalog (without MongoDB)

// Product catalog with variants and reviews
const products = [
  {
    name: "Premium Headphones",
    category: "Electronic",
    variants: [
      { sku: "HP-BL-001", color: "Black", price: 199.99, stock: 15 },
      { sku: "HP-WH-001", color: "White", price: 209.99, stock: 8 }
    ],
    reviews: [
      { userId: "u1", rating: 5, comment: "Excellent sound quality" },
      { userId: "u2", rating: 4, comment: "Very good bass" }
    ]
  },
  {
    name: "T-Shirt",
    category: "Clothing",
    variants: [
      { sku: "12345-S", color: "Red", size: "S", price: 19.99, stock: 5 }
    ],
    reviews: [
      { userId: "u3", rating: 5, comment: "Nice fabric" },
      { userId: "u4", rating: 4, comment: "Comfortable" }
    ]
  },
  {
    name: "Outdoor Speakers",
    category: "Electronic",
    variants: [
      { sku: "96765-B", color: "Black", price: 35.99, stock: 2 }
    ],
    reviews: [
      { userId: "u5", rating: 3, comment: "Average sound" }
    ]
  }
];


// ------------------------------
// Aggregation 1: Low Stock Products
// ------------------------------
const lowStockProducts = [];

products.forEach(product => {
  product.variants.forEach(v => {
    if (v.stock <= 5) {
      lowStockProducts.push({
        name: product.name,
        sku: v.sku,
        stock: v.stock
      });
    }
  });
});

console.log("\nAggregation Result");
console.log("lowStockProducts =", lowStockProducts);


// ------------------------------
// Aggregation 2: Category Ratings
// ------------------------------
const categoryMap = {};

products.forEach(product => {
  const ratings = product.reviews.map(r => r.rating);

  if (!categoryMap[product.category]) {
    categoryMap[product.category] = [];
  }

  categoryMap[product.category].push(...ratings);
});

const categoryRatings = [];

for (let cat in categoryMap) {
  const arr = categoryMap[cat];
  const avg = arr.reduce((a, b) => a + b, 0) / arr.length;

  categoryRatings.push({
    _id: cat,
    avgCategoryRating: parseFloat(avg.toFixed(2))
  });
}

console.log("\nAggregation Result");
console.log("categoryRatings =", categoryRatings);