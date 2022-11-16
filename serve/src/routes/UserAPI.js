const express = require('express')
const UserController = require('../controllers/UserController');
const router = express.Router();


router.get('/users', UserController.GetAllUser);
router.get('/usuarios/:id', UserController.UserFindId);
router.post('/register', UserController.Register);
router.post('/login', UserController.Login);
router.put('/update/:id', UserController.UpdateUser);
router.delete('/delete/:id', UserController.Delete_User);




module.exports = router;