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
    .required('Required')
});
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

    onSubmit=(values)=>{
        let usname=values.username;
        let pwd=values.password;

        Bank.login(usname, pwd)
        .then(response=>{
            swal("login sucess!", response.data.message, "success");
            this.props.history.push("/home");
        }).catch(err=>{
            swal("login failed!", "u provided invalid message!", "error");
        });

        // let data=Bank.getAccountDetails();
        // if(usname in data){//abc in data
        //     let password=data[usname]["password"];
        //     if(pwd==password){
        //         Bank.setCurrentUser(usname);
        //         swal("login sucess!", "u provided valid data!", "success");
        //         this.props.history.push("/home");
        //         // setTimeout(()=>window.location.href="/home",5000) 
        //     }
        //     else{
        //         swal("login failed!", "u provided invalid message!", "error");
        //     }
        // }
        // else{
        //     alert("inavlid user")
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
                        }}
                        validationSchema={validation}
                        onSubmit={this.onSubmit}
                        >
                        {({ errors }) => (
                            <Form>
                                <Field name="username" />
                                {errors.username ? (
                                    <div>{errors.username}</div>
                                ) : null}
                                <Field name="password" />
                                {errors.password ? (
                                    <div>{errors.password}</div>
                                ) : null}
                                <button type="submit">Submit</button>
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
export default withRouter(Login);