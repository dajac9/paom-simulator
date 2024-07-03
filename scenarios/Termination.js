const { readProperty, addDays } = require("../utils/tools");
const {
  empStatusSchema,
  jobInfoSchema,
  contractInfoSchema,
  workDetailsSchema,
  payrollInfoSchema,
} = require("./schemas/events/TerminationEvent.json");

async function createTermination(newHire, params) {
  const { terminationDate } = params;
  const lastEventIndex = newHire.data.paom.persons[0].empStatus.length - 1;
  const lastEventDate =
    newHire.data.paom.persons[0].empStatus[lastEventIndex].validFrom;
  const terminationEventDate = await addDays(lastEventDate, terminationDate);
  const base_payload = newHire;
  const validTillNewHire = await addDays(terminationEventDate, -1);
  base_payload.data.paom.persons[0].empStatus[lastEventIndex].validTill =
    validTillNewHire;
  base_payload.data.paom.persons[0].contractInfo[lastEventIndex].validTill =
    validTillNewHire;
  base_payload.data.paom.persons[0].jobInfo[lastEventIndex].validTill =
    validTillNewHire;
  base_payload.data.paom.persons[0].workDetails[lastEventIndex].validTill =
    validTillNewHire;
  base_payload.data.paom.persons[0].payrollInfo[lastEventIndex].validTill =
    validTillNewHire;
  const personID = base_payload.data.paom.persons[0].personId;
  const isManager = base_payload.data.paom.persons[0].empStatus[0].managerFlag;
  const bindings = {
    $startDate: terminationEventDate,
    $employeeId: personID,
    $mangerFlag: isManager,
  };
  const empStatus = await readProperty(empStatusSchema, bindings);
  const jobInfo = await readProperty(jobInfoSchema, bindings);
  const contractInfo = await readProperty(contractInfoSchema,bindings);
  const workDetails = await readProperty(workDetailsSchema,bindings);
  const payrollInfo = await readProperty(payrollInfoSchema,bindings);
  base_payload.data.paom.persons[0].empStatus.push(empStatus);
  base_payload.data.paom.persons[0].jobInfo.push(jobInfo);
  base_payload.data.paom.persons[0].contractInfo.push(contractInfo);
  base_payload.data.paom.persons[0].workDetails.push(workDetails);
  base_payload.data.paom.persons[0].payrollInfo.push(payrollInfo);
  base_payload.data.paom.persons[0].primaryInfo[0].lastWorkingDate =
    terminationEventDate;
  base_payload.data.paom.persons[0].primaryInfo[0].terminationDate =
    terminationEventDate;
  return [base_payload, terminationDate];
}

module.exports = { createTermination };
