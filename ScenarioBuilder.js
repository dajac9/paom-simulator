const { createNewHire } = require("./scenarios/NewHire");
const { getCurrentDate } = require("./utils/tools");
const  {createTermination} = require("./scenarios/Termination");
var readlineSync = require("readline-sync");

async function main() {
  console.log("Select a scenario to build: ");
  console.log("1. New Hire 2. Update 3. Termination 4.Rehire");
  const currentDate = await getCurrentDate();
  //read the user input
  let userInput = Number.parseInt(
    readlineSync.question("Select a scenario to build: ")
  );
  //select start dates
  let startDate =
    readlineSync.question(
      `Enter the start date for the scenario: (${currentDate}) `
    ) || currentDate;
  switch (userInput) {
    case 1:
      await newHiresBuilder(startDate);
      break;
    case 2:
      //updateBuilder(startDate)
      break;
    case 3:
      await terminationBuilder(startDate);
      break;
    case 4:
      //rehireBuilder(startDate)
      break;
    default:
      console.log("Invalid input");
      break;
  }
}

async function newHiresBuilder(startDate) {
  console.log("Building a new hire scenario...");
  let managerFlag =
    readlineSync.question(`Is Manager (false), valid values [true,false] `) ||
    "false";
  let hireDate = readlineSync.question(`Enter hireDate value: (${startDate})`) || startDate;
  const params = { "managerFlag": managerFlag , "hireDate": hireDate};
  let [newHire, _] = await createNewHire(startDate, params);
  //export to json file
  const fs = require("fs");
  fs.writeFileSync("./output/newHireScenario.json", JSON.stringify(newHire, null, 2));
  return newHire;
}

async function terminationBuilder(startDate) {
  console.log("Building a termination scenario...");
  const newHire = await newHiresBuilder(startDate);
  let daysUntilTermination =
    readlineSync.question(
      `Enter the days after last event for termination: (0) `
    ) || "0";
  const days = Number.parseInt(daysUntilTermination);
  const params = { terminationDate: days };
  let [termination, _] = await createTermination(newHire, params);
  //export to json file
  const fs = require("fs");
  fs.writeFileSync(
    "./output/terminationScenario.json",
    JSON.stringify(termination, null, 2)
  );
}

module.exports = { main };
