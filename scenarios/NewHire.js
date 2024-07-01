const base_payload = require("./schemas/paom.json");
const { PersonSchema } = require("./schemas/person.json");
const {
  empStatusSchema,
  primaryInfoSchema,
  joiningInfoSchema,
  jobInfoSchema,
  contractInfoSchema,
  workDetailsSchema
} = require("./schemas/events/hireEvent.json");
const { readProperty } = require("../utils/tools");

async function createNewHire(startDate, params) {
  //creates person related data
  const person = await readProperty(PersonSchema);
  const { managerFlag, hireDate } = params;
  base_payload.data.paom.persons.push(person);
  base_payload.data.paom.totalPages = 1;
  base_payload.data.paom.totalRecords = base_payload.data.paom.persons.length;
  // creates employment related data
  const personId = base_payload.data.paom.persons[0].personId;
  const bindings = {
    "$startDate": startDate,
    "$employeeId": personId,
    "$mangerFlag": managerFlag,
    "$hireDate": hireDate,
  };
  const empStatus = await readProperty(empStatusSchema, startDate, bindings);
  const primaryInfo = await readProperty(primaryInfoSchema, startDate, bindings);
  const joiningInfo = await readProperty(joiningInfoSchema, startDate, bindings);
  const jobInfo = await readProperty(jobInfoSchema, startDate, bindings);
  const contractInfo = await readProperty(contractInfoSchema, startDate, bindings);
  const workDetails = await readProperty(workDetailsSchema, startDate, bindings);
  base_payload.data.paom.persons[0].empStatus = [empStatus];
  base_payload.data.paom.persons[0].primaryInfo = [primaryInfo]
  base_payload.data.paom.persons[0].joiningInfo = [joiningInfo]
  base_payload.data.paom.persons[0].jobInfo = [jobInfo]
  base_payload.data.paom.persons[0].contractInfo = [contractInfo]
  base_payload.data.paom.persons[0].workDetails = [workDetails]
  return [base_payload, startDate];
}

module.exports = { createNewHire };
