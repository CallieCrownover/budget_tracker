
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
// Requiring our models and passport as we've configured it
const db = require("../models");


module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the overview page
    if (req.user) {
      // res.redirect("/overview");
    }
    res.render("login");
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the overview page
    if (req.user) {
      // res.redirect("/overview");
    }
    res.render("login", {loggedIn: req.user? true: false});
  });

  app.get("/signup", (req, res) => {
    // If the user already has an account send them to the overview page
    if (req.user) {
      // res.redirect("/overview");
    }
    res.render("signup");
  });

  app.get("/index", (req, res) => {
    // If the user already has an account send them to the overview page
    if (req.user) {
      // res.redirect("/overview");
    }
    res.render("index");
  });

  app.get("/overview", (req, res) => {
    // If the user already has an account send them to the overview page
    if (!req.user) {
      res.redirect(307, "/login");
    }
    console.log(req.user)
    db.Bill.findAll({where: {userID: req.user.id},}).then(function(dbBill) {
      console.log(dbBill)
      // We have access to the Bills as an argument inside of the callback function
      let hbsOb = {bills: dbBill.map(bill => {return {id: bill.id, billName: bill.billName, website: bill.website, dueDate: bill.dueDate}})}
      console.log(hbsOb)
      res.render("overview", hbsOb);
    });
    // res.render("overview", hbsOb);
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/overview", isAuthenticated, (req, res) => {
    res.render("overview");
  });
};
