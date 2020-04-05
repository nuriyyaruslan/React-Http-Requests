import React, { Component } from 'react';
import UserConsumer from '../context';
import axios from 'axios';

class UpdateUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullname: "",
            position: "",
            salary: "",
            error: false
        }
    }

    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    componentDidMount = async () => {
        const { id } = this.props.match.params;
        const response = await axios.get(`http://localhost:3004/users/${id}`);
        const { fullname, position, salary } = response.data;
        this.setState({
            fullname,
            position,
            salary
        })
    }
    validateForm = () => {
        const { fullname, position, salary } = this.state;
        if (fullname === "" || position === "" || salary === "") {
            return false;
        }
        return true;
    }
    updateUser = async (dispatch, e) => {
        e.preventDefault();

        //Update User
        const { fullname, position, salary } = this.state;
        const { id } = this.props.match.params;
        const updatedUser = {
            fullname,
            position,
            salary
        };
        if (!this.validateForm()) {
            this.setState({
                error: true
            })
            return;
        }
        const response = await axios.put(`http://localhost:3004/users/${id}`, updatedUser);

        dispatch({ type: "UPDATE_USER", payload: response.data });

        //Redirect
        this.props.history.push("/");
    }
    render() {
        const { fullname, position, salary,error } = this.state;
        return <UserConsumer>
            {
                value => {
                    const { dispatch } = value;
                    return (
                        <div className="col-md-12 mb-4">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Update User Form</h4>
                                </div>
                                <div className="card-body">
                                    {
                                        error ?
                                            <div className="alert alert-danger">
                                                Please check your information
                                            </div>
                                            : null
                                    }
                                    <form onSubmit={this.updateUser.bind(this, dispatch)}>
                                        <div className="form-group">
                                            <label htmlFor="fullname">Fullname</label>
                                            <input
                                                type="text"
                                                name="fullname"
                                                placeholder="Enter fullname"
                                                id="id"
                                                value={fullname}
                                                className="form-control"
                                                onChange={this.changeInput}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="position">Position</label>
                                            <input
                                                type="text"
                                                name="position"
                                                placeholder="Enter position"
                                                id="position"
                                                value={position}
                                                className="form-control"
                                                onChange={this.changeInput}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="salary">Salary</label>
                                            <input
                                                type="text"
                                                name="salary"
                                                placeholder="Enter salary"
                                                id="salary"
                                                value={salary}
                                                className="form-control"
                                                onChange={this.changeInput}
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-danger btn-block">Save</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )
                }
            }
        </UserConsumer>
    }
}
export default UpdateUser;