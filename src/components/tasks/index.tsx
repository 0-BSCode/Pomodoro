import React, { useState } from "react";
import icons from "@assets/images/icons";
import TaskCard from "./Card";
import Link from "next/link";
import useTasks from "@components/_hooks/useTasks";

const TasksList = () => {
  const [name, setName] = useState<string>("");
  const { tasks } = useTasks();

  return (
    <section className="flex flex-col gap-4 px-3">
      <div className="flex justify-between">
        <h6 className="text-xl">Tasks</h6>
        <button className="bg-cGray-200 p-1 shadow-none">
          <img src={icons.menuIcon} alt={"Menu"} />
        </button>
      </div>
      {/* <form
        onSubmit={(e) => {
          e.preventDefault();
          createTask.mutate({ name });
        }}
      >
        <input
          type={"text"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type={"submit"} disabled={!name.length}>
          Add
        </button>
      </form> */}
      <Link href="/tasks/create" passHref>
        <button className="btn--outlined flex w-full items-center justify-center gap-3 shadow-none">
          <p className="text-lg">Add Task</p>
          <img src={icons.plusCircleIcon} alt={"Add Task"} />
        </button>
      </Link>
      <div className="flex flex-col gap-5">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
};

export default TasksList;
