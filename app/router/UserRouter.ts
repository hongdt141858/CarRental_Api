import UserAccountController from "../controller/UserAccountController";

const express = require('express');
const router = express.Router();

const userAccountController = new UserAccountController()

router.get('/', userAccountController.getAll);
router.get('/verifyAuth', userAccountController.getUserByToken);
router.get('/:user_account_id', userAccountController.getOne);
router.post('/signup', userAccountController.postSignup);
router.put('/login', userAccountController.putLogin);
router.put('/logout', userAccountController.putLogout);
router.put('/edit', userAccountController.putUpdateUser);
router.put('/change-password', userAccountController.putChangePassword)

module.exports = router;