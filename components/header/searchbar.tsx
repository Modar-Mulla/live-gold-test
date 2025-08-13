"use client";
import { BsSearch } from "react-icons/bs";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

export default function Searchbar() {
  const [isSearching, startTransition] = useTransition();
  const [query, setQuery] = useState("");
  const navigate = useRouter();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        startTransition(() => {
          navigate.push(`/search?query=${query}`);
        });
      }}
      className="search-bar flex w-full h-fit bg-background rounded-full justify-between items-center pr-[1px]"
    >
      <Input
        className="search-input bg-background w-full p-5 rounded-full !ring-0 ring-offset-0 border-0"
        type="text"
        placeholder="Search.."
        onChange={(e) => setQuery(e.currentTarget.value)}
      />
      <Button
        disabled={isSearching}
        type="submit"
        size={"icon"}
        className="search-btn bg-secondary rounded-full"
      >
        {!isSearching ? (
          <BsSearch />
        ) : (
          <LoaderCircle className="animate-spin" />
        )}
      </Button>
    </form>
  );
}
