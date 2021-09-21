import { Component, JSXElement } from "solid-js";

export interface RowProps {
  className?: string | string[];
  children?: JSXElement;
}

const Row: Component<RowProps> = (props: RowProps) => {
  const otherClasses = Array.isArray(props.className)
      ? props.className.join(" ")
      : props.className,
    rowClass = otherClasses ? `row ${otherClasses}` : "row";
  return <div className={rowClass}>{props.children}</div>;
};
export default Row;
