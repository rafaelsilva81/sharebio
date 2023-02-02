import React, { Dispatch, SetStateAction, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import SelectedIcon from "./common/SelectedIcon";
import * as PossibleIcons from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const IconPicker = ({
  icon,
  setIcon,
}: {
  icon: string;
  setIcon: Dispatch<SetStateAction<string>>;
}) => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");

  console.log(PossibleIcons);

  return (
    <Popover.Root open={open}>
      <Popover.Trigger
        className="flex items-center gap-2 rounded-sm bg-indigo-600 p-2"
        onClick={() => setOpen(!open)}
      >
        <div className="rounded-sm bg-neutral-100 p-2">
          <SelectedIcon name={icon} />
        </div>
        <span className="text-white">Selecionar ícone</span>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="flex flex-col gap-2 border-neutral-200 bg-neutral-100 p-2 shadow-2xl">
          <div className="mb-2 flex items-center justify-between gap-2">
            <input
              type="text"
              className="rounded-xs flex w-full items-center bg-neutral-200 p-1 text-sm shadow-sm"
              placeholder="Filtrar ícones"
              defaultValue={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <Popover.Close
              className="text-gray-500 hover:text-red-500"
              onClick={() => setOpen(false)}
            >
              <IoMdClose size={24} />
            </Popover.Close>
          </div>

          <ScrollArea.Root type="always">
            <ScrollArea.Viewport
              className="
                z-50 h-64 w-72 rounded-sm bg-neutral-100 p-1 md:w-[300px]"
            >
              <div className="flex w-full flex-wrap gap-2">
                {Object.keys(PossibleIcons).map((iconName) => {
                  if (
                    filter &&
                    !iconName.toLowerCase().includes(filter.toLowerCase())
                  )
                    return null;
                  else
                    return (
                      <div
                        key={iconName}
                        className="flex cursor-pointer items-center justify-center rounded-sm p-2
                          hover:bg-indigo-500/50
                        "
                        onClick={() => {
                          setIcon(iconName);
                          setOpen(false);
                        }}
                      >
                        <SelectedIcon name={iconName} />
                      </div>
                    );
                })}
              </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              className="w-3 rounded-sm bg-neutral-300"
              orientation="vertical"
            >
              <ScrollArea.Thumb className="h-full w-3 rounded-sm bg-indigo-600"></ScrollArea.Thumb>
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default IconPicker;
