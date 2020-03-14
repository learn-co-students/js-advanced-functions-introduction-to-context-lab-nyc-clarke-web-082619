// Your code here

function createEmployeeRecord(employeeData) {
    return {
        firstName: employeeData[0], 
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3], 
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeesData) {
    return employeesData.map(employeedata => createEmployeeRecord(employeedata));
    // let employeesArr = [];
    // employeesData.forEach(employee => {
    //     let employeeHash = {};
    //     employeeHash.firstName = employee[0], 
    //     employeeHash.familyName = employee[1],
    //     employeeHash.title = employee[2],
    //     employeeHash.payPerHour = employee[3], 
    //     employeeHash.timeInEvents = [],
    //     employeeHash.timeOutEvents= [];
    //     employeesArr.push(employeeHash);
    // });
    // return employeesArr
}

function createTimeInEvent(record, date)  {
    record.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(date.split(" ")[1]),  
        date: date.split(" ")[0]
    });
    return record;
}

function createTimeOutEvent(record, date)  {
    record.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(date.split(" ")[1]),  
        date: date.split(" ")[0]
    });
    return record;
}

function hoursWorkedOnDate(record, date){
    let checkIn = record.timeInEvents.find(d => d.date === date);
    let checkOut = record.timeOutEvents.find(d => d.date === date);
    return (checkOut.hour - checkIn.hour) / 100;
}

function wagesEarnedOnDate(record,date) {
    return hoursWorkedOnDate(record,date) * record.payPerHour;    
}

function allWagesFor(record) {
    let sum = 0;   
    for (let i = 0; i < record.timeInEvents.length; ++i) {
        sum += wagesEarnedOnDate(record,record.timeInEvents[i].date);
    }
    return sum; 
}

function calculatePayroll(recordsArray){
    let sum = 0;
    recordsArray.forEach(record => sum += allWagesFor(record) )
    return sum;
}

function findEmployeeByFirstName (recordsArray, firstName) {
    return recordsArray.find(record => record.firstName === firstName);
}