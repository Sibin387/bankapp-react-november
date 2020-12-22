import React from 'react';
import swal from 'sweetalert';
import Bank from './Bank';
import { withRouter } from 'react-router';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const validation = Yup.object().shape({
    username: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    password: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    confirmPassword: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    acno: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
  });

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
        if(!usname){
            swal("error!", "usname is required", "success");
            return;
        }

        Bank.register(usname, pwd, confirmPassword, acno)
        .then(response=>{
            swal("register sucess!", response.data.message, "success");
            this.props.history.push("/");
        }).catch(err=>{
            swal("register failed!", err.response.data.message, "error");
        });

        // let data=Bank.getAccountDetails();
        // if(usname in data){//abc in data
        //     swal("register failed!", "user already exists. Please login", "error");
        // }else if(pwd != confirmPassword){
        //     swal("register failed!", "Password and confirm password doesn't match", "error");
        // }
        // else{
        //     Bank.addUser(usname,pwd,acno);
        //     swal("registration success!", "Registration successful. Please login.", "success");
        //     this.props.history.push("/");
        // }
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


                    <Formik
                        initialValues={{
                            username: '',
                            password: '',
                            confirmPassword: '',
                            acno: '',
                        }}
                        validationSchema={validation}
                        onSubmit={this.onSubmit}
                        >
                        {({ errors, touched }) => (

                        <Form>
                            <div className="jumbotron">
                                <div className="form-group">
                                <label for="exampleInputEmail1">Username</label>
                                <Field type="text" name="username" />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your username with anyone else.</small>
                                </div>
                                <div className="form-group">
                                <label for="exampleInputEmail1">Account Number</label>
                                <Field name="acno"/>
                                <small id="emailHelp" className="form-text text-muted">We'll never share your username with anyone else.</small>
                                </div>
                                <div className="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <Field name="password" />
                                </div>
                                <div className="form-group">
                                <label for="exampleInputPassword1">Confirm Password</label>
                                <Field name="confirmPassword" />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </Form>

                        )}
                    </Formik>


                    </div>
                    <div className="col-4"></div>
                </div>
            </div>
        );
    }

}

export default withRouter(Register);