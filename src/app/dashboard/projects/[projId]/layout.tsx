"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

export default function ProjectLayout({
  children,
  file,
  folders,
  summary,
}: {
  children: React.ReactNode;
  file: React.ReactNode;
  folders: React.ReactNode;
  summary: React.ReactNode;
}) {
  return (
    <section className="w-full sm:flex sm:flex-wrap sm:justify-between sm:items-start md:grid md:grid-cols-6 gap-1.5 ">
      <main className="sm:flex-1 md:col-span-1">{folders}</main>
      <main className="sm:flex-1 md:col-span-3">{file}</main>
         <Tabs defaultValue="document" className="sm:flex-1 md:col-span-2">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="document">File Summary</TabsTrigger>
                <TabsTrigger value="chatDoc">Ask AI</TabsTrigger>
              </TabsList>
              <TabsContent value="document">{summary}</TabsContent>
              <TabsContent value="chatDoc">{children}</TabsContent>
            </Tabs>
  
    </section>
  );
}
