declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}
declare module "*.svg" {
  export const ReactComponent: React.FunctionComponent<
    React.SVGAttributes<SVGElement>
  >;
}
declare module "@sscovil/rtf" {
  declare class RTF {
    format: (date: Date) => string;
  }
  export default RTF;
}
