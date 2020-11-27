import React from 'react';
import swal from 'sweetalert';
import Bank from './Bank';
import { withRouter } from 'react-router';

class Register extends React.Component{
    state={
        username:"",
        acno:"",
        password:"",
        confirmPassword:""
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
    
    onAcnoChange=(event)=>{
        this.setState({
            acno:event.target.value
        })
    }
    
    onConfirmPasswordChange=(event)=>{
        this.setState({
            confirmPassword:event.target.value
        })
    }

    onSubmit=(event)=>{
        event.preventDefault();
        let usname=this.state.username;
        let pwd=this.state.password;
        let acno=this.state.acno;
        let confirmPassword=this.state.confirmPassword;
        let data=Bank.getAccountDetails();
        if(usname in data){//abc in data
            swal("register failed!", "user already exists. Please login", "error");
        }else if(pwd != confirmPassword){
            swal("register failed!", "Password and confirm password doesn't match", "error");
        }
        else{
            Bank.addUser(usname,pwd,acno);
            swal("registration success!", "Registration successful. Please login.", "success");
            this.props.history.push("/");
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
                                <label for="exampleInputEmail1">Account Number</label>
                                <input type="text" value={this.state.acno} onChange={this.onAcnoChange} className="form-control" id="uname" aria-describedby="emailHelp" />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your username with anyone else.</small>
                                </div>
                                <div className="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" value={this.state.password} onChange={this.onPasswordChange} className="form-control" id="pwd" />
                                </div>
                                <div className="form-group">
                                <label for="exampleInputPassword1">Confirm Password</label>
                                <input type="password" value={this.state.confirmPassword} onChange={this.onConfirmPasswordChange} className="form-control" id="pwd" />
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

export default withRouter(Register);