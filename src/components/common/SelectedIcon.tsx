import React from "react";
import * as Icons from "react-icons/fa";

const SelectedIcon = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => {
  const Icon = Icons[name as keyof typeof Icons] || Icons.FaLink;
  return <Icon className={className} />;
};

export default SelectedIcon;
