const User = require("../model/User");
const parseRequestData = require("../util");
const BaseClass = require("./common.contrroller");

class UserController extends BaseClass {
    response = { status: false, message: null }
    constructor(req, res) {
        super(req, res);
    }

    async addUser() {
        try {
            if (this._request.method != 'POST') throw "Request method is not valid";
            const requestBody = await parseRequestData(this._request);
            if (requestBody.name == null || requestBody.email == null || requestBody.mobile == null || requestBody.password == null) {
                throw "Please fill all required field*";
            }
            requestBody.password = await this.hashPassword(requestBody.password);
            const result = await User.create(requestBody);
            if (Object.keys(result).length > 0) {
                this.response.status = true;
                this.response.message = "User created successfully!!";
            }

            this.apiResponse(this.response);
        } catch (error) {
            this.response.message = error;
            this.apiResponse(this.response);
        }
    }

    async userList(id) {
        try {
            await this.verifyJwtToken();
            if(!this.tokenResponse.status) throw this.tokenResponse.message;
            if (id != null) {
                this.response.status = true;
                this.response.data = await User.findOne({_id : id});                
                // this.response.token = await this.createJwtToken(await User.findOne({_id : id}));                
            } else {
                this.response.status = true;
                this.response.data = await User.find({});
                // this.response.token = await this.createJwtToken(await User.findOne({_id : id}));                
            }

        } catch (error) {
            this.response.message = error;
        }

        this.apiResponse(this.response);
    }

    async updateUser(id) {
        try {
            await this.verifyJwtToken();
            if (this._request.method != 'PUT') throw "Request is not valid";
            if(!this.tokenResponse.status) throw this.tokenResponse.message;
            const requestBody = await parseRequestData(this._request);
            const res = await User.findByIdAndUpdate({_id : id}, requestBody, {new : true});
            if (Object.keys(res).length > 0) {
                this.response.status = true;
                this.response.message = "Record has been updated!!";
            }
        } catch (error) {
            this.response.status = false;
            this.response.message = error;
        }

        this.apiResponse(this.response);
    }

    async deleteUser(id) {
        try {
            if (this._request.method != 'DELETE' || id === '' || id === null) {
                throw "Request is not valid, please try again";
            }
            await this.verifyJwtToken();
            if(!this.tokenResponse.status) throw this.tokenResponse.message;
            const result = await User.findByIdAndDelete({_id : id});
            if (result) {
                this.response.status = true;
                this.response.message = 'User deleted successfully!!';
            }
        } catch (error) {
            this.response.message = error;
        }

        this.apiResponse(this.response);
    }


}

module.exports = UserController;