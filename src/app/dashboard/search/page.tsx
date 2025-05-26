import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

function InputWithButton() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="email"
        placeholder="Type to search...."
        suppressHydrationWarning
      />
      <Button type="button" className="cursor-pointer" suppressHydrationWarning>
        <SearchIcon suppressHydrationWarning /> Search
      </Button>
    </div>
  );
}

const Search = () => {
  return (
    <>
      <div className="flex flex-col gap-5 justify-center items-start">
        <h1 className="text-4xl font-semibold">Search</h1>
        <InputWithButton />
      </div>
    </>
  );
};

export default Search;
