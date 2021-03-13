import React, {useEffect, useState} from 'react';
import './App.css';
import useSound from 'use-sound';
import clickButton from './audio/clickButton.mp3';

const App = () =>{
  const [time, setTime] = useState("00:00:00:0000");
  const [timeForShowArray, setTimeForShowArray] = useState([]);
  const [counter, setCounter] = useState(7190000);
  const [startBtnIsActive, setStartBtnIsActive] = useState(true);
  const [timerOn, setTimerOn] = useState(false);

  const [play] = useSound(clickButton);

  useEffect(()=>{
    let intervalId;
    if(timerOn){

      const timeConfig = {
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      };

      if(counter/1000 < 1){
        // seconds
        timeConfig.milliseconds = counter;
      }else{
        if (counter / (60 * 1000) < 1) {
          timeConfig.seconds = Math.floor(counter/1000);
          timeConfig.milliseconds = counter%1000;
        } else {
          if (counter / (60 * 60 * 1000) < 1){
            timeConfig.minutes = Math.floor(counter/(60*1000));
            timeConfig.seconds = Math.floor(counter/1000%60);
            timeConfig.milliseconds = counter%1000;
          } else {
            timeConfig.hours = Math.floor(counter/(60*60*1000));
            timeConfig.minutes = Math.floor(counter/(60*1000)%60);
            timeConfig.seconds = Math.floor(counter/1000%60);
            timeConfig.milliseconds = counter%1000;
          }
        }
      }

      intervalId = setInterval(()=>{
        const timeFormat =
          (timeConfig.hours < 10 ? '0' + timeConfig.hours : timeConfig.hours) + ':' +
          (timeConfig.minutes < 10 ? '0' + timeConfig.minutes : timeConfig.minutes) + ':' +
          (timeConfig.seconds < 10 ? '0' + timeConfig.seconds : timeConfig.seconds) + ':' +
          (timeConfig.milliseconds < 10 ? '00' + timeConfig.milliseconds : (timeConfig.milliseconds < 100 ? '0' + timeConfig.milliseconds : timeConfig.milliseconds));
        setTime(timeFormat);
        setCounter(counter+8);
      },1);
    }
    return () =>{
        clearInterval(intervalId);
    };
  }, [timerOn, setTime, counter]);

  const timeListArrayFromLocalStorage = localStorage.timeForShowArray ? JSON.parse(localStorage.timeForShowArray) : localStorage.timeForShowArray;

  /* jshint ignore:start */
  return  (
    <div className="wraper">
      <h1>{time}</h1>
      <div className="btn_section">
    
        {/* START/CONTINUE */}
        <button 
        className={startBtnIsActive ? 'btn_start' : ('btn_continue')}
        onClick={()=>{
          setStartBtnIsActive(true)
          setTimerOn(true)
          play()
        }}>{startBtnIsActive ? "Start" : "Continue"}</button>
        
        {/* STOP */}
        <button 
        className="btn_stop"
        onClick={()=> {
            timerOn && setStartBtnIsActive(!startBtnIsActive)
            timerOn && setTimerOn(!timerOn)
            if(timerOn){
              setTimeForShowArray([time, ...timeForShowArray]);
              localStorage.timeForShowArray = JSON.stringify([time, ...timeForShowArray]);
            }
          play()
        }
        }
        >Stop</button>

        {/* RESET */}
        <button 
        className="btn_reset"
        onClick={()=>{
          setStartBtnIsActive(true)
          timerOn && setTimerOn(!timerOn)
          setCounter(1)
          setTime("00:00:00:0000")
          if(timerOn){
            setTimeForShowArray([time, ...timeForShowArray]);
            localStorage.timeForShowArray = JSON.stringify([time, ...timeForShowArray]);
          }
          play()
        }}
        >Reset</button>
      </div>
      <div className="time_list">
        {
          timeListArrayFromLocalStorage
           ?
           JSON.parse(localStorage.timeForShowArray).map( (time, index) =>{
            if(index<=3){
              return <p key={"time_list"+index}>{time}</p>
            }
          })
            :
            timeForShowArray.map( (time, index) =>{
              if(index<=3){
                return <p key={"time_list"+index}>{time}</p>
              }
            })
            
        }
        { (timeForShowArray.length || timeListArrayFromLocalStorage) &&
          <button
          onClick = {()=>{
          localStorage.clear()
          setTimeForShowArray([])
          play()
        }}
        >Clear time list</button>
        }
        
      </div>
    </div>
  )
  /* jshint ignore:end */

};


export default App;
