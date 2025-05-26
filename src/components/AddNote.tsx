"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { getConvexClient } from "@/lib/convex";
import { useUser } from "@clerk/clerk-react";
import { ArrowRight, Loader2Icon, PlusIcon } from "lucide-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";

type Note_Input = {
  note_title: string;
  link?: string;
  note_description: string;
};

export default function AddNote() {
  const { user } = useUser();
  const btnRef = useRef<HTMLButtonElement>(null);
  const { register, handleSubmit, reset, formState } = useForm<Note_Input>();

  async function createNewNote(
    title: string,
    description: string,
    link?: string
  ) {
    const convex = getConvexClient();
    const noteId = link
      ? await convex.mutation(api.note.saveNote, {
          userId: user?.id ?? "",
          title,
          link,
          description,
          recordTitle: title,
        })
      : await convex.mutation(api.note.saveNote, {
          userId: user?.id ?? "",
          title,
          description,
          recordTitle: title,
        });
    return noteId;
  }

  async function onSubmit(data: Note_Input) {
    try {
      if (!user) {
        throw new Error("Not authenticated! client");
      }
      const noteId = data.link
        ? await createNewNote(data.note_title, data.note_description, data.link)
        : await createNewNote(data.note_title, data.note_description);
      if (noteId !== null) {
        if (btnRef.current) {
          btnRef.current.click();
        }
        toast.success("Project added successfully!");
      } else {
        toast.error("Error : Project already exists.");
        if (btnRef.current) {
          btnRef.current.click();
        }
        reset();
      }
    } catch (error) {
      toast.error(
        "Error occurred while adding project. Please try again later."
      );
      reset();
      console.log("Error : ", error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <PlusIcon suppressHydrationWarning />
          Add Note
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a Note</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          id="add_note"
          className="grid gap-4 py-4"
          suppressHydrationWarning
        >
          <Input
            id="note_title"
            type="text"
            placeholder="Title"
            className="col-span-3"
            {...register("note_title", { required: true, minLength: 3 })}
            required
          />
          {formState.errors.note_title ? (
            <span className="text-sm text-red-400">
              Title should have atleast 3 characters
            </span>
          ) : (
            <></>
          )}
          <Input
            id="link"
            placeholder="Link (Optional)"
            className="col-span-3"
            {...register("link", {
              required: false,
              pattern:
                /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g,
            })}
          />
          {formState.errors.link ? (
            <span className="text-sm text-red-400">
              Not a valid link!
            </span>
          ) : (
            <></>
          )}
          <Textarea
            id="note_description"
            placeholder="Description"
            className="col-span-3"
            {...register("note_description", { required: true, minLength: 10 })}
          />
          {formState.errors.note_description ? (
            <span className="text-sm text-red-400">
              Description should have atleast 10 characters
            </span>
          ) : (
            <></>
          )}
          {formState.isSubmitting ||
          formState.isLoading ||
          formState.isValidating ? (
            <Button
              type="submit"
              className="flex gap-2 cursor-pointer justify-center items-end"
            >
              Adding{" "}
              <Loader2Icon className="animate-spin" suppressHydrationWarning />
            </Button>
          ) : (
            <>
              <Button
                type="submit"
                className="flex gap-2 cursor-pointer justify-center items-end"
              >
                Add Note <ArrowRight suppressHydrationWarning />
              </Button>
              <Button
                variant={"outline"}
                type="reset"
                className="flex gap-2 cursor-pointer justify-center items-end"
              >
                Reset
              </Button>
            </>
          )}

          <DialogClose ref={btnRef} className="hidden" />
        </form>
      </DialogContent>
    </Dialog>
  );
}
