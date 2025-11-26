
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { type Editor } from "@tiptap/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Toggle } from "../ui/toggle";
import { Bold } from "lucide-react";
import { cn } from "@/lib/utils";

interface iAppProps {
    editor: Editor | null;

}

export function Menubar({editor}: iAppProps) {
    if(!editor){
        return null;
    }

    return (
        <div>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                    <Toggle
                        size="sm"
                        pressed={editor.isActive("bold")}
                        onPressedChange={() =>
                        editor.chain().focus().toggleBold().run()
                        }
                        className={cn(
                        editor.isActive("bold") && "bg-muted text-muted-foreground"
                        )}
                    >
                        <Bold />
                    </Toggle>
                    </TooltipTrigger>

                    <TooltipContent>Bold</TooltipContent>
                </Tooltip>
            </TooltipProvider>

        </div>
    )
}