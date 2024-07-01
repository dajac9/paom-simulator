//returns a value given a regex that gives the generation rule
const RandExp = require('randexp');


async function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

async function isJSON(field){
    if (typeof field === 'object' && !Array.isArray(field) && field !== null) {
        return true
      } else {
        return false   
    }
}

async function generateValue(regex) {
 const regexObj = new RegExp(regex);
 const value = new RandExp(regexObj).gen();
 console.log("Generated value: ", value)
 return value
}

async function addBinding(current,bindings){
    if(bindings[current]){
        return bindings[current]
    }else{
        return current
    }
}

async function readProperty(schema, startDate, bindings = {}){
    var obj = {}
    const keys = Object.keys(schema)
    for(const key of keys){
        const current = schema[key]
        //if is a json object
        if(await isJSON(current)){
            console.log("Reading object: ", current)
            if(current["pattern"] === undefined){
                obj[key] = await readProperty(current,startDate)
            }else{
                obj[key] = await generateValue(current.pattern)
            }
        }//else if string definition
        else{
            obj[key] = await addBinding(current,bindings)
        }
    }
    return obj
}


module.exports = { readProperty,getCurrentDate }