import "../../chunk-BYZ2GIR3.js";
const convertObjectPropertiesToCamelCase = (properties) => {
  return Object.fromEntries(
    Object.entries(properties).map(([key, value]) => [camelCase(key), value])
  );
};
const camelCase = (str) => {
  return str.replace(/[_-]([a-z])/g, (_, char) => char.toUpperCase());
};
export {
  camelCase,
  convertObjectPropertiesToCamelCase
};
//# sourceMappingURL=convertObjectPropertiesToCamelCase.js.map
