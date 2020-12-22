import axios from 'axios';
const baseUrl = "http://localhost:4000";
let data={ 
    sreedevi:{username:"sreedevi",password:"abc123",acno:1001,balance:50000, history:[]},
    test1:{username:"test1",password:"test1",acno:1002,balance:5000, history:[]},
    test2:{username:"test2",password:"test2",acno:1003,balance:6000, history:[]},
    test2:{username:"test3",password:"test3",acno:1004,balance:7000, history:[]},
}

let newData = localStorage.getItem("data");
if(newData){
    data=JSON.parse(newData);
}
class Bank{
    static getAccountDetails(){
        return data;
    }
    static saveData(){
        localStorage.setItem("data", JSON.stringify(data));
    }
    static setCurrentUser(username){
        localStorage.setItem("currentUser", username);
    }
    static getCurrentUser(){
        return localStorage.getItem("currentUser");
    }
    static addUser(username, password, acno){
        data[username]={username, password, acno, history:[], balance:0};
        Bank.saveData();
    }
    static getHistory(){
        return data[Bank.getCurrentUser()].history;
    }
    static getUsers(){
        return axios.get(baseUrl+"/users", { withCredentials:true });
    }
    static deleteUser(username){
        return axios.delete(baseUrl+"/users/"+username, { withCredentials:true });
    }
    static login(username, password){
        return axios.post(baseUrl+"/users/login",{
            username,
            password
        }, { withCredentials:true });
    }
    static register(username, password, confirmPassword, acno){
        return axios.post(baseUrl+"/users/register",{
            username,
            password,
            confirmPassword,
            acno
        })
    }
    static deposit(username, amount){
        return axios.post(baseUrl+"/users/deposit",{
            username,amount
        }, { withCredentials:true });
    }
    static withdraw(username, amount){
        return axios.post(baseUrl+"/users/withdraw",{
            username,amount
        }, { withCredentials:true });
    }
    static history(){
        return axios.get(baseUrl+"/users/transaction-history", { withCredentials:true });
    }
}


export default Bank;
