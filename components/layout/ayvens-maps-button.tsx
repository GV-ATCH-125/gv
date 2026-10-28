import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export default function AyvensMapsButton({
  variant = "primary",
  className = "",
  type = "button",
  ...rest
}: Props) {
  const classes = ["btn", variant === "ghost" ? "ghost" : "", className]
    .filter(Boolean)
    .join(" ");
  return <button type={type} className={classes} {...rest} />;
}
