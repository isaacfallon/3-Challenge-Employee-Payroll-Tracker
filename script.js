// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector("#add-employees-btn");

// Collect employee data
const collectEmployees = function () {
  // TODO: Get user input to create and return an array of employee objects

  //To allow our while loop located below to operate, we set the variable 'newEmployee' as 'true'.
  let newEmployee = true;

  //Initialise an empty array named 'employeesArray' for the employee object data to be added.
  let employeesArray = [];

  //A separate array object named 'employeesObject' is initialised with the formatted employee information that we will add to.
  let employeesObject = [
    {
      firstName: "",
      lastName: "",
      salary: 0,
    },
  ];

  //A while loop is used so we can keep adding employees as long as the 'newEmployee' variable is set to 'true'.
  while (newEmployee) {
    //Within the while loop, we prompt the user for their first name and initialise it to a new variable named 'inputFirstName'.
    let inputFirstName = prompt(`Enter first name:`);
    //We then assign this new prompt data to the employee object's firstName property.
    employeesObject.firstName = inputFirstName;
    //The same process takes place for the 'lastName' prompt and data.
    let inputLastName = prompt(`Enter last name:`);
    employeesObject.lastName = inputLastName;

    //When the user inputs their salary, an if statement is used to check if it is not a number using the 'isNan' function.
    let inputSalary = prompt(`Enter salary:`);
    //If the salary input is not a number, the 'inputSalary' variable is assigned to '0'. Otherwise, the process continues.
    if (isNaN(inputSalary)) {
      inputSalary = 0;
    } else {
    }

    //In order to enable number formatting to each 1000, the 'Intl.NumberFormat' method is used when assigning the salary to a new variable.
    //For example, if a salary of '50000' is entered, this method converts it to '50,000'.
    //This method was sourced from an MDN web docs page. Please see my README.MD file for more information.
    let number = new Intl.NumberFormat().format(inputSalary);

    //Each newly initialised object array item is pushed to the employee object array.
    employeesArray.push({
      firstName: inputFirstName,
      lastName: inputLastName,
      //For the salary, a dollar sign is concatenated before the number to better represent the salary on the webpage.
      salary: `$` + number,
    });

    //A window confirm prompt is called to ask the user if they would like to add another employee. The result is assigned to the variable 'confirm'.
    let confirm = window.confirm("Would you like to enter another employee?");
    if (confirm) {
      //If the user says 'OK' (confirm === true), the 'newEmployee' variable remains true and the while loop continues, allowing the user to add additional employees.
      newEmployee === true;
    } else {
      //Otherwise, if the user hits 'cancel', the while loop is stopped and the employeesArray is returned.
      newEmployee === false;
      return employeesArray;
    }
  }
};

// Display the average salary
const displayAverageSalary = function (employeesArray) {
  // TODO: Calculate and display the average salary

  //'0' is assigned to the 'totalSalary' variable so we can add to it.
  let totalSalary = 0;

  //A for-loop is used to loop through all employees entered. Starting at 0, we then increment our counter by 1 until it is equal to one less than the length of the array.
  //For example, if three employees are entered, we loop through the following index positions: 0, 1, 2. As the length of this array is 3, we stop one before at index position 2.
  for (let i = 0; i < employeesArray.length; i++) {
    //Each salary entry is added to the 'totalSalary' variable.
    //The replace method is used with a regex of '\D' to strip all non-numeric characters so the salary can be totaled and averaged below.
    //This method was sourced from a Stack Overflow post. Please see my README.MD file for more information.
    totalSalary += parseInt(employeesArray[i].salary.replace(/\D/g, ""));
  }

  //Some string concatenation is used to display the number of employees using the length of the array.
  //The average salary is worked out by dividing the total salary by the number of employees. The output is then logged to the console.
  console.log(
    `The average employee salary between our ${
      employeesArray.length
    } employee(s) is: $${totalSalary / employeesArray.length}`
  );
};

// Select a random employee
const getRandomEmployee = function (employeesArray) {
  // TODO: Select and display a random employee

  //Generates a random number between 0 and the number of employees and assigns it to the variable 'randomEmployeeNumber'.
  let randomEmployeeNumber = Math.floor(Math.random() * employeesArray.length);

  //We use the random number assigned to 'randomEmployeeNumber' to access that point in the array and select a chosen employee.
  //Then, the first and last names of the chosen employee are concatenated and logged to the console.
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
