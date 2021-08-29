import { Box, Button, Grommet, Heading, Grid, Select } from "grommet";
import React, { useState, useEffect } from "react";
import { hpe } from "grommet-theme-hpe";
// This required changing the string literal to URL object.
import { Document, Page } from "react-pdf/dist/esm/entry.parcel";

const App: React.FC = () => {
  return (
    <Grommet theme={hpe}>
      <Grid
        rows={["1fr"]}
        columns={["1fr", "medium"]}
        areas={[
          { name: "pdf-reader", start: [0, 0], end: [0, 0] },
          { name: "audio-player", start: [1, 0], end: [1, 0] },
        ]}
        height="100vh"
      >
        <Box gridArea="pdf-reader">
          <Document file="C:\\Users\semha\Downloads\test.pdf">
            <Page pageNumber={3} />
          </Document>
        </Box>
        <Box gridArea="audio-player" direction="column">
          <Box direction="row" gap="small">
            <Select options={["Volume"]} value="Volume" />
            <Select options={["Unit"]} value="Unit" />
          </Box>
          <audio
            controls
            src="C://Users/semha/Downloads/Basic/Volume 1/FSI - German Basic Course - Volume 1 - Unit 01 1.1.mp3"
            style={{ width: "100%" }}
          ></audio>
        </Box>
      </Grid>
    </Grommet>
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

  useEffect(() => {
    const id = setInterval(() => console.log("i am being called."), 3000);

    return () => {
      clearInterval(id);
    };
  });

  return (
    <Box height={"100vh"}>
      <Button label="Click!" onClick={() => setCount((c) => c + 1)} />
      <Heading>You clicked the button {count} times.</Heading>
    </Box>
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
