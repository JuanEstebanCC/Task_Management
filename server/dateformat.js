const dateFormat = require('dateformat');
const faker = require('faker');


const env = {
  taskName: faker.hacker.verb(),
  priority: faker.random.arrayElement([1, 2, 3]),
  expDate: dateFormat(faker.date.past(), 'H:MM'),
  taskImage: faker.image.avatar(),
};
console.log(env);
