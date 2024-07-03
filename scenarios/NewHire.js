const base_payload = require("./schemas/paom.json");
const { PersonSchema } = require("./schemas/person.json");
const {
  empStatusSchema,
  primaryInfoSchema,
  joiningInfoSchema,
  jobInfoSchema,
  contractInfoSchema,
  workDetailsSchema,
  payrollInfoSchema
} = require("./schemas/events/hireEvent.json");

const {birthInfoSchema, phoneNumbersSchema, emailIdsSchema, namesSchema} = require("./schemas/personSchemas.json");
const { readProperty } = require("../utils/tools");

async function createNewHire(startDate, params) {
  //creates person related data
  const person = await readProperty(PersonSchema, {"$startDate": startDate});
  const { managerFlag, hireDate } = params;
  const personId = person.personId;
  const bindings = {
    "$startDate": startDate,
    "$employeeId": personId,
    "$mangerFlag": managerFlag,
    "$hireDate": hireDate,
  };
  base_payload.data.paom.persons.push(person);
  base_payload.data.paom.totalPages = 1;
  base_payload.data.paom.totalRecords = base_payload.data.paom.persons.length;
  //creates person related data
  base_payload.data.paom.persons[0].birthInfo = [await readProperty(birthInfoSchema, bindings)];
  base_payload.data.paom.persons[0].phoneNumbers = [await readProperty(phoneNumbersSchema, bindings)];
  base_payload.data.paom.persons[0].emailIds = [await readProperty(emailIdsSchema, bindings)];
  base_payload.data.paom.persons[0].names = [await readProperty(namesSchema, bindings)];
  // creates employment related data
  const empStatus = await readProperty(empStatusSchema, bindings);
  const primaryInfo = await readProperty(primaryInfoSchema, bindings);
  const joiningInfo = await readProperty(joiningInfoSchema, bindings);
  const jobInfo = await readProperty(jobInfoSchema, bindings);
  const contractInfo = await readProperty(contractInfoSchema, bindings);
  const workDetails = await readProperty(workDetailsSchema, bindings);
  const payrollInfo = await readProperty(payrollInfoSchema, bindings);
  base_payload.data.paom.persons[0].empStatus = [empStatus];
  base_payload.data.paom.persons[0].primaryInfo = [primaryInfo]
  base_payload.data.paom.persons[0].joiningInfo = [joiningInfo]
  base_payload.data.paom.persons[0].jobInfo = [jobInfo]
  base_payload.data.paom.persons[0].contractInfo = [contractInfo]
  base_payload.data.paom.persons[0].workDetails = [workDetails]
  base_payload.data.paom.persons[0].payrollInfo = [payrollInfo]
  return [base_payload];
}

module.exports = { createNewHire };
