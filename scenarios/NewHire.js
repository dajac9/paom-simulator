const base_payload = require('./schemas/paom.json')
const {schema} = require('./schemas/person.json')
const { readProperty } = require('../utils/tools')

async function createNewHire(startDate){
    const person = await readProperty(schema)
    base_payload.data.paom.persons.push(person)
    base_payload.data.paom.totalPages = 1
    base_payload.data.paom.totalRecords = base_payload.data.paom.persons.length
    return [base_payload, startDate]
}

module.exports = { createNewHire }