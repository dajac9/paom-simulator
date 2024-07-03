const FirstNames = [
  "Olivia",
  "Amelia",
  "Isla",
  "Ava",
  "Emily",
  "Sophia",
  "Grace",
  "Mia",
  "Lily",
  "Charlotte",
  "Oliver",
  "George",
  "Harry",
  "Noah",
  "Jack",
  "Leo",
  "Arthur",
  "Oscar",
  "Charlie",
  "Henry",
];
const LastNames = [
  "Smith",
  "Jones",
  "Williams",
  "Brown",
  "Taylor",
  "Davies",
  "Wilson",
  "Evans",
  "Thomas",
  "Johnson",
  "Roberts",
  "Walker",
  "Wright",
  "Thompson",
  "White",
  "Harris",
  "Clark",
  "Lewis",
  "Green",
  "Hall",
];
const streetNames = [
    "High Street",
    "Main Street",
    "Park Road",
    "Church Street",
    "Station Road",
    "London Road",
    "Victoria Street",
    "Market Street",
    "Queen Street",
    "Mill Lane",
    "Bridge Street",
    "Green Lane",
    "New Street",
    "King Street",
    "School Lane",
    "Grove Road",
    "Manor Road",
    "Hillside Avenue",
    "West Street",
    "The Crescent"
  ];

  const cities = [
    "London",
    "Birmingham",
    "Manchester",
    "Glasgow",
    "Leeds",
    "Liverpool",
    "Newcastle",
    "Sheffield",
    "Bristol",
    "Edinburgh",
    "Cardiff",
    "Belfast",
    "Nottingham",
    "Southampton",
    "Leicester",
    "Brighton",
    "Coventry",
    "Hull",
    "Stoke-on-Trent",
    "Derby"
  ];

const getRandomElement = async (array) => {
  return array[Math.floor(Math.random() * array.length)];
}

const getCityName = async () => {
    return getRandomElement(cities);
}

const getFullName = async (f,l) => {
  if(f !== undefined){
    return `${f} ${l}`;
  
  }
  const firstName = await getRandomElement(FirstNames);
  const lastName = await getRandomElement(LastNames);
  return `${firstName} ${lastName}`;
}

const getFirstName = async () => {
    return getRandomElement(FirstNames);
    
}

const getLastNames = async () => {
    return getRandomElement(LastNames);
}
module.exports = { getCityName,getFullName,getFirstName,getLastNames };