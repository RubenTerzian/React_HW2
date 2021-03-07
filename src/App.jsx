import React, {useState} from 'react';
import './App.css';


const startTimeConfig ={
};

const timeConfig ={
  hours: 0,
  minutes: 0,
  seconds: 0,
};
const startTime = () => {
  const startTime = new Date();
 
  startTimeConfig.hours = startTime.getHours();
  startTimeConfig.minutes = startTime.getMinutes();
  startTimeConfig.seconds = startTime.getSeconds();

};
   

const setStartTimerData =()=>{
  const currentTime = new Date();

  const hour = currentTime.getHours() - startTimeConfig.hours;
  const minuts = currentTime.getMinutes() - startTimeConfig.minutes;
  const seconds = currentTime.getSeconds() - startTimeConfig.seconds;
  const timeValue = seconds + minuts*60 + hour*60*60;

  
  if(timeValue/60 < 1){
    // seconds
    timeConfig.seconds = timeValue;
  }else{
    if(timeValue/(60*60) < 1){
      timeConfig.minutes = Math.floor(timeValue/60);
      timeConfig.seconds = timeValue%(60);
    }else{
      timeConfig.hours = Math.floor(timeValue/(60*60));
      timeConfig.minutes = Math.floor(timeValue/60%60);
      timeConfig.seconds = timeValue%60;
    }
  }
  // timeConfig.msms = currentTime.getMilliseconds()
  
};
startTime();

const setIntervalIdArray =[];

const App = () =>{
  const [time, setTime] = useState();
  const [startBtnIsActive, setStartBtnIsActive] = useState(true);
  // const [continueBtnIsActive, setContinueBtnIsActive] = useState(false);
  // const [stopBtnIsActive, setStopBtnIsActive] = useState(false);
  const [timeForShowArray, setTimeForShowArray] = useState([]);

  const startTimer = ()=>{
    if(!setIntervalIdArray.length){
      const timer = setInterval(()=>{
        setStartTimerData(new Date());
        const timeFormat = 
             (timeConfig.hours<10 ? '0' + timeConfig.hours : timeConfig.hours) + ':' + 
             (timeConfig.minutes<10 ? '0' + timeConfig.minutes : timeConfig.minutes) + ':' + 
             (timeConfig.seconds<10 ? '0' + timeConfig.seconds : timeConfig.seconds);
        setTime(timeFormat);
        setTime(timeFormat);
        console.log(timeFormat);

      },1000);
      setIntervalIdArray.push(timer);
      console.log(setIntervalIdArray);

    }
  };
  /* jshint ignore:start */
  return  (
    <div className="wraper">
      <h1>{time || "00:00:00"}</h1>
      <div className="btn_section">
        {/* CONTINUE */}

        <button 
        isActive={!startBtnIsActive}
        className={ startBtnIsActive ? 'btn_continue' : ('btn_continue active')}
        onClick={()=> {
          startTimer()
        }}
        >
          Continue
        </button>
        {/* START */}
        <button 
        className={ !startBtnIsActive ? 'btn_start' : ('btn_start active')}
        onClick={()=>{
          startTime()
          startTimer()
        }}>Start</button>
        {/* STOP */}

        <button 
        className="btn_stop"
        onClick={()=> {
          if(startBtnIsActive){
            setStartBtnIsActive(!startBtnIsActive)
          }
          setTimeForShowArray([time, ...timeForShowArray])
          clearInterval(setIntervalIdArray[0])
          setIntervalIdArray.splice(0,1)
          console.log(timeConfig);
        }
        }
        >Stop</button>

        {/* RESET */}
        <button 
        className="btn_reset"
        onClick={()=>{
          startTime()
          setStartTimerData()
          clearInterval(setIntervalIdArray[0])
          setIntervalIdArray.splice(0,1) 
          setTime("00:00:00")
          setStartBtnIsActive(!startBtnIsActive)
          setTimeForShowArray([time, ...timeForShowArray])
          console.log(timeConfig);
        }}
        >Reset</button>
      </div>
      <div className="time_list">
        {
          timeForShowArray.map( (time, index) =>{
            if(index<=3){
              return <p key={"time_list"+index}>{time}</p>
            }
          })
        }
      </div>
    </div>
  )
  /* jshint ignore:end */

};


export default App;
