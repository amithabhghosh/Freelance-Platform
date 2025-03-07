import React, { useEffect, useState } from "react";

export const ClientCoundownTimer = ({ deadline, jobStatus, startTime }) => {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!deadline || !startTime || jobStatus === "completed") {
        
        setTimeLeft(0);
        return;
    }

    if (timeLeft !== null) return; 

    const totalTime = deadline * 24 * 60 * 60;
    const elapsedTime = Math.max(0, Math.floor((Date.now() - new Date(startTime).getTime()) / 1000));
    const remainingTime = Math.max(totalTime - elapsedTime, 0);



    setTimeLeft(remainingTime);
}, [deadline, startTime, jobStatus]);  // Removed timeLeft dependency


  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || jobStatus === "completed") return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft, jobStatus]);

  const formatTime = () => {
    if (timeLeft === null) return "Loading...";
    if (timeLeft <= 0) return "Time Over";
    if (jobStatus === "completed") return "Job Completed";

    const days = Math.floor(timeLeft / (60 * 60 * 24));
    const hours = Math.floor((timeLeft % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
    const seconds = Math.floor(timeLeft % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="text-white bg-red-500 px-4 py-2 rounded-md font-bold text-lg shadow-md mt-2 text-center w-fit">
      {formatTime()}
    </div>
  );
};
