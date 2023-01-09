import React, { useEffect, useState } from "react";
import icons from "@assets/images/icons";
import TaskCard from "./Card";
import Link from "next/link";
import useTasks from "@_hooks/useTasks";
import useLocalStorage from "@_hooks/useLocalStorage";
import { useTimerContext } from "@context/timerContext";

const TasksList = () => {
  const { tasks } = useTasks();
  const [selectedTaskId, setSelectedTaskId] = useState<string>("");

  const { getItem, setItem } = useLocalStorage();
  const { display } = useTimerContext();
  useEffect(() => {
    setSelectedTaskId(getItem("selectedTask") ?? "-1");
  }, [getItem]);

  return (
    <section className="flex flex-col gap-4 px-3">
      <div className="flex justify-between">
        <h6 className="text-xl">Tasks</h6>
        <button className="bg-cGray-200 p-1 shadow-none">
          <img src={icons.menuIcon} alt={"Menu"} />
        </button>
      </div>
      <Link href="/tasks/create" passHref>
        <button className="btn--outlined flex w-full items-center justify-center gap-3 shadow-none">
          <p className="text-lg">Add Task</p>
          <img src={icons.plusCircleIcon} alt={"Add Task"} />
        </button>
      </Link>
      <div className="flex flex-col gap-5">
        {display ? (
          tasks
            .filter((task) => task.id === selectedTaskId)
            ?.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                isSelected={selectedTaskId === task.id}
                onClick={(taskId) => {
                  setSelectedTaskId(taskId);
                  setItem("selectedTask", taskId);
                }}
              />
            ))
        ) : (
          <>
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                isSelected={selectedTaskId === task.id}
                onClick={(taskId) => {
                  setSelectedTaskId(taskId);
                  setItem("selectedTask", taskId);
                }}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default TasksList;
