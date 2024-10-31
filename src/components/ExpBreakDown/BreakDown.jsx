import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "../ui/separator";

function BreakDown() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Monthly Expense Breakdown</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between font-bold">
          <p className="">Food</p>
          <p className="">$50</p>
        </div>
        <Separator></Separator>
        <div className="flex justify-between font-bold">
          <p className="">Food</p>
          <p className="">$50</p>
        </div>
        <Separator></Separator>
        <div className="flex justify-between font-bold">
          <p className="">Food</p>
          <p className="">$50</p>
        </div>
        <Separator></Separator>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
}

export default BreakDown;
