import { Editor, EditorProps } from "@bytemd/react";

type Props = EditorProps;

export function EditorMarkdown({ value, ...props }: Props) {
  return <Editor mode="split"  value={value} {...props}/>
}
