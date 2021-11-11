const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.post('/registerTeacher', authController.registerTeacher);
router.post('/loginTeacher', authController.loginTeacher);
router.post('/logoutTeacher', authController.logoutTeacher);

router.post('/addRecord', authController.addRecord);
router.get('/showRecord', authController.showRecord);
router.get('/deleteRecord/:id', authController.deleteRecord);
router.get('/editRecord/:id', authController.editRecord);
router.post('/editRecord/:id', authController.updateRecord);

router.post('/searchResult', authController.searchResult);

router.post('/addAnotherRecord', authController.addAnotherRecord);




module.exports = router;

