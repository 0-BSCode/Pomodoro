import React, { useEffect, useState } from "react";
import icons from "@assets/images/icons";
import TaskCard from "./Card";
import Link from "next/link";
import useTasks from "@_hooks/useTasks";
import useLocalStorage from "@_hooks/useLocalStorage";
import { useTimerContext } from "@context/timerContext";
import { Reorder } from "framer-motion";
import { TimerStatus } from "types/enums/timerStatus";

const TasksList = () => {
  const [selectedTaskId, setSelectedTaskId] = useState<string>("");
  const [openActionsToolTip, setOpenActionsToolTip] = useState<boolean>(false);

  const { tasks, setTasks, deleteCompletedTasks, deleteAllTasks } = useTasks();
  const { getItem, setItem } = useLocalStorage();
  const { status } = useTimerContext();

  useEffect(() => {
    setSelectedTaskId(getItem("selectedTask") ?? "-1");
  }, [getItem]);

  return (
    <section className="flex flex-col gap-4 px-3">
      <div className="flex justify-between">
        <h6 className="text-xl">Tasks</h6>
        <div className="relative">
          <button
            className="bg-cGray-200 p-1 shadow-none"
            onClick={(e) => {
              e.preventDefault();
              setOpenActionsToolTip(!openActionsToolTip);
            }}
          >
            <img src={icons.menuIcon} alt={"Menu"} />
          </button>
          {openActionsToolTip && (
            <div className="tooltip flex w-52 flex-col gap-1">
              <button
                className="flex items-center gap-2 px-3 text-left shadow-none"
                onClick={() => {
                  deleteAllTasks.mutate(undefined, {
                    onSuccess: () => {
                      setOpenActionsToolTip(false);
                    },
                  });
                }}
              >
                <img src={icons.trashIcon} alt="Clear completed" />
                <p className="text-sm">Clear all tasks</p>
              </button>
              <button
                className="flex items-center gap-2 px-3 text-left shadow-none"
                onClick={() => {
                  deleteCompletedTasks.mutate(undefined, {
                    onSuccess: () => {
                      setOpenActionsToolTip(false);
                    },
                  });
                }}
              >
                <img src={icons.checkCircleIcon} alt="Clear completed" />
                <p className="text-sm">Clear accomplished tasks</p>
              </button>
            </div>
          )}
        </div>
      </div>
      {status === TimerStatus.STOPPED && (
        <Link href="/tasks/create" passHref>
          <button className="btn--outlined flex w-full items-center justify-center gap-3 shadow-none">
            <p className="text-lg">Add Task</p>
            <img src={icons.plusCircleIcon} alt={"Add Task"} />
          </button>
        </Link>
      )}
      {status === TimerStatus.STARTED ? (
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
          {tasks.length ? (
            <Reorder.Group
              axis={"y"}
              values={tasks}
              onReorder={setTasks}
              className="flex flex-col gap-5"
            >
              {tasks.map((task) => (
                <Reorder.Item key={task.id} value={task}>
                  <TaskCard
                    task={task}
                    isSelected={selectedTaskId === task.id}
                    onClick={(taskId) => {
                      setSelectedTaskId(taskId);
                      setItem("selectedTask", taskId);
                    }}
                  />
                </Reorder.Item>
              ))}
            </Reorder.Group>
          ) : (
            <p className="text-center italic text-cGray-400">
              You currently have no tasks
            </p>
          )}
        </>
      )}
    </section>
  );
};

export default TasksList;
