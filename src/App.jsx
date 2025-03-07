import { useState, useRef } from "react";
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
  ScrollToSection,
} from "./components";
function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const accordionRef = useRef(null);
  const bgChangerRef = useRef(null);
  const starsRef = useRef(null);
  const imageSliderRef = useRef(null);
  const loadMoreRef = useRef(null);
  const quoteMachineRef = useRef(null);
  const sidebarRef = useRef(null);
  const qrGeneratorRef = useRef(null);
  const navbarRef = useRef(null);
  const tabsContainerRef = useRef(null);
  const githubSearchRef = useRef(null);
  const gameRef = useRef(null);
  const fetchRef = useRef(null);
  const dropDownContainerRef = useRef(null);

  const [sections, setSections] = useState([
    { name: "Accordion", ref: accordionRef },
    { name: "BgChanger", ref: bgChangerRef },
    { name: "Stars", ref: starsRef },
    { name: "ImageSlider", ref: imageSliderRef },
    { name: "LoadMore", ref: loadMoreRef },
    { name: "QuoteMachine", ref: quoteMachineRef },
    { name: "QrGenerator", ref: qrGeneratorRef },
    { name: "TabsContainer", ref: tabsContainerRef },
    { name: "GithubSearch", ref: githubSearchRef },
    { name: "Game", ref: gameRef },
    { name: "Fetch", ref: fetchRef },
    { name: "DropDownContainer", ref: dropDownContainerRef },
  ]);

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
          <Accordion ref={accordionRef} />
          <BgChanger ref={bgChangerRef} />
          <Stars ref={starsRef} />
          <ImageSlider ref={imageSliderRef} />
          <LoadMore ref={loadMoreRef} />
          {/* <QuoteMachine ref={quoteMachineRef} /> */}
          <QrGenerator ref={qrGeneratorRef} />
          <TabsContainer ref={tabsContainerRef} />
          {/* <GithubSearch ref={githubSearchRef} /> */}
          <Game ref={gameRef} />
          {/* <Fetch ref={fetchRef} /> */}
          <DropDownContainer ref={dropDownContainerRef} />
          <ScrollToSection sections={sections} />
        </section>
      </div>
    </main>
  );
}

export default App;
