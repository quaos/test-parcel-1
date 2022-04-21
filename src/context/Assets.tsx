import React, { createContext } from "react";

import imageNotAvailable from "~assets/image-not-available.png";
import parcelIcon from "~assets/parcel-icon.svg";

console.log("Assets.tsx line 6");

const assets = {
  imageNotAvailable,
  parcelIcon,
};
console.log("assets:", assets);

const AssetsContext = createContext(assets);
export default AssetsContext;

console.log("Assets.tsx line 17");

export interface AssetsContextProviderProps extends Record<string, any> {}

export function AssetsContextProvider({
  children,
}: React.PropsWithChildren<AssetsContextProviderProps>) {
  console.log("Assets.tsx line 24");
  return <AssetsContext.Provider value={assets}>{children}</AssetsContext.Provider>;
}
