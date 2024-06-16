"use client";

import * as React from "react";
import { Check, X, CarrotIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

export type Option = Record<"value" | "label", string> & Record<string, string>;

type AutoCompleteProps = {
  options: Option[];
  value?: Option[];
  onValueChange?: (value: Option[]) => void;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  emptyMessage?: string;
};

export function AutoComplete({
  options,
  className,
  placeholder,
  value,
  onValueChange,
  disabled,
  emptyMessage = "No options",
  isLoading = false,
}: AutoCompleteProps) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Option[]>(value as Option[]);

  const handleSelectOption = React.useCallback(
    (selectedOption: Option) => {
      setSelected((prevSelected) => {
        const newSelected = [...prevSelected, selectedOption];
        onValueChange?.(newSelected);
        return newSelected;
      });
    },
    [onValueChange]
  );

  const handleRemoveSelected = (optionToRemove: Option) => {
    const newSelected = selected.filter(
      (option) => option.value !== optionToRemove.value
    );
    setSelected(newSelected);
    onValueChange?.(newSelected);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "flex w-full justify-between rounded-lg border",
            className
          )}
        >
          <div className="flex items-center space-x-2 ml-1">
            {selected.length === 0 && (
              <p className="text-sm font-extralight">{placeholder}</p>
            )}
            {selected.map((option, index: number) => (
              <Badge
                key={index}
                className="p-2 justify-center cursor-pointer"
                onClick={() => handleRemoveSelected(option)}
              >
                {option.label}
                <div className="cursor-pointer">
                  <X className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </div>
              </Badge>
            ))}
          </div>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="border-0 flex justify-center items-center"
            onClick={() => setOpen(true)}
            disabled={disabled || isLoading}
          >
            <CarrotIcon className=" h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="justify-start w-[300px] sm:md:xl:lg:w-[500px] p-0">
        <Command>
          <CommandInput
            placeholder="Search framework..."
            className="h-9 w-full flex"
          />
          <CommandEmpty>{emptyMessage}</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selected.some(
                  (selectedOption) => selectedOption.value === option.value
                );
                return (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    onClick={() => console.log("on click", option)}
                    onSelect={() => {
                      handleSelectOption(option);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex items-center gap-2 w-full",
                      !isSelected ? "pl-8" : null
                    )}
                  >
                    {isSelected ? <Check className="w-4" /> : null}
                    {option.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
