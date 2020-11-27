import React from 'react';
import { withRouter } from 'react-router';
import Bank from './Bank';
import swal from 'sweetalert';

class Users extends React.Component{
    deleteUser=(username)=>{
        Bank.deleteUser(username);
        swal("Success!", "User deleted successfully", "success");
        this.setState({
            
        });
    }
    render(){
        let users = Bank.getUsers();
        return (<div className="container">
                <h1>Users</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(users).map(key=><tr>
                                <td>{users[key].username}</td>
                                <td>{users[key].balance}</td>
                                <td onClick={()=>{this.deleteUser(key)}}>Delete</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default withRouter(Users);