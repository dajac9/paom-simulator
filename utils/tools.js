//returns a value given a regex that gives the generation rule
const RandExp = require("randexp");
const {getCityName,getFullName,getFirstName,getLastNames} = require("./dictionaries.js");

async function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

async function addDays(dateString, days) {
  console.log("Adding days to date: ", dateString);
  const date = new Date(dateString);
  console.log("Date object: ", date);
  // Add the specified number of days to the date object
  date.setDate(date.getDate() + days);

  // Format the resulting date object back into the "YYYY-MM-DD" format
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const newDate = `${year}-${month}-${day}`
  console.log(newDate)
  return newDate;
}

async function isJSON(field) {
  if (typeof field === "object" && !Array.isArray(field) && field !== null) {
    return true;
  } else {
    return false;
  }
}

async function generateValue(regex) {
  const regexObj = new RegExp(regex);
  const value = new RandExp(regexObj).gen();
  return value;
}

async function addBinding(current, bindings) {
  const dinamic = {
    "#cityName": await getCityName(),
    "#getFirstName": await getFirstName(),
    "#getLastName": await getLastNames(),
    "#getFullName": await getFullName(),
  }
  if (bindings[current]) {
    return bindings[current];
  } else if (dinamic[current]) {
    console.log(`Dinamic value:[${current}]: ${dinamic[current]}`)
    return  dinamic[current];
  }else{
    return current
  }
}

async function readProperty(schema, bindings = {}) {
  var obj = {};
  const keys = Object.keys(schema);
  for (const key of keys) {
    const current = schema[key];
    //if is a json object
    if (await isJSON(current)) {
      //console.log("Reading object: ", current);
      if (current["pattern"] === undefined) {
        obj[key] = await readProperty(current, bindings);
      } else {
        const val = await generateValue(current.pattern);
        obj[key] = val
        console.log(`Generated value [${key}]:  ${val}`);
      }
    } //else if string definition
    else {
      obj[key] = await addBinding(current, bindings);
    }
  }
  return obj;
}

module.exports = { readProperty, getCurrentDate, addDays };
