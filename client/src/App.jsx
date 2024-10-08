import { Button } from "./components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "./components/ui/hover-card";
import { ModeToggle } from "./components/ui/mode-toggle";

function App() {
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
    </>
  );
}

export default App;
