import { format } from "date-fns";
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
} from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import type { DateRange } from "react-day-picker";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

interface AppsUrlsFiltersProps {
  date: DateRange | undefined;
  setDate: Dispatch<SetStateAction<DateRange | undefined>>;
}

export const AppsUrlsFilters = ({ date, setDate }: AppsUrlsFiltersProps) => {
  return (
    <Card className="transition-shadow hover:shadow-md bg-card">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          <CardTitle>Filters</CardTitle>
        </div>
        <CardDescription>Filter and search apps & URLs usage</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col xl:flex-row gap-4">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-9 w-full" />
            </div>

            <Select defaultValue="date">
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Group by Date</SelectItem>
                <SelectItem value="member">Group by Member</SelectItem>
                <SelectItem value="project">Group by Project</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date-picker-range"
                  className={cn(
                    "justify-start text-left font-normal w-full sm:w-[240px] shrink-0",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                  <span className="truncate">
                    {date?.from
                      ? date.to
                        ? `${format(date.from, "LLL dd")} - ${format(date.to, "LLL dd, y")}`
                        : format(date.from, "LLL dd, y")
                      : "Pick a date"}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="flex items-center justify-center gap-1 bg-muted/30 rounded-lg border border-border/40 flex-1 sm:flex-none">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-9 flex-1 rounded-md text-muted-foreground hover:text-foreground"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <Button
                  size="icon"
                  variant="ghost"
                  className="h-9 flex-1 rounded-md text-muted-foreground hover:text-foreground"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <Button
                variant="secondary"
                className="flex-1 sm:flex-none text-sm font-medium bg-primary/5 hover:bg-primary/10 text-primary transition-colors"
              >
                Today
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
