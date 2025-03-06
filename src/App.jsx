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
  GithubSearch,
  Game,
  Fetch,
  DropDownContainer,
} from "./components";

function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <main
      id="container"
      className={`min-h-screen p-2 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-slate-900 text-gray-900 dark:text-white grid`}
    >
      <Navbar />
      <div
        className={`grid ${
          isSidebarExpanded ? "grid-cols-[18%_1fr]" : "grid-cols-[4%_1fr]"
        } gap-x-4 transition-all duration-300`}
      >
        <div>
          <Sidebar setIsSidebarExpanded={setIsSidebarExpanded} />
        </div>
        <section className="flex flex-col transition-all duration-300 gap-6">
          <Accordion />
          <BgChanger />
          <Stars />
          <ImageSlider />
          <LoadMore />
          {/* <QuoteMachine /> */}
          <QrGenerator />
          <TabsContainer />
          {/* <GithubSearch /> */}
          <Game />
          {/* <Fetch /> */}
          <DropDownContainer />
        </section>
      </div>
    </main>
  );
}

export default App;
