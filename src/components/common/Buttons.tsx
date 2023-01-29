import React, { PropsWithChildren } from "react";

interface IButton {
  onClick?: (e: MouseEvent) => void;
  className?: string;
}

const ButtonPrimary = (props: PropsWithChildren<IButton>) => {
  const { onClick, className } = props;

  return (
    <button
      onClick={(e) => onClick}
      className={`
        flex items-center justify-center gap-1 rounded-md bg-indigo-600 p-2 text-neutral-200
        transition
        ease-in-out
        hover:bg-indigo-700 active:bg-indigo-800
        ${className}
      `}
    >
      {props.children}
    </button>
  );
};

const ButtonSecondary = (props: PropsWithChildren<IButton>) => {
  const { onClick, className } = props;

  return (
    <button
      onClick={(e) => onClick}
      className={`
        flex items-center justify-center gap-1 rounded-md bg-neutral-200 p-2 text-indigo-600
        transition
        ease-in-out
        hover:bg-neutral-300 active:bg-neutral-300
        ${className}
        `}
    >
      {props.children}
    </button>
  );
};

export { ButtonPrimary, ButtonSecondary };
