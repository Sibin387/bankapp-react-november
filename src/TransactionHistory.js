import React from 'react';
import { withRouter } from 'react-router';
import Bank from './Bank';

class TransactionHistory extends React.Component{
    state = {
        history:[]
    }

    render(){
        return (<div className="container">
                <h1>Transaction history</h1>
                <table className="table">
                    <tr>
                        <th>Type Of Transaction</th>
                        <th>Amount</th>
                    </tr>
                    {
                        this.state.history.length==0?<tr>
                        <td>No transactions</td></tr>:null
                    }
                    {
                        this.state.history.map(item=><tr>
                            <td>{item.typeOfTransaction}</td>
                            <td>{item.amount}</td>
                        </tr>)
                    }
                </table>
            </div>
        )
    }

    componentDidMount(){
        Bank.history()
        .then(response=>{
            this.setState({history:response.data.history});
        })
    }
}

export default withRouter(TransactionHistory);