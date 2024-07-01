const base_payload = require('./schemas/paom.json')
const {PersonSchema} = require('./schemas/person.json')
const {empStatusSchema} = require('./schemas/events/hireEvent.json')
const { readProperty } = require('../utils/tools')

async function createNewHire(startDate, managerFlag){
    //creates person related data
    const person = await readProperty(PersonSchema)
    base_payload.data.paom.persons.push(person)
    base_payload.data.paom.totalPages = 1
    base_payload.data.paom.totalRecords = base_payload.data.paom.persons.length
    // creates employment related data
    const personId = base_payload.data.paom.persons[0].personId
    const bindings = {"$startDate": startDate, "$employeeId": personId, "$managerFlag": managerFlag}
    const empStatus = await readProperty(empStatusSchema, startDate, bindings)
    base_payload.data.paom.persons[0].empStatus = empStatus
    return [base_payload, startDate]
}

module.exports = { createNewHire }