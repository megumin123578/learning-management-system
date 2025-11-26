 "use client";
 import { useEditor } from "@tiptap/react";
 import Starterkit from "@tiptap/starter-kit";
 import {Menubar} from "./Menubar";
 export function RichTextEditor() {
    const editor = useEditor({
        extensions: [
            Starterkit
        ],
        immediatelyRender: false,

    });
    return (
        <div>
            <Menubar editor={editor}/>
        </div>
    )

}