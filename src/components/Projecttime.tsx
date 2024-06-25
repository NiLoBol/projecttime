import React, { useCallback, useContext, useEffect, useState } from "react";
import { ProjectType, TASK } from "../Type/Type";
import DATA from "./Context";

export default function Projecttime(props: {
  task: TASK;
  name: string ;
}) {
  const [runing, setruning] = useState<boolean>(false);
  const [time, settime] = useState<number>(props.task.time);
  const { getproject, setproject } = useContext(DATA);

  const handleBeforeUnload = (time:number) => {
      const index =getproject.findIndex((data)=>data.name ===props.name)
      const taskindex =getproject[index].task.findIndex((data)=>data.subprojectname === props.task.subprojectname)
      getproject[index].task[taskindex].time= time
      console.log(getproject[index].task[taskindex].time);
      
      localStorage.setItem("ProJectTime--xld1549831125411>xcp__", JSON.stringify(getproject) )
       
    
  };

  useEffect(() => {
    console.log("T1");
    let intarval: any;
    if (runing) {
      intarval = setInterval(() => {
        settime((prevTime) => 
          {
            
            if(prevTime%1000==0){
              console.log(prevTime);
              handleBeforeUnload(prevTime+1000) 
            }
             
            return prevTime + 1000
          }
        );
      }, 1000);
    }
    return () => {
      clearInterval(intarval);
    };
  }, [runing]);
  useEffect(() => {
    // ทำงานเมื่อเปลี่ยนไป task อื่น
    settime(props.task.time)
    setruning(false)
  }, [props])
  
  return (
    <div className="text-center border-2 border-black p-10 rounded-2xl">
      <div className="flex flex-wrap justify-center items-center ">
        <div className="basis-full text-3xl font-bold mb-5">TASK : {props.task.subprojectname}</div> 
        <div className="basis-full flex flex-row justify-center mb-10 ">
          <div className="text-4xl font-light">{("0" + (Math.floor(time / 60000) % 60)).slice(-2)}:</div>
          <div className="text-4xl font-light" >{("0" + (Math.floor(time / 1000) % 60)).slice(-2)}</div>
        </div>
        <div className="flex flex-row">
          {runing ? (
            <div
              className="p-5 bg-yellow-300 "
              onClick={() => {
                setruning(false);
              }}
            >
              Stop
            </div>
          ) : (
            <div
              className="p-5 bg-yellow-300 "
              onClick={() => {
                setruning(true);
              }}
            >
              Start
            </div>
          )}

          <div
            className="p-5 bg-yellow-300 "
            onClick={() => {
              settime(0);
              handleBeforeUnload(0);
            }}
          >
            Reset
          </div>
        </div>
      </div>
    </div>
  );
}
