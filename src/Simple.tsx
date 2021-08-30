import React from "react";

type SimpleProps = {
  name?: string;
};

const Simple: React.FC<SimpleProps> = ({ name }: SimpleProps) => {
  if (name) {
    return <h1>Hallo, {name}!</h1>;
  }
  return <h1>Hallo, Stranger!</h1>;
};

export default Simple;
