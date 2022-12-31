import { type Task } from "@prisma/client";
import { trpc } from "@utils/trpc";
import React, { useState } from "react";

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
    <section>
      <h6>Add Task</h6>
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
      <div>
        {tasks.map((task) => (
          <div key={task.id}>{task.name}</div>
        ))}
      </div>
    </section>
  );
};

export default TasksList;
