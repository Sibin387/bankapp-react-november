import React from 'react';
import swal from 'sweetalert';
import Bank from './Bank';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';


const depositSchema = Yup.object().shape({
  dpUsername: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required')
});


const withdrawalSchema = Yup.object().shape({
  wdUsername: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

class Home extends React.Component{
  state={
    wdUsername:"",
    wdAmount:"",
    balance:""
  }
  onDeposit = (values)=>{
    let uname=values.dpUsername;
    let amt=Number(values.dpAmount);
    // let btag=document.querySelector("#bal");
    Bank.deposit(uname, amt)
    .then(response=>{
      this.setState({balance: response.data.balance});
      swal("Deposit sucess!", response.data.message, "success");
    })
    .catch(err=>{
      swal("Deposit failed!",  err.response.data.message, "error");
    })


    // let data=Bank.getAccountDetails();
    // if(uname in data){
    //         data[uname]["balance"]+=amt
    //         let bal=data[uname]["balance"]
    //         // btag.textContent="available balance:"+bal
    //         data[uname]["history"].push({
    //           typeOfTransaction:"Credit",
    //           amount:amt
    //         });
    //         Bank.saveData();
    //         this.setState({balance:bal});
    //     swal("Deposit successful")
    // }
    // else{
    //     swal("invalid user")
    // }
  }
  onWithdraw = (event)=>{
    event.preventDefault();
    
    let uname=this.state.wdUsername;
    let amt=parseInt(this.state.wdAmount);
    // let btag=document.querySelector("#bal");

    Bank.withdraw(uname, amt)
    .then(response=>{
      this.setState({balance: response.data.balance});
      swal("Withdraw sucess!", response.data.message, "success");
    })
    .catch(err=>{
      swal("Withdraw failed!",  err.response.data.message, "error");
    })


    // let data=Bank.getAccountDetails();
    // if(uname in data){
    //   let avlbal=data[uname]["balance"]
    //   if(amt>avlbal){
    //     swal("insufficient balance")
    //   }
    //   else{
    //     data[uname]["balance"]-=amt
    //     let bal=data[uname]["balance"]
    //     // btag.textContent="available balance:"+bal
    //     this.setState({balance:bal});
    //     data[uname]["history"].push({
    //       typeOfTransaction:"Debit",
    //       amount:amt
    //     })
    //     Bank.saveData();
    //     swal("Withdraw successful")
    //   }
    // }
    // else{
    //     swal("invalid user")
    // }
  }
  dpUsernameChange=(event)=>{
    this.setState({
      dpUsername:event.target.value
    })
  }
  dpAmountChange=(event)=>{
    this.setState({
      dpAmount:event.target.value
    })
  }
  wdUsernameChange=(event)=>{
    this.setState({
      wdUsername:event.target.value
    })
  }
  wdAmountChange=(event)=>{
    this.setState({
      wdAmount:event.target.value
    })
  }
    render(){
        return (<div className="container">
          Balance:{this.state.balance}
          <Link to="/history">History</Link>
          <div className="row">
              <div className="col-6">


              <Formik
                  initialValues={{
                    dpUsername: '',
                    dpAmount: '',
                  }}
                  validationSchema={depositSchema}
                  onSubmit={this.onDeposit}
                  >
                  {({ errors }) => (
                      <Form>
                          <h3>Deposit</h3>
                          <div className="form-group">
                              <label for="exampleInputEmail1">Username</label>
                                <Field name="dpUsername" className="form-control" />
                            </div>
                            <div className="form-group">
                              <label for="exampleInputPassword1">Amount</label>
                                <Field name="dpAmount" className="form-control" />
                            </div>
                            <button type="submit" className="btn btn-primary" >Deposit</button>
                      </Form>
                  )}
                </Formik>

                </div>

              <div className="col-6">
                  <form onSubmit={this.onWithdraw}>
                    <h3>withdraw</h3>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Username</label>
                        <input value={this.state.wdUsername} onChange={this.wdUsernameChange} type="text" className="form-control" id="uname1" aria-describedby="emailHelp" />
                      </div>
                      <div className="form-group">
                        <label for="exampleInputPassword1">Amount</label>
                        <input value={this.state.wdAmount} onChange={this.wdAmountChange} type="text" className="form-control" id="amount1" />
                      </div>
                      <button type="submit" className="btn btn-primary" >Deposit</button>
                    </form>
                </div>
              </div>
        </div>
        );
    }
}

export default Home;