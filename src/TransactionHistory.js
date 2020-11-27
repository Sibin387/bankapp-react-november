import React from 'react';
import { withRouter } from 'react-router';
import Bank from './Bank';

class TransactionHistory extends React.Component{
    delete=()=>{

    }
    render(){
        let history = Bank.getHistory();
        return (<div className="container">
                <h1>Transaction history</h1>
                <table className="table">
                    <tr>
                        <th>Type Of Transaction</th>
                        <th>Amount</th>
                    </tr>
                    {
                        history.map(item=><tr>
                            <td>{item.typeOfTransaction}</td>
                            <td>{item.amount}</td>
                        </tr>)
                    }
                </table>
            </div>
        )
    }
}

export default withRouter(TransactionHistory);