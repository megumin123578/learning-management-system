 "use client";
 import { EditorContent, useEditor } from "@tiptap/react";
 import Starterkit from "@tiptap/starter-kit";
 import {Menubar} from "./Menubar";
 import TextAlign from "@tiptap/extension-text-align";
 export function RichTextEditor({field}:{field:any}) {
    const editor = useEditor({
        extensions: [
            Starterkit,
            TextAlign.configure(
                {
                    types: ['heading','paragraph']
                }
            )
        ],
        editorProps: {
            attributes: {
                class: ' min-h-[300px] p-4 prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert !w-full !max-w-none'
            }
        },
        onUpdate: ({editor}) => {
            
            field.onChange(JSON.stringify(editor.getJSON()))
        },
        
        content: field.value ? JSON.parse(field.value) : '<p>Hello</p>',

        immediatelyRender: false,

    });
    return (
        <div className="w-full border border-input rounded-lg overflow-hidden dark:bg-input/30">
            <Menubar editor={editor}/>
            <EditorContent editor={editor}/>
        </div>
    )

}