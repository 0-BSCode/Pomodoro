import React from "react";
import { type Task } from "@prisma/client";
import Checkbox from "@components/_common/checkbox";
import icons from "@assets/images/icons";
import Link from "next/link";

const TaskCard = ({ task }: { task: Task }) => {
  return (
    <div className="shadow--soft flex flex-col gap-5 bg-cGray-200 p-4">
      <div className="flex justify-between">
        <Checkbox checked={task.isFinished} label={task.name} />
        <Link href={`/tasks/${task.id}/update`} passHref>
          <button className="bg-transparent px-0 py-1 shadow-none hover:bg-cGray-300">
            <img
              src={icons.menuIcon}
              alt={"Task actions"}
              className="rotate-90"
            />
          </button>
        </Link>
      </div>
      <p
        className={
          "rounded-md bg-cGray-100 p-3 " +
          (task.description ?? "text-center italic text-cGray-300")
        }
      >
        {task.description ?? "No description given"}
      </p>
    </div>
  );
};

export default TaskCard;
