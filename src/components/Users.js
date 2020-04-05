import React, { Component } from 'react';
import User from './User';
import UserConsumer from "../context";

class Users extends Component {
    render() {
        return (
            <UserConsumer>
                {
                    value => {
                        const { users } = value;
                        return (
                            <div>
                                {
                                    users.map(user => {
                                        return (
                                            <User
                                                key={user.id}
                                                id={user.id}
                                                fullname={user.fullname}
                                                position={user.position}
                                                salary={user.salary}
                                            />
                                        )
                                    })
                                }
                            </div>
                        )
                    }
                }
            </UserConsumer>
        )
    }
}

export default Users;