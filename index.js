import { stringify } from "querystring";

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

    let hoursArray = [];

    for (let i = 0; i < 24; i++){
        hoursArray[i] = 0;
    }


    for (let i = 0; i < clockOut.length; i++){
        let clockInHour = (clockIn[i]['hour']/100);
        let clockOutHour = (clockOut[i]['hour']/100);
        // console.log(`${record.firstName} ${dateString} ${clockIn[i].hour} ${clockOut[i].hour}`);
        //  let shiftLength = (clockOutHour - clockInHour); 
        for (let j = clockInHour; j < clockOutHour; j++){
            hoursArray[j] = 1;
        }
    }
    // return totalHours;
    return hoursArray.reduce(function(total, hour){
        return total + hour
    }, 0)
}

function isSameDate(clockEvent, dateString){
    return (clockEvent.date == dateString);
}

function wagesEarnedOnDate(record, dateString){
 //   console.log(`${record.firstName} ${dateString} ${hoursWorkedOnDate(record, dateString)}hr  $${record.payPerHour}/hr`)
    return (hoursWorkedOnDate(record, dateString) * record.payPerHour)
}

function allWagesFor(record){
    let datesWorked = record.timeOutEvents.map((e) => {return e['date']});
  //  console.log(`DATES WORKED: ${datesWorked}`);
    let uniqueDates = new Set(datesWorked);

    uniqueDates = [...uniqueDates];


    let salary = uniqueDates.reduce(function(total, dateString) {
 //       console.log(`${record.firstName} ${dateString} ${total + wagesEarnedOnDate(record, dateString)}`)
        return total + wagesEarnedOnDate(record, dateString);
    }, 0)

 //   console.log(salary);
    return salary
}


function calculatePayroll(recordArray){
    // console.log('CALCULATING PAYROLL !!!!!!!!!!!!!!')
    // recordArray.forEach((record) => {
    //     console.log(JSON.stringify(record))
    //      console.log(`${record.firstName} ${allWagesFor(record)}`)
    //     })
    let payroll = recordArray.reduce(function(total, record){   
        return total + allWagesFor(record)
    }, 0)
 //   console.log(`FINAL PAYROLL IS ${payroll}`);
    return payroll
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find((record) => {
        return record.firstName == firstName;
    })
}