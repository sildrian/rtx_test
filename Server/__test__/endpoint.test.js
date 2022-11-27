const express = require('express');
const controller = require('./controllertest/crud.js')

const app = express();

describe('Test endpoint', function () {

  test('responds to /api/get', async () => {
    const res = await controller.get()
    expect(res).toBe('get api data');
  });

  test('responds to /api/update', async () => {
    const res = await controller.update()
    expect(res).toBe('update api data');
  });

  test('responds to /api/delete', async () => {
    const res = await controller.delete()
    expect(res).toBe('delete api data');
  });

});