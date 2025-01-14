const UserRepository=require('../repository/user-repository');
const jwt=require('jsonwebtoken');
const {JWT}=require('../config/serverConfig');
const bcrypt=require('bcrypt');


class UserService {
    constructor(){
        this.userRepository=new UserRepository();
    }

    async create(data){
        try{
            const user=await this.userRepository.create(data);
            return user;   
        }
        catch(error){
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }

    createToken(user){
        try{
       const result=jwt.sign(user,JWT,{expiresIn:'1h'});
       return result;
        }
        catch(error){
            console.log("Something went wrong in token creation");
            throw error;
        }
    }

    verifyToken(token){
        try{
        const response=jwt.verify(token,JWT);
        return response;
        }
        catch(error){
            console.log("Something went wrong in token validation");
            throw error;
        }
    }

    checkPassword(userInputPlainPassword,encryptedPassword,){
        try{
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
        }
        catch(error){
            console.log("Something went wrong in password checking");
            throw error;
        }
    }
}

module.exports=UserService;