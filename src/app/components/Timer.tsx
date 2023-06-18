"use client";
import React, { useEffect, useState } from "react";
import addNotification from "react-push-notification";

const cycleTimes = [1, 2]; // Cycle times in minutes
const cycleCountLimit = 5;

export default function Timer() {
  const [seconds, setSeconds] = useState(1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  const [selectedTime, setSelectedTime] = useState(1);
  const [selectedName, setSelectedName] = useState("pomodoro");

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            setIsActive(false);

            if (cycleCount === cycleCountLimit) {
              setSeconds(15 * 60);
              setCycleCount(0);
              return 15 * 60;
            } else {
              const nextCycleIndex = cycleCount % cycleTimes.length;
              const nextCycleSeconds = cycleTimes[nextCycleIndex] * 60;
              setSeconds(nextCycleSeconds);
              setCycleCount((prevCount) => prevCount + 1);
              return nextCycleSeconds;
            }
          } else {
            return prevSeconds - 1;
          }
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, cycleCount]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const startCountdown = () => {
    setIsActive(!isActive);
  };

  const changeTime = (time: number, name: string) => {
    setSelectedTime(time);
    setSelectedName(name);
    setSeconds(time * 60);
    setIsActive(false);
  };

  console.log(seconds);
  console.log(cycleCount);

  return (
    <div>
      <section className="w-full flex justify-around">
        <div className="w-[80%] flex justify-around pt-[2rem]">
          <div
            className={`${
              selectedName === "pomodoro"
                ? "bg-red-200"
                : selectedName === "short-break"
                ? "bg-green-200"
                : "bg-blue-200"
            } w-[50%] p-[2rem] rounded-md`}
          >
            <div className="flex justify-around">
              <div className="flex justify-between w-full">
                <button
                  className={`${
                    selectedName === "pomodoro"
                      ? "bg-black text-white"
                      : "hover:bg-opacity-10 hover:bg-black"
                  } px-5 py-2 rounded-md `}
                  onClick={() => {
                    changeTime(1, "pomodoro");
                  }}
                >
                  Pomodoro
                </button>
                <button
                  className={`${
                    selectedName === "short-break"
                      ? "bg-black text-white"
                      : "hover:bg-opacity-10 hover:bg-black"
                  } px-5 py-2 rounded-md `}
                  onClick={() => {
                    changeTime(2, "short-break");
                  }}
                >
                  Break Singkat
                </button>
                <button
                  onClick={() => {
                    changeTime(15, "long-break");
                  }}
                  className={`${
                    selectedName === "long-break"
                      ? "bg-black text-white"
                      : "hover:bg-opacity-10 hover:bg-black"
                  } px-5 py-2 rounded-md `}
                >
                  Break Lama
                </button>
              </div>
            </div>
            <div className="w-full flex justify-around">
              <div className="text-[8rem] font-bold">{formatTime(seconds)}</div>
            </div>
            <div className="flex justify-around py-[2rem]">
              <button
                onClick={startCountdown}
                className="bg-black text-white text-[3rem] font-bold px-[5rem] w-[22rem] rounded-md"
              >
                {isActive ? <p>PAUSE</p> : <p>START</p>}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
// "use client";
// import React, { useEffect, useState } from "react";
// import addNotification from "react-push-notification";

// export default function Timer() {
//   const [seconds, setSeconds] = useState(1 * 60);
//   const [start, setStart] = useState(false);
//   const [notifAudio, setNotifAudio] = useState(false);
//   const [isInitialTimer, setIsInitialTimer] = useState(true);
//   const [cycleCount, setCycleCount] = useState(0);
//   const [buttonActive, setButtonActive] = useState("pomodoro");

//   useEffect(() => {
//     let interval: NodeJS.Timeout | null = null;

//     if (start) {
//       interval = setInterval(() => {
//         setSeconds((prevSeconds) => {
//           if (prevSeconds === 1) {
//             setStart(false);

//             if (cycleCount === 4) {
//               setCycleCount(0);

//               if (isInitialTimer) {
//                 addNotification({
//                   title: "ISTIRAHAT",
//                   subtitle: "Istirahat",
//                   message: "Waktunya Istirahat",
//                   theme: "darkblue",
//                   native: true,
//                   duration: 6000,
//                 });
//                 setNotifAudio(true);
//                 setIsInitialTimer(false);
//                 setButtonActive("long-break");
//                 setSeconds(3 * 60);
//                 return 3 * 60;
//               } else {
//                 addNotification({
//                   title: "FOKUS!!",
//                   subtitle: "Fokus",
//                   message: "Waktunya Fokus",
//                   theme: "red",
//                   duration: 6000,
//                   native: true,
//                 });
//                 setNotifAudio(true);
//                 setIsInitialTimer(true);
//                 setButtonActive("pomodoro");
//                 setSeconds(1 * 60);
//                 return 1 * 60;
//               }
//             } else {
//               setCycleCount((prevCount) => prevCount + 1);

//               if (isInitialTimer) {
//                 addNotification({
//                   title: "FOKUS!!",
//                   subtitle: "Fokus",
//                   message: "Waktunya Fokus",
//                   theme: "red",
//                   duration: 6000,
//                   native: true,
//                 });
//                 setNotifAudio(true);
//                 setButtonActive("short-break");
//                 setSeconds(2 * 60);
//                 return 2 * 60;
//               } else {
//                 addNotification({
//                   title: "ISTIRAHAT",
//                   subtitle: "Istirahat",
//                   message: "Waktunya Istirahat",
//                   theme: "darkblue",
//                   native: true,
//                   duration: 6000,
//                 });
//                 setNotifAudio(true);
//                 setButtonActive("long-break");
//                 setSeconds(3 * 60);
//                 return 3 * 60;
//               }
//             }
//           } else {
//             return prevSeconds - 1;
//           }
//         });
//       }, 1000);
//     }

//     return () => {
//       if (interval) {
//         clearInterval(interval);
//       }
//     };
//   }, [start, notifAudio, isInitialTimer, cycleCount, buttonActive]);

//   useEffect(() => {
//     if (notifAudio) {
//       const audio = new Audio("Nada Dering Telepon Ring.mp3"); // Replace with the actual path to your audio file
//       audio.play();

//       setTimeout(() => {
//         audio.pause();
//         setNotifAudio(false);
//       }, 3000);
//     }
//   }, [notifAudio]);

//   const formatTime = (time: number) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = time % 60;
//     return `${minutes.toString().padStart(2, "0")}:${seconds
//       .toString()
//       .padStart(2, "0")}`;
//   };

//   const startTimer = () => {
//     formatTime(seconds);
//     setStart(!start);
//   };

//   const activeButton = (buttonName: React.SetStateAction<string>) => {
//     if (buttonName === "pomodoro") {
//       if (cycleCount === 4 && !isInitialTimer) {
//         setSeconds(3 * 60);
//       } else {
//         setSeconds(1 * 60);
//       }
//     } else if (buttonName === "short-break") {
//       setSeconds(2 * 60);
//     } else if (buttonName === "long-break") {
//       if (cycleCount === 4 && isInitialTimer) {
//         setSeconds(1 * 60);
//       } else {
//         setSeconds(3 * 60);
//       }
//     }
//     setButtonActive(buttonName);
//     setStart(false);
//   };

//   return (
//     <div>
//       <section className="w-full flex justify-around">
//         <div className="w-[80%] flex justify-around pt-[2rem]">
//           <div
//             className={`${
//               buttonActive === "pomodoro"
//                 ? "bg-red-200"
//                 : buttonActive === "short-break"
//                 ? "bg-green-200"
//                 : "bg-blue-200"
//             } w-[50%] p-[2rem] rounded-md`}
//           >
//             <div className="flex justify-around">
//               <div className="flex justify-between w-full">
//                 <button
//                   onClick={() => {
//                     activeButton("pomodoro");
//                   }}
//                   className={`${
//                     buttonActive === "pomodoro"
//                       ? "bg-black text-white"
//                       : "hover:bg-opacity-10 hover:bg-black"
//                   } px-5 py-2 rounded-md `}
//                 >
//                   Pomodoro
//                 </button>
//                 <button
//                   onClick={() => {
//                     activeButton("short-break");
//                   }}
//                   className={`${
//                     buttonActive === "short-break"
//                       ? "bg-black text-white"
//                       : "hover:bg-opacity-10 hover:bg-black"
//                   } px-5 py-2 rounded-md `}
//                 >
//                   Break Singkat
//                 </button>
//                 <button
//                   onClick={() => {
//                     activeButton("long-break");
//                   }}
//                   className={`${
//                     buttonActive === "long-break"
//                       ? "bg-black text-white"
//                       : "hover:bg-opacity-10 hover:bg-black"
//                   } px-5 py-2 rounded-md `}
//                 >
//                   Break Lama
//                 </button>
//               </div>
//             </div>
//             <div className="w-full flex justify-around">
//               <div className="text-[8rem] font-bold">{formatTime(seconds)}</div>
//             </div>
//             <div className="flex justify-around py-[2rem]">
//               <button
//                 onClick={startTimer}
//                 className="bg-black text-white text-[3rem] font-bold px-[5rem] w-[22rem] rounded-md"
//               >
//                 {start ? <p>PAUSE</p> : <p>START</p>}
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//       <section className="bg-red-200 py-[2rem]">
//         <div></div>
//       </section>
//     </div>
//   );
// }
