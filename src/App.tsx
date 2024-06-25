import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import logo from "./logo.svg";
import "./App.css";
import Projecttime from "./components/Projecttime";
import { Link } from "react-router-dom";
import { ProjectType } from "./Type/Type";
import DATA from "./components/Context";

function App() {
  const ref = useRef<HTMLInputElement>(null);
  const {getproject,setproject} =useContext(DATA);

  const popup = useRef<HTMLDivElement>(null);
  const Projectdata = useRef<ProjectType | null>(null);

  return (
    <div className="text-center bg-blue-200 h-screen">
      <div className="container mx-auto ">
        <div className="text-center py-20 font-bold text-4xl">PROJECT TIME </div>
        <div className="flex flex-row ">
          <div className="basis-1/2">
            {getproject.length>0? (
              getproject.map((data, index) => {
                return (
                  <Link
                    to={"/" + data.name}
                    
                    className="my-10 p-10 w-10/12 block border-2 bg-white/50   border-black text-2xl font-bold rounded-2xl hover:border-blue-300"
                  >
                    Project name: {data.name}
                  </Link>
                );
              })
            ) : (
              <a
                href={"/"}
                className="my-10 p-10 w-10/12 block border-2 bg-white/50   border-black text-2xl font-bold rounded-2xl "
              >
                No projects found
              </a>
            )}
          </div>
          <div className="basis-1/2">
            <div className="text-4xl font-medium mb-5">Creat Project time </div>
            <input
              ref={ref}
              className="p-5 border-2 border-blue-200 focus-visible:outline-none focus-visible:border-blue-500 rounded-lg text-3xl "
              type="text"
              name=""
              id=""
            />
            <button
              onClick={() => {
                if (ref.current) {
                  const name: string = ref.current.value;
                  const newProject: ProjectType = { name: name, task: [] };
                  setproject((prev) =>{
                    const newproject = [...prev, newProject]
                    return newproject
                  })
                  ref.current.value = "";
                }
              }}
              className="p-5 px-16 ms-20 bg-blue-400 border-2 border-blue-200 hover:border-blue-500 rounded-2xl text-3xl "
            >
              {" "}
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
