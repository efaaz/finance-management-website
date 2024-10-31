import { Button } from "./components/ui/button";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSpendingRecords } from "@/features/spendingRecordsSlice";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "./components/ui/hover-card";
import { ModeToggle } from "./components/ui/mode-toggle";
import Spinner from "./components/ui/spinner";

function App() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.spendingRecords.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllSpendingRecords());
    }
  }, [status, dispatch]);
  return (
    <>
      <h1 className="text-center text-4xl text-violet-500">Hello everyone</h1>
      <Button>click me</Button>
      <HoverCard>
        <HoverCardTrigger>Hover</HoverCardTrigger>
        <HoverCardContent>
          The React Framework – created and maintained by @vercel.
        </HoverCardContent>
      </HoverCard>
      <ModeToggle></ModeToggle>
      <Spinner></Spinner>
    </>
  );
}

export default App;
