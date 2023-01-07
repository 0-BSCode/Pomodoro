import React, { useState } from "react";
import { type Task } from "@prisma/client";
import Checkbox from "@components/_common/checkbox";
import icons from "@assets/images/icons";
import Link from "next/link";
import useTasks from "@_hooks/useTasks";

const TaskCard = ({ task }: { task: Task }) => {
  const [isTaskFinished, setIsTaskFinished] = useState<boolean>(
    task.isFinished
  );
  const { editTask } = useTasks();

  return (
    <div className="shadow--soft flex cursor-pointer flex-col gap-5 rounded-md bg-cGray-200 p-4 hover:border-l-4 hover:border-cGray-300 hover:shadow-none">
      <div className="flex justify-between">
        <Checkbox
          checked={isTaskFinished}
          label={task.name}
          onChange={(value: boolean) => {
            editTask.mutate(
              { taskId: task.id, isFinished: value },
              {
                onSuccess: (data) => {
                  setIsTaskFinished(data.isFinished);
                },
              }
            );
          }}
        />
        <Link href={`/tasks/${task.id}/update`} passHref>
          <button className="bg-transparent px-0 py-1 shadow-none hover:bg-cGray-300">
            <img src={icons.penIcon} alt={"Task actions"} />
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
