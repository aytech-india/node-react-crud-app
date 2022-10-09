const User = require("../model/User");
const parseRequestData = require("../util");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
class BaseClass {
    _request;
    _response;

    constructor(req, res) {
        this._request = req;
        this._response = res;
        this.tokenResponse = {status : false, message: "Token is not valid!!"};
    }

    apiResponse(response) {
        this._response.setHeader('Access-Control-Allow-Origin', '*');
        this._response.setHeader('Access-Control-Allow-Methods', '*');
        this._response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
        this._response.writeHead(200, {'Content-Type' : 'application/json'});
        this._response.write(JSON.stringify(response));
        this._response.end();
    }

    async login() {
        try {
            let response = {status : false, message : 'Username or password are incorrect!!', data : null};;
            if(this._request.method != 'POST') throw "Request method is not valid, please try again";
            let requestBody = await parseRequestData(this._request);
            if (requestBody.email == '' || requestBody.password == '') throw "Request is not valid, please try again"; 
            let plainPass = requestBody.password;
            delete requestBody.password;
            const result = await User.find(requestBody);
            if (result.length > 0 && await this.verifyHassPass(result[0].password, plainPass)) {
                const token = await this.createJwtToken({name : result[0].name,email : result[0].email,mobile : result[0].mobile});
                response = {status : true, message : 'Login successfully', token : token};
            }

            this.apiResponse(response);
        } catch (error) {
            this.apiResponse(error);
        }
    }

    async hashPassword(pass) {
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPass = await bcrypt.hash(pass, salt);
        return hashPass;
    }

    async verifyHassPass(hashPass, plainPass) {
        return await bcrypt.compare(plainPass, hashPass);
    }

    async createJwtToken(data) {
        try {
            return await jwt.sign(data, process.env.TOKEN_KEY, {expiresIn : "120s"});
        } catch (error) {
            console.log(error);
        }
    }

    async verifyJwtToken() {
        try {
            if('authorization' in this._request.headers && this._request.headers.authorization != '' && this._request.headers.authorization != null) {
                const token = this._request.headers.authorization.split(' ')[1];
                const tokenResult = await jwt.verify(token, process.env.TOKEN_KEY);
                
                if (Object.keys(tokenResult).length > 0) {
                    this.tokenResponse.status = true;
                    this.tokenResponse.message = null;
                }
            }
        } catch (error) {
            // console.log(error);
            this.tokenResponse.message = error.message;
        }
    }


}

module.exports = BaseClass;