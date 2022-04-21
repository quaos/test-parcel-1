declare module "*.json";
declare module "*.yml";
declare module "*.yaml";
declare module "*.png";
declare module "*.ico";

declare module "*.css" {
  const css: any;
  export default css;
}

declare module "*.svg" {
  const content: any;
  export default content;
}

namespace module {
  declare namespace hot {
    function accept();
  }
}
