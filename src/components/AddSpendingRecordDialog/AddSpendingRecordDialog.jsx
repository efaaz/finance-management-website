import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createSpendingRecord } from "@/features/spendingRecordsSlice"; // Import the spending record action
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function AddSpendingRecordDialog({ date }) {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(""); // State for the spending category
  const [error, setError] = useState("");

  const handleAddSpending = async () => {
    const parsedAmount = Number(amount);
  
    // Validate the amount and category
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Please enter a valid amount greater than 0.");
      console.error("Error: Invalid amount entered");
      return;
    }
    if (!category) {
      setError("Please enter a spending category.");
      console.error("Error: No category entered");
      return;
    }
  
    // Clear any previous errors
    setError("");
  
    try {
      // Dispatch the action to create a spending record, now including date
      const result = await dispatch(
        createSpendingRecord({
          category,
          amount: parsedAmount,
          date, // Include date here
        })
      ).unwrap();
  
      console.log("Success:", result); // Log success message
      setAmount(""); // Reset input after submission
      setCategory(""); // Reset category input
    } catch (err) {
      console.error("Error:", err); // Log error message
      setError("Failed to add spending record. Please try again."); // Set error message for the user
    }
  };

  return (
    <Dialog>
      <DialogTrigger>Add Spending</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Spending</DialogTitle>
          <DialogDescription>
            Enter the spending details for {new Date(date).toLocaleDateString()}
            .
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter category"
            className="border rounded-md px-3 py-2 text-black w-full"
            aria-label="Category"
          />
          <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="border rounded-md px-3 py-2 text-black w-full"
            aria-label="Amount"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button
            onClick={handleAddSpending}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Spending
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddSpendingRecordDialog;
