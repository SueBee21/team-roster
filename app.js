const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
let employeeQuestion =[]

const employeeDB = []

function menu(){
    employeeQuestion = [{
        type: "input",
        message: "Enter Employee Name",
        name: "name"
    },{
        type: "input",
        message: "Input employee ID number",
        name: "id"
    },
    {
        type: "input",
        message: "Enter Employee Email",
        name: "email"
    }
    ]
    inquirer.prompt({
        type: "list", 
        message: "Select your Role",
        choices: ["Manager", "Engineer", "Intern", "Exit"],
        name: "employeeRole"
    }).then(function(userInput){
        switch(userInput.employeeRole){
            case "Manager":
                addManager();
                break;
            case "Engineer":
                addEngineer();
                break;
            case "Intern":
                addIntern();
                break; 
            default:
                generateTeam();        
        }
    })
}
function addManager(){
    employeeQuestion.push({
        type: "input",
        message: "What is the Manager office number?",
        name: "officeNumber"
    })
    inquirer.prompt(employeeQuestion).then(function(userInput){
        var newManager = new Manager(userInput.name, userInput.id, userInput.email, userInput.officeNumber);
        employeeDB.push(newManager);
        menu();
    })
}

function addEngineer(){
    employeeQuestion.push({
        type: "input",
        message: "What is the Employee's Github profile?",
        name: "github"
    })
    inquirer.prompt(employeeQuestion).then(function(userInput){
        var newEngineer = new Engineer(userInput.name, userInput.id, userInput.email, userInput.github);
        employeeDB.push(newEngineer);
        menu();
    })
}

function addIntern(){
    employeeQuestion.push({
        type: "input",
        message: "What is the Intern's School?",
        name: "school"
    })
    inquirer.prompt(employeeQuestion).then(function(userInput){
        var newIntern = new Intern(userInput.name, userInput.id, userInput.email, userInput.school);
        employeeDB.push(newIntern);
        menu();
    })
}

function generateTeam(){
    console.log(employeeDB);
    const teamData = render(employeeDB)
    fs.writeFile(outputPath, teamData, function(error){
        if (error) throw error;
        console.log("success")
    })
}
menu();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
