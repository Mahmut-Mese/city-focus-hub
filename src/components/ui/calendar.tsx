import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  size?: "default" | "large";
};

function Calendar({ className, classNames, showOutsideDays = true, size = "default", ...props }: CalendarProps) {
  const isLarge = size === "large";

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(isLarge ? "p-4" : "p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4 w-full",
        caption: cn("flex justify-center relative items-center", isLarge ? "pt-2 pb-1" : "pt-1"),
        caption_label: cn("font-semibold", isLarge ? "text-lg" : "text-sm"),
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          isLarge
            ? "h-9 w-9 bg-transparent p-0 opacity-50 hover:opacity-100"
            : "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: cn(
          "text-muted-foreground rounded-md font-medium",
          isLarge ? "w-full text-sm py-2" : "w-9 text-[0.8rem]",
        ),
        row: cn("flex w-full", isLarge ? "mt-1" : "mt-2"),
        cell: cn(
          "text-center p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          isLarge ? "w-full h-12 text-base" : "h-9 w-9 text-sm",
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "font-normal aria-selected:opacity-100",
          isLarge ? "h-12 w-full p-0 text-base" : "h-9 w-9 p-0",
        ),
        day_range_end: "day-range-end",
        day_selected: cn(
          "bg-[#10153f] text-white hover:bg-[#10153f] hover:text-white focus:bg-[#10153f] focus:text-white",
          isLarge && "rounded-xl font-semibold",
        ),
        day_today: cn(
          isLarge
            ? "bg-primary/10 text-primary font-semibold rounded-xl"
            : "bg-accent text-accent-foreground",
        ),
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-30 line-through",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className={isLarge ? "h-5 w-5" : "h-4 w-4"} />,
        IconRight: ({ ..._props }) => <ChevronRight className={isLarge ? "h-5 w-5" : "h-4 w-4"} />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
