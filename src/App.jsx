import { useState } from "react";
import {
  Accordion,
  BgChanger,
  Stars,
  ImageSlider,
  LoadMore,
} from "./components";

function App() {
  return (
    <>
      <Accordion />
      <BgChanger />
      <Stars />
      <ImageSlider />
      <LoadMore />
    </>
  );
}

export default App;
