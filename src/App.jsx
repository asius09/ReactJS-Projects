import { useState } from "react";
import {
  Accordion,
  BgChanger,
  Stars,
  ImageSlider,
  LoadMore,
  QuoteMachine,
  Sidebar,
  QrGenerator,
  Navbar,
  TabsContainer,
} from "./components";

function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <main
      id="container"
      className={`min-h-screen p-2 bg-gray-100 dark:bg-slate-950 text-gray-900 dark:text-white grid`}
    >
      <Navbar />
      <div
        className={`grid ${
          isSidebarExpanded ? "grid-cols-[18%_1fr]" : "grid-cols-[4%_1fr]"
        } gap-x-4`}
      >
        <div>
          <Sidebar setIsSidebarExpanded={setIsSidebarExpanded} />
        </div>
        <section className="flex flex-col transition-all duration-300">
          <Accordion />
          <BgChanger />
          <Stars />
          <ImageSlider />
          <LoadMore />
          <QuoteMachine />
          <QrGenerator />
          <TabsContainer />
        </section>
      </div>
    </main>
  );
}

export default App;
