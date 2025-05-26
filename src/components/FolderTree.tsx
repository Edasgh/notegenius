"use client";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { addFile, removeFile } from "@/lib/store/slices/selectedFolderSlice";
import React from "react";
import { Doc } from "../../convex/_generated/dataModel";

interface FolderTreeProps {
  files: Doc<"sourceCodeEmbedding">[];
}

const FolderTree: React.FC<FolderTreeProps> = ({ files }) => {
  const dispatch = useAppDispatch();
  const selectedfiles = useAppSelector((state) => state.SelectedFiles.files);
  return (
    <ul className="pl-4 w-fit pb-1.5 flex flex-col justify-start items-start gap-2 font-mono text-xs md:text-sm">
      {files.map((file) => (
        <li key={file._id}>
          <label className="break-all flex items-center gap-2 cursor-pointer hover:text-blue-500 dark:hover:text-blue-600">
            <input
              type="checkbox"
              defaultChecked={
                selectedfiles.find((sf) => sf._id === file._id) ? true : false
              }
              onChange={(e) => {
                if (e.target.checked) {
                  dispatch(addFile(file));
                } else {
                  dispatch(removeFile(file));
                }
              }}
              suppressContentEditableWarning
            />
            <span>{file.fileName}</span>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default FolderTree;
