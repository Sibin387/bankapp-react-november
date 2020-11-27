import React from 'react';
import swal from 'sweetalert';
import Bank from './Bank';
import { Link } from 'react-router-dom';

class Home extends React.Component{
  state={
    dpUsername:"",
    dpAmount:"",
    wdUsername:"",
    wdAmount:"",
    balance:""
  }
  onDeposit = (event)=>{
    event.preventDefault();
    let uname=this.state.dpUsername;
    let amt=Number(this.state.dpAmount);
    // let btag=document.querySelector("#bal");
    let data=Bank.getAccountDetails();
    if(uname in data){
            data[uname]["balance"]+=amt
            let bal=data[uname]["balance"]
            // btag.textContent="available balance:"+bal
            data[uname]["history"].push({
              typeOfTransaction:"Credit",
              amount:amt
            });
            Bank.saveData();
            this.setState({balance:bal});
        swal("Deposit successful")
    }
    else{
        swal("invalid user")
    }
  }
  onWithdraw = (event)=>{
    event.preventDefault();
    
    let uname=this.state.wdUsername;
    let amt=parseInt(this.state.wdAmount);
    // let btag=document.querySelector("#bal");
    let data=Bank.getAccountDetails();
    if(uname in data){
      let avlbal=data[uname]["balance"]
      if(amt>avlbal){
        swal("insufficient balance")
      }
      else{
        data[uname]["balance"]-=amt
        let bal=data[uname]["balance"]
        // btag.textContent="available balance:"+bal
        this.setState({balance:bal});
        data[uname]["history"].push({
          typeOfTransaction:"Debit",
          amount:amt
        })
        Bank.saveData();
        swal("Withdraw successful")
      }
    }
    else{
        swal("invalid user")
    }
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
                  <form onSubmit={this.onDeposit}>
                    <h3>Deposit</h3>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Username</label>
                        <input value={this.state.dpUsername} onChange={this.dpUsernameChange} type="text" className="form-control" id="uname" aria-describedby="emailHelp" />
                      </div>
                      <div className="form-group">
                        <label for="exampleInputPassword1">Amount</label>
                        <input value={this.state.dpAmount} onChange={this.dpAmountChange} type="text" className="form-control" id="amount" />
                      </div>
                      <button type="submit" className="btn btn-primary" >Deposit</button>
                    </form>
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