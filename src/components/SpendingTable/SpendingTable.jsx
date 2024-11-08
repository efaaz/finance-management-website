import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Heading from "../ui/Heading";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllSpendingRecords,
  getRecordsStatus,
  getRecordsError,
} from "@/features/spendingRecordsSlice";
import { useEffect, useState } from "react";
import {
  selectDailySpending,
  selectWeeklySpending,
  selectMonthlySpending,
  selectYearlySpending,
} from "@/selectors/financialCalculations";

function SpendingTable() {
  const dispatch = useDispatch();
  const status = useSelector(getRecordsStatus);
  const error = useSelector(getRecordsError);
  const [timeRange, setTimeRange] = useState("Daily"); // Default to Daily spending

  // Fetch all records once on component mount
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllSpendingRecords());
    }
  }, [status, dispatch]);

  // Use selectors directly in the component body
  const dailyRecords = useSelector(selectDailySpending);
  const weeklyRecords = useSelector(selectWeeklySpending);
  const monthlyRecords = useSelector(selectMonthlySpending);
  const yearlyRecords = useSelector(selectYearlySpending);

  // Conditionally assign records based on timeRange
  const records =
    timeRange === "Daily"
      ? dailyRecords
      : timeRange === "Weekly"
      ? weeklyRecords
      : timeRange === "Monthly"
      ? monthlyRecords
      : yearlyRecords;

  // Calculate the total amount for the selected time range
  const totalAmount = records.reduce((sum, record) => sum + record.amount, 0);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <>
      <div className="flex justify-between mx-4">
        <Heading text="Spendings" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="mt-4">
              Date Range
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Choose Date Range</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={timeRange}
              onValueChange={setTimeRange}
            >
              <DropdownMenuRadioItem value="Daily">Daily</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Weekly">
                Weekly
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Monthly">
                Monthly
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Yearly">
                Yearly
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="spending-table-container">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.length > 0 ? (
              records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">
                    {record.category}
                  </TableCell>
                  <TableCell>{record.category}</TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell className="text-right">{record.amount}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No data available for {timeRange} range
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">${totalAmount}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  );
}

export default SpendingTable;
