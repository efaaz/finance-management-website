import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

// Menu items.
const items = [
  { title: "Home", url: "#", icon: Home },
  { title: "Spendings", url: "SpendingTable", icon: Inbox },
  { title: "Calendar", url: "#", icon: Calendar },
  { title: "Search", url: "#", icon: Search },
  { title: "Settings", url: "#", icon: Settings },
];

const SidebarMenuItem = ({ children }) => (
  <li className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6">
    {children}
  </li>
);

const SidebarMenuButton = ({ asChild, children }) => (
  <span className="inline-flex justify-center items-center ml-2">
    {asChild ? children : <span>{children}</span>}
  </span>
);

const AppSidebar = () => {
  return (
    <div className=" flex flex-col bg-blue-950 w-12 hover:w-36 md:w-36 h-full transition-all duration-300 border-none sidebar">
      <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
        <ul className="flex flex-col py-4 space-y-1">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url} className="flex flex-row items-center">
                  <item.icon className="w-5 h-5 mr-2" />
                  <span className="ml-2 text-sm tracking-wide truncate">
                    {item.title}
                  </span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </ul>
        <p className="mb-14 px-5 py-3 hidden md:block text-center text-xs">
          Copyright @2021
        </p>
      </div>
    </div>
  );
};
export default AppSidebar;
