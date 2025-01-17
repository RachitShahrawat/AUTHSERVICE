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

    async signIn(email,plainPassword){
        // step 1> fetch the user using the email
        const user=await this.userRepository.getByEmail(email);
        // step 2>compare incoming plain password with store encrypted password
        const passwordmatch=this.checkPassword(plainPassword,user.password);
        if(!passwordmatch){
            console.log("Password mismatch");
            throw{error:'password mismatch'}
        }
        // step 3>if password match then create a new token 
        const newJWT=this.createToken({email:user.email,id:user.id});
        return newJWT;
    }

    async isAuthenticated(token){
        try{
       const response=this.verifyToken(token);
       if(!response){
        throw{error:'invalid token'}
       }
       const user= await this.userRepository.getById(response.id);
       if(!user){
        throw{error:'user not found'}
       }
       return user.id;
        }
        catch(error){
            console.log("Something went wrong in authentication");
            throw error;
        }
    }
    createToken(user){
        try{
       const result=jwt.sign(user,JWT,{expiresIn:'1d'});
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