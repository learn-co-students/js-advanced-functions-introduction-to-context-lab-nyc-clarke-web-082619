// Your code here
function createEmployeeRecord(array){
    let obj = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return obj;
}

function createEmployeeRecords(arrayOfArrays){
    let newArray = arrayOfArrays.map(array => createEmployeeRecord(array))
    return newArray;
}

function createTimeInEvent(obj, string){
    let timeArray = string.split(" ");
    let timeInObj = {
        type: "TimeIn",
        hour: parseInt(timeArray[1]),
        date: timeArray[0]
    }
    obj.timeInEvents.push(timeInObj);
    return obj;
}

function createTimeOutEvent(obj, string){
    let timeArray = string.split(" ");
    let timeOutObj = {
        type: "TimeOut",
        hour: parseInt(timeArray[1]),
        date: timeArray[0]
    }
    obj.timeOutEvents.push(timeOutObj);
    return obj;
}

function hoursWorkedOnDate(obj, string){
    let timeIn = obj.timeInEvents.find(element => element.date === string).hour;
    console.log(timeIn);
    let timeOut = obj.timeOutEvents.find(element => element.date === string).hour;
    console.log(timeOut);
    let workHour = (timeOut - timeIn)/100;
    return workHour;
}

function wagesEarnedOnDate(obj, string){
    let workHour = hoursWorkedOnDate(obj, string);
    let wages = obj.payPerHour * workHour;
    return wages;
}

function allWagesFor(obj){
    let workDates = obj.timeOutEvents.map(timeOutEvent => timeOutEvent.date);
    console.log(workDates);
    let wagesArray = workDates.map(workdate => wagesEarnedOnDate(obj, workdate));
    console.log(wagesArray);
    let totalWage = wagesArray.reduce((sum,wage)=> sum + wage);
    return totalWage;
}

function findEmployeeByFirstName(srcArray, string){
    let result = srcArray.find(obj => obj.firstName === string);
    return result;
}

function calculatePayroll(srcArray){
    let wagesArray = srcArray.map( obj => allWagesFor(obj));
    let totalPayroll = wagesArray.reduce((sum,wages)=> sum + wages);
    return totalPayroll;
}