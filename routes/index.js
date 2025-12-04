const authRoutes = require("./authRoutes");
const profileRoutes = require("./profileRoutes");
const jobRoutes = require('./jobRoutes');
const jobApplicationRoute = require('./jobApplicationRoute');
const reelsRoutes = require('./reelsRoutes');
const followRoutes = require('./followRoutes');
const categoryRoutes = require('./categoryRoutes');
const productRoutes = require('./productRoutes');

module.exports = [
  { path: "/auth", router: authRoutes },
  { path:'/profile', router: profileRoutes },
  { path: "/jobs", router: jobRoutes},
  { path: "/applications", router: jobApplicationRoute},
  { path: "/reels", router: reelsRoutes },
  { path: "/follow", router: followRoutes},
  { path: "/category", router: categoryRoutes},
  { path: "/products", router: productRoutes },
];