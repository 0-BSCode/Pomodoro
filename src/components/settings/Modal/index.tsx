import React, { useEffect } from "react";

interface Props {
  onClose: () => void;
}

const SettingsModal = ({ onClose }: Props) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  return (
    <>
      <div className="overlay" />
      <section className="modal">
        <div>
          <p>Settings</p>
          <button onClick={onClose}>X</button>
        </div>
      </section>
    </>
  );
};

export default SettingsModal;
