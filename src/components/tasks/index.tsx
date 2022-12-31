import { type Task } from "@prisma/client";
import { trpc } from "@utils/trpc";
import React, { useState } from "react";
import icons from "@assets/images/icons";

const TasksList = () => {
  const [name, setName] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const { data, refetch } = trpc.task.fetchTasks.useQuery(undefined, {
    onSuccess: (data) => {
      setTasks(data);
    },
  });
  const createTask = trpc.task.addTask.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  console.log("Tasks");
  console.log(tasks);
  return (
    <section className="flex flex-col gap-2 px-7">
      <div className="flex justify-between">
        <h6 className="text-xl">Tasks</h6>
        <button className="bg-cGray-200 p-1 shadow-none">
          <img src={icons.menuIcon} alt={"Menu"} />
        </button>
      </div>
      <form
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
      </form>
      <button className="btn--outlined flex items-center justify-center gap-3">
        <p className="text-lg">Add Task</p>
        <img src={icons.plusCircleIcon} alt={"Add Task"} />
      </button>
      <div>
        {tasks.map((task) => (
          <div key={task.id}>{task.name}</div>
        ))}
      </div>
    </section>
  );
};

export default TasksList;
