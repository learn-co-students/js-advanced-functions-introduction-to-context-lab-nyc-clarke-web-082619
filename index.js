

// Your code here

function createEmployeeRecord(array){
    let employee = {};
    employee.firstName = array[0];
    employee.familyName = array[1];
    employee.title = array[2];
    employee.payPerHour = array[3];
    employee.timeInEvents = [];
    employee.timeOutEvents = [];
    return employee;
}

function createEmployeeRecords(amount){
    return amount.map(item => createEmployeeRecord(item));
}

function createTimeInEvent(employee, string){
    let [date, hour] = string.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date,
    })
    return employee
}

function createTimeOutEvent(employee, string){
    let [date, hour] = string.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date,
    })
    return employee
}

let hoursWorkedOnDate = function(employee, string){
    // console.log("hello?")
    for(let i = 0; i < employee.timeInEvents.length; i++){
        // console.log(employee.timeInEvents[i].date)
        // console.log(string)
        if(employee.timeInEvents[i].date == string){
            
            return (employee.timeOutEvents[i].hour - employee.timeInEvents[i].hour)/100
        }
    }

}

function wagesEarnedOnDate(employee, date){
    return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

function allWagesFor(employee){
    let total = 0;
    for(let i = 0; i < employee.timeInEvents.length; i++){
        total += wagesEarnedOnDate(employee, employee.timeInEvents[i].date)
    }
    return total;
}

function calculatePayroll(arrayOfEmployee){
    return arrayOfEmployee.reduce(function(total, employee){
        return total + allWagesFor(employee)
    },0)
}

function findEmployeeByFirstName(arrayOfEmployee, firstName){
    for(let i = 0;i< arrayOfEmployee.length;i++){
        if(arrayOfEmployee[i].firstName=== firstName){
            return arrayOfEmployee[i];
        }
    }

}
















