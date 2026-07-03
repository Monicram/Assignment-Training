const dayjs = require('dayjs')

console.log("Today:", dayjs().format('DD/MM/YYYY'))
console.log("Day of week:", dayjs().format('dddd'))
console.log("Next week:", dayjs().add(7, 'day').format('DD/MM/YYYY'))
console.log("Is before 2030?", dayjs().isBefore('2030-01-01'))

//require('dayjs') imports the Day.js library into the program.
//Node.js looks for it in the node_modules folder.