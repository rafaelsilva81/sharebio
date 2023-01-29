import React, { PropsWithChildren } from "react";

interface IButton {
  onClick?: () => void;
}

const ButtonPrimary = (props: PropsWithChildren<IButton>) => {
  const { onClick } = props;

  return (
    <button
      onClick={onClick}
      className="
        flex items-center gap-1 rounded-md bg-indigo-600 p-2 text-neutral-200
        transition
        ease-in-out
        hover:bg-indigo-700 active:bg-indigo-800
      "
    >
      {props.children}
    </button>
  );
};

const ButtonSecondary = (props: PropsWithChildren<IButton>) => {
  const { onClick } = props;

  return (
    <button
      onClick={onClick}
      className="
        flex items-center gap-1 rounded-md bg-neutral-200 p-2 text-indigo-600
        transition
        ease-in-out
        hover:bg-neutral-300 active:bg-neutral-300
      "
    >
      {props.children}
    </button>
  );
};

export { ButtonPrimary, ButtonSecondary };
