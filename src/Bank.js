
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
        return data;
    }
    static deleteUser(username){
        delete data[username];
        Bank.saveData();
    }
}


export default Bank;
