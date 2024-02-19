import React, { useState, useEffect } from 'react'

const DateTimeComponent = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []); 

  const formatDate = (d) => {
    const options = { weekday: 'long',year: 'numeric', month: 'long', day: 'numeric',  };
    return d.toLocaleDateString(undefined, options);
  };

  const formatTime = (d) => {
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    return d.toLocaleTimeString(undefined, options);
  };
 

  return (
    <div>
      <div className="current-date">{formatDate(currentDateTime)}</div>
      <div className="current-time">{formatTime(currentDateTime)}</div>
    
    </div>
  );
};


export default DateTimeComponent