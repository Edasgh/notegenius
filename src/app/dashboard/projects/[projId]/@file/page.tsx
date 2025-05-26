"use client";
import FileRefs from "@/components/FileRefs";
import WelcomeCodeFile from "@/components/WelcomeCodeFile";
import { useAppSelector } from "@/lib/store/hooks";
import React from "react";

export default function File (){
  const selectedFiles = useAppSelector((state) => state.SelectedFiles.files);
  return (
    <div className="w-full py-2 border border-gray-200 shadow-gray-200 dark:border-gray-600 dark:shadow-gray-600 shadow-md rounded-md h-screen overflow-y-auto">
      {selectedFiles !== undefined && selectedFiles.length > 0 ? (
        <FileRefs
          fileRefferences={selectedFiles.map((file, index) => {
            return {
              type: "sourceCodeEmbedding",
              score: index,
              record: file,
            };
          })}
        />
      ) : (
        <div className="flex flex-col gap-5 justify-center items-center">
          <WelcomeCodeFile />
          <p className="text-gray-400">
            No file has been selected yet!
          </p>
        </div>
      )}
    </div>
  );
};

