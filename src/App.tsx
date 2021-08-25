import React, { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Component />
    </ChakraProvider>
  );
};

const Component: React.FC = () => {
  const [count, setCount] = useState(0);

  function handleAlertClick() {
    setTimeout(() => {
      alert(`You clicked on: ${count}`);
    }, 3000);
  }

  return (
    <React.Fragment>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click Me!</button>
      <button onClick={handleAlertClick}>Alert Me!</button>
    </React.Fragment>
  );
};

export default App;
