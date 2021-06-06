declare module "jsurl" {
  const jsurl: {
    stringify: (obj: any) => string;
    parse: (str: string) => unknown;
    tryParse: <T>(str: string, def?: T) => unknown | T;
  };
  export default jsurl;
}
