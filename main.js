import inquirer from "inquirer";
import chalk from "chalk";
import { createSpinner } from "nanospinner";
let loc = "home";
let check = false;
const sleep = (ms = 3000) => new Promise((r) => setTimeout(r, ms));
let locations = [
    "school",
    "theme park",
    "super market",
    "restaurant",
    "home",
];
let num1 = Math.floor(Math.random() * 100);
let num2 = Math.floor(Math.random() * 100);
async function greet() {
    console.log(chalk.redBright(`
    ${chalk.bold("Rules.")}
    Choose a place to go :) 
    fun fact i had fun while making this
    `));
}
async function main(locations) {
    let start_place = await inquirer.prompt({
        name: "start_loc",
        type: "list",
        message: chalk.redBright(`you're at ${loc}. where would you like to go?  `),
        choices: locations,
    });
    return handle_answer(start_place.start_loc, locations);
}
async function handle_answer(question, location) {
    if (question == "home") {
        if (loc == "home") {
            console.log(chalk.redBright("you can't go to home while you in home can you? O:"));
        }
        else {
            let added = num1 + num2;
            let ask_quiz = await inquirer.prompt({
                name: "ask_quiz",
                type: "number",
                message: chalk.redBright(`whats the answer of ${num1}+${num2}=`),
            });
            if (ask_quiz.ask_quiz == added) {
                const spinner = createSpinner("We are on the way to home").start();
                await sleep();
                spinner.success({
                    text: chalk.redBright("We are at home and its midnight good night you are not allowed to go anywhere else.."),
                });
                check = true;
            }
            else {
                const spinner = createSpinner("We can not go home because you couldn't solve a math question").start();
                await sleep();
                spinner.error({
                    text: chalk.redBright("Bye we need to sleep on stairs because you couldn't solve a simple math question"),
                });
                check = true;
            }
        }
    }
    else if (question == "q") {
        check = true;
    }
    else if (question == "school") {
        const spinner = createSpinner("please wait we are on the way to school..").start();
        let indexer = location.indexOf("school");
        locations[indexer] = "school";
        await sleep();
        spinner.success({ text: chalk.redBright("we have reached school") });
        loc = "school";
    }
    else if (question == "super market") {
        const spinner = createSpinner("please wait we are on the way to super market..").start();
        let indexer = location.indexOf("super market");
        locations[indexer] = "super market";
        await sleep();
        spinner.success({ text: chalk.redBright("we have reached super market") });
        loc = "super market";
    }
    else if (question == "theme park") {
        const spinner = createSpinner("please wait we are on the way to theme park..").start();
        let indexer = location.indexOf("theme park");
        locations[indexer] = "";
        await sleep();
        spinner.success({ text: chalk.redBright("we have reached theme park") });
        loc = "theme park";
    }
    else if (question == "restaurant") {
        const spinner = createSpinner("please wait we are on the way to restaurant..").start();
        let indexer = location.indexOf("restaurant");
        locations[indexer] = "home";
        await sleep();
        spinner.success({ text: chalk.redBright("we have reached restaurant") });
        loc = "restaurant";
    }
}
await greet();
while (check == false) {
    await main(locations);
}
