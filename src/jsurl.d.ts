declare module "@yaska-eu/jsurl2" {
  const jsurl: {
    stringify: (
      obj: any,
      options?: { short?: boolean; rich?: boolean }
    ) => string;
    parse: (str: string, options?: { deURI?: boolean }) => unknown;
    tryParse: <T>(str: string, def?: T) => unknown | T;
  };
  export default jsurl;
}
