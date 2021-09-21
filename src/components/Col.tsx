import { Component, JSXElement } from "solid-js";

type NumberAttr =
  | number
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12";

export interface ColProps {
  width?: NumberAttr;
  className?: string | string[];
  children?: JSXElement;
}

const Col: Component<ColProps> = (props: ColProps) => {
  const otherClasses = Array.isArray(props.className)
      ? props.className.join(" ")
      : props.className,
    colClass = props.width ? `col-${props.width}` : "col";
  return (
    <div className={colClass + (otherClasses ? ` ${otherClasses}` : "")}>
      {props.children}
    </div>
  );
};
export default Col;
