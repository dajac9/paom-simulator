//returns a value given a regex that gives the generation rule
const RandExp = require('randexp');

async function generateValue(regex) {
 const regexObj = new RegExp(regex);
 const value = new RandExp(regexObj).gen();
 console.log("Generated value: ", value)
 return value
}

async function readProperty(schema, startDate){
    var obj = {}
    const keys = Object.keys(schema)
    for(const key of keys){
        const current = schema[key]
        if(current["pattern"] === undefined){
            obj[key] = await readProperty(current,startDate)
        }else{
            obj[key] = await generateValue(current.pattern)
        }
    }
    return obj
}


module.exports = { readProperty }