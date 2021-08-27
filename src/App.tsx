import React, { useState } from "react";
import { Center, Button, ChakraProvider, Heading } from "@chakra-ui/react";
import { useEffect } from "react";

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Cleanup />
    </ChakraProvider>
  );
};

const Cleanup: React.FC = () => {
  const [count, setCount] = useState(0);
  // useEffect is a function that gets called every time FC is rerun.
  // it gets called with a new set of const count.

  // each time this component is rerun count gets fixed by react.
  // this means each render has its own isolated useEffects that know
  // nothing about previous runs.
  // while jsx trees can be diffed automatically, we need
  // to tell react on which data our effects depend upon.
  useEffect(() => {
    setTimeout(() => (document.title = `Count: ${count}`), 3000);
    return () => {
      console.log(`running the cleanup phase of ${count}.`);
    };
  });
  return (
    <Center h={"100vh"}>
      <Button onClick={() => setCount((c) => c + 1)}>Click!</Button>
      <Heading>You clicked the button {count} times.</Heading>
    </Center>
  );
};

const Component: React.FC = () => {
  const [count, setCount] = useState(0);

  function handleAlertClick() {
    setTimeout(() => {
      alert(`You clicked on: ${count}`);
    }, 3000);
  }

  // use deps to avoid rerunning effects after every render.
  useEffect(() => {
    // this causes a run away. why?
    // and yes we can setState from inside an effect.
    // we just have to be carefull that it does not create a run away code.
    setTimeout(() => setCount(Math.pow(count, 2)), 3000);
  });

  function handleClick() {
    setCount(count + 1);
    // react does not interupt the function here and do a render.
    // what it does is what is wait for the event handler to finish.
    setCount(count + 4); // meaning this call is executed.

    // if react encounters multiple state setters in the course of
    // a single event handler it batches them and chooses the latest.
    // meaning setCount(count + 4) is called in this case.
    console.log("run after setCount(count + 4)"); // this function gets called, too.
  }

  return (
    <React.Fragment>
      <p>You clicked {count} times</p>
      <button onClick={handleClick}>Click Me!</button>
      <button onClick={handleAlertClick}>Alert Me!</button>
    </React.Fragment>
  );
};

export default App;
