import React from "react";

interface Props {
  checked: boolean;
  // onChange: (value: boolean) => void;
  label: string;
}

const Checkbox = ({ checked, label }: Props) => {
  return (
    <label className="group relative block cursor-pointer select-none rounded-full pl-8">
      {label}
      <input
        className={"absolute h-0 w-0 cursor-pointer opacity-0"}
        type={"checkbox"}
        checked={checked}
      />
      <span
        className={
          "absolute top-0 left-0 h-6 w-6 rounded-full after:absolute after:left-2 after:top-1 after:h-3 after:w-1.5 after:rotate-45 after:border-r-2 after:border-b-2 after:border-solid after:border-white after:content-[''] group-hover:bg-cGray-300 " +
          (checked
            ? "bg-cGray-500 after:block"
            : "border-2 border-cGray-500 bg-cGray-100 after:hidden")
        }
      />
    </label>
  );
};

export default Checkbox;
