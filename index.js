let createEmployeeRecord = function(arr){
    return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeArr){
    return employeeArr.map(function(record) {
        return createEmployeeRecord(record)
    })
}

let createTimeInEvent = function(empRec, dateStamp){
    let [date, hour] = dateStamp.split(' ');

    empRec.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date
    })

    return empRec
}

let createTimeOutEvent = function(empRec, dateStamp){
    let [date, hour] = dateStamp.split(' ');

    empRec.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date
    })

    return empRec
}

let hoursWorkedOnDate = function(empRec, searchDate){
    let timeIn = empRec.timeInEvents.find(function(time){
        return time.date === searchDate
    })

    let timeOut = empRec.timeOutEvents.find(function(time){
        return time.date === searchDate
    })   
    
    return (parseInt(timeOut.hour) - parseInt(timeIn.hour))/100
}

let wagesEarnedOnDate = function(empRec, searchDate){
    let hoursWorked =  hoursWorkedOnDate(empRec, searchDate);
    let payPerHour = empRec.payPerHour;

    return hoursWorked * payPerHour
}

let allWagesFor = function(empRec){
    let allDates = empRec.timeInEvents.map(function(time){
        return time.date
    })

    let wagesOwed = allDates.reduce(function(total, date){
        return total + wagesEarnedOnDate(empRec, date)
    }, 0)

    return wagesOwed
}

let findEmployeeByFirstName = function(srcArray, firstName){
    return srcArray.find(function(empRec){
        return empRec.firstName === firstName
    })
}

let calculatePayroll = function(empRecArr){
    return empRecArr.reduce(function(total, empRec){
        return total + allWagesFor(empRec)
    }, 0)
}