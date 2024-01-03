const express = require('express');
const router = express.Router();
const RolesController = require('../controllers/roles/roles');


router.post('/create', RolesController.createRole);
router.get('/', RolesController.viewAllRoles);
module.exports = router