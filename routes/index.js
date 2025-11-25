const authRoutes = require("./authRoutes");
const profileRoutes = require("./profileRoutes");
const jobRoutes = require('./jobRoutes');
const jobApplicationRoute = require('./jobApplicationRoute');
const reelsRoutes = require('./reelsRoutes');
const followRoutes = require('./followRoutes');

module.exports = [
  { path: "/auth", router: authRoutes },
  { path:'/profile', router: profileRoutes },
  { path: "/jobs", router: jobRoutes},
  { path: "/applications", router: jobApplicationRoute},
  { path: "/reels", router: reelsRoutes },
  { path: "/follow", router: followRoutes},
];