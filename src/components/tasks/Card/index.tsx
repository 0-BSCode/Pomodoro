import React from "react";
import { type Task } from "@prisma/client";
import Checkbox from "@components/_common/checkbox";

const TaskCard = ({ task }: { task: Task }) => {
  return (
    <div>
      <div>
        <div>
          <Checkbox checked={task.isFinished} label={task.name} />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
