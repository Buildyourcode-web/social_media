const authRoutes = require("./authRoutes");
const jobRoutes = require('./jobRoutes');

module.exports = [
  { path: "/auth", router: authRoutes },
  { path: "/jobs", router: jobRoutes}
];