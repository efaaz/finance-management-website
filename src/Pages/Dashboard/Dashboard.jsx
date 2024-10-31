import Heading from "@/components/ui/Heading";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import LineChart from "@/components/LineChart/LineCharts";
import BreakDown from "@/components/ExpBreakDown/BreakDown";

function Dashboard() {
  return (
    <>
      <Heading text="Dashboard"></Heading>
      <div className="sm:grid mx-4 sm:grid-cols-4 grid-cols-1 grid-flow-row justify-between sm:gap-4 gap-1 items-center">
        <div className="h-full sm:p-6 p-4 sm:m-0 mb-3 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <h5 className="mb-2 md:text-2xl text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              Upgrade you plan for Great experience
            </h5>
          </a>
          <Button href="#" className="mt-6 text-sm">
            Upgarde To Pro
          </Button>
        </div>
        <div className="sm:p-6 p-4 sm:m-0 mb-3 h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Balance
          </h5>
          <p className="my-4 text-4xl ">$500</p>
          <Separator className="my-4 text-white" />
          <div className="flex gap-2 font-bold">
            <p className="text-green-600 flex gap-2">
              <TrendingUp />
              5.75%
            </p>
            <p className="font-bold text-gray-400">Last Month $240</p>
          </div>
        </div>
        <div className="sm:m-0 mb-3 col-span-2 grid grid-cols-2 gap-4 grid-rows-2">
          <div className="h-full p-4  border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-lg tracking-tight text-gray-900 dark:text-white">
              Total Earning Of This Month
            </h5>
            <p className="text-2xl font-semibold">$700</p>
          </div>
          <div className="h-full p-4 text-red-500 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-lg tracking-tight text-gray-900 dark:text-white">
              Total Expense Of This Month
            </h5>
            <p className="text-2xl font-semibold">$200</p>
          </div>
          <div className="h-full p-4 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-lg tracking-tight text-gray-900 dark:text-white">
              Total Savings Of This Month
            </h5>
            <p className="text-2xl font-semibold">$500</p>
          </div>
          <div className="h-full p-2  border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-lg tracking-tight text-gray-900 dark:text-white">
              Charity
            </h5>
            <p className="text-2xl font-semibold">$10</p>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-6 grid-cols-1 sm:gap-4 gap-1 justify-center ">
        <div className="col-span-4 my-4 ml-4">
        <LineChart></LineChart>
        </div>
        <div className="col-span-2 my-4 mr-4">
          <BreakDown/>
        </div>
      </div>
      
    </>
  );
}

export default Dashboard;
