import helpers = require("./helpers");

const slug = helpers.slugify("Hello World");
const short = helpers.truncate("This is a long text", 10);

console.log(slug);
console.log(short);