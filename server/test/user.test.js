const request = require('supertest');
const faker = require('faker');
const app = require('../index');
const dateFormat = require('dateformat');

describe('Pruebas para los servicios de User (Register,Login)', () => {
  it('Verificar creación de un usuario', async () => {
    const res = await request(app).post('/register').send({
      email: faker.internet.email(),
      password: faker.internet.password(),
      full_name: faker.name.findName(),
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
  it('Verificar que cuándo se ingrese un email no existente de error', async () => {
    const res = await request(app).post('/login').send({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    expect(res.statusCode).toEqual(404);
  });
});

// describe('Pruebas para los servicios de Task (Creación,Edición,Eliminación)', () => {
//   it('Verificar la creación de una Task', async()=>{
//     const res = await request(app)
//     .post('/new_task')
//   })
//   it('Verificar la elimiación de una Task', async () => {
//         const res = await request(app).delete('/delete_task/60301219ebff8d18889f876f')
//     expect(res.statusCode).toEqual(200);
//   });
// });
