import React from "react";
import { Navigate } from "react-router-dom";
// import {parse} from "query-string";
class AddUser extends React.Component {
    constructor() {
        super();

        this.state = {
            result: null,
            FormData: {
                name: '',
                email: '',
                mobile: '',
                password: ''
            },

            formDataError : {
                nameErrMsg : null,
                emailErrMsg : null,
                mobileErrMsg : null,
                passwordErrMsg : null
            },
            isValidForm : false,
            singleRecord : null,
            id : null
        }
    }

    async componentDidMount() {
        console.log('localStorage');
        console.log(localStorage.getItem('data'));

        const id = new URLSearchParams(window.location.search).get('id');
        // console.log(id);
        this.setState({id : id});
        // console.log(this.state.id);

        if (id !== null && id !== '') {
            const promiseData = await fetch(`http://localhost:3000/user-list?id=${id}`, {method : "GET"});
            this.setState({singleRecord : await promiseData.json()});
        }

        if (this.state.singleRecord !== null && this.state.singleRecord.status) {
            const data = this.state.singleRecord.data;
            const formDataTemp = this.state.FormData;
            Object.keys(data).forEach((keys) => {
                if (keys in formDataTemp) {
                    formDataTemp[keys] = data[keys];
                }
            });

            // console.log(data);
            this.setState({formDataTemp});
            // data.forEach(())
        }
    }

    addUserForm = async (e) => {
        const data = this.state.FormData;
/*         console.log(JSON.stringify(data));
        return false; */
        Object.keys(data).forEach((index) => {
            this.setState({isValidForm : true});
            const updateData = this.state.formDataError;
            if (data[index] === null) {
                updateData[index+'ErrMsg'] = "Required field*";
                this.setState({isValidForm : false});
            } else {
                updateData[index+'ErrMsg'] = null;
            }
            this.setState({updateData});
        });
        const requestOptions = {
            method : "POST",
            body : JSON.stringify(data)
        }
        if (this.state.id != null) {
            requestOptions.method = "PUT";
            let promiseRes = await fetch(`http://localhost:3000/update-user?id=${this.state.id}`, requestOptions);
            let result = await promiseRes.json();
            this.setState({result : result});
        } else {
            let promiseRes = await fetch('http://localhost:3000/add-user', requestOptions);
            let result = await promiseRes.json();
            this.setState({result : result});
        }
    }

    fieldHandler = (e) => {
        const elementName = e.target.name;
        const value = e.target.value;
        const formDataVar = this.state.FormData;
        formDataVar[elementName] = value;
        this.setState({formDataVar});
    }

    render() {

        if (this.state.result != null && this.state.result.status) {
            return <Navigate to={'/dashboard'}></Navigate>
        }
        return (
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">{this.state.id ? 'Update' : 'Register'} User</div>
                        </div>
                        <div className="card-body">
                            <form method="post" id="addUserForm">
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" name="name" placeholder="Enter name" value={this.state.FormData.name} onChange={this.fieldHandler} />
                                    {this.state.formDataError.nameErrMsg != null ? <span className="error text-danger">{this.state.formDataError.nameErrMsg}</span> : null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" name="email" placeholder="Enter email" value={this.state.FormData.email} onChange={this.fieldHandler} />
                                    {this.state.formDataError.emailErrMsg != null ? <span className="error text-danger">{this.state.formDataError.emailErrMsg}</span> : null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="mobile">Mobile</label>
                                    <input type="mobile" className="form-control" name="mobile" placeholder="Enter mobile" value={this.state.FormData.mobile} onChange={this.fieldHandler} />
                                    {this.state.formDataError.mobileErrMsg != null ? <span className="error text-danger">{this.state.formDataError.mobileErrMsg}</span> : null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" name="password" placeholder="Enter Password" value={this.state.FormData.password} onChange={this.fieldHandler} />
                                    {this.state.formDataError.passwordErrMsg != null ? <span className="error text-danger">{this.state.formDataError.passwordErrMsg}</span> : null}
                                </div>
                                <button type="button" onClick={this.addUserForm} className="btn btn-primary text-right mt-2">{this.state.id ? 'Update' : 'Register'}</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-4"></div>
            </div>
        )
    }
}

export default AddUser;