import { Viewer, ViewerProps } from "@bytemd/react";

type Props = ViewerProps;

export function ViewerMarkdown({ value, ...props }: Props) {
  return <Viewer value={value} {...props}/>
}
