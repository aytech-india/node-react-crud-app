import React from "react"
import { Link } from "react-router-dom";
class List extends React.Component {
    constructor() {
        super();
        this.state = {
            result: null,
            data: null,
        }
    }
    async componentDidMount() {
        localStorage.setItem('data', JSON.stringify({name : "ajeet yadav"}));
        try {
            let promicesJson = await fetch('http://localhost:3000/user-list'
                , {
                    method: "GET" // default, so we can ignore
                });

            let data = await promicesJson.json();
            this.setState({ data: data.data });
        } catch (error) {
            console.log('error');
            console.log(error);
        }

    }

    deleteRecord = async (id) => {
        const promiseRes = await fetch(`http://localhost:3000/delete-user?id=${id}`, { method: "DELETE" });
        this.setState({ result: await promiseRes.json() });
    }

    async componentDidUpdate() {
        if (this.state.result != null && this.state.result.status) {
            console.log('componentDidUpdate');
            let promicesJson = await fetch('http://localhost:3000/user-list'
                , {
                    method: "GET" // default, so we can ignore
                });

            let data = await promicesJson.json();
            this.setState({ data: data.data });
            this.setState({result : null});
        }
    }
    render() {
        let result = this.state.data;
        return (
            <React.Fragment>
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">User List
                            <Link className="btn btn-primary" style={{ float: "right" }} to={'/add-user'}>Add User</Link></h3>
                    </div>
                    <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Mobile</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                result != null ? result.map((Element, index) =>
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{Element.name}</td>
                                            <td>{Element.email}</td>
                                            <td>{Element.mobile}</td>
                                            <td>
                                                <button type="button"><Link to={`/update-user?id=${Element._id}`}> Update </Link></button>
                                                <button type="button" className="text-danger ml-2" onClick={() => this.deleteRecord(Element._id)} style={{ marginLeft: "5px" }}>Delete</button>
                                            </td>
                                        </tr>
                                    ) : null
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default List;