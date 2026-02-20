"use client";

import { format } from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { UserAvatar } from "@/entities/user";
import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import { Card, CardContent } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Progress } from "@/shared/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { DashboardContainer } from "@/widgets/dashboard";
import { DashboardPageHeader } from "@/widgets/header";

const appUrlTableHeaders = [
  "Project",
  "Member",
  "App or site",
  "Time spent (h)",
  "Percent used",
];

const MockData = ({ isAll = true }: { isAll?: boolean }) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: new Date(new Date().getFullYear(), 0, 20),
  });

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-2xl font-light mt-3">
        JV Furniture{" "}
        <span className="text-muted-foreground text-sm">Asia - Dubai</span>
      </h3>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-muted-foreground">Group by:</span>
          <Select defaultValue="date">
            <SelectTrigger className="font-light">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="member">Member</SelectItem>
              <SelectItem value="project">Project</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-3">
          <Button size="icon" variant="outline">
            <ChevronLeft />
          </Button>

          <Button size="icon" variant="outline">
            <ChevronRight />
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date-picker-range"
                className="justify-start px-2.5 font-light"
              >
                <CalendarIcon />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "iii, LLL dd, y")} -{" "}
                      {format(date.to, "iii, LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "iii, LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          <Button variant="outline" className="font-light">
            Today
          </Button>

          <div className="relative w-64 self-end">
            <Search
              size={18}
              className="text-gray-400 absolute left-2 top-1/2 -translate-y-1/2"
            />
            <Input className="pl-8" />
          </div>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <CardContent className="p-0">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="hover:bg-white">
                {appUrlTableHeaders.map((header) => (
                  <TableHead className="px-4" key={header}>
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="bg-gray-100 hover:bg-gray-100">
                <TableCell>Mon, Feb 16, 2026</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Hubnity</TableCell>
                <TableCell className="flex items-center gap-1">
                  <UserAvatar name="Adelya Dadabaeyva" />
                  Adelya Dadabaeyva
                </TableCell>
                <TableCell>Yandex</TableCell>
                <TableCell>3:51:51</TableCell>
                <TableCell>
                  <span>78%</span>
                  <Progress className="h-1 mt-1" value={78} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Microsoft® Windows®</TableCell>
                <TableCell>0:51:24</TableCell>
                <TableCell>
                  <span>17%</span>
                  <Progress className="h-1 mt-1" value={17} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Hubstaff</TableCell>
                <TableCell>0:03:24</TableCell>
                <TableCell>
                  <span>1%</span>
                  <Progress className="h-1 mt-1" value={1} />
                </TableCell>
              </TableRow>
              {isAll && (
                <>
                  <TableRow>
                    <TableCell>Hubnity</TableCell>
                    <TableCell className="flex items-center gap-1">
                      <UserAvatar name="Aidana Atimova" />
                      Aidana Atimova
                    </TableCell>
                    <TableCell>Yandex</TableCell>
                    <TableCell>3:51:51</TableCell>
                    <TableCell>
                      <span>78%</span>
                      <Progress className="h-1 mt-1" value={78} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>Microsoft® Windows®</TableCell>
                    <TableCell>0:51:24</TableCell>
                    <TableCell>
                      <span>17%</span>
                      <Progress className="h-1 mt-1" value={17} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>Hubstaff</TableCell>
                    <TableCell>0:03:24</TableCell>
                    <TableCell>
                      <span>1%</span>
                      <Progress className="h-1 mt-1" value={1} />
                    </TableCell>
                  </TableRow>
                </>
              )}
              <TableRow className="bg-gray-100 hover:bg-gray-100">
                <TableCell>Mon, Feb 15, 2026</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Hubstaff</TableCell>
                <TableCell className="flex items-center gap-1">
                  <UserAvatar name="Adelya Dadabaeyva" />
                  Adelya Dadabaeyva
                </TableCell>
                <TableCell>Yandex</TableCell>
                <TableCell>3:51:51</TableCell>
                <TableCell>
                  <span>78%</span>
                  <Progress className="h-1 mt-1" value={78} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Microsoft® Windows®</TableCell>
                <TableCell>0:51:24</TableCell>
                <TableCell>
                  <span>17%</span>
                  <Progress className="h-1 mt-1" value={17} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Hubstaff</TableCell>
                <TableCell>0:03:24</TableCell>
                <TableCell>
                  <span>1%</span>
                  <Progress className="h-1 mt-1" value={1} />
                </TableCell>
              </TableRow>
              {isAll && (
                <>
                  <TableRow>
                    <TableCell>Hubnity</TableCell>
                    <TableCell className="flex items-center gap-1">
                      <UserAvatar name="Aidana Atimova" />
                      Aidana Atimova
                    </TableCell>
                    <TableCell>Yandex</TableCell>
                    <TableCell>3:51:51</TableCell>
                    <TableCell>
                      <span>78%</span>
                      <Progress className="h-1 mt-1" value={78} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>Microsoft® Windows®</TableCell>
                    <TableCell>0:51:24</TableCell>
                    <TableCell>
                      <span>17%</span>
                      <Progress className="h-1 mt-1" value={17} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>Hubstaff</TableCell>
                    <TableCell>0:03:24</TableCell>
                    <TableCell>
                      <span>1%</span>
                      <Progress className="h-1 mt-1" value={1} />
                    </TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default function FullReportPage() {
  return (
    <DashboardContainer>
      <DashboardPageHeader
        title="Apps & URLs report"
        subTitle="Analyze application and website usage across your team"
      />

      <div className="p-2 md:p-6 space-y-8">
        <Tabs defaultValue="all">
          <TabsList className="w-32">
            <TabsTrigger value="me">Me</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <MockData />
          </TabsContent>
          <TabsContent value="me">
            <MockData isAll={false} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardContainer>
  );
}
