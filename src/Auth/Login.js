import React from "react";
import { Link } from "react-router-dom"
class Login extends React.Component {

    componentDidMount() {

    }

    render() {
        return(
            <div className="login">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title">Login Form</div>
                            </div>
                            <div className="card-body">
                                <div className="form-group">
                                    <label for="username">Username</label>
                                    <input type="text" className="form-control" name="username" placeholder="Enter Username" />
                                </div>
                                <div className="form-group">
                                    <label for="password">Password</label>
                                    <input type="password" className="form-control" name="password" placeholder="Enter Password" />
                                </div>
                                <button type="button" className="btn btn-primary text-right mt-2">Login</button>
                                <Link to="/dashboard">Dashboard</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        )
    }
}

export default Login;