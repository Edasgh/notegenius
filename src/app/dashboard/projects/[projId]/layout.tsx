"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

export default function ProjectLayout({
  children,
  file,
  folders,
}: {
  children: React.ReactNode;
  file: React.ReactNode;
  folders: React.ReactNode;
}) {
  return (
    <section className="w-full sm:flex sm:flex-wrap sm:justify-between sm:items-start md:grid md:grid-cols-6 gap-1.5 ">
      <main className="sm:flex-1 md:col-span-1">{folders}</main>
      <main className="sm:flex-1 md:col-span-3">{file}</main>
      <main className="sm:flex-1 md:col-span-2">{children}</main>
    </section>
  );
}
