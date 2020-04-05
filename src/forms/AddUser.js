import React, { Component } from 'react';
import posed from 'react-pose';
import UserConsumer from '../context';
import axios from 'axios';

const Animation = posed.div({
    visible: {
        opacity:1,
        applyAtStart:{
            display:"block"
        }
       
    },
    hidden: {
        opacity:0,
        applyAtEnd:{
            display:"none"
        }
       
    }
})

class AddUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible : true,
            fullname: "",
            position: "",
            salary:   "",
            error:false
        }
    }   
   
    changeVisibility = (e) => {
        this.setState({
            visible: !this.state.visible
        })
    }
    validateForm = () => {
        const{ fullname,position,salary } = this.state;
        if(fullname === "" || position === "" || salary === "") {
            return false;
        }
        return true;
    }
    changeInput = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    addUser = async (dispatch,e) => {
        e.preventDefault();
        const {fullname,position,salary} = this.state;
        const NewUser = {
            fullname,
            position,
            salary
        }

        if(!this.validateForm()) {
            this.setState({
                error: true
            })
            return;
        }

        const response = await axios.post("http://localhost:3004/users",NewUser);

        dispatch({type: "ADD_USER",payload:response.data});

        //Redirect
        this.props.history.push("/");
    }
    render() {
        const {visible,fullname,position,salary,error} = this.state;
        return <UserConsumer>
            {
                value => {
                    const {dispatch} = value;
                    return (
                        <div className="col-md-12 mb-4">
                            <button onClick = {this.changeVisibility} className="btn btn-dark btn-block mb-2">{visible ? "Hide Form" : "Show Form"}</button>
                            <Animation pose = {visible ? "visible" : "hidden"}>
                                <div className="card">
                                    <div className="card-header">
                                        <h4>Add User Form</h4>
                                    </div>
                                    <div className="card-body">
                                        {
                                            error ?
                                            <div className="alert alert-danger">
                                                Please check your information
                                            </div>
                                            :null
                                        }
                                        <form onSubmit = {this.addUser.bind(this,dispatch)}>
                                            <div className="form-group">
                                                <label htmlFor="fullname">Fullname</label>
                                                <input
                                                    type="text"
                                                    name="fullname"
                                                    placeholder="Enter fullname"
                                                    id="id"
                                                    value={fullname}
                                                    className="form-control"
                                                    onChange = {this.changeInput}
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
                                                    onChange = {this.changeInput}
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
                                                    onChange = {this.changeInput}
                                                />
                                            </div>
                                            <button type="submit" className="btn btn-danger btn-block">Add User</button>
                                        </form>
                                    </div>
                                </div>
                            </Animation>
                        </div>
                    )
                }
            }
        </UserConsumer>
    }
}
export default AddUser;