import React from "react";
import { type Task } from "@prisma/client";
import Checkbox from "@components/_common/checkbox";
import icons from "@assets/images/icons";

const TaskCard = ({ task }: { task: Task }) => {
  return (
    <div className="shadow--soft flex flex-col gap-5 bg-cGray-200 p-4">
      <div className="flex justify-between">
        <Checkbox checked={task.isFinished} label={task.name} />
        <button className="bg-transparent p-0 shadow-none">
          <img
            src={icons.menuIcon}
            alt={"Task actions"}
            className="rotate-90"
          />
        </button>
      </div>
      <p
        className={
          "rounded-md bg-cGray-100 p-3 " +
          (task.description ?? "text-center italic text-cGray-300")
        }
      >
        {task.description || "No description given"}
      </p>
    </div>
  );
};

export default TaskCard;
