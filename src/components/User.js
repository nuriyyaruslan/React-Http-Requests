import React, { Component } from 'react'
import PropTypes from "prop-types"
import UserConsumer from "../context"
import axios from "axios";
import {Link } from 'react-router-dom';

class User extends Component {
    static defaultProps = {
        fullname: "There is no info",
        position: "There is no info",
        salary: "There is no info",
        id: "empty"
    }
    constructor(props) {
        super(props);

        this.state = {
            isVisible: false
        }
    }

    onClickEvent = (e) => {
        this.setState({
            isVisible: !this.state.isVisible
        })
    }

    onDeleteUser = async (dispatch,e) => {
        const { id } = this.props;
        // Delete Request
        await axios.delete(`http://localhost:3004/users/${id}`);

        //Consumer Dispacth
        dispatch({type: "DELETE_USER",payload:id});
    }
   
    render() {
        //Destructing
        const {id, fullname, position, salary } = this.props;
        const { isVisible } = this.state;
        return (
            <UserConsumer>
                {
                    value => {
                        const { dispatch } = value;
                        return (
                        <div className="User">
                            <div className="col-md-12 mb-4">
                                <div className="card" style = {isVisible ? {backgroundColor:"#5201CF",color:"#fff"} : null}>
                                    <div className="card-header d-flex justify-content-between align-items-center">
                                        <h4 className="d-inline" onClick={this.onClickEvent}>{fullname}</h4>
                                        <i onClick = {this.onDeleteUser.bind(this,dispatch)} className="fa fa-trash" style={{ cursor: "pointer" }}></i>
                                    </div>
                                    {
                                        isVisible ? <div className="card-body">
                                            <p className="card-text">Position:{position}</p>
                                            <p className="card-text">Salary:{salary}</p>
                                            <Link to = {`edit/${id}`} className="btn btn-info btn-block">Update User</Link>
                                        </div> : null
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
            }
            </UserConsumer>
        )
    }
}

User.propTypes = {
    fullname: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    salary: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
}

export default User;