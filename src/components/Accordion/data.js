const data = [
  {
    id: 1,
    question: "What is a React Accordion Component?",
    answer:
      "A React Accordion component is a UI element that allows you to collapse and expand content sections. It's commonly used to display large amounts of information in a compact and organized way, revealing details only when needed by the user.",
  },
  {
    id: 2,
    question: "How do you typically implement an Accordion in React?",
    answer:
      "In React, you usually implement an accordion by using React's state to manage the visibility of each accordion item's content. You'll create a component that can toggle the 'open' state of each section when its header is clicked. Libraries or custom hooks can simplify this process.",
  },
  {
    id: 3,
    question: "What are the key considerations for styling a React Accordion?",
    answer:
      "When styling a React Accordion, consider the visual feedback for open and closed states, clear indicators for interactive elements (headers), and consistent spacing and padding.  Using CSS or a CSS-in-JS library, you can customize the appearance of headers, content areas, and transition animations for a smooth user experience.",
  },
  {
    id: 4,
    question: "How can I make my React Accordion component accessible?",
    answer:
      "To ensure accessibility, use semantic HTML like `<button>` elements for accordion headers. Implement ARIA attributes such as `aria-controls` and `aria-expanded` to properly convey the state and relationships between header and content to assistive technologies. Keyboard navigation is also crucial, ensuring users can navigate and operate the accordion using just the keyboard.",
  },
];

export default data;
