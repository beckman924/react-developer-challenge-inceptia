"use client";

import { useState } from "react";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({
  date,
  setDate,
  text,
  disabledBefore,
  setDateToAPI,
}: {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  text: string;
  disabledBefore?: Date;
  setDateToAPI: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[200px] max-w-full text-left flex items-center justify-between font-normal",
            !date && "text-muted-foreground"
          )}
          onClick={() => setOpen(!open)}
        >
          {date ? (
            format(date, "dd/MM/yyyy", { locale: es })
          ) : (
            <span>{text}</span>
          )}
          <CalendarIcon className="h-4 w-4 text-[#a0c6eb]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => {
            if (date) {
              setDate(date);
              setDateToAPI(format(date, "yyyy-MM-dd"));
              setOpen(false);
            }
          }}
          disabled={(date) => {
            if (!disabledBefore) {
              return false;
            }

            return disabledBefore && date < disabledBefore;
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
