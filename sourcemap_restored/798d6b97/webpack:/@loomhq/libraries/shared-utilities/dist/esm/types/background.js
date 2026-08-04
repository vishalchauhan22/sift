import "../chunk-BYZ2GIR3.js";
const ALL_PRESET_BACKGROUND_NAMES = [
  "gradient_blue_pink",
  "gradient_yellow_pink",
  "gradient_purple_yellow",
  "gradient_green_blue",
  "gradient_pink_purple",
  "gradient_orange_purple",
  "gradient_blue_white",
  "gradient_green_white",
  "gradient_purple_blue"
];
var BackgroundType = /* @__PURE__ */ ((BackgroundType2) => {
  BackgroundType2["HEX"] = "hex";
  BackgroundType2["PRESET"] = "preset";
  BackgroundType2["CUSTOM"] = "custom";
  return BackgroundType2;
})(BackgroundType || {});
function isPresetBackgroundName(value) {
  return ALL_PRESET_BACKGROUND_NAMES.includes(value);
}
function isHexColor(value) {
  return /^#([0-9a-fA-F]{6})$/.test(value);
}
function getARandomPresetBackgroundName() {
  const randomIndex = Math.floor(
    Math.random() * ALL_PRESET_BACKGROUND_NAMES.length
  );
  return ALL_PRESET_BACKGROUND_NAMES[randomIndex];
}
export {
  ALL_PRESET_BACKGROUND_NAMES,
  BackgroundType,
  getARandomPresetBackgroundName,
  isHexColor,
  isPresetBackgroundName
};
//# sourceMappingURL=background.js.map
