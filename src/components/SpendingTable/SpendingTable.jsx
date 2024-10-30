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
  createSpendingRecord,
  fetchAllSpendingRecords,
} from "@/features/spendingRecordsSlice";
import { useEffect } from "react";

function SpendingTable() {
  const dispatch = useDispatch();
  const { records, status, error } = useSelector(
    (state) => state.spendingRecords
  );

  useEffect(() => {
    dispatch(fetchAllSpendingRecords()); // Fetch records on mount
  }, [dispatch]);

  const handleCreateRecord = (spendingRecordData) => {
    dispatch(createSpendingRecord(spendingRecordData)); // Dispatch create record
  };
   // Calculate the total amount
   const totalAmount = records.reduce((sum, record) => sum + record.amount, 0);
  return (
    <>
      <Heading text="Spendings" />
      {status === "loading" && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{record.category}</TableCell>
                <TableCell>{record.category}</TableCell>
                <TableCell>{record.category}</TableCell>
                <TableCell className="text-right">{record.amount}</TableCell>
              </TableRow>
            ))}
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
