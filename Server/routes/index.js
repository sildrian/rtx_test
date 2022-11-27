'use strict'

import { Router } from 'express';

// 4. Import routes
import externalapi from './externalAPI.js';
import controller from '../app/controllers/crudController.js'

const router = Router({
  caseSensitive: true
})

// 5. Use imported routes in router
router.use(externalapi)
router.get('/api/getapitodb', controller.save);
router.get('/api/get', controller.get);
router.post('/api/update', controller.update);
router.post('/api/delete', controller.delete);

export default router;