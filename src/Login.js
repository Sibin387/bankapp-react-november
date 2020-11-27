import React from 'react';
import swal from 'sweetalert';
import Bank from './Bank';
import { withRouter } from 'react-router';

class Login extends React.Component{
    state={
        username:"",
        password:"",
    }

    onUsernameChange=(event)=>{
        this.setState({
            username:event.target.value
        })
    }
    
    onPasswordChange=(event)=>{
        this.setState({
            password:event.target.value
        })
    }

    onSubmit=(event)=>{
        event.preventDefault();
        let usname=this.state.username;
        let pwd=this.state.password;
        let data=Bank.getAccountDetails();
        if(usname in data){//abc in data
            let password=data[usname]["password"];
            if(pwd==password){
                Bank.setCurrentUser(usname);
                swal("login sucess!", "u provided valid data!", "success");
                this.props.history.push("/home");
                // setTimeout(()=>window.location.href="/home",5000) 
            }
            else{
                swal("login failed!", "u provided invalid message!", "error");
            }
        }
        else{
            alert("inavlid user")
        }
    }

    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8"><h1>WELCOME TO SBK BANK</h1></div>
                </div>
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <form onSubmit={this.onSubmit}>
                            <div className="jumbotron">
                                <div className="form-group">
                                <label for="exampleInputEmail1">Username</label>
                                <input type="text" value={this.state.username} onChange={this.onUsernameChange} className="form-control" id="uname" aria-describedby="emailHelp" />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your username with anyone else.</small>
                                </div>
                                <div className="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" value={this.state.password} onChange={this.onPasswordChange} className="form-control" id="pwd" />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-4"></div>
                </div>
            </div>
        );
    }
}
export default withRouter(Login);