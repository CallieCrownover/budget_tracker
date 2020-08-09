// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the overview page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    console.log(req.body)
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

// BILL Functionality
// // Route for getting data for bills
// app.get("/api/overview", function(req, res) {
//   // findAll returns all entries for a table when used with no options
//   console.log(req.user)
//   db.Bill.findAll({where: {userID: req.user.id},}).then(function(dbBill) {
//     console.log(dbBill)
//     // We have access to the Bills as an argument inside of the callback function
//     let hbsOb = {bills: dbBill.map(bill => {return {id: bill.id, billName: bill.billName, website: bill.website, dueDate: bill.dueDate}})}
//     console.log(hbsOb)
//     res.render("overview", hbsOb);
//   });
// });

// Route for deleting Bill pnce paid
app.delete("/overview/deletebill/:id", function(req, res) {
  // We just have to specify which todo we want to destroy with "where"
  console.log("delete bill")
  console.log(req.params)
  console.log(req.body)
  db.Bill.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect("/api/overview");
  })
  .catch(err => {
    res.status(401).json(err);
  });

});

  // POST route for saving a new Bill
  app.post("/api/index/postbill", function(req, res) {
    // create takes an argument of an object describing the Bill we want to
    // insert into our table. 
    console.log("Add Bill 2")
    db.Bill.create({
      billName: req.body.billName,
      website: req.body.website,
      dueDate: req.body.dueDate,
      userId: req.user.id
    })
    .then(() => {
      res.redirect("/api/index");
    })
    .catch(err => {
      res.status(401).json(err);
    });
  });

  // Category Functionality

// Route for getting data for Category for the Expense submit function
// app.get("/api/submit", function(req, res) {
//   // findAll returns all entries for a table when used with no options
//   db.Categorie.findAll({where: {userID: req.user.id},}).then(function(dbCategory) {
//     // We have access to the Category as an argument inside of the callback function
//     res.render(dbCategory);
//   });
// });

  // POST route for saving a new category
  app.post("/api/index/postCategory", function(req, res) {
    // create takes an argument of an object describing the category we want to
    // insert into our table. 
    console.log("Add Category 2") 
    db.Categorie.create({
      categoryName: req.body.categoryName,
      categoryType: req.body.categoryType,
      userId: req.user.id
    })
    .then(() => {
      res.redirect("/api/index");
    })
    .catch(err => {
      res.status(401).json(err);
    });
  });

  // Expense Functionality

  // POST route for saving a new expense
  app.post("/api/index/postexpense", function(req, res) {
    // create takes an argument of an object describing the category we want to
    // insert into our table. 
    console.log(req.body)
    console.log(req.user)
    console.log("Add Expense 2") 
    db.Expense.create({
      expenseName: req.body.expenseName,
      amount: req.body.expenseAmount,
      CategorieId: req.body.expenseType,
      date: req.body.expenseDate,
      userId: req.user.id
    })
    .then(() => {
      res.redirect("/api/index");
    })
    .catch(err => {
      res.status(401).json(err);
    });
  });

  
  // Route for deleting Expense
app.delete("/api/overview/deleteexpense/:id", function(req, res) {
  
  // We just have to specify which todo we want to destroy with "where"
  db.Expense.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect("/api/overview");
  })
  .catch(err => {
    res.status(401).json(err);
  });
});




};