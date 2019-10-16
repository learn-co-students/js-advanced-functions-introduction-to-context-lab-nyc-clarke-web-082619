// Your code here

function createEmployeeRecord(arr){
   let newRecord = {
       firstName: arr[0], 
       familyName: arr[1], 
       title: arr[2], 
       payPerHour: arr[3],
       timeInEvents: [],
       timeOutEvents: []
    };

    return newRecord
}


function createEmployeeRecords(arrArr){
    return arrArr.map(createEmployeeRecord)
}

function createTimeInEvent(record, timeString){
    let splitTimeString = timeString.split(' ');
    
    let dateString = splitTimeString[0];
    
    let militaryTime = parseInt(splitTimeString[1]);

    let hour = Math.floor((militaryTime / 100)) * 100;
    let minutes = Math.floor((militaryTime % 100));

    let clockIn = {
        'type': 'TimeIn',
        'hour': hour,
        'date': dateString
    };

    record.timeInEvents.push(clockIn)
    return record;
}


function createTimeOutEvent(record, timeString){
    let splitTimeString = timeString.split(' ');
    
    let dateString = splitTimeString[0];
    
    let militaryTime = parseInt(splitTimeString[1]);

    let hour = Math.floor((militaryTime / 100)) * 100;
    let minutes = Math.floor((militaryTime % 100));

    let clockOut = {
        'type': 'TimeOut',
        'hour': hour,
        'date': dateString
    };

    record.timeOutEvents.push(clockOut);
    return record;
}


function hoursWorkedOnDate(record, dateString){
    let clockIn = record.timeInEvents.filter((entry) => isSameDate(entry, dateString));
    let clockOut = record.timeOutEvents.filter((entry) => isSameDate(entry, dateString));

    // console.log(`CLOCK IN : ${clockIn}`);
    // console.log(`CLOCK OUT : ${clockOut}`);

    let totalHours = 0;


    for (let i = 0; i < clockOut.length; i++){
        totalHours += ((clockOut[i]['hour'] - clockIn[i]['hour'])/100);      
    }
    return totalHours;
}

function isSameDate(clockEvent, dateString){
    return (clockEvent.date == dateString);
}

function wagesEarnedOnDate(record, dateString){
    return (hoursWorkedOnDate(record, dateString) * record.payPerHour)
}

function allWagesFor(record){
    let datesWorked = record.timeOutEvents.map((e) => {return e['date']});
    console.log(`DATES WORKED: ${datesWorked}`);
    let uniqueDates = new Set(datesWorked);

    uniqueDates = [...uniqueDates];


    return uniqueDates.reduce(function(total, dateString) {
        return total + wagesEarnedOnDate(record, dateString);
    }, 0)
}


function calculatePayroll(recordArray){
    return recordArray.reduce(function(total, record){
        return total + allWagesFor(record)
    }, 0)
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find((record) => {
        return record.firstName == firstName;
    })
}