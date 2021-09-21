import { Component, JSXElement } from "solid-js";
export interface ContainerProps {
  fluid?: boolean;
  children?: JSXElement;
}
const Container: Component<ContainerProps> = (props) => (
  <div className={"container" + (props.fluid ? "-fluid" : "")}>
    {props.children}
  </div>
);
export default Container;
