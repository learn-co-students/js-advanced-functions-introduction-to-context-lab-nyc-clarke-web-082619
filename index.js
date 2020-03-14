// Your code here
function createEmployeeRecord(arr){
    let record = {};
    record.firstName = arr[0]
    record.familyName = arr[1]
    record.title = arr[2];
    record.payPerHour = arr[3];
    record.timeInEvents = [];
    record.timeOutEvents = [];
    return record;
}

function createEmployeeRecords(arr){
    return arr.map(createEmployeeRecord);
}

function createTimeInEvent(employee,time){
    let hour = parseInt(time.split(" ")[1],10);
    let date = time.split(" ")[0];
    let timeInRecord = {type: "TimeIn", hour: hour, date: date};
    employee.timeInEvents.push(timeInRecord);
    return employee;
}
function createTimeOutEvent(employee,time){
    let hour = parseInt(time.split(" ")[1],10);
    //let minute = time.split(" ")[1].substring(2);
    let date = time.split(" ")[0];
    let timeOutRecord = {type: "TimeOut", hour: hour, date: date};
    employee.timeOutEvents.push(timeOutRecord);
    return employee;
}

function hoursWorkedOnDate(employee, record){
    let timeInRecord = employee["timeInEvents"].find(function(elem){

        return elem.date === record;
    });

    let timeOutRecord = employee["timeOutEvents"].find(function(elem){
        return elem.date === record;
    });
    return (timeOutRecord.hour - timeInRecord.hour)/100;
}

function wagesEarnedOnDate(employee, record){
    return hoursWorkedOnDate(employee,record)*employee.payPerHour;
}

function allWagesFor(employee){
    let dates = employee.timeInEvents.map(function(elem){
        return elem.date;
    });
    let wages = dates.map(function(elem){
        return wagesEarnedOnDate(employee, elem);
    });
    return wages.reduce((acc,cv) => acc + cv);
}

function calculatePayroll(arr){
    let wages = arr.map(elem => {
        return allWagesFor(elem);
    });

    return wages.reduce((acc,cv) => acc + cv);
}

function findEmployeeByFirstName(arr, name){
    return arr.find(elem => {
        return elem.firstName === name;
    });
}