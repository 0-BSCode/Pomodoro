import Modal from "@components/_common/modal";
import React from "react";

interface Props {
  onDelete: () => void;
  onClose: () => void;
}

const TaskDeleteModal = ({ onDelete, onClose }: Props) => {
  return (
    <Modal
      content={
        <section className="modal gap-4">
          <p className="text-xl">Delete Task</p>
          <div className="breaker" />
          <p className="text-md">Are you sure you want to delete this task?</p>
          <div className="mt-4 flex justify-between">
            <button className="btn--skeleton" onClick={onClose}>
              Cancel
            </button>
            <button className="btn--contained shadow-none" onClick={onDelete}>
              Delete
            </button>
          </div>
        </section>
      }
    />
  );
};

export default TaskDeleteModal;
