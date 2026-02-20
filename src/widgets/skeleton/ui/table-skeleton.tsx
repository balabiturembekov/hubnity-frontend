import { Skeleton } from "@/shared/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";

export const TableSkeleton = () => {
  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {["1", "2", "3", "4", "5"].map((id) => (
              <TableHead key={`header-skeleton-${id}`}>
                <Skeleton className="h-4 w-24" />
              </TableHead>
            ))}
            <TableHead className="text-right">
              <Skeleton className="ml-auto h-4 w-24" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {["1", "2", "3"].map((id) => (
            <TableRow key={`row-skeleton-${id}`}>
              <TableCell>
                <Skeleton className="h-8 w-32" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-48" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-16" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-16" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-8 w-16 ml-auto" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
