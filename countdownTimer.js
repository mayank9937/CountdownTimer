window.createCountDownTimer = (StartDateTime,EndDateTime,MomentTimezon = null,makeDoubleDegits = false) => {

    function addZero(number) {
        return (number.toString().length == 1) ? `0${number}` : number;
    }
  
    if(StartDateTime == undefined && EndDateTime == undefined){
      console.warn('Start Date and End Date Is required and Also End Date is Must be Larger Than Start Date...');
      return { isFinished:true };
    }
    var month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var customStartDateTime = new Date(StartDateTime),
        customEndDateTime = new Date(EndDateTime);
    let currentDate = new Date();

    if(customStartDateTime.getHours() == 0 && customStartDateTime.getMinutes() == 0 && customStartDateTime.getSeconds() == 0){
        customStartDateTime = new Date(`${customStartDateTime.getMonth()}/${customStartDateTime.getDate()}/${customStartDateTime.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`);
    }

    if(customEndDateTime.getHours() == 0 && customEndDateTime.getMinutes() == 0 && customEndDateTime.getSeconds() == 0){
        customEndDateTime = new Date(`${customEndDateTime.getMonth()}/${customEndDateTime.getDate()}/${customEndDateTime.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`);
    }
    
    var startSecond = addZero(customStartDateTime.getSeconds().toString()),
        startMinute = addZero(customStartDateTime.getMinutes().toString()),
        endSecond = addZero(customEndDateTime.getSeconds().toString()),
        endMinute = addZero(customEndDateTime.getMinutes().toString());

    var startDate = new Date(`${customStartDateTime.getDate()} ${month[customStartDateTime.getMonth()]} ${customStartDateTime.getFullYear()} ${customStartDateTime.getHours() +':'+ startMinute +':'+ startSecond}`),
        endDateTime = new Date(`${customEndDateTime.getDate()} ${month[customEndDateTime.getMonth()]} ${customEndDateTime.getFullYear()} ${customEndDateTime.getHours() +':'+ endMinute +':'+ endSecond}`);


    if(MomentTimezon != null){
        startDate = new Date(moment(startDate).tz(MomentTimezon).format('MM/DD/YYYY HH:mm:ss'));
        endDateTime = new Date(moment(endDateTime).tz(MomentTimezon).format('MM/DD/YYYY HH:mm:ss'));
        currentDate = new Date(moment(new Date()).tz(MomentTimezon).format('MM/DD/YYYY HH:mm:ss'));
    }

    let currentTime = currentDate.getTime();
        distance = endDateTime.getTime() - currentTime,
        days = 0,
        hours = 0,
        minutes = 0,
        seconds = 0;
  
    let isFinished = false,
        timeStart = (currentTime >= startDate.getTime());

    let w_distance = startDate.getTime() - currentTime,
        w_days = 0,
        w_hours = 0,
        w_minutes = 0,
        w_seconds = 0,
        isInWaitingMode = false;

    if(timeStart == false){
        isInWaitingMode = true;
        w_days = (makeDoubleDegits == true) ? addZero(Math.floor(w_distance / (1000 * 60 * 60 * 24))) : Math.floor(w_distance / (1000 * 60 * 60 * 24)) ;
        w_hours = (makeDoubleDegits == true) ? addZero(Math.floor((w_distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))) : Math.floor((w_distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        w_minutes = (makeDoubleDegits == true) ? addZero(Math.floor((w_distance % (1000 * 60 * 60)) / (1000 * 60))) : Math.floor((w_distance % (1000 * 60 * 60)) / (1000 * 60));
        w_seconds = (makeDoubleDegits == true) ? addZero(Math.floor((w_distance % (1000 * 60)) / 1000)) : Math.floor((w_distance % (1000 * 60)) / 1000);
    }


    if(timeStart == true){
        days = (makeDoubleDegits == true) ? addZero(Math.floor(distance / (1000 * 60 * 60 * 24))) : Math.floor(distance / (1000 * 60 * 60 * 24));
        hours = (makeDoubleDegits == true) ? addZero(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))) : Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutes = (makeDoubleDegits == true) ? addZero(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))) : Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        seconds = (makeDoubleDegits == true) ? addZero(Math.floor((distance % (1000 * 60)) / 1000)) : Math.floor((distance % (1000 * 60)) / 1000);
    }

    if(currentTime > endDateTime){
      isFinished =  true;
      timeStart = false;
    }

    var data = {
        days:days,
        hours:hours,
        minutes:minutes,
        seconds:seconds,
        timeFinished:isFinished,
        timeStart:timeStart,
        isInWaitingMode : isInWaitingMode,
        waitingTime : {
            days : w_days,
            hours : w_hours,
            minutes : w_minutes,
            seconds : w_seconds
        }
    };
    return data;
  }

//   For Calling Function
// window.createCountDownTimer(`24 Feb 2022 7:00:00 pm`,`24 Feb 2022 7:30:00 pm`);

// You can call this function in thiese format alos.
// window.createCountDownTimer(`24 Feb 2022 10:00:00`,`24 Feb 2022 13:30:00`);
// window.createCountDownTimer(`24-Feb-2022 10:00:00`,`24-Feb-2022 13:30:00`);
// window.createCountDownTimer(`24/Feb/2022 10:00:00`,`24/Feb/2022 13:30:00`);

// This Function will return data in this format.
/*
  window.createCountDownTimer(`24/Feb/2022 10:00:00`,`24/Feb/2022 20:30:00`);
  Return Data : 
    {
        "days": "02",
        "hours": "00",
        "minutes": 44,
        "seconds": 54,
        "timeFinished": false,
        "timeStart": true,
        "isInWaitingMode": false,
        "waitingTime": {
            "days": 0,
            "hours": 0,
            "minutes": 0,
            "seconds": 0
        }
    }
*/