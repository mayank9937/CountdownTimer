window.createCountDownTimer = (StartDateTime,EndDateTime) => {
  
    if(StartDateTime == undefined && EndDateTime == undefined){
      console.warn('Start Date and End Date Is required and Also End Date is Must be Larger Than Start Date...');
      return { isFinished:true };
    }
    var month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var customStartDate = new Date(StartDateTime),
        customEndTime = new Date(EndDateTime);
    
    var startSecond = customStartDate.getSeconds().toString(),
        startMinute = customStartDate.getMinutes().toString();
    if(startSecond.length == 1){startSecond = '0'+startSecond;}
    if(startMinute.length == 1){startMinute = '0'+startMinute;}
  
    var endSecond = customEndTime.getSeconds().toString(),
        endMinute = customEndTime.getMinutes().toString();
    if(endSecond.length == 1){endSecond = '0'+endSecond;}
    if(endMinute.length == 1){endMinute = '0'+endMinute;}
  
    var startDate = new Date(`${customStartDate.getDate()} ${month[customStartDate.getMonth()]} ${customStartDate.getFullYear()} ${customStartDate.getHours() +':'+ startMinute +':'+ startSecond}`),
        endTime = new Date(`${customEndTime.getDate()} ${month[customEndTime.getMonth()]} ${customEndTime.getFullYear()} ${customEndTime.getHours() +':'+ endMinute +':'+ endSecond}`);
  
    var currentTime = new Date().getTime();
    var distance = endTime.getTime() - currentTime
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
    var isFinished = false,
        timeStart = (currentTime >= startDate.getTime());
  
    if(currentTime > endTime){
      isFinished =  true;
    }
    var data = {days:days,hours:hours,minutes:minutes,seconds:seconds,isFinished:isFinished,timeStart:timeStart};
    return data;
  }

//   For Calling Function
window.createCountDownTimer(`24 Feb 2022 7:00:00 pm`,`24 Feb 2022 7:30:00 pm`);

// You can call this function in thiese format alos.
window.createCountDownTimer(`24 Feb 2022 10:00:00`,`24 Feb 2022 13:30:00`);
window.createCountDownTimer(`24-Feb-2022 10:00:00`,`24-Feb-2022 13:30:00`);
window.createCountDownTimer(`24/Feb/2022 10:00:00`,`24/Feb/2022 13:30:00`);

// This Function will return data in this format.
/*
  window.createCountDownTimer(`24/Feb/2022 10:00:00`,`24/Feb/2022 20:30:00`);
  Return Data : 
    {
    "days": 0,
    "hours": 2,
    "minutes": 55,
    "seconds": 1,
    "isFinished": false,
    "timeStart": true
    }
*/