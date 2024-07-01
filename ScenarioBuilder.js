const { createNewHire } = require('./scenarios/NewHire')
var readlineSync = require('readline-sync');

async function main(){
    console.log("Select a scenario to build: ")
    console.log("1. New Hire 2. Update 3. Termination 4.Rehire")
    //read the user input
    let userInput = Number.parseInt(readlineSync.question("Select a scenario to build: "))
    //select start dates
    let startDate = readlineSync.question("Enter the start date for the scenario: ")
    switch(userInput){
        case 1:
            await newHiresBuilder(startDate)
            break
        case 2:
            //updateBuilder(startDate)
            break
        case 3:
            await terminationBuilder(startDate)
            break
        case 4:
            //rehireBuilder(startDate)
            break
        default:
            console.log("Invalid input")
            break
    }
}

async function newHiresBuilder(startDate){
    console.log("Building a new hire scenario...")
    let [newHire, _] = await createNewHire(startDate)
    //export to json file
    const fs = require('fs')
    fs.writeFileSync('newHireScenario.json', JSON.stringify(newHire))
}

async function terminationBuilder(startDate){
    console.log("Building a termination scenario...")
    let [newHire,endDate] = await createNewHire(startDate)
    let [termination, _] = await TerminationScenario(newHire, endDate)
    //export to json file
    const fs = require('fs')
    fs.writeFileSync('terminationScenario.json', JSON.stringify(termination))
}


module.exports = { main }