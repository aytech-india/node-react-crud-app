const UserController = require("./controller/user.controller");
const URL = require('url');
const queryString = require('querystring');
const nodeRoutes = (req, res) => {
    const url = URL.parse(req.url);
    let id = url.query;
    if (id != null) {
        id = queryString.parse(id).id;
    }
    const userController = new UserController(req, res);
    switch (url.pathname) {
        case '/user-list':
                userController.userList(id);
            break;
        case '/add-user':
                userController.addUser();
            break;
        case '/delete-user':
                userController.deleteUser(queryString.parse(url.query).id);
            break;
        case '/login':
                userController.login();
            break;
        case '/update-user':
                userController.updateUser(queryString.parse(url.query).id);
            break;
    
        default:

            break;
    }
}

module.exports = nodeRoutes;