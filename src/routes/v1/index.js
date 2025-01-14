const express=require('express');

const UserController=require('../../controllers/user-controller');

const {AuthrequestValidators}=require('../../middleware/index');

const router=express.Router();

router.post('/signup',
    AuthrequestValidators.validateUserAuth,
    UserController.create);
router.post('/signin',
    AuthrequestValidators.validateUserAuth,
    UserController.signIn);

    router.get('/isAuthenticated',
        UserController.isAuthenticated
    )

module.exports=router;