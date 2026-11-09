// src/data/reviews.js
// Step 9: Dummy reviews (har product ke liye 4 reviews, id ke hisaab se tay)

const reviewPool = [
  { name: "Ayesha K.", rating: 5, title: "Totally worth it", text: "Exactly as described and the quality is even better than I expected. Packaging was neat too.", daysAgo: 3 },
  { name: "Hamza R.", rating: 4, title: "Very good overall", text: "Does everything I wanted. Delivery was quick and the price felt fair for what you get.", daysAgo: 8 },
  { name: "Sara M.", rating: 5, title: "Highly recommend", text: "I bought this as a gift and it was a huge hit. Would happily order again.", daysAgo: 12 },
  { name: "Bilal A.", rating: 3, title: "Decent, not perfect", text: "Good for the price, but a couple of small details could be better. Still a fair buy.", daysAgo: 15 },
  { name: "Fatima Z.", rating: 5, title: "Love it", text: "Build quality feels premium and it looks great. Customer support answered my question within minutes.", daysAgo: 21 },
  { name: "Usman T.", rating: 4, title: "Solid purchase", text: "Using it daily for a few weeks now with no complaints. Good value overall.", daysAgo: 25 },
  { name: "Noor S.", rating: 5, title: "Better than expected", text: "I was unsure at first, but it turned out great. Setup was simple and everything worked right away.", daysAgo: 30 },
  { name: "Daniyal H.", rating: 4, title: "Happy with it", text: "Arrived on time and matches the photos. Only wish there were more colour options.", daysAgo: 34 },
  { name: "Hira F.", rating: 5, title: "Perfect", text: "Exactly what I was looking for. Comfortable, reliable and looks stylish.", daysAgo: 41 },
  { name: "Omar J.", rating: 3, title: "Okay for the price", text: "It does the job. Not the most impressive, but I have no real complaints after a month.", daysAgo: 47 },
  { name: "Zainab L.", rating: 4, title: "Would buy again", text: "Great quality for the money. My family liked it so much we ordered a second one.", daysAgo: 52 },
  { name: "Ali R.", rating: 5, title: "Five stars", text: "Fast shipping, careful packaging and the product itself is excellent. Very satisfied.", daysAgo: 60 },
];

// Product ke id se 4 alag reviews chunta hai (har product ke reviews alag, magar hamesha wohi)
export function getReviews(product) {
  return Array.from({ length: 4 }, (_, i) => {
    const review = reviewPool[(product.id * 3 + i * 5) % reviewPool.length];
    return { ...review, id: `${product.id}-${i}` };
  });
}

// Rating se "5 star: 86%, 4 star: 8% ..." wala dummy breakdown (total hamesha 100)
export function getRatingBreakdown(rating) {
  const five = Math.round(((rating - 3) / 2) * 90);
  const rest = 100 - five;
  const four = Math.round(rest * 0.6);
  const three = Math.round((rest - four) * 0.5);
  const two = Math.round((rest - four - three) * 0.5);
  const one = rest - four - three - two;

  return [
    { star: 5, percent: five },
    { star: 4, percent: four },
    { star: 3, percent: three },
    { star: 2, percent: two },
    { star: 1, percent: one },
  ];
}