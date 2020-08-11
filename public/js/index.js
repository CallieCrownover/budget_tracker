  

  
  $(document).ready(function() {

  const addBillForm = $("form.billInfo");
  const billInputName = $("input#billInputName");
  const billInputWebsite = $("input#billInputWebsite");
  const billInputDate = $("input#billInputDate");
  const addCategoryForm = $("form.categoryInfo");
  const categoryInputName = $("input#categoryInputName");
  const categoryInputType = $("select#categoryInputType");
  const addExpenseForm = $("form.expenseInfo");
  const expenseInputName = $("input#expenseInputName");
  const expenseInputAmount = $("input#expenseInputAmount");
  const expenseInputDate = $("input#expenseInputDate");
  const expenseInputType = $("select#expenseInputCategory");


 // When the signup button is clicked, we validate the email and password are not blank
  addBillForm.on("submit", event => {
    event.preventDefault();
    const billData = {
      billName: billInputName.val().trim(),
      website: billInputWebsite.val().trim(),
      dueDate: billInputDate.val().trim()
    };
    // If we have an email and password, run the signUpUser function
    addBill(billData.billName, billData.website,billData.dueDate);
    billInputName.val("");
    billInputWebsite.val("");
    billInputDate.val("")
  });


  // Does a post to the signup route. If successful, we are redirected to the overview page
  // Otherwise we log any errors
  function addBill(billName, website, dueDate) {
    console.log("Add Bill")
    $.post("/api/index/postbill", {
      billName: billName,
      website: website,
      dueDate: dueDate
    })
      .then(() => {
        // window.location.replace("/overview");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }

  

   // When the signup button is clicked, we validate the email and password are not blank
   addCategoryForm.on("submit", event => {
    event.preventDefault();
    console.log("Input: " + categoryInputType)
    const categoryData = {
      categoryName: categoryInputName.val().trim(),
      categoryType: categoryInputType.val()
    };
    console.log(categoryData)
    // If we have an email and password, run the signUpUser function
    addCategory(categoryData.categoryName, categoryData.categoryType);
    categoryInputName.val("");
    categoryInputType.val("");
  });

  // Otherwise we log any errors
  function addCategory(categoryName, categoryType) {
    console.log("Add Category")
    $.post("/api/index/postCategory", {
      categoryName: categoryName,
      categoryType: categoryType
    })
      .then(() => {
        // window.location.replace("/overview");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }



   // When the signup button is clicked, we validate the email and password are not blank
   addExpenseForm.on("submit", event => {
    event.preventDefault();
    console.log("Click")
    const expenseData = {
      expenseName: expenseInputName.val().trim(),
      expenseAmount: expenseInputAmount.val().trim(),
      expenseDate: expenseInputDate.val().trim(),
      expenseType: expenseInputType.val()
    };
    console.log(expenseData)
    // If we have an email and password, run the signUpUser function
    addExpense(expenseData.expenseName, expenseData.expenseAmount, expenseData.expenseDate, expenseData.expenseType);
    expenseInputName.val("");
    expenseInputAmount.val("");
    expenseInputDate.val("");
    expenseInputType.val("");
  });

  // Otherwise we log any errors
  function addExpense(expenseName, expenseAmount,expenseDate,expenseType) {
    console.log("Add Expense")
    $.post("/api/index/postexpense", {
      expenseName: expenseName,
      expenseAmount: expenseAmount,
      expenseDate: expenseDate,
      expenseType: expenseType
    })
      .then(() => {
        // window.location.replace("/overview");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }


  // const billsInfo = $(".delete-bill");
  // billsInfo.on("click", event => {
  //   console.log("Check")
  //   event.preventDefault();
  //  var currentBill = $(this).data("id")
  //  console.log($(this).data("id"))
  //  console.log($(this).val)
  //   // const billId = {
  //   //   id: currentBill
  //   // };
  // console.log(currentBill)
  // });


  $(".delete-bill").on("click", function(event) {
    var id = $(this).data("id");
    console.log(id)
    // Send the DELETE request.
    $.ajax("api/bills/deletebill/" + id, {
      type: "DELETE"
      
    })
  
    .then(function() {
        console.log("deleted bill", id);
        // Reload the page to get the updated list
        location.reload()
      }
    );
  });


});