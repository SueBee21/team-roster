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


