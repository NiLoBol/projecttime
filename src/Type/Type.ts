
export type ProjectType = {
    name: string;
    task: TASK[];
  };
  
export type TASK = {
    subprojectname: string;
    time: number;
  };
  