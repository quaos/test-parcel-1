console.log("Header.ts line 1");

export interface HeaderProps {}

export default function Header({}: HeaderProps) {
  const elements = {
    header: document.createElement("header"),
    caption: document.createElement("h1"),
  };

  elements.caption.appendChild(document.createTextNode("Hello Parcel"));
  elements.header.appendChild(elements.caption);

  console.log("Header.ts line 14");

  return elements.header;
}
