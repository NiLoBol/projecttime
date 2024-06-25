// Context.tsx

import React, { useState, createContext, ReactNode, useEffect } from "react";
import { ProjectType } from "../Type/Type";
interface ContextProps {
    getproject: ProjectType[] 
    setproject: React.Dispatch<React.SetStateAction<ProjectType[]>>;
  }
  const DATA = createContext<ContextProps>({
    getproject: [],
    setproject: () => undefined,
  });

export const ContextProvider = (props: { children: ReactNode }) => {
  const [getproject, setproject] = useState<ProjectType[]>(() => {
    const savedProjects = localStorage.getItem(
      "ProJectTime--xld1549831125411>xcp__"
    );
    return savedProjects ? JSON.parse(savedProjects) : [];
  });
  useEffect(() => {
    console.log(getproject);
    localStorage.setItem(
        "ProJectTime--xld1549831125411>xcp__",
        JSON.stringify(getproject)
    );
  }, [getproject])
  
  
  return (
    <DATA.Provider value={{ getproject, setproject }}>
      {props.children}
    </DATA.Provider>
  );
};

export default DATA;
