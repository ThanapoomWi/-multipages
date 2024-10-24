import React, { useEffect, useState } from 'react'
import './Timer.css'
function Time({ name,value }) {
    const [running, setRunning] = useState(false);
    const [seconds, setSeconds] = useState(value || 3600 * 24 - 2);

    useEffect(()=>{
      setSeconds(value || seconds)
    },[value])

    useEffect(() => {
        let interval = null;
        if (running) 
            interval = setInterval(() => {
                setSeconds(seconds + 1)
            }, 1000)
        
     return () => { if(interval) clearInterval(interval) }
    }, [running, seconds])
   

    const secondsToDisplay = (seconds) => {
        const MINUTE_SECONDS = 60;
        const HOUR_SECONDS = MINUTE_SECONDS * 60;
        const DAY_SECONDS = 24 * HOUR_SECONDS;

        const days = Math.floor(seconds / DAY_SECONDS);
        const hours = Math.floor((seconds % DAY_SECONDS) / HOUR_SECONDS);
        const minutes = Math.floor((seconds % HOUR_SECONDS) / MINUTE_SECONDS);
        const secs = Math.floor(seconds % MINUTE_SECONDS);

        if (days > 0) {
            return `${days}d ${hours}h ${minutes}m ${secs}s`;
        }
        else if (hours > 0) {
            return `${hours}h ${minutes}m ${secs}s`;
        }
        else if (minutes > 0) {
            return `${minutes}m ${secs % 60}s`;
        }
        else {
            return `${secs}s`
        }
    }

    const resetCount = () => {
        setRunning(false);
        setSeconds(value || 0)
    }
    return (
        <div className='timer-container'>
            <h1 className='timer-title'>{name || 'Timer'}</h1>
            <div>
                <p><input className='timer-display' type="text" readOnly={true} placeholder='1d 23h 59m 59s' value={secondsToDisplay(seconds)} /></p>
                <div className='timer-buttons'>
                    <button className='btn btn-danger' onClick={resetCount}>Reset</button>
                    <button className={running ? 'btn btn-warning' : 'btn btn-success'} onClick={()=>setRunning(!running)}>{running ? 'Pause' : 'Run'}</button>
                </div>
            </div>
        </div>
    )
}

export default Time