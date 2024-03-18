// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector("#add-employees-btn");

// Collect employee data
const collectEmployees = function () {
  // TODO: Get user input to create and return an array of employee objects

  //To allow our while loop to operate, we set a variable as 'true'. (See further details at while loop below)
  let newEmployee = true;

  //Initialise an empty array for the employee object data to be added.
  let employeesArray = [];

  //A seperate array object is initialised with the specific employee information that we will add to.
  let employeesObject = [
    {
      firstName: "",
      lastName: "",
      salary: 0,
    },
  ];

  //A while loop is used so we can keep adding employees as long as the newEmployee variable is set to 'true'.
  while (newEmployee == true) {
    //Within the while loop, we prompt the user for their first name and initialise it to a new variable.
    let inputFirstName = prompt(`Enter first name:`);
    //We then assign this new prompt data to the employee object's firstName property.
    employeesObject.firstName = inputFirstName;
    //The same process takes place for the 'lastName' prompt and data.
    let inputLastName = prompt(`Enter last name:`);
    employeesObject.lastName = inputLastName;

    //When the user inputs their salary, an if statement is used to check if is not a number using the 'isNan' function.
    let inputSalary = prompt(`Enter salary:`);
    if (isNaN(inputSalary)) {
      //If it is not a number, the inputSalary variable is asigned to '$0'. If it is a number, the process continues without change.
      inputSalary = `$` + 0;
    } else {
    }

    //In order to enable number formatting to each 1000, the Intl.NumberFormat method is used when assigning the salary to a new variable.
    //For example, if 50000 is entered, this method converts it to 50,000.
    //This method was sourced from an MDN web docs page. Please see my README.MD file for more information.
    let number = new Intl.NumberFormat().format(inputSalary);

    //Each newly ititialised object array item is pushed to the employee object array.
    employeesArray.push({
      firstName: inputFirstName,
      lastName: inputLastName,
      //For the salary, a dollar sign is concatanated before to better represent the salary on the page.
      salary: `$` + number,
    });

    //A window confirm prompt is called to ask the user if they'd like to add another employee. The result is asigned to the variable 'confirm'.
    let confirm = window.confirm("Would you like to enter another employee?");
    if (confirm) {
      //If the user confirms, the 'newEmployee' value remains true and the while loop continues which allows the user to add additional employees.
      newEmployee == true;
    } else {
      //Otherwise, if the user hits 'cancel', the while loop is stopped and the employeesArray is returned. The functions below then add the data to the webpage.
      newEmployee == false;
      return employeesArray;
    }
  }
};

// Display the average salary
const displayAverageSalary = function (employeesArray) {
  // TODO: Calculate and display the average salary

  //Assigns 0 to the totalSalary variable so we can add to it.
  let totalSalary = 0;

  //For-loop is used to loop through all employees. 0 is the starting point as we increment by 1 until we reach the total number of employees entered (employeesArray length).
  for (let i = 0; i < employeesArray.length; i++) {
    //Each salary entry is addeded to the totalSalary variable. The replace method is used with a regex of 'D' to strip all non-numeric characters (only a '$') so the salary can be totaled and averaged below.
    //This method was sourced from a Stack Overflow post. Please see my README.MD file for more information.
    totalSalary += parseInt(employeesArray[i].salary.replace(/\D/g, ""));
  }

  //Some string concatonation is used to display the number of employees using the length of the array.
  // The average salary is worked out by diving the total salary by the number of employees. The output is then logged to the console.
  console.log(
    `The average employee salary between our ${
      employeesArray.length
    } employee(s) is: $${totalSalary / employeesArray.length}`
  );
};

// Select a random employee
const getRandomEmployee = function (employeesArray) {
  // TODO: Select and display a random employee

  //Generates a random number between 0 and the number of employees.
  let randomEmployeeNumber = Math.floor(Math.random() * employeesArray.length);

  //Using string concatonation, we use the random number generated to access that point in the array. Then, the first and last name of the winning employee are concatonated and logged to the console.
  console.log(
    `Congratulations to ${employeesArray[randomEmployeeNumber].firstName} ${employeesArray[randomEmployeeNumber].lastName}, our random drawing winner!`
  );
};

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function (employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector("#employee-table");

  // Clear the employee table
  employeeTable.innerHTML = "";

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
};

const trackEmployeeData = function () {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log("==============================");

  getRandomEmployee(employees);

  employees.sort(function (a, b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
};

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener("click", trackEmployeeData);
