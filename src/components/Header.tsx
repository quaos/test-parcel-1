import React from "react";

// console.log("Header.tsx line 1");

export interface HeaderProps {}

export default function Header({}: HeaderProps) {
  // console.log("Header.tsx line 6");

  return (
    <header>
      <h1>Hello Parcel</h1>
    </header>
  );
}
