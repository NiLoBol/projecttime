import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ProjectType, TASK } from "../Type/Type";
import Projecttime from "../components/Projecttime";
import { JsxElement } from "typescript";
import DATA from "../components/Context";

export default function Projectpage() {
  let { contactprojectname } = useParams();
  const { getproject, setproject } = useContext(DATA);
  const ref = useRef<HTMLInputElement>(null);
  const [tasks, setTasks] = useState<TASK[]>(() => {
    return (
      getproject.find((data: any) => {
        return data.name === contactprojectname;
      })?.task || []
    );
  });

  const [ttasks, tsetTasks] = useState<TASK>();
  // console.log(useParams());
  // console.log(contactprojectname);

  const addTask = () => {
    const newname = ref.current?.value;

    if (newname) {
      setTasks((prevTasks) => {
        
        const index = getproject.findIndex(
          (data) => data.name === contactprojectname
        );
        let newtaks = getproject[index].task;
        newtaks = [...prevTasks, { subprojectname: newname, time: 0 }];
        getproject[index].task = newtaks;
        localStorage.setItem(
          "ProJectTime--xld1549831125411>xcp__",
          JSON.stringify(getproject)
      );
        return newtaks;
      });
      ref.current.value = "";
    }
  };



  const Project: React.ReactNode = useMemo(() => {
    if (ttasks && contactprojectname) {
      return <Projecttime task={ttasks} name={contactprojectname} />;
    } else {
      return <div>NO Task</div>;
    }
  }, [ttasks, contactprojectname]);
  return (
    <div className="bg-blue-200 h-screen">
      <div className="container mx-auto ">
        <div className="text-center p y-20 font-bold text-4xl">
          PROJECT {contactprojectname}
        </div>
        <div className="flex flex-row ">
          <div className="basis-1/2">
            {tasks.map((data, index) => (
              <div
                className="my-10 p-10 w-10/12 block border-2 bg-white/50   border-black text-2xl font-bold rounded-2xl hover:border-blue-300"
                key={index}
                onClick={() => {
                  tsetTasks(data);
                }}
              >
                Task Name: {data.subprojectname} Time: {data.time}
              </div>
            ))}
          </div>
          <div className="basis-1/2">
            <div className="my-10 border-2 border-black rounded-2xl py-20">
              <input
                className="ms-10 p-5 border-2 border-blue-200 focus-visible:outline-none focus-visible:border-blue-500 rounded-lg text-3xl "
                ref={ref}
                type="text"
                placeholder="add task"
              />
              <button
                className="p-5 px-16 ms-10 bg-blue-400 border-2 border-blue-200 hover:border-blue-500 rounded-2xl text-3xl "
                onClick={addTask}
              >
                Add Task
              </button>
            </div>
            {Project}
          </div>
        </div>
      </div>
    </div>
  );
}
