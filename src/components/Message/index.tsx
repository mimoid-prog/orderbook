import clsx from "clsx";
import { ReactNode } from "react";
import classes from "./styles.module.css";

type Props = {
  children: ReactNode;
  error?: boolean;
};

const Message = ({ children, error = false }: Props) => {
  return (
    <p className={clsx(classes.message, error && classes.error)}>{children}</p>
  );
};

export default Message;
