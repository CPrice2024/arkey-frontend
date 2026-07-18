import React, {
  useEffect,
  useState,
} from "react";
import "../../styles/prediction/countdown.css";

const Countdown = ({ targetDate }) => {

  const [time,setTime]=useState({});

  useEffect(()=>{

    const timer=setInterval(()=>{

      const diff=new Date(targetDate)-new Date();

      if(diff<=0){
        clearInterval(timer);
        return;
      }

      setTime({

        days:Math.floor(diff/86400000),

        hours:Math.floor(diff/3600000)%24,

        minutes:Math.floor(diff/60000)%60,

        seconds:Math.floor(diff/1000)%60,

      });

    },1000);

    return()=>clearInterval(timer);

  },[targetDate]);

  return(

    <div className="countdown-card">

      <h3>Time Remaining</h3>

      <div className="countdown-grid">

        <div>
          <strong>{time.days||0}</strong>
          <span>Days</span>
        </div>

        <div>
          <strong>{time.hours||0}</strong>
          <span>Hours</span>
        </div>

        <div>
          <strong>{time.minutes||0}</strong>
          <span>Minutes</span>
        </div>

        <div>
          <strong>{time.seconds||0}</strong>
          <span>Seconds</span>
        </div>

      </div>

    </div>

  );

};

export default Countdown;