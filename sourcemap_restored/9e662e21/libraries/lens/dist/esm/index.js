var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};

// src/index.ts
import "@emotion/react";

// src/colors.ts
var percent = (number, percentage) => Math.round(number * percentage / 100);
var darken = (color, percentage) => __spreadProps(__spreadValues({}, color), {
  l: color.l - percent(color.l, percentage)
});
var lighten = (color, percentage) => __spreadProps(__spreadValues({}, color), {
  l: color.l + percent(color.l, percentage)
});
var saturate = (color, percentage) => __spreadProps(__spreadValues({}, color), {
  s: color.s + percent(color.s, percentage)
});
var alphaFunction = (color, alpha) => __spreadProps(__spreadValues({}, color), {
  a: alpha
});
var hoverIncrease = 15.8;
var activeIncrease = 31.6;
var borderAlpha = 0.14;
var backdropAlpha = 0.46;
var backdropDarkAlpha = 0.9;
var backdropTwilightAlpha = 0.8;
var focusRingAlpha = 0.8;
var buttonBorderAlpha = 0.25;
var tabBackgroundAlpha = 0.06;
var highlightAlpha = 0.15;
var hslaBaseColors = {
  red: { h: 4, s: 64, l: 48, a: 1 },
  blurpleLight: { h: 240, s: 83.3, l: 95.3, a: 1 },
  blurpleMedium: { h: 242, s: 81, l: 87.6, a: 1 },
  blurple: { h: 242, s: 88.4, l: 66.3, a: 1 },
  blurpleDark: { h: 242, s: 87.6, l: 62, a: 1 },
  blurpleStrong: { h: 242, s: 55, l: 36, a: 1 },
  offWhite: { h: 0, s: 0, l: 97.25, a: 1 },
  blueLight: { h: 216.5, s: 92, l: 90.2, a: 1 },
  blue: { h: 215.4, s: 80, l: 47.65, a: 1 },
  blueDark: { h: 216.3, s: 69.2, l: 23, a: 1 },
  magenta: { h: 323, s: 42, l: 48, a: 1 },
  orangeLight: { h: 4, s: 100, l: 91.2, a: 1 },
  orange: { h: 11, s: 100, l: 62.2, a: 1 },
  orangeDark: { h: 10.9, s: 100, l: 42.2, a: 1 },
  tealLight: { h: 155, s: 70, l: 84, a: 1 },
  teal: { h: 155, s: 62, l: 32, a: 1 },
  tealDark: { h: 155, s: 55, l: 19, a: 1 },
  yellowLight: { h: 43, s: 93, l: 82, a: 1 },
  yellow: { h: 45.5, s: 96, l: 57, a: 1 },
  yellowDark: { h: 39.8, s: 100, l: 49.4, a: 1 }
};
var hslaGreys = {
  grey8: { h: 228, s: 6, l: 17, a: 1 },
  grey7: { h: 223, s: 6, l: 24.5, a: 1 },
  grey6: { h: 224, s: 5, l: 44, a: 1 },
  grey5: { h: 224, s: 5, l: 57, a: 1 },
  grey4: { h: 223, s: 5, l: 73, a: 1 },
  grey3: { h: 225, s: 6, l: 87.5, a: 1 },
  grey2: { h: 210, s: 7, l: 94.5, a: 1 },
  grey1: { h: 0, s: 0, l: 97.25, a: 1 },
  white: { h: 0, s: 0, l: 100, a: 1 }
};
var themeSharedColors = {
  record: hslaBaseColors.orange,
  recordHover: darken(hslaBaseColors.orange, hoverIncrease),
  recordActive: darken(hslaBaseColors.orange, activeIncrease),
  focusRing: alphaFunction(hslaBaseColors.blurple, focusRingAlpha),
  backdropDark: alphaFunction(hslaGreys.grey8, backdropDarkAlpha),
  backdropTwilight: alphaFunction(
    hslaBaseColors.blurpleStrong,
    backdropTwilightAlpha
  ),
  highlight: alphaFunction(hslaBaseColors.blurple, highlightAlpha),
  warning: {
    h: 45.5,
    s: 96,
    l: 57,
    a: 1,
    ads: "--ds-background-warning-bold"
  }
};
var themeColors = {
  light: __spreadProps(__spreadValues({
    primary: hslaBaseColors.blurple,
    primaryHover: hslaBaseColors.blurpleDark,
    primaryActive: hslaBaseColors.blurpleStrong,
    body: { h: 228, s: 6, l: 17, a: 1, ads: "--ds-text" },
    bodyDimmed: { h: 224, s: 5, l: 44, a: 1, ads: "--ds-text-subtlest" },
    bodyInverse: { h: 0, s: 0, l: 100, a: 1, ads: "--ds-text-inverse" },
    background: { h: 0, s: 0, l: 100, a: 1, ads: "--ds-surface" },
    backgroundHover: {
      h: 209,
      s: 75.6,
      l: 8,
      a: 0.06,
      ads: "--ds-background-neutral-subtle-hovered"
    },
    backgroundActive: {
      h: 225.5,
      s: 56.9,
      l: 10,
      a: 0.14,
      ads: "--ds-background-neutral-subtle-pressed"
    },
    backgroundSecondary: {
      h: 0,
      s: 0,
      l: 97.25,
      a: 1,
      ads: "--ds-surface-sunken"
    },
    backgroundSecondary2: {
      h: 0,
      s: 0,
      l: 97.25,
      a: 1,
      ads: "--ds-surface-sunken"
    },
    backgroundInverse: {
      h: 228,
      s: 6,
      l: 17,
      a: 1,
      ads: "--ds-background-neutral-bold"
    },
    overlay: { h: 0, s: 0, l: 100, a: 1, ads: "--ds-surface-overlay" },
    overlayHover: hslaGreys.grey2,
    overlayActive: hslaGreys.grey3,
    backdrop: { h: 224, s: 72, l: 7, a: backdropAlpha, ads: "--ds-blanket" },
    border: { h: 225.5, s: 57, l: 10, a: borderAlpha, ads: "--ds-border" }
  }, themeSharedColors), {
    info: {
      h: 215,
      s: 80.25,
      l: 47.65,
      a: 1,
      ads: "--ds-background-information-bold"
    },
    success: {
      h: 155,
      s: 62,
      l: 32,
      a: 1,
      ads: "--ds-background-accent-green-bolder"
    },
    danger: { h: 4, s: 64, l: 48, a: 1, ads: "--ds-background-danger-bold" },
    dangerHover: {
      h: 4.3,
      s: 65.7,
      l: 41.2,
      a: 1,
      ads: "--ds-background-danger-bold-hovered"
    },
    dangerActive: {
      h: 4.5,
      s: 56.3,
      l: 23.3,
      a: 1,
      ads: "--ds-background-danger-bold-pressed"
    },
    disabledContent: {
      h: 223,
      s: 5,
      l: 73,
      a: 1,
      ads: "--ds-text-disabled"
    },
    disabledBackground: {
      h: 0,
      s: 0,
      l: 9,
      a: 0.03,
      ads: "--ds-background-disabled"
    },
    formFieldBorder: { h: 223.6, s: 5, l: 57, a: 1, ads: "--ds-border-input" },
    formFieldBackground: {
      h: 0,
      s: 0,
      l: 100,
      a: 1,
      ads: "--ds-background-input"
    },
    buttonBorder: {
      h: 252,
      s: 13,
      l: 46,
      a: buttonBorderAlpha,
      ads: "--ds-border"
    },
    tabBackground: {
      h: 209,
      s: 75.6,
      l: 8,
      a: tabBackgroundAlpha,
      ads: "--ds-background-neutral"
    },
    upgrade: {
      h: 277.5,
      s: 89,
      l: 96.5,
      a: 1,
      ads: "--ds-background-discovery"
    },
    upgradeHover: {
      h: 277,
      s: 86,
      l: 91.6,
      a: 1,
      ads: "--ds-background-discovery-hovered"
    },
    upgradeActive: {
      h: 278.6,
      s: 84.5,
      l: 79.8,
      a: 1,
      ads: "--ds-background-discovery-pressed"
    },
    discoveryBackground: {
      h: 278.6,
      s: 48.4,
      l: 52.2,
      a: 1,
      ads: "--ds-background-discovery-bold"
    },
    discoveryLightBackground: {
      h: 277.5,
      s: 89,
      l: 96.5,
      a: 1,
      ads: "--ds-background-discovery"
    },
    discoveryTitle: { h: 228, s: 6, l: 17, a: 1, ads: "--ds-text" },
    discoveryHighlight: {
      h: 277.5,
      s: 89,
      l: 96.5,
      a: 1,
      ads: "--ds-background-discovery"
    }
  }),
  dark: __spreadProps(__spreadValues({
    primary: { h: 242, s: 87, l: 73, a: 1 },
    primaryHover: hslaBaseColors.blurpleDark,
    primaryActive: hslaBaseColors.blurpleStrong,
    body: { h: 225, s: 4.3, l: 81.6, a: 1, ads: "--ds-text" },
    bodyDimmed: { h: 217.5, s: 4, l: 60.4, a: 1, ads: "--ds-text-subtlest" },
    bodyInverse: { h: 240, s: 3, l: 12.5, a: 1, ads: "--ds-text-inverse" },
    background: { h: 240, s: 3, l: 12.5, a: 1, ads: "--ds-surface" },
    backgroundHover: {
      h: 240,
      s: 12.6,
      l: 83,
      a: 0.07,
      ads: "--ds-background-neutral-subtle-hovered"
    },
    backgroundActive: {
      h: 236,
      s: 36.6,
      l: 92,
      a: 0.12,
      ads: "--ds-background-neutral-subtle-pressed"
    },
    backgroundSecondary: {
      h: 210,
      s: 4,
      l: 9.8,
      a: 1,
      ads: "--ds-surface-sunken"
    },
    backgroundSecondary2: {
      h: 210,
      s: 4,
      l: 9.8,
      a: 1,
      ads: "--ds-surface-sunken"
    },
    backgroundInverse: {
      h: 225,
      s: 4.3,
      l: 81.6,
      a: 1,
      ads: "--ds-background-neutral-bold"
    },
    overlay: { h: 225, s: 4, l: 17.6, a: 1, ads: "--ds-surface-overlay" },
    overlayHover: {
      h: 225,
      s: 4,
      l: 19.61,
      a: 1,
      ads: "--ds-surface-overlay-hovered"
    },
    overlayActive: {
      h: 225,
      s: 4.69,
      l: 25.1,
      a: 1,
      ads: "--ds-surface-overlay-pressed"
    },
    backdrop: { h: 210, s: 11, l: 7, a: 0.6, ads: "--ds-blanket" },
    border: { h: 236, s: 36.6, l: 92, a: 0.12, ads: "--ds-border" }
  }, themeSharedColors), {
    info: {
      h: 216.3,
      s: 83,
      l: 67.25,
      a: 1,
      ads: "--ds-background-information-bold"
    },
    success: {
      h: 155,
      s: 57,
      l: 55,
      a: 1,
      ads: "--ds-background-accent-green-bolder"
    },
    danger: { h: 3.75, s: 91, l: 69, a: 1, ads: "--ds-background-danger-bold" },
    dangerHover: {
      h: 4,
      s: 96,
      l: 78,
      a: 1,
      ads: "--ds-background-danger-bold-hovered"
    },
    dangerActive: {
      h: 4,
      s: 100,
      l: 91.2,
      a: 1,
      ads: "--ds-background-danger-bold-pressed"
    },
    disabledContent: {
      h: 225,
      s: 5,
      l: 33,
      a: 1,
      ads: "--ds-text-disabled"
    },
    disabledBackground: {
      h: 0,
      s: 0,
      l: 1,
      a: 0.46,
      ads: "--ds-background-disabled"
    },
    formFieldBorder: { h: 222, s: 4, l: 51.4, a: 1, ads: "--ds-border-input" },
    formFieldBackground: {
      h: 225,
      s: 5,
      l: 15,
      a: 1,
      ads: "--ds-background-input"
    },
    buttonBorder: {
      h: 0,
      s: 0,
      l: 100,
      a: buttonBorderAlpha,
      ads: "--ds-border"
    },
    tabBackground: {
      h: 240,
      s: 12.6,
      l: 83,
      a: 0.07,
      ads: "--ds-background-neutral"
    },
    upgrade: {
      h: 277.8,
      s: 27.3,
      l: 19.4,
      a: 1,
      ads: "--ds-background-discovery"
    },
    upgradeHover: {
      h: 278,
      s: 44.2,
      l: 25.3,
      a: 1,
      ads: "--ds-background-discovery-hovered"
    },
    upgradeActive: {
      h: 278,
      s: 45,
      l: 44.7,
      a: 1,
      ads: "--ds-background-discovery-pressed"
    },
    discoveryBackground: {
      h: 278.5,
      s: 84.5,
      l: 72.2,
      a: 1,
      ads: "--ds-background-discovery-bold"
    },
    discoveryLightBackground: {
      h: 277.8,
      s: 27.3,
      l: 19.4,
      a: 1,
      ads: "--ds-background-discovery"
    },
    discoveryTitle: { h: 225, s: 4.3, l: 81.6, a: 1, ads: "--ds-text" },
    discoveryHighlight: {
      h: 277.8,
      s: 27.3,
      l: 19.4,
      a: 1,
      ads: "--ds-background-discovery"
    }
  })
};
var hslaColors = __spreadValues(__spreadValues({}, hslaBaseColors), hslaGreys);
var colorsNames = [
  ...Object.keys(hslaColors),
  ...Object.keys(themeColors.light)
];

// src/utilities/color.ts
var getColorAlpha = (color, alpha) => {
  return `hsla(${hslaColors[color].h},${hslaColors[color].s}%,${hslaColors[color].l}%,${alpha})`;
};
var getColorScale = (color, scaleType, scaleIncrement) => {
  const scaledValue = () => {
    if (scaleType === "dark") {
      return hslaColors[color].l - hslaColors[color].l * scaleIncrement;
    } else if (scaleType === "light") {
      return hslaColors[color].l + hslaColors[color].l * scaleIncrement;
    }
  };
  return `hsla(${hslaColors[color].h},${hslaColors[color].s}%,${Math.round(
    scaledValue()
  )}%,${hslaColors[color].a})`;
};
var getColorValue = (color) => {
  if (color) {
    if (color in hslaColors || color in themeColors.light) {
      return `var(--lns-color-${color})`;
    }
    if (color in gradients) {
      return `var(--lns-gradient-${color})`;
    }
    return color;
  }
};

// src/hooks/use-media.js
import _debounce from "lodash/debounce";
import React from "react";
function useMedia(queries, values, defaultValue) {
  const match = React.useCallback(() => {
    if (typeof window === "undefined") {
      return defaultValue;
    }
    return values[queries.findIndex((q) => matchMedia(q).matches)] || defaultValue;
  }, [defaultValue, queries, values]);
  const [value, set] = React.useState(match);
  React.useEffect(() => {
    const handler = _debounce(() => set(match), 150);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [match]);
  return value;
}

// src/utilities/size.ts
var u = (amount) => amount && `calc(${amount} * var(--lns-unit, ${unit}px))`;
var getSizeValue = (size) => {
  if (size in spaces) {
    return `var(--lns-space-${size})`;
  }
  if (size && isNaN(size)) {
    return `${size}`;
  }
  if (size === 0) {
    return `0`;
  }
  if (size) {
    return `${u(size)}`;
  }
};
var getSize = (property, size) => {
  if (size || size === 0) {
    if (Array.isArray(size)) {
      const rulesetsArray = size.map((sizeItem) => {
        return `${property}: ${getSizeValue(sizeItem)}`;
      });
      return arrayToBreakpoints(rulesetsArray);
    }
    if (typeof size === "object") {
      const sizeValesObject = {};
      Object.entries(size).forEach(
        ([key, value]) => sizeValesObject[key] = getSizeValue(value)
      );
      return objectToBreakpoints(property, sizeValesObject);
    }
    return `${property}: ${getSizeValue(size)};`;
  }
};

// src/utilities/responsive.ts
var getMediaCss = (widthType, breakpoint, declaration) => `@media(${widthType}: ${breakpoint}){${declaration}}`;
var arrayToBreakpoints = (values) => {
  const smallestBreakpoint = Object.values(breakpoints)[0];
  const maxWithRulesets = getMediaCss(
    "max-width",
    smallestBreakpoint,
    values[0]
  );
  const minWithRulesets = values.reduce((rulesets, value, index) => {
    const breakpoint = `${Object.values(breakpoints)[index]}`;
    return rulesets + getMediaCss("min-width", breakpoint, value);
  }, "");
  return maxWithRulesets + minWithRulesets;
};
var objectToBreakpoints = (property, obj) => {
  const result = [];
  obj["default"] && result.push(`${property}: ${obj["default"]};`);
  delete obj.default;
  Object.entries(obj).forEach(([key, value]) => {
    const breakpoint = key in breakpoints ? breakpoints[key] : key;
    result.push(`@media(min-width: ${breakpoint}){ ${property}: ${value} }`);
  });
  return result.join(" ");
};
var getResponsiveOneOf = (property, valueArray) => {
  if (Array.isArray(valueArray)) {
    const oneOfValuesArray = valueArray.map((valueArrayItem) => {
      return `${property}: ${valueArrayItem};`;
    });
    return arrayToBreakpoints(oneOfValuesArray);
  }
  if (typeof valueArray === "object") {
    return objectToBreakpoints(property, valueArray);
  }
  return `${property}: ${valueArray};`;
};
var getAlignmentStyles = (prop, alignments4) => {
  if (prop) {
    if (Array.isArray(prop)) {
      const alignItemsArray = [];
      prop.map((propItem) => {
        alignItemsArray.push(alignments4[propItem]);
      });
      return getResponsiveOneOf("align-items", alignItemsArray);
    }
    return `align-items ${alignments4[prop]};`;
  }
};
var getResponsiveBoolean = (property, valueArray, booleanValue) => {
  if (Array.isArray(booleanValue)) {
    const booleanValuesArray = booleanValue.map((booleanItem) => {
      const value = booleanItem === true ? valueArray[0] : valueArray[1];
      return `${property}: ${value};`;
    });
    return arrayToBreakpoints(booleanValuesArray);
  }
  return `${property}: ${valueArray[0]};`;
};
var getResponsiveNumber = (property, number) => {
  if (number || number === 0) {
    if (Array.isArray(number)) {
      const rulesetsArray = number.map((numberItem) => {
        return `${property}: ${numberItem}`;
      });
      return arrayToBreakpoints(rulesetsArray);
    }
    if (typeof number === "object" && !Array.isArray(number)) {
      return objectToBreakpoints(property, number);
    }
    return `${property}: ${number};`;
  }
};
var transformColumns = (columns) => {
  if (Array.isArray(columns)) {
    return columns.map((column) => getSizeValue(column)).join(" ");
  }
  return columns;
};
var getResponsiveColumns = (columns) => {
  if (columns) {
    if (typeof columns === "object" && !Array.isArray(columns)) {
      const columnsValuesObject = {};
      Object.entries(columns).forEach(
        ([key, value]) => columnsValuesObject[key] = transformColumns(value)
      );
      return objectToBreakpoints("grid-template-columns", columnsValuesObject);
    }
    return `grid-template-columns: ${transformColumns(columns)};`;
  }
};
var getResponsiveGridSections = (gridSections, sectionType) => {
  if (gridSections) {
    if (typeof gridSections === "object" && !Array.isArray(gridSections)) {
      const gridSectionsValesObject = {};
      Object.entries(gridSections).forEach(
        ([key, value]) => gridSectionsValesObject[key] = transformColumns(value)
      );
      return objectToBreakpoints(
        `grid-template-${sectionType}`,
        gridSectionsValesObject
      );
    }
    return `grid-template-${sectionType}: ${transformColumns(gridSections)};`;
  }
};
var Media = ({ children, queries, values, defaultValue }) => {
  const value = useMedia(queries, values, defaultValue);
  return children(value);
};

// src/utilities/styles.js
var getTextSize = (size) => size && `
  font-size: var(--lns-fontSize-${size});
  line-height: var(--lns-lineHeight-${size});
  letter-spacing: var(--lns-letterSpacing-${size});
`;
var getRadius = (size) => size && `border-radius: var(--lns-radius-${size});`;
var getFontWeight = (fontWeight) => fontWeight && `font-weight: var(--lns-fontWeight-${fontWeight});`;
var getShadow = (size) => size && `box-shadow: var(--lns-shadow-${size});`;
var getFocusRing = (color, position) => {
  const focusColor = color ? color : getColorValue("focusRing");
  return `box-shadow:${position ? position : ""} 0 0 0 2px ${focusColor};`;
};
var getOffsetFocusRing = (color) => {
  const focusColor = color ? color : getColorValue("focusRing");
  return `
  outline: 2px solid ${focusColor};
  outline-offset: 1px;
  `;
};
var getListContainer = (tag) => {
  if (tag === "ol" || tag === "ul") {
    return `
      list-style-type: none;
      margin: 0;
      padding: 0
      `;
  }
};
var getPlacement = (maxHeight, placement) => {
  const placementStyles = {
    center: {
      bottom: 0,
      top: `calc((100vh - ${maxHeight}) / 2)`,
      position: "relative"
    },
    bottom: {
      bottom: 0,
      top: "unset",
      position: "absolute"
    },
    undefined: {
      bottom: void 0,
      top: "15vh",
      position: "relative"
    }
  };
  return placementStyles[placement];
};

// src/utilities/case.ts
var pascalCaseToKebabCase = (string) => {
  return string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase();
};

// src/variables.ts
var unit = 8;
var textSizes = {
  small: {
    fontSize: 1.5,
    lineHeight: 1.5,
    letterSpacing: "normal"
  },
  "body-sm": {
    fontSize: 1.5,
    lineHeight: 1.5,
    letterSpacing: "normal"
  },
  medium: {
    fontSize: 1.75,
    lineHeight: 1.57,
    letterSpacing: "normal"
  },
  "body-md": {
    fontSize: 1.75,
    lineHeight: 1.57,
    letterSpacing: "normal"
  },
  large: {
    fontSize: 2.25,
    lineHeight: 1.44,
    letterSpacing: "-0.2px"
  },
  "body-lg": {
    fontSize: 2.25,
    lineHeight: 1.44,
    letterSpacing: "-0.2px"
  },
  xlarge: {
    fontSize: 3,
    lineHeight: 1.16,
    letterSpacing: "-0.2px"
  },
  "heading-sm": {
    fontSize: 3,
    lineHeight: 1.16,
    letterSpacing: "-0.2px"
  },
  xxlarge: {
    fontSize: 4,
    lineHeight: 1.125,
    letterSpacing: "-0.5px"
  },
  "heading-md": {
    fontSize: 4,
    lineHeight: 1.125,
    letterSpacing: "-0.5px"
  },
  xxxlarge: {
    fontSize: 6,
    lineHeight: 1.16,
    letterSpacing: "-1.2px"
  },
  "heading-lg": {
    fontSize: 6,
    lineHeight: 1.16,
    letterSpacing: "-1.2px"
  }
};
var fontWeights = {
  book: 400,
  regular: 400,
  medium: 500,
  bold: 653
};
var radii = {
  none: u(0),
  50: u(0.5),
  100: u(1),
  medium: u(1),
  150: u(1.5),
  175: u(1.75),
  200: u(2),
  large: u(2),
  250: u(2.5),
  300: u(3),
  xlarge: u(3),
  round: u(999),
  full: u(999)
};
var shadows = {
  small: `0 ${u(0.5)} ${u(1.25)} hsla(0, 0%, 0%, 0.05)`,
  medium: `0 ${u(0.5)} ${u(1.25)} hsla(0, 0%, 0%, 0.1)`,
  large: `0 ${u(0.75)} ${u(3)} hsla(0, 0%, 0%, 0.1)`
};
var spaces = {
  xsmall: 0.5,
  small: 1,
  medium: 2,
  large: 3,
  xlarge: 5,
  xxlarge: 8
};
var breakpoints = {
  xsmall: "31em",
  small: "48em",
  medium: "64em",
  large: "75em"
};
var gradients = {
  "ai-primary": "radial-gradient(134.96% 884.49% at 119.29% 112.58%, #DC43BE 0%, #565ADD 70%)",
  "ai-secondary": "radial-gradient(100% 138.41% at 100% 100%, #EFF0FF 0%, #FFFFFF 100%)"
};

// src/components/text/text.tsx
import styled from "@emotion/styled";
import React2 from "react";

// src/console-messages.js
var textIsDimmedDeprecated = `Lens: Text prop 'isDimmed' is deprecated, use color="bodyDimmed" instead.`;
var customStylesWarning = `Lens: don't apply custom styles to components, learn more: https://lens.loom.dev/guides/development-best-practices/the-risk-of-modifying-components-with-custom-styles.`;
var distributeDeprecatedWarning = `Lens: Distribute component is deprecated. Use Arrange or Split.`;
var layoutDeprecatedWarning = `Lens: Layout component is deprecated. Use Arrange or Split.`;

// src/components/text/text.tsx
var dimAmount = 0.6;
var variants = {
  body: {
    size: "body-md",
    fontWeight: "regular"
  },
  title: {
    size: "body-lg",
    fontWeight: "bold"
  },
  mainTitle: {
    size: "heading-md",
    fontWeight: "bold"
  }
};
var getTextPxSize = (size) => textSizes[size].fontSize * unit;
var getTextUnitSize = (size) => u(textSizes[size].fontSize);
var lineHeightToPx = (size) => textSizes[size].fontSize * textSizes[size].lineHeight * unit;
var clampBuilder = (minSize, maxSize, minWindow, maxWindow) => {
  const slope = (maxSize - minSize) / (maxWindow - minWindow);
  const yAxisIntersection = -minWindow * slope + minSize;
  return `${yAxisIntersection}px + ${slope * 100}vw`;
};
var TextWrapper = styled.span`
  display: ${(props) => props.isInline ? "inline" : "block"};
  ${(props) => !props.sizeMinMax && getTextSize(props.size)};
  ${(props) => getFontWeight(props.fontWeight)};
  ${(props) => props.color && `color: ${getColorValue(props.color)}`};
  ${(props) => props.isDimmed && `opacity: ${dimAmount}`};
  ${(props) => props.alignment && `text-align: ${props.alignment}`};
  ${(props) => props.hasEllipsis && !props.ellipsisLines && `
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `};
  ${(props) => props.hasEllipsis && props.ellipsisLines && `
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${props.ellipsisLines};
  `};
  ${(props) => !props.hasEllipsis && props.noWrap && "white-space: nowrap; overflow: hidden;"};
  ${(props) => props.sizeMinMax && `
    min-height: 0vw;
    font-size: clamp(
      ${getTextUnitSize(props.sizeMinMax[0])},
      ${clampBuilder(
  getTextPxSize(props.sizeMinMax[0]),
  getTextPxSize(props.sizeMinMax[1]),
  496,
  1200
)},
      ${getTextUnitSize(props.sizeMinMax[1])}
    );

    line-height: clamp(
      ${lineHeightToPx(props.sizeMinMax[0])}px,
      ${clampBuilder(
  lineHeightToPx(props.sizeMinMax[0]),
  lineHeightToPx(props.sizeMinMax[1]),
  496,
  1200
)},
      ${lineHeightToPx(props.sizeMinMax[1])}px
    );
  `}
`;
var Text = (_a) => {
  var _b = _a, {
    children,
    size = "body-md",
    color,
    isInline,
    isDimmed,
    fontWeight = "regular",
    hasEllipsis,
    ellipsisLines,
    noWrap,
    variant,
    htmlTag = "span",
    alignment,
    sizeMinMax
  } = _b, props = __objRest(_b, [
    "children",
    "size",
    "color",
    "isInline",
    "isDimmed",
    "fontWeight",
    "hasEllipsis",
    "ellipsisLines",
    "noWrap",
    "variant",
    "htmlTag",
    "alignment",
    "sizeMinMax"
  ]);
  if (isDimmed) {
    console.warn(textIsDimmedDeprecated);
  }
  if (size.includes("heading-")) {
    fontWeight = "bold";
  }
  return /* @__PURE__ */ React2.createElement(
    TextWrapper,
    __spreadValues({
      size: variant ? variants[variant].size : size,
      color,
      isInline,
      isDimmed,
      fontWeight: variant ? variants[variant].fontWeight : fontWeight,
      hasEllipsis,
      ellipsisLines,
      noWrap,
      variant,
      as: htmlTag,
      alignment,
      sizeMinMax
    }, props),
    children
  );
};
var alignments = ["left", "right", "center"];
var text_default = Text;

// src/css-utilities/rules.js
var sides = ["top", "bottom", "left", "right"];
var spacesWithZero = __spreadValues({ 0: "0" }, spaces);
var spacesWithAutoAndZero = __spreadValues({ 0: "0", auto: "auto" }, spaces);
var colorRules = colorsNames.map((colorsName) => {
  return {
    selector: "c",
    modifier: colorsName,
    declarations: [
      {
        property: "color",
        value: `var(--lns-color-${colorsName})`
      }
    ]
  };
});
var backgroundColorRules = colorsNames.map((colorsName) => {
  return {
    selector: "bgc",
    modifier: colorsName,
    declarations: [
      {
        property: "background-color",
        value: `var(--lns-color-${colorsName})`
      }
    ]
  };
});
var textSizeRules = Object.keys(textSizes).map((size) => {
  return {
    selector: "text",
    modifier: size,
    declarations: [
      {
        property: "font-size",
        value: `var(--lns-fontSize-${size})`
      },
      {
        property: "line-height",
        value: `var(--lns-lineHeight-${size})`
      },
      {
        property: "letter-spacing",
        value: `var(--lns-letterSpacing-${size})`
      },
      size.includes("heading-") || size.includes("xlarge") ? {
        property: "font-weight",
        value: "var(--lns-fontWeight-bold)"
      } : {
        property: "font-weight",
        value: "var(--lns-fontWeight-regular)"
      }
    ]
  };
});
var fontWeightRules = Object.keys(fontWeights).map((fontWeight) => {
  return {
    selector: "weight",
    modifier: fontWeight,
    declarations: [
      {
        property: "font-weight",
        value: `var(--lns-fontWeight-${fontWeight})`
      }
    ]
  };
});
var textVariantRules = Object.entries(variants).map(([key, value]) => {
  return {
    selector: "text",
    modifier: key,
    declarations: [
      {
        property: "font-size",
        value: `var(--lns-fontSize-${value.size})`
      },
      {
        property: "line-height",
        value: `var(--lns-lineHeight-${value.size})`
      },
      {
        property: "font-weight",
        value: `var(--lns-fontWeight-${value.fontWeight})`
      }
    ]
  };
});
var textAlignmentRules = alignments.map((alignment) => {
  return {
    selector: "text",
    modifier: alignment,
    declarations: [
      {
        property: "text-align",
        value: alignment
      }
    ]
  };
});
var shadowRules = Object.keys(shadows).map((shadow) => {
  return {
    selector: "shadow",
    modifier: shadow,
    declarations: [
      {
        property: "box-shadow",
        value: `var(--lns-shadow-${shadow})`
      }
    ]
  };
});
var radiiRules = Object.keys(radii).map((radius) => {
  return {
    selector: "radius",
    modifier: radius,
    declarations: [
      {
        property: "border-radius",
        value: `var(--lns-radius-${radius})`
      }
    ]
  };
});
var getSpacingSelectors = (property, sides2, spaces2, shortSides) => {
  const result = [];
  sides2.map((side) => {
    const sideString = shortSides ? `${property.charAt(0)}${side.charAt(0)}` : side;
    Object.keys(spaces2).map((space) => {
      result.push({
        selector: sideString,
        property: `${property}${side && property ? `-${side}` : side ? side : ""}`,
        modifier: space,
        value: space === "auto" || space === "0" ? space : `var(--lns-space-${space})`
      });
    });
  });
  return result;
};
var marginRules = Object.values(
  getSpacingSelectors(
    "margin",
    ["", ...sides],
    spacesWithAutoAndZero,
    "shortSides"
  )
).map((spaceSelector) => {
  return {
    selector: spaceSelector.selector,
    modifier: spaceSelector.modifier,
    declarations: [
      {
        property: spaceSelector.property,
        value: spaceSelector.value
      }
    ]
  };
});
var marginCrossRules = Object.values(
  getSpacingSelectors("margin", ["x", "y"], spacesWithAutoAndZero, "shortSides")
).map((spaceSelector) => {
  return {
    selector: spaceSelector.selector,
    modifier: spaceSelector.modifier,
    declarations: [
      {
        property: spaceSelector.property === "margin-x" ? "margin-left" : "margin-top",
        value: spaceSelector.value
      },
      {
        property: spaceSelector.property === "margin-x" ? "margin-right" : "margin-bottom",
        value: spaceSelector.value
      }
    ]
  };
});
var paddingRules = Object.values(
  getSpacingSelectors("padding", ["", ...sides], spacesWithZero, "shortSides")
).map((spaceSelector) => {
  return {
    selector: spaceSelector.selector,
    modifier: spaceSelector.modifier,
    declarations: [
      {
        property: spaceSelector.property,
        value: spaceSelector.value
      }
    ]
  };
});
var paddingCrossRules = Object.values(
  getSpacingSelectors("padding", ["x", "y"], spacesWithZero, "shortSides")
).map((spaceSelector) => {
  return {
    selector: spaceSelector.selector,
    modifier: spaceSelector.modifier,
    declarations: [
      {
        property: spaceSelector.property === "padding-x" ? "padding-left" : "padding-top",
        value: spaceSelector.value
      },
      {
        property: spaceSelector.property === "padding-x" ? "padding-right" : "padding-bottom",
        value: spaceSelector.value
      }
    ]
  };
});
var borderRules = ["", ...sides].map((side) => {
  const selector = "border" + side.replace(side.charAt(0), side.charAt(0).toUpperCase());
  const property = `border${side && `-${side}`}`;
  return {
    selector,
    declarations: [
      {
        property,
        value: `1px solid var(--lns-color-border)`
      }
    ]
  };
});
var displayOptions = [
  "inline",
  "block",
  "flex",
  "inlineBlock",
  "inlineFlex",
  "none"
];
var displayRules = displayOptions.map((displayOption) => {
  return {
    selector: displayOption,
    declarations: [
      {
        property: "display",
        value: pascalCaseToKebabCase(displayOption)
      }
    ]
  };
});
var flexWrapRules = [
  {
    selector: "flexWrap",
    declarations: [
      {
        property: "flex-wrap",
        value: "wrap"
      }
    ]
  }
];
var flexDirections = ["column", "row"];
var flexDirectionRules = flexDirections.map((flexDirection) => {
  return {
    selector: "flexDirection",
    modifier: flexDirection,
    declarations: [
      {
        property: "flex-direction",
        value: flexDirection
      }
    ]
  };
});
var flexItemOptions = [
  "stretch",
  "center",
  "baseline",
  "flexStart",
  "flexEnd",
  "selfStart",
  "selfEnd"
];
var flexItemRules = flexItemOptions.map((flexItemOption) => {
  return {
    selector: "items",
    modifier: flexItemOption,
    declarations: [
      {
        property: "align-items",
        value: pascalCaseToKebabCase(flexItemOption)
      }
    ]
  };
});
var justifyContentOptions = [
  "flexStart",
  "flexEnd",
  "center",
  "spaceBetween",
  "spaceAround",
  "spaceEvenly"
];
var JustifyContentRules = justifyContentOptions.map(
  (justifyContentOption) => {
    return {
      selector: "justify",
      modifier: justifyContentOption,
      declarations: [
        {
          property: "justify-content",
          value: pascalCaseToKebabCase(justifyContentOption)
        }
      ]
    };
  }
);
var growOptions = ["0", "1"];
var growRules = growOptions.map((growOption) => {
  return {
    selector: "grow",
    modifier: growOption,
    declarations: [
      {
        property: "flex-grow",
        value: growOption
      }
    ]
  };
});
var shrinkOptions = ["0", "1"];
var shrinkRules = shrinkOptions.map((shrinkOption) => {
  return {
    selector: "shrink",
    modifier: shrinkOption,
    declarations: [
      {
        property: "flex-shrink",
        value: shrinkOption
      }
    ]
  };
});
var alignSelfOptions = [
  "auto",
  "flexStart",
  "flexEnd",
  "center",
  "baseline",
  "stretch"
];
var alignSelfRules = alignSelfOptions.map((alignSelfOption) => {
  return {
    selector: "self",
    modifier: alignSelfOption,
    declarations: [
      {
        property: "align-self",
        value: pascalCaseToKebabCase(alignSelfOption)
      }
    ]
  };
});
var overflowOptions = ["hidden", "auto"];
var overflowRules = overflowOptions.map((overflowOption) => {
  return {
    selector: "overflow",
    modifier: overflowOption,
    declarations: [
      {
        property: "overflow",
        value: overflowOption
      }
    ]
  };
});
var positionOptions = ["relative", "absolute", "sticky", "fixed"];
var positionRules = positionOptions.map((positionOption) => {
  return {
    selector: positionOption,
    declarations: [
      {
        property: "position",
        value: positionOption
      }
    ]
  };
});
var sidePositionRules = Object.values(
  getSpacingSelectors("", sides, spacesWithAutoAndZero)
).map((spaceSelector) => {
  return {
    selector: spaceSelector.selector,
    modifier: spaceSelector.modifier,
    declarations: [
      {
        property: spaceSelector.property,
        value: spaceSelector.value
      }
    ]
  };
});
var widthOptions = ["auto", "full", "0"];
var widthRules = widthOptions.map((widthOption) => {
  return {
    selector: "width",
    modifier: widthOption,
    declarations: [
      {
        property: "width",
        value: widthOption === "full" ? "100%" : widthOption
      }
    ]
  };
});
var minWidthRules = [
  {
    selector: "minWidth",
    modifier: "0",
    declarations: [
      {
        property: "min-width",
        value: "0"
      }
    ]
  }
];
var heightOptions = ["auto", "full", "0"];
var heightRules = heightOptions.map((heightOption) => {
  return {
    selector: "height",
    modifier: heightOption,
    declarations: [
      {
        property: "height",
        value: heightOption === "full" ? "100%" : heightOption
      }
    ]
  };
});
var ellipsisRules = [
  {
    selector: "ellipsis",
    declarations: [
      {
        property: "overflow",
        value: "hidden"
      },
      {
        property: "text-overflow",
        value: "ellipsis"
      },
      {
        property: "white-space",
        value: "nowrap"
      }
    ]
  }
];
var accessibilityRules = [
  {
    selector: "srOnly",
    declarations: [
      { property: "position", value: "absolute" },
      { property: "width", value: "1px" },
      { property: "height", value: "1px" },
      { property: "padding", value: "0" },
      { property: "margin", value: "-1px" },
      { property: "overflow", value: "hidden" },
      { property: "clip", value: "rect(0, 0, 0, 0)" },
      { property: "white-space", value: "nowrap" },
      { property: "border-width", value: "0" }
    ]
  }
];

// src/css-utilities/generate-utilities.js
var separator = "\\:";
var allRules = [
  ...colorRules,
  ...shadowRules,
  ...radiiRules,
  ...backgroundColorRules,
  ...marginRules,
  ...marginCrossRules,
  ...paddingRules,
  ...paddingCrossRules,
  ...textSizeRules,
  ...fontWeightRules,
  ...textVariantRules,
  ...textAlignmentRules,
  ...borderRules,
  ...displayRules,
  ...flexWrapRules,
  ...flexDirectionRules,
  ...flexItemRules,
  ...JustifyContentRules,
  ...growRules,
  ...shrinkRules,
  ...alignSelfRules,
  ...overflowRules,
  ...positionRules,
  ...sidePositionRules,
  ...widthRules,
  ...minWidthRules,
  ...heightRules,
  ...ellipsisRules,
  ...accessibilityRules
];
var objectToRuleset = (rules, prefix) => {
  const result = [];
  const prefixString = prefix ? `${prefix}-` : "";
  rules.map((rule) => {
    const declarations = [];
    rule.declarations.map((declaration) => {
      declarations.push(`${declaration.property}:${declaration.value}`);
    });
    const string = `.${prefixString}${rule.selector}${rule.modifier ? separator : ""}${rule.modifier ? rule.modifier : ""}{${declarations.join(";")}}`;
    result.push(string);
  });
  return result.join("");
};
var shortBreakpoints = {
  xs: breakpoints.xsmall,
  sm: breakpoints.small,
  md: breakpoints.medium,
  lg: breakpoints.large
};
var cssUtilities = () => {
  const getRulesetsInMedia = () => {
    const result = [];
    result.push(`${objectToRuleset(allRules)}`);
    Object.entries(shortBreakpoints).map(([key, value]) => {
      result.push(
        `@media(min-width:${value}){${objectToRuleset(allRules, key)}}`
      );
    });
    return result.join("");
  };
  return getRulesetsInMedia();
};

// src/css-variables/index.ts
var getCssVarsFromObject = (prefix, varsObject) => {
  const resultObj = {};
  Object.entries(varsObject).forEach(([varName, varValue]) => {
    const namePrefix = prefix ? `${prefix}-` : "";
    const value = `--lns-${namePrefix + varName}`;
    resultObj[value] = varValue;
  });
  return resultObj;
};
var getTextSizesObject = () => {
  const resultObj = {};
  Object.entries(textSizes).forEach(([textSizeKey, textSizeValue]) => {
    const fontSizesObj = {};
    const lineHeightsObj = {};
    const letterSpacingObj = {};
    const fontSizeValue = `fontSize-${textSizeKey}`;
    const lineHeightValue = `lineHeight-${textSizeKey}`;
    const letterSpacingValue = `letterSpacing-${textSizeKey}`;
    fontSizesObj[fontSizeValue] = u(textSizeValue.fontSize);
    fontSizesObj[lineHeightValue] = textSizeValue.lineHeight;
    fontSizesObj[letterSpacingValue] = textSizeValue.letterSpacing;
    Object.assign(resultObj, fontSizesObj, lineHeightsObj, letterSpacingObj);
  });
  return resultObj;
};
var getSpacesObject = () => {
  const resultObj = {};
  Object.entries(spaces).forEach(([spaceName, spaceValue]) => {
    const value = `space-${spaceName}`;
    resultObj[value] = u(spaceValue);
  });
  return resultObj;
};
var getColorsObject = () => {
  const colorsObject = {};
  Object.keys(__spreadValues(__spreadValues({}, hslaBaseColors), hslaGreys)).forEach((name) => {
    const value = name;
    colorsObject[value] = `hsla(${hslaColors[name].h},${hslaColors[name].s}%,${hslaColors[name].l}%,${hslaColors[name].a})`;
  });
  return colorsObject;
};
var getThemeColorsObject = () => {
  const reducer = (colors, prefix) => Object.keys(colors).reduce((accumulator, name) => {
    const color = colors[name];
    const value = `${prefix}-color-${name}`;
    accumulator[value] = color.ads ? `var(${color.ads}, hsla(${color.h},${color.s}%,${color.l}%,${color.a}))` : `hsla(${color.h},${color.s}%,${color.l}%,${color.a})`;
    return accumulator;
  }, {});
  return __spreadValues(__spreadValues({}, reducer(themeColors.light, "themeLight")), reducer(themeColors.dark, "themeDark"));
};
var unitVariables = getCssVarsFromObject(void 0, {
  unit: `${unit / 16}rem`
});
var fontWeightVariables = getCssVarsFromObject(
  "fontWeight",
  fontWeights
);
var textSizeVariables = getCssVarsFromObject(
  void 0,
  getTextSizesObject()
);
var radiusVariables = getCssVarsFromObject("radius", radii);
var shadowVariables = getCssVarsFromObject("shadow", shadows);
var spaceVariables = getCssVarsFromObject(
  void 0,
  getSpacesObject()
);
var formFieldVariables = getCssVarsFromObject(void 0, {
  formFieldBorderWidth: "1px",
  formFieldBorderWidthFocus: "2px",
  formFieldHeight: u(4.5),
  formFieldRadius: "var(--lns-radius-175)",
  formFieldHorizontalPadding: u(2),
  formFieldBorderShadow: `
    inset 0 0 0 var(--lns-formFieldBorderWidth) var(--lns-color-formFieldBorder)
  `,
  formFieldBorderShadowFocus: `
    inset 0 0 0 var(--lns-formFieldBorderWidthFocus) var(--lns-color-blurple),
    0 0 0 var(--lns-formFieldBorderWidthFocus) var(--lns-color-focusRing)
  `,
  formFieldBorderShadowError: `
    inset 0 0 0 var(--lns-formFieldBorderWidthFocus) var(--lns-color-danger),
    0 0 0 var(--lns-formFieldBorderWidthFocus) var(--lns-color-orangeLight)
  `
});
var colorVariables = getCssVarsFromObject("color", getColorsObject());
var themeColorVariables = getCssVarsFromObject(
  void 0,
  getThemeColorsObject()
);
var gradientVariables = getCssVarsFromObject("gradient", gradients);
var sizingVariables = [
  unitVariables,
  textSizeVariables,
  radiusVariables,
  shadowVariables,
  spaceVariables,
  formFieldVariables
];
var getSizingVariablesCssVarsObject = () => {
  return Object.assign({}, ...sizingVariables);
};
var getVariablesCssVarsObject = () => {
  return Object.assign({}, fontWeightVariables, ...sizingVariables);
};
var getColorsCssVarsObject = () => {
  return __spreadValues(__spreadValues(__spreadValues({}, colorVariables), themeColorVariables), gradientVariables);
};
var assignLightThemeColors = () => {
  return Object.keys(themeColors.light).map(
    (color) => `--lns-color-${color}: var(--lns-themeLight-color-${color});`
  );
};
var assignDarkThemeColors = () => {
  return Object.keys(themeColors.dark).map(
    (color) => `--lns-color-${color}: var(--lns-themeDark-color-${color});`
  );
};
var getThemeStylesString = (customRootElement = ":root") => {
  const rootElement = customRootElement || ":root";
  return `
    ${rootElement},
    .theme-light,
    [data-lens-theme="light"] {
      ${assignLightThemeColors().join("")}
    }

    .theme-dark,
    [data-lens-theme="dark"] {
      ${assignDarkThemeColors().join("")}
    }
  `;
};
var getThemeStyles = () => {
  const style = document.createElement("style");
  style.innerHTML = getThemeStylesString();
  document.head.appendChild(style);
};
var getSizingCssVarsDeclarations = () => {
  const result = Object.entries(getSizingVariablesCssVarsObject()).map(
    (cssVar) => `${cssVar[0]}:${cssVar[1]};`
  );
  return result.join("");
};
var getAllCssVarsString = (customRootElement) => {
  const result = [];
  const rootElement = customRootElement || ":root";
  Object.entries(getVariablesCssVarsObject()).forEach((cssVar) => {
    result.push(`${cssVar[0]}:${cssVar[1]};`);
  });
  Object.entries(getColorsCssVarsObject()).forEach((cssVar) => {
    result.push(`${cssVar[0]}:${cssVar[1]};`);
  });
  return `
    ${rootElement} {
      ${result.join("")}
    }
  `;
};

// src/components/avatar/avatar.tsx
import styled2 from "@emotion/styled";
import React3 from "react";
var getColorMapping = (color) => {
  switch (color) {
    case "orange":
      return {
        background: "orangeLight",
        text: "dangerHover"
      };
    case "blue":
      return {
        background: "blueLight",
        text: "blueDark"
      };
    case "yellow":
      return {
        background: "yellowLight",
        text: "#9E4C00"
      };
    case "teal":
      return {
        background: "tealLight",
        text: "tealDark"
      };
    default:
      return {
        background: "orangeLight",
        text: "dangerHover"
      };
  }
};
var getLetterSize = (wrapperSize) => `calc(${wrapperSize} / 2)`;
var getAvatarSize = (avatarSize) => {
  let width;
  let height;
  if (avatarSize === "medium") {
    width = u(4);
    height = u(4);
  } else if (avatarSize === "large") {
    width = u(7);
    height = u(7);
  } else {
    const sizeValue = getSizeValue(avatarSize);
    width = sizeValue;
    height = sizeValue;
  }
  const fontSize = getLetterSize(width);
  return {
    width,
    height,
    fontSize
  };
};
var AvatarWrapper = styled2.span`
  display: block;
  color: ${(props) => props.color ? props.color.startsWith("#") ? props.color : `var(--lns-color-${props.color})` : "var(--lns-color-blueLight)"};
  background-color: var(--lns-color-background);
  ${getRadius("full")};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  font-weight: var(--lns-fontWeight-bold);
  width: ${(props) => {
  const { width } = getAvatarSize(props.size);
  return width;
}};
  height: ${(props) => {
  const { height } = getAvatarSize(props.size);
  return height;
}};
  font-size: ${(props) => {
  const { fontSize } = getAvatarSize(props.size);
  return fontSize;
}};
  position: relative;
  z-index: 0;

  &:after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    background-color: ${(props) => props.hasBackgroundColor && (props.backgroundColor ? `var(--lns-color-${props.backgroundColor})` : "var(--lns-color-orange)")};
  }
`;
var AvatarImage = styled2.img`
  max-width: 100%;
  width: ${(props) => {
  const { width } = getAvatarSize(props.size);
  return width;
}};
  height: ${(props) => {
  const { height } = getAvatarSize(props.size);
  return height;
}};
  font-size: ${(props) => {
  const { fontSize } = getAvatarSize(props.size);
  return fontSize;
}};
`;
var Avatar = (_a) => {
  var _b = _a, {
    altText = "",
    size = 4,
    letter,
    imageSrc,
    children,
    themeColor = "blue"
  } = _b, props = __objRest(_b, [
    "altText",
    "size",
    "letter",
    "imageSrc",
    "children",
    "themeColor"
  ]);
  const getContent = () => {
    if (children) {
      return children;
    }
    if (imageSrc) {
      const height = getAvatarSize(size).height;
      const width = getAvatarSize(size).width;
      return /* @__PURE__ */ React3.createElement(
        AvatarImage,
        {
          size,
          alt: altText,
          src: imageSrc,
          height,
          width
        }
      );
    }
    if (letter) {
      if (altText) {
        return /* @__PURE__ */ React3.createElement("span", { "aria-label": altText }, letter);
      }
      return letter;
    }
  };
  const hasBackgroundColor = letter && !imageSrc && !children;
  const colorMapping = getColorMapping(themeColor || "blue");
  return /* @__PURE__ */ React3.createElement(
    AvatarWrapper,
    __spreadValues({
      hasBackgroundColor,
      size,
      backgroundColor: colorMapping.background,
      color: colorMapping.text
    }, props),
    getContent()
  );
};
var avatar_default = Avatar;

// src/components/base-styles/base-styles.tsx
import { Global, css } from "@emotion/react";
import React4 from "react";
var buildGlobalStylesheet = (rootElement = ":root", bodyElement = "body") => {
  return `
    ${rootElement} {
      font-size: 100%;
    }
    ${bodyElement} {
      --lns-fontFamily-body: "Atlassian Sans", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Ubuntu, system-ui, "Helvetica Neue", sans-serif;
      --lns-fontFamily-heading: "Atlassian Sans", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Ubuntu, system-ui, "Helvetica Neue", sans-serif;
      --lns-fontFamily-code: "Atlassian Mono", ui-monospace, Menlo, "Segoe UI Mono", "Ubuntu Mono", monospace;

      font-family: var(--lns-fontFamily-body);
      color: var(--ds-text, ${getColorValue("body")});
      ${getTextSize("body-md")};
    }

    ${bodyElement} *,
    ${bodyElement} *:before,
    ${bodyElement} *:after {
      box-sizing: border-box;
    }

    ${bodyElement} * {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    ${getThemeStylesString(rootElement)}

    ${getAllCssVarsString(rootElement)}

    ${cssUtilities()}
  `;
};
var BaseStyles = () => /* @__PURE__ */ React4.createElement(Global, { styles: css(buildGlobalStylesheet()) });
var base_styles_default = BaseStyles;

// src/components/button/button.tsx
import { css as css2 } from "@emotion/react";
import styled5 from "@emotion/styled";
import React7, { useCallback } from "react";
import traceUFOPress from "@atlaskit/react-ufo/trace-press";

// src/components/icon/icon.tsx
import styled3 from "@emotion/styled";
import React5 from "react";
var defaultIconSize = 3;
var IconWrapper = styled3.span`
  display: block;
  color: ${(props) => getColorValue(props.color)};

  & > svg,
  & > img {
    display: block;
    ${(props) => getSize("width", props.size)};
    ${(props) => getSize("height", props.size)};
  }

  // TODO: remove data-testid once all icons are using ADS
  [data-testid='ads-refreshed-icon'] {
    display: block;
    ${(props) => getSize("width", props.size)};
    ${(props) => getSize("height", props.size)};

    svg {
      padding: 8%;
      height: 100%;
      width: 100%;
    }
  }
`;
var Icon = (_a) => {
  var _b = _a, {
    altText,
    icon,
    color = "body",
    size = defaultIconSize
  } = _b, props = __objRest(_b, [
    "altText",
    "icon",
    "color",
    "size"
  ]);
  const ref = React5.useRef(null);
  return /* @__PURE__ */ React5.createElement(
    IconWrapper,
    __spreadValues({
      ref,
      "aria-label": altText,
      color,
      size
    }, props),
    icon
  );
};
var icon_default = Icon;

// src/components/loader/loader.tsx
import { keyframes } from "@emotion/react";
import styled4 from "@emotion/styled";
import React6 from "react";
var speed = 1;
var dotsAmount = 8;
var sizes = {
  small: {
    totalSize: 18
  },
  medium: {
    totalSize: 24
  },
  large: {
    totalSize: 48
  }
};
var getDotSize = (props) => {
  return sizes[props.size].totalSize / 6;
};
var getTotalSize = (props) => {
  return sizes[props.size].totalSize;
};
var dotScale = keyframes`
  50% {
    transform: scale(1);
  }
`;
var LoaderWrapper = styled4.span`
  display: inline-block;
  vertical-align: middle;
  height: ${(props) => getTotalSize(props)}px;
  width: ${(props) => getTotalSize(props)}px;
`;
var Dots = styled4.span`
  display: grid;
  grid-template-areas: 'stack';
  height: 100%;
  width: 100%;
`;
var DotWrapper = styled4.span`
  grid-area: stack;
  place-self: center;
  transform: rotate(${(props) => props.position * (360 / dotsAmount)}deg)
    translateY(${(props) => getTotalSize(props) / 2 - getDotSize(props) / 2}px);

  &:after {
    content: '';
    height: ${(props) => getDotSize(props)}px;
    width: ${(props) => getDotSize(props)}px;
    border-radius: ${(props) => getDotSize(props)}px;
    background-color: ${(props) => getColorValue(props.color)};
    display: block;
    transform: scale(0.65);
    animation: ${dotScale} ${speed}s
      ${(props) => props.position * speed / dotsAmount}s ease-in-out infinite;
  }
`;
var Dot = ({ position, color, size }) => /* @__PURE__ */ React6.createElement(DotWrapper, { color, position, size });
var Loader = (_a) => {
  var _b = _a, {
    color = "body",
    size = "medium"
  } = _b, props = __objRest(_b, [
    "color",
    "size"
  ]);
  let i;
  const dotsList = [];
  for (i = 0; i < dotsAmount; i++) {
    dotsList.push(/* @__PURE__ */ React6.createElement(Dot, { color, position: i, size, key: i }));
  }
  return /* @__PURE__ */ React6.createElement(LoaderWrapper, __spreadValues({ size }, props), /* @__PURE__ */ React6.createElement(Dots, null, dotsList));
};
var availableSizes = Object.keys(sizes);
var loader_default = Loader;

// src/components/button/button.tsx
var sizesStyles = {
  small: {
    height: u(4),
    textSize: "small",
    iconSize: 2,
    xSpace: u(1.5),
    radius: "var(--lns-radius-150)"
  },
  medium: {
    height: u(4.5),
    textSize: "medium",
    iconSize: 3,
    xSpace: u(2),
    radius: "var(--lns-radius-175)"
  },
  large: {
    height: u(7),
    textSize: "large",
    iconSize: 4,
    xSpace: u(2.5),
    radius: "var(--lns-radius-250)"
  }
};
var hasLoaderStyles = (props) => css2`
  ${props.hasLoader && `display: none`};
`;
var variantStyles = {
  neutral: {
    color: getColorValue("body"),
    background: "transparent",
    borderColor: getColorValue("buttonBorder"),
    hover: getColorValue("backgroundHover"),
    active: getColorValue("backgroundActive"),
    floatingBackground: getColorValue("overlay"),
    floatingHover: getColorValue("overlayHover"),
    floatingActive: getColorValue("overlayActive")
  },
  primary: {
    color: getColorValue("white"),
    background: getColorValue("blurple"),
    borderColor: null,
    hover: getColorValue("primaryHover"),
    active: getColorValue("primaryActive")
  },
  secondary: {
    color: getColorValue("primary"),
    background: getColorValue("highlight"),
    borderColor: null,
    hover: getColorValue("blurpleMedium"),
    active: null
  },
  record: {
    color: getColorValue("white"),
    background: getColorValue("record"),
    borderColor: null,
    hover: getColorValue("recordHover"),
    active: getColorValue("recordActive")
  },
  upgrade: {
    color: getColorValue("body"),
    background: getColorValue("upgrade"),
    borderColor: null,
    hover: getColorValue("upgradeHover"),
    active: getColorValue("upgradeActive"),
    focusRing: getFocusRing()
  },
  danger: {
    color: getColorValue("bodyInverse"),
    background: getColorValue("danger"),
    borderColor: null,
    hover: getColorValue("dangerHover"),
    active: getColorValue("dangerActive")
  },
  ai: {
    color: getColorValue("white"),
    background: "linear-gradient(135deg, #565ADD, #9F92EC, #DC43BE)",
    borderColor: null,
    hover: null,
    active: null
  }
};
var statusStyles = (props) => ({
  enabled: css2`
    cursor: pointer;
  `,
  disabled: css2`
    ${props.ariaDisabled && `aria-disabled: true`};
    pointer-events: none;
    background-color: ${getColorValue("disabledBackground")};
    color: ${getColorValue("disabledContent")};
    border: none;
  `
});
var iconGap = u(1);
var ButtonWrapper = styled5.button`
  appearance: none;
  padding: 0
    ${(props) => props.hasChildren ? sizesStyles[props.size].xSpace : 0};
  font: inherit;
  text-decoration: none;
  transition:
    0.6s background,
    0.6s border-color;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  white-space: nowrap;
  ${getFontWeight("bold")};
  border-radius: ${(props) => sizesStyles[props.size].radius};
  ${(props) => props.hasFullWidth ? "display: flex; width: 100%" : "display: inline-flex"};
  height: ${(props) => sizesStyles[props.size].height};
  height: ${(props) => sizesStyles[props.size].height};
  min-width: ${(props) => sizesStyles[props.size].height};
  ${(props) => getTextSize(sizesStyles[props.size].textSize)};
  ${(props) => props.isFloating && `box-shadow: ${shadows.medium}`};
  ${(props) => props.disabled ? statusStyles(props).disabled : statusStyles(props).enabled};
  ${(props) => !props.disabled && `
    border: ${variantStyles[props.variant].borderColor ? `1px solid ${variantStyles[props.variant].borderColor}` : "none"};
    background: ${props.isFloating && props.variant === "neutral" ? variantStyles[props.variant].floatingBackground : variantStyles[props.variant].background};
    background-position: left;
    background-size: 125%;
    color: ${variantStyles[props.variant].color};
  `};

  &:hover {
    transition:
      0.3s background,
      0.3s border-color;
    background: ${(props) => props.isFloating && props.variant === "neutral" ? variantStyles[props.variant].floatingHover : variantStyles[props.variant].hover};
    background-position: 75% center;
  }

  &:active {
    transition:
      0s background,
      0s border-color;
    background: ${(props) => props.isFloating && props.variant === "neutral" ? variantStyles[props.variant].floatingActive : variantStyles[props.variant].active};
    background-position: right;
  }

  &:focus-visible {
    ${getOffsetFocusRing()};
  }

  &::-moz-focus-inner {
    border: 0;
  }
`;
var IconSection = styled5.span`
  ${(props) => getSize("padding-left", props.paddingLeft)};
  ${(props) => getSize("padding-right", props.paddingRight)};
  ${hasLoaderStyles};
`;
var LogoImage = styled5.img`
  max-width: 1.45em;
  max-height: 1.45em;
  height: ${(props) => sizesStyles[props.size].height};
  width: ${(props) => sizesStyles[props.size].height};
  ${(props) => props.hasSpacing && `margin-right: 0.57em`};
  ${hasLoaderStyles};
`;
var LoaderSection = styled5.span`
  position: relative;
  display: flex;
  align-items: center;
`;
var ChildrenSection = styled5.span`
  ${hasLoaderStyles};
`;
var Button = (_a) => {
  var _b = _a, {
    size = "medium",
    children,
    variant = "neutral",
    hasFullWidth,
    icon,
    iconPosition = "left",
    logoSrc,
    hasLoader,
    isDisabled,
    ariaDisabled,
    htmlTag = "button",
    interactionName,
    onClick,
    refHandler
  } = _b, props = __objRest(_b, [
    "size",
    "children",
    "variant",
    "hasFullWidth",
    "icon",
    "iconPosition",
    "logoSrc",
    "hasLoader",
    "isDisabled",
    "ariaDisabled",
    "htmlTag",
    "interactionName",
    "onClick",
    "refHandler"
  ]);
  const buttonIcon = /* @__PURE__ */ React7.createElement(
    IconSection,
    {
      hasLoader,
      paddingLeft: children && iconPosition === "right" && iconGap,
      paddingRight: children && iconPosition === "left" && iconGap
    },
    /* @__PURE__ */ React7.createElement(
      icon_default,
      {
        icon,
        color: "currentColor",
        size: sizesStyles[size].iconSize
      }
    )
  );
  const onClickWithPressTracing = useCallback(
    (event) => {
      if (interactionName) {
        traceUFOPress(interactionName);
      }
      onClick == null ? void 0 : onClick(event);
    },
    [onClick, interactionName]
  );
  return /* @__PURE__ */ React7.createElement(
    ButtonWrapper,
    __spreadProps(__spreadValues({
      size,
      variant,
      hasFullWidth,
      icon,
      iconPosition,
      logoSrc,
      disabled: isDisabled,
      ariaDisabled,
      as: htmlTag,
      hasChildren: children,
      ref: (ref) => refHandler && refHandler(ref)
    }, props), {
      onClick: interactionName === void 0 ? onClick : onClickWithPressTracing
    }),
    hasLoader && /* @__PURE__ */ React7.createElement(LoaderSection, null, /* @__PURE__ */ React7.createElement(loader_default, { color: "currentColor" })),
    icon && iconPosition === "left" && buttonIcon,
    logoSrc && /* @__PURE__ */ React7.createElement(
      LogoImage,
      {
        alt: "",
        hasSpacing: Boolean(children),
        src: logoSrc,
        size,
        height: sizesStyles[size].height,
        width: sizesStyles[size].height,
        hasLoader
      }
    ),
    /* @__PURE__ */ React7.createElement(ChildrenSection, { hasLoader }, children),
    icon && iconPosition === "right" && buttonIcon
  );
};
var availableSizes2 = Object.keys(sizesStyles);
var availableVariants = Object.keys(variantStyles);
var button_default = Button;

// src/components/spacer/spacer.tsx
import styled6 from "@emotion/styled";
import React8 from "react";
var SpacerWrapper = styled6.div`
  display: ${(props) => props.isInline ? "inline-block" : "block"};
  vertical-align: middle;
  ${(props) => getSize("padding", props.all)};
  ${(props) => getSize("padding-top", props.top)};
  ${(props) => getSize("padding-right", props.right)};
  ${(props) => getSize("padding-bottom", props.bottom)};
  ${(props) => getSize("padding-left", props.left)};
`;
var Spacer = (_a) => {
  var _b = _a, {
    children,
    all,
    y,
    x,
    top,
    right,
    bottom,
    left,
    isInline
  } = _b, props = __objRest(_b, [
    "children",
    "all",
    "y",
    "x",
    "top",
    "right",
    "bottom",
    "left",
    "isInline"
  ]);
  return /* @__PURE__ */ React8.createElement(
    SpacerWrapper,
    __spreadValues({
      all,
      top: y || top,
      bottom: y || bottom,
      right: x || right,
      left: x || left,
      isInline
    }, props),
    children
  );
};
var spacer_default = Spacer;

// src/components/text-input/text-input.tsx
import styled9 from "@emotion/styled";
import React11, { forwardRef } from "react";

// src/components/align/align.tsx
import styled7 from "@emotion/styled";
import React9 from "react";
var alignmentsPlaceItems = {
  topLeft: "start",
  topCenter: "start center",
  topRight: "start end",
  centerLeft: "center start",
  center: "center",
  centerRight: "center end",
  bottomLeft: "end start",
  bottomCenter: "end center",
  bottomRight: "end"
};
var getPlaceItems = (alignment) => {
  if (Array.isArray(alignment)) {
    return alignment.map(
      (alignmentArrayItem) => alignmentsPlaceItems[alignmentArrayItem]
    );
  }
  if (typeof alignment === "object") {
    const alignmentsPlaceItemsObject = {};
    Object.entries(alignment).forEach(([key, value]) => {
      return alignmentsPlaceItemsObject[key] = alignmentsPlaceItems[value];
    });
    return alignmentsPlaceItemsObject;
  }
  return alignmentsPlaceItems[alignment];
};
var AlignWrapper = styled7.div`
  width: 100%;
  height: 100%;
  display: grid;
  ${(props) => getResponsiveOneOf("place-items", getPlaceItems(props.alignment))};
`;
var Align = (_a) => {
  var _b = _a, {
    children,
    alignment = "center",
    htmlTag = "div"
  } = _b, props = __objRest(_b, [
    "children",
    "alignment",
    "htmlTag"
  ]);
  return /* @__PURE__ */ React9.createElement(AlignWrapper, __spreadValues({ alignment, as: htmlTag }, props), children);
};
var availableAlignments = Object.keys(alignmentsPlaceItems);
var align_default = Align;

// src/components/container/container.tsx
import styled8 from "@emotion/styled";
import React10 from "react";
var getBorderSideAndColor = (side, color, width) => {
  const borderColor = color ? color : "border";
  const borderWidth = getSizeValue(width);
  const borderStyle = `${borderWidth} solid ${getColorValue(borderColor)}`;
  if (side) {
    if (side === "all") {
      return `border: ${borderStyle};`;
    }
    return `border-${side}: ${borderStyle};`;
  }
};
var ContainerWrapper = styled8.div`
  ${(props) => props.position && `position: ${props.position}`};
  ${(props) => props.overflow && `overflow: ${props.overflow}`};
  ${(props) => props.backgroundColor && `background-color: ${getColorValue(props.backgroundColor)}`};
  ${(props) => props.backgroundImage && `background-image: ${props.backgroundImage}`}
  ${(props) => props.contentColor && `color: ${getColorValue(props.contentColor)}`};
  ${(props) => getBorderSideAndColor(
  props.borderSide,
  props.borderColor,
  props.borderWidth
)};
  ${(props) => getRadius(props.radius)};
  ${(props) => getShadow(props.shadow)};
  ${(props) => getSize("width", props.width)};
  ${(props) => getSize("height", props.height)};
  ${(props) => getSize("min-width", props.minWidth)};
  ${(props) => getSize("min-height", props.minHeight)};
  ${(props) => getSize("max-width", props.maxWidth)};
  ${(props) => getSize("max-height", props.maxHeight)};
  ${(props) => getSize("padding", props.padding)};
  ${(props) => getSize("padding-top", props.paddingTop)};
  ${(props) => getSize("padding-right", props.paddingRight)};
  ${(props) => getSize("padding-bottom", props.paddingBottom)};
  ${(props) => getSize("padding-left", props.paddingLeft)};
  ${(props) => getSize("margin", props.margin)};
  ${(props) => getSize("margin-top", props.marginTop)};
  ${(props) => getSize("margin-right", props.marginRight)};
  ${(props) => getSize("margin-bottom", props.marginBottom)};
  ${(props) => getSize("margin-left", props.marginLeft)};
  ${(props) => getSize("top", props.top)};
  ${(props) => getSize("right", props.right)};
  ${(props) => getSize("bottom", props.bottom)};
  ${(props) => getSize("left", props.left)};
  ${(props) => props.zIndex && `z-index: ${props.zIndex}`};
`;
var Container = (_a) => {
  var _b = _a, {
    children,
    backgroundColor,
    backgroundImage,
    contentColor,
    borderColor,
    radius,
    borderSide,
    borderWidth = "1px",
    shadow,
    padding,
    paddingX,
    paddingY,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
    margin,
    marginX,
    marginY,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    htmlTag = "div",
    position,
    overflow,
    zIndex,
    top,
    bottom,
    left,
    right,
    refHandler
  } = _b, props = __objRest(_b, [
    "children",
    "backgroundColor",
    "backgroundImage",
    "contentColor",
    "borderColor",
    "radius",
    "borderSide",
    "borderWidth",
    "shadow",
    "padding",
    "paddingX",
    "paddingY",
    "paddingLeft",
    "paddingRight",
    "paddingTop",
    "paddingBottom",
    "margin",
    "marginX",
    "marginY",
    "marginLeft",
    "marginRight",
    "marginTop",
    "marginBottom",
    "width",
    "height",
    "minWidth",
    "minHeight",
    "maxWidth",
    "maxHeight",
    "htmlTag",
    "position",
    "overflow",
    "zIndex",
    "top",
    "bottom",
    "left",
    "right",
    "refHandler"
  ]);
  return /* @__PURE__ */ React10.createElement(
    ContainerWrapper,
    __spreadValues({
      backgroundColor,
      backgroundImage,
      contentColor,
      borderColor,
      radius,
      borderSide,
      shadow,
      padding,
      paddingLeft: paddingX || paddingLeft,
      paddingRight: paddingX || paddingRight,
      paddingTop: paddingY || paddingTop,
      paddingBottom: paddingY || paddingBottom,
      margin,
      marginLeft: marginX || marginLeft,
      marginRight: marginX || marginRight,
      marginTop: marginY || marginTop,
      marginBottom: marginY || marginBottom,
      width,
      height,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      as: htmlTag,
      position,
      top,
      bottom,
      left,
      right,
      overflow,
      zIndex,
      borderWidth,
      ref: (ref) => refHandler && refHandler(ref)
    }, props),
    children
  );
};
var container_default = Container;

// src/components/text-input/text-input.tsx
var sizesStyles2 = {
  small: {
    height: u(4),
    width: u(5),
    iconSize: 2,
    padding: u(1.75),
    withIconPadding: u(4.5),
    passwordAdditionalPadding: u(0.5),
    textSize: "small",
    radius: "var(--lns-radius-150)"
  },
  medium: {
    height: "var(--lns-formFieldHeight)",
    width: u(6),
    iconSize: 3,
    padding: "var(--lns-formFieldHorizontalPadding)",
    withIconPadding: u(5.5),
    passwordAdditionalPadding: u(0.5),
    textSize: "medium",
    radius: "var(--lns-radius-175)"
  },
  large: {
    height: u(7),
    width: u(6),
    iconSize: 3,
    padding: "var(--lns-formFieldHorizontalPadding)",
    withIconPadding: u(5.5),
    passwordAdditionalPadding: u(0.5),
    textSize: "large",
    radius: "var(--lns-radius-250)"
  }
};
var inputRightPadding = (props) => {
  let padding = props.addOn ? sizesStyles2[props.inputSize].withIconPadding : sizesStyles2[props.inputSize].padding;
  if (props.type === "password") {
    padding = `calc(${sizesStyles2[props.inputSize].passwordAdditionalPadding} + ${padding})`;
  }
  return padding;
};
var InputField = styled9.input`
  -webkit-appearance: none;
  font-family: inherit;
  width: 100%;
  height: ${(props) => sizesStyles2[props.inputSize].height};
  border: none;
  color: inherit;
  background-color: ${getColorValue("formFieldBackground")};
  transition: 0.3s box-shadow;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: ${(props) => props.icon ? sizesStyles2[props.inputSize].withIconPadding : sizesStyles2[props.inputSize].padding};
  padding-right: ${(props) => inputRightPadding(props)};
  border-radius: ${(props) => sizesStyles2[props.inputSize].radius};
  box-shadow: inset 0 0 0
    ${(props) => props.hasError ? "var(--lns-formFieldBorderWidthFocus) var(--lns-color-danger)" : "var(--lns-formFieldBorderWidth) var(--lns-color-formFieldBorder)"};

  ${(props) => getTextSize(sizesStyles2[props.inputSize].textSize)};

  &:hover {
    box-shadow: inset 0 0 0 var(--lns-formFieldBorderWidthFocus)
      var(--lns-color-blurple);
  }

  &:focus {
    outline: 1px solid transparent;
    box-shadow: var(--lns-formFieldBorderShadowFocus);
  }

  &:disabled {
    color: ${getColorValue("disabledContent")};
    background-color: ${getColorValue("disabledBackground")};
  }

  &:disabled:hover {
    box-shadow: inset 0 0 0 var(--lns-formFieldBorderWidth)
      var(--lns-color-formFieldBorder);
  }

  &::placeholder {
    color: ${getColorValue("bodyDimmed")};
  }
`;
var InputFieldWrapper = styled9.div`
  position: relative;
  width: 100%;
`;
var IconSection2 = styled9.div`
  position: absolute;
  pointer-events: none;
  width: ${(props) => sizesStyles2[props.size].width};
  // Width isn't equal to iconPadding because we want more space on the left than the right
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
var Image = styled9.img`
  height: 100%;
  width: auto;
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
  opacity: ${({ isDisabled }) => isDisabled ? 0.5 : 1};
`;
var AddOnWrapper = styled9.div`
  position: absolute;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0;
  width: ${(props) => sizesStyles2[props.size].width};
  top: 50%;
  transform: translateY(-50%);
`;
var TextInput = forwardRef(
  (_a, ref) => {
    var _b = _a, {
      placeholder,
      onFocus,
      onChange,
      onBlur,
      onKeyDown,
      isDisabled,
      icon,
      type = "text",
      value,
      hasError,
      size = "medium",
      addOn
    } = _b, props = __objRest(_b, [
      "placeholder",
      "onFocus",
      "onChange",
      "onBlur",
      "onKeyDown",
      "isDisabled",
      "icon",
      "type",
      "value",
      "hasError",
      "size",
      "addOn"
    ]);
    const inputField = /* @__PURE__ */ React11.createElement(
      InputField,
      __spreadValues({
        type,
        placeholder,
        onFocus,
        onChange,
        onBlur,
        onKeyDown,
        disabled: isDisabled,
        icon,
        ref,
        value,
        hasError,
        inputSize: size,
        addOn
      }, props)
    );
    return icon || addOn ? /* @__PURE__ */ React11.createElement(InputFieldWrapper, null, icon && /* @__PURE__ */ React11.createElement(IconSection2, { size }, typeof icon === "string" ? /* @__PURE__ */ React11.createElement(
      container_default,
      {
        radius: "50",
        width: sizesStyles2[size].iconSize,
        height: sizesStyles2[size].iconSize,
        overflow: "hidden"
      },
      /* @__PURE__ */ React11.createElement(align_default, { alignment: "center" }, /* @__PURE__ */ React11.createElement(Image, { src: icon, alt: "", isDisabled }))
    ) : /* @__PURE__ */ React11.createElement(
      icon_default,
      {
        icon,
        size: sizesStyles2[size].iconSize,
        color: getColorValue(isDisabled ? "disabledContent" : "body")
      }
    )), inputField, addOn && /* @__PURE__ */ React11.createElement(AddOnWrapper, { size }, addOn)) : inputField;
  }
);
var text_input_default = TextInput;

// src/components/distribute/distribute.tsx
import styled10 from "@emotion/styled";
import React12 from "react";
var alignments2 = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch"
};
var alreadyWarned = false;
var propToArray = (prop) => {
  if (!Array.isArray(prop)) {
    return [prop];
  }
  return prop;
};
var formatItems = (items, targetRulesetLength) => {
  if (items.length === targetRulesetLength) {
    return items;
  }
  const lastItem = items[items.length - 1];
  return [...Array(targetRulesetLength)].map((_, i) => items[i] || lastItem);
};
var getDirectionAndGap = (direction, gap) => {
  const targetRulesetLength = Math.max(
    propToArray(direction).length,
    propToArray(gap).length
  );
  const gapsArray = formatItems(propToArray(gap), targetRulesetLength);
  const directionsArray = formatItems(
    propToArray(direction),
    targetRulesetLength
  );
  const childrenSelector = "& > * + *";
  const gapsRulesets = gapsArray.map((gapItem, index) => {
    const marginTop = `${getSizeValue(gapItem)} 0 0 0`;
    const marginRight = `0 0 0 ${getSizeValue(gapItem)}`;
    const marginValue = directionsArray[index] === "column" ? marginTop : marginRight;
    return `${childrenSelector}{ margin: ${marginValue}; }`;
  });
  const directionsRulesets = directionsArray.map(
    (directionItem) => `flex-direction: ${directionItem}`
  );
  return arrayToBreakpoints(gapsRulesets) + arrayToBreakpoints(directionsRulesets);
};
var DistributeWrapper = styled10.div`
  display: flex;
  flex-wrap: wrap;
  ${(props) => getDirectionAndGap(props.flexDirection, props.gap)};
  ${(props) => getAlignmentStyles(props.flexAlign, alignments2)};
  ${(props) => props.isSpread && getResponsiveBoolean(
  "justify-content",
  ["space-between", "initial"],
  props.isSpread
)};

  & > * {
    flex-shrink: 0;
  }
`;
var Distribute = (_a) => {
  var _b = _a, {
    children,
    gap,
    direction = "row",
    alignment = "start",
    isSpread,
    htmlTag = "div"
  } = _b, props = __objRest(_b, [
    "children",
    "gap",
    "direction",
    "alignment",
    "isSpread",
    "htmlTag"
  ]);
  if (!alreadyWarned) {
    console.warn(distributeDeprecatedWarning);
    alreadyWarned = true;
  }
  return /* @__PURE__ */ React12.createElement(
    DistributeWrapper,
    __spreadValues({
      gap,
      flexDirection: direction,
      flexAlign: alignment,
      isSpread,
      as: htmlTag
    }, props),
    children
  );
};
var availableAlignments2 = Object.keys(alignments2);
var distribute_default = Distribute;

// src/components/error-container/error-container.tsx
import styled12 from "@emotion/styled";
import React15 from "react";

// src/components/arrange/arrange.tsx
import styled11 from "@emotion/styled";
import React13 from "react";
var ArrangeWrapper = styled11.div`
  display: grid;
  ${(props) => getResponsiveOneOf("align-items", props.alignItems)};
  ${(props) => getResponsiveOneOf("justify-content", props.justifyContent)};
  ${(props) => props.justifyItems && getResponsiveOneOf("justify-items", props.justifyItems)};
  ${(props) => props.alignContent && getResponsiveOneOf("align-content", props.alignContent)};
  ${(props) => !props.columns && !props.rows && !props.autoFlow && "grid-auto-flow: column"};
  ${(props) => getResponsiveGridSections(props.columns, "columns")};
  ${(props) => getResponsiveGridSections(props.rows, "rows")};
  ${(props) => getSize("gap", props.gap)};
  ${(props) => getSize("width", props.width)};
  ${(props) => getSize("height", props.height)};
  ${(props) => getSize("min-width", props.minWidth)};
  ${(props) => getSize("min-height", props.minHeight)};
  ${(props) => getSize("max-width", props.maxWidth)};
  ${(props) => getSize("max-height", props.maxHeight)};

  ${(props) => props.autoFlow && getResponsiveOneOf("grid-auto-flow", props.autoFlow)};
  ${(props) => props.columns && props.autoFlow && getResponsiveOneOf("grid-auto-flow", props.autoFlow)};
  ${(props) => getListContainer(props.as)};
`;
var Arrange = (_a) => {
  var _b = _a, {
    children,
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    gap,
    columns,
    rows,
    alignItems = "center",
    justifyContent = "start",
    justifyItems,
    alignContent,
    autoFlow,
    htmlTag = "div",
    className,
    style
  } = _b, props = __objRest(_b, [
    "children",
    "width",
    "height",
    "minWidth",
    "minHeight",
    "maxWidth",
    "maxHeight",
    "gap",
    "columns",
    "rows",
    "alignItems",
    "justifyContent",
    "justifyItems",
    "alignContent",
    "autoFlow",
    "htmlTag",
    "className",
    "style"
  ]);
  if (className || style) {
    console.warn(customStylesWarning);
  }
  return /* @__PURE__ */ React13.createElement(
    ArrangeWrapper,
    __spreadValues({
      alignItems,
      as: htmlTag,
      justifyContent,
      justifyItems,
      alignContent,
      gap,
      columns,
      rows,
      width,
      height,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      autoFlow
    }, props),
    children
  );
};
var arrange_default = Arrange;

// src/components/icon/available-icons/alert-triangle.tsx
import WarningIcon from "@atlaskit/icon/core/warning";
import * as React14 from "react";
function SvgAlertTriangle() {
  return /* @__PURE__ */ React14.createElement(WarningIcon, { label: "", testId: "ads-refreshed-icon" });
}

// src/components/error-container/error-container.tsx
var ErrorContainerBorder = styled12.div`
  position: relative;
  ::before {
    content: '';
    width: calc(100% + var(--lns-space-medium));
    height: calc(100% + var(--lns-space-medium));
    position: absolute;
    top: calc(-1 * var(--lns-space-small));
    left: calc(-1 * var(--lns-space-small));
    outline: 1px solid var(--lns-color-danger);
    border-radius: var(--lns-radius-large);
    pointer-events: none;
  }
`;
var ErrorContainer = ({
  children,
  errorActive,
  errorMessage = "Oops, that didn't work. Try again."
}) => {
  if (!errorActive) {
    return /* @__PURE__ */ React15.createElement(React15.Fragment, null, children);
  }
  return /* @__PURE__ */ React15.createElement(ErrorContainerBorder, null, /* @__PURE__ */ React15.createElement(arrange_default, { autoFlow: "row", gap: "small" }, children, errorMessage ? /* @__PURE__ */ React15.createElement(arrange_default, { gap: "xsmall" }, /* @__PURE__ */ React15.createElement(icon_default, { icon: /* @__PURE__ */ React15.createElement(SvgAlertTriangle, null), size: 2, color: "danger" }), /* @__PURE__ */ React15.createElement(text_default, { size: "body-sm", color: "danger" }, errorMessage)) : null));
};
var error_container_default = ErrorContainer;

// src/components/layout/layout.tsx
import styled13 from "@emotion/styled";
import React16, { Component } from "react";
var alignments3 = {
  start: "flex-start",
  center: "center",
  end: "flex-end"
};
var LayoutWrapper = styled13.div`
  display: flex;
  ${(props) => getAlignmentStyles(props.alignment, alignments3)};

  & > * + * {
    ${(props) => props.gap && getSize("margin-left", props.gap)};
  }
`;
var LayoutSectionWrapper = styled13.div`
  min-width: 0px;
  flex-shrink: 0;
  ${(props) => getSize("width", props.width)};
  ${(props) => getSize("max-width", props.maxWidth)};
  ${(props) => props.width ? `flex-shrink: 0` : `flex: 1 1 0%`};
`;
var LayoutSection = (_a) => {
  var _b = _a, {
    width,
    maxWidth,
    children
  } = _b, props = __objRest(_b, [
    "width",
    "maxWidth",
    "children"
  ]);
  console.warn(layoutDeprecatedWarning);
  return /* @__PURE__ */ React16.createElement(LayoutSectionWrapper, __spreadValues({ width, maxWidth }, props), children);
};
var Layout = class extends Component {
  render() {
    console.warn(layoutDeprecatedWarning);
    return /* @__PURE__ */ React16.createElement(LayoutWrapper, __spreadValues({}, this.props), this.props.children);
  }
};
Layout.Section = LayoutSection;
var layout_default = Layout;

// src/components/icon-button/icon-button.tsx
import styled14 from "@emotion/styled";
import React17 from "react";
var sizeStyles = {
  small: {
    size: u(3),
    iconSize: 2.25,
    radius: "var(--lns-radius-100)"
  },
  medium: {
    size: u(4),
    iconSize: 3,
    radius: "var(--lns-radius-150)"
  },
  large: {
    size: u(5),
    iconSize: 4,
    radius: "var(--lns-radius-175)"
  }
};
var IconButtonBox = styled14.button`
  background-color: ${(props) => getColorValue(
  props.isActive ? "backgroundActive" : props.backgroundColor
) || "transparent"};
  border: none;
  appearance: none;
  cursor: pointer;
  padding: 0;
  width: ${(props) => sizeStyles[props.size].size};
  height: ${(props) => sizeStyles[props.size].size};
  position: relative;
  outline: 1px solid transparent;
  transition: 0.6s background-color;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  border-radius: ${(props) => sizeStyles[props.size].radius};
  font: inherit;

  &:hover {
    transition: 0.3s background-color;
    background-color: ${(props) => getColorValue(props.isActive ? "backgroundActive" : "backgroundHover")};
  }

  &:active {
    transition: 0s background-color;
    background-color: ${getColorValue("backgroundActive")};
  }

  &:disabled {
    color: ${getColorValue("disabledContent")};
    pointer-events: none;
  }

  &:before {
    content: '';
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    top: 0;
    border-radius: ${(props) => sizeStyles[props.size].radius};
  }

  &:focus-visible:before,
  &:focus:before {
    ${getFocusRing()};
  }

  &:focus::-moz-focus-inner {
    border: 0;
  }
`;
var IconButton = React17.forwardRef(
  (_a, ref) => {
    var _b = _a, {
      altText,
      icon,
      onClick,
      iconColor = "body",
      backgroundColor,
      isActive,
      isDisabled,
      size = "medium"
    } = _b, props = __objRest(_b, [
      "altText",
      "icon",
      "onClick",
      "iconColor",
      "backgroundColor",
      "isActive",
      "isDisabled",
      "size"
    ]);
    return /* @__PURE__ */ React17.createElement(
      IconButtonBox,
      __spreadValues({
        "aria-label": altText,
        onClick,
        isActive,
        disabled: isDisabled,
        size,
        backgroundColor,
        ref
      }, props),
      /* @__PURE__ */ React17.createElement(
        icon_default,
        {
          icon,
          size: sizeStyles[size].iconSize,
          color: isDisabled ? "disabledContent" : iconColor
        }
      )
    );
  }
);
IconButton.displayName = "IconButton";
var icon_button_default = IconButton;

// src/components/checkbox/checkbox.tsx
import styled15 from "@emotion/styled";
import React18, { forwardRef as forwardRef2, useEffect, useRef } from "react";
var SvgCheckboxCheck = (props) => /* @__PURE__ */ React18.createElement("svg", __spreadValues({ width: 12, height: 9, viewBox: "0 0 12 9", fill: "none" }, props), /* @__PURE__ */ React18.createElement(
  "path",
  {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M11.707.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L4 6.586 10.293.293a1 1 0 011.414 0z",
    fill: "currentColor"
  }
));
var SvgCheckboxMinus = (props) => /* @__PURE__ */ React18.createElement("svg", __spreadValues({ width: 12, height: 2, viewBox: "0 0 12 2", fill: "none" }, props), /* @__PURE__ */ React18.createElement(
  "path",
  {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M0 1a1 1 0 011-1h10a1 1 0 110 2H1a1 1 0 01-1-1z",
    fill: "currentColor"
  }
));
var CheckboxWrapper = styled15.div`
  display: block;
  position: relative;
`;
var CheckboxInput = styled15.input`
  height: 100%;
  margin: 0;
  opacity: 0;
  position: absolute;
  width: 100%;

  &:not(:disabled) {
    cursor: pointer;

    & ~ .CheckboxBox {
      border: 2px solid ${getColorValue("body")};
    }

    &:checked ~ .CheckboxBox,
    &:indeterminate ~ .CheckboxBox {
      background-color: ${getColorValue("body")};
    }
  }

  &:disabled,
  &:disabled ~ .CheckboxBox {
    pointer-events: none;
  }

  &:disabled ~ .CheckboxBox {
    background-color: ${getColorValue("disabledBackground")};

    .Icon {
      color: ${getColorValue("disabledContent")};
    }
  }

  &:focus-visible ~ .CheckboxBox {
    ${getFocusRing()};
  }

  & ~ .CheckboxBox .Icon {
    display: none;
    color: ${getColorValue("background")};
  }

  &:checked ~ .CheckboxBox .IconCheck {
    display: block;
  }

  &:indeterminate ~ .CheckboxBox .IconMinus {
    display: block;
  }
`;
var CheckboxBox = styled15.span`
  cursor: pointer;
  width: ${u(2.25)};
  height: ${u(2.25)};
  border-radius: ${u(0.5)};
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
`;
var Checkbox = forwardRef2(
  (_a, ref) => {
    var _b = _a, {
      isDisabled,
      isChecked,
      isIndeterminate,
      onFocus,
      onChange,
      onBlur
    } = _b, props = __objRest(_b, [
      "isDisabled",
      "isChecked",
      "isIndeterminate",
      "onFocus",
      "onChange",
      "onBlur"
    ]);
    const defaultRef = useRef();
    const checkboxRef = ref || defaultRef;
    const iconColor = getColorValue(
      isDisabled ? "disabledContent" : "currentColor"
    );
    useEffect(() => {
      checkboxRef.current.indeterminate = isIndeterminate;
    });
    return /* @__PURE__ */ React18.createElement(CheckboxWrapper, null, /* @__PURE__ */ React18.createElement(
      CheckboxInput,
      __spreadValues({
        type: "checkbox",
        disabled: isDisabled,
        checked: isChecked,
        onFocus,
        onChange,
        onBlur,
        ref: checkboxRef,
        "aria-checked": isChecked
      }, props)
    ), /* @__PURE__ */ React18.createElement(CheckboxBox, { className: "CheckboxBox" }, /* @__PURE__ */ React18.createElement(SvgCheckboxMinus, { className: "Icon IconMinus", color: iconColor }), /* @__PURE__ */ React18.createElement(SvgCheckboxCheck, { className: "Icon IconCheck", color: iconColor })));
  }
);
var checkbox_default = Checkbox;

// src/components/text-button/text-button.tsx
import styled16 from "@emotion/styled";
import React19 from "react";
var sizeStyles2 = {
  small: {
    textSize: "small",
    iconSize: 2.25,
    height: u(3),
    xSpace: u(1),
    radius: "var(--lns-radius-100)"
  },
  medium: {
    textSize: "medium",
    iconSize: 3,
    height: u(4),
    xSpace: u(1.5),
    radius: "var(--lns-radius-150)"
  },
  large: {
    textSize: "large",
    iconSize: 4,
    height: u(6),
    xSpace: u(3),
    radius: "var(--lns-radius-200)"
  }
};
var TextButtonWrapper = styled16.button`
  background-color: ${(props) => props.isActive ? getColorValue("backgroundActive") : "transparent"};
  display: inline-flex;
  vertical-align: middle;
  align-items: center;
  font: inherit;
  text-decoration: none;
  border: none;
  appearance: none;
  height: ${(props) => sizeStyles2[props.size].height};
  cursor: pointer;
  transition: 0.6s background-color;
  color: ${(props) => getColorValue(props.color || "body")};
  ${getFontWeight("bold")};
  border-radius: ${(props) => sizeStyles2[props.size].radius};
  ${(props) => getTextSize(sizeStyles2[props.size].textSize)};
  padding: 0 ${(props) => sizeStyles2[props.size].xSpace};
  ${(props) => props.offsetSide && `margin-${props.offsetSide}: calc(-1 * ${sizeStyles2[props.size].xSpace})`};

  &:focus,
  &:focus-visible {
    outline: 1px solid transparent;
  }

  &:focus-visible {
    ${getFocusRing()};
  }

  &::-moz-focus-inner {
    border: 0;
  }

  &:hover {
    transition: 0.3s background-color;
    background-color: ${(props) => getColorValue(props.isActive ? "backgroundActive" : "backgroundHover")};
  }

  &:active {
    transition: 0s background-color;
    background-color: ${getColorValue("backgroundActive")};
  }

  &:disabled {
    color: ${getColorValue("disabledContent")};
    pointer-events: none;
  }
`;
var TextButton = React19.forwardRef(
  (_a, ref) => {
    var _b = _a, {
      onClick,
      size = "medium",
      children,
      icon,
      iconPosition = "left",
      isActive,
      isDisabled,
      htmlTag,
      offsetSide
    } = _b, props = __objRest(_b, [
      "onClick",
      "size",
      "children",
      "icon",
      "iconPosition",
      "isActive",
      "isDisabled",
      "htmlTag",
      "offsetSide"
    ]);
    const iconComponent = /* @__PURE__ */ React19.createElement(
      container_default,
      {
        paddingLeft: iconPosition === "right" && "small",
        paddingRight: iconPosition === "left" && "small",
        htmlTag: "span"
      },
      /* @__PURE__ */ React19.createElement(
        icon_default,
        {
          icon,
          size: sizeStyles2[size].iconSize,
          color: isDisabled ? "disabledColor" : void 0
        }
      )
    );
    return /* @__PURE__ */ React19.createElement(
      TextButtonWrapper,
      __spreadValues({
        onClick,
        size,
        icon,
        iconPosition,
        disabled: isDisabled,
        isActive,
        as: htmlTag,
        offsetSide,
        ref
      }, props),
      icon && iconPosition === "left" && iconComponent,
      children,
      icon && iconPosition === "right" && iconComponent
    );
  }
);
TextButton.displayName = "TextButton";
var text_button_default = TextButton;

// src/components/select/select.tsx
import styled18 from "@emotion/styled";
import Downshift from "downshift";
import React23, { useEffect as useEffect2, useState } from "react";
import { useLayer } from "react-laag";
import ResizeObserver from "resize-observer-polyfill";

// src/utilities/downshift.js
var getDownshiftEnvironment = (container) => {
  var _a, _b;
  const rootNode = (_b = (_a = container == null ? void 0 : container()) == null ? void 0 : _a.getRootNode) == null ? void 0 : _b.call(_a);
  if (String(rootNode) === "[object ShadowRoot]") {
    rootNode.createElement = (...args) => rootNode.ownerDocument.createElement(...args);
    const downshiftPolyfill = rootNode.createElement("div");
    downshiftPolyfill.id = "a11y-status-message";
    downshiftPolyfill.style.display = "none";
    rootNode.appendChild(downshiftPolyfill);
    return {
      document: rootNode,
      addEventListener: rootNode.addEventListener.bind(rootNode),
      removeEventListener: rootNode.removeEventListener.bind(rootNode)
    };
  }
  if (typeof window === "undefined") {
    return null;
  }
  return window;
};

// src/components/icon/available-icons/chevron-down.tsx
import ChevronDownIcon from "@atlaskit/icon/utility/chevron-down";
import * as React20 from "react";
function SvgChevronDown() {
  return /* @__PURE__ */ React20.createElement(ChevronDownIcon, { label: "", spacing: "compact", testId: "ads-refreshed-icon" });
}

// src/components/menu/menu.tsx
import styled17 from "@emotion/styled";
import React22 from "react";

// src/components/icon/available-icons/check.tsx
import CheckMarkIcon from "@atlaskit/icon/core/check-mark";
import * as React21 from "react";
function SvgCheck() {
  return /* @__PURE__ */ React21.createElement(CheckMarkIcon, { label: "", testId: "ads-refreshed-icon" });
}

// src/components/menu/menu.tsx
var menuPositions = {
  left: "bottom-start",
  right: "bottom-end",
  ["topLeft"]: "top-start",
  ["topRight"]: "top-end",
  leftSide: "left-start",
  rightSide: "right-start"
};
var MenuWrapper = styled17.ul`
  background-color: ${getColorValue("overlay")};
  list-style: none;
  padding: ${u(1.5)};
  margin: 0;
  ${(props) => getSize("min-width", props.minWidth)};
  ${(props) => getSize("max-width", props.maxWidth)};
  ${(props) => getSize("max-height", props.maxHeight)};
  z-index: ${(props) => props.zIndex};
  overflow: auto;
  border: 1px solid ${getColorValue("border")};
  ${getShadow("medium")};
  ${getRadius("250")};
`;
var MenuItemWrapper = styled17.li`
  display: ${({ hidden }) => hidden ? "none" : "grid"};
  grid-auto-flow: column;
  grid-template-columns: ${(props) => props.columns};
  ${getSize("grid-gap", "small")};
  ${getRadius("175")};
  align-items: center;
  min-height: ${u(5)};
  padding: 0 ${u(2)};
  cursor: ${(props) => props.isDisabled ? "default" : "pointer"};
  ${(props) => props.isHighlighted && !props.isDisabled && `
    background-color: ${getColorValue("backgroundHover")};
  `};
  ${(props) => props.hasDivider && `
    position: relative;
    margin-top: ${u(3)};
    &:before {
      content: '';
      border-top: 1px solid ${getColorValue("border")};
      position: absolute;
      top: ${u(-1.5)};
      left: ${u(-1.5)};
      width: calc(100% + ${u(3)});
    }
  `};
`;
var Image2 = styled17.img`
  height: 100%;
  width: auto;
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
  opacity: ${({ isDisabled }) => isDisabled ? 0.5 : 1};
`;
var MenuItem = (_a) => {
  var _b = _a, {
    isDisabled,
    isHighlighted,
    isSelected,
    icon,
    hasDivider,
    children
  } = _b, props = __objRest(_b, [
    "isDisabled",
    "isHighlighted",
    "isSelected",
    "icon",
    "hasDivider",
    "children"
  ]);
  const checkColumn = isSelected ? "auto" : "";
  const iconColumn = icon ? "auto" : "";
  const columns = `${iconColumn} 1fr ${checkColumn}`;
  const color = isDisabled ? "disabledContent" : void 0;
  return /* @__PURE__ */ React22.createElement(
    MenuItemWrapper,
    __spreadValues({
      isHighlighted,
      isDisabled,
      columns,
      hasDivider
    }, props),
    icon && (typeof icon === "string" ? /* @__PURE__ */ React22.createElement(container_default, { radius: "50", width: 3, height: 3, overflow: "hidden" }, /* @__PURE__ */ React22.createElement(align_default, { alignment: "center" }, /* @__PURE__ */ React22.createElement(Image2, { src: icon, alt: "", isDisabled }))) : /* @__PURE__ */ React22.createElement(icon_default, { icon, color })),
    /* @__PURE__ */ React22.createElement(text_default, { color, hasEllipsis: true }, children),
    isSelected && /* @__PURE__ */ React22.createElement(icon_default, { icon: /* @__PURE__ */ React22.createElement(SvgCheck, null), color })
  );
};
var Menu = (_a) => {
  var _b = _a, {
    position,
    zIndex,
    minWidth,
    maxWidth,
    maxHeight,
    children,
    downshiftMenuProps = () => null
  } = _b, props = __objRest(_b, [
    "position",
    "zIndex",
    "minWidth",
    "maxWidth",
    "maxHeight",
    "children",
    "downshiftMenuProps"
  ]);
  return /* @__PURE__ */ React22.createElement(
    MenuWrapper,
    __spreadValues(__spreadValues({
      zIndex,
      position,
      minWidth,
      maxWidth,
      maxHeight
    }, downshiftMenuProps()), props),
    children
  );
};
var menu_default = Menu;

// src/components/select/select.tsx
var SelectWrapper = styled18.div`
  position: relative;
`;
var SelectHeaderWrapper = styled18.button`
  appearance: none;
  font: inherit;
  text-align: left;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: ${(props) => props.columns};
  ${getSize("grid-gap", "small")};
  align-items: center;
  cursor: pointer;
  width: 100%;
  min-height: ${u(4.5)};
  padding: 0 ${u(1.5)} 0 var(--lns-formFieldHorizontalPadding);
  color: ${getColorValue("body")};
  border: none;
  background-color: ${getColorValue("formFieldBackground")};
  transition: 0.3s box-shadow;
  border-radius: var(--lns-formFieldRadius);
  box-shadow: inset 0 0 0
    ${(props) => props.hasError ? "var(--lns-formFieldBorderWidthFocus) var(--lns-color-danger)" : "var(--lns-formFieldBorderWidth) var(--lns-color-formFieldBorder)"};

  &:hover:not(:disabled) {
    box-shadow: inset 0 0 0 var(--lns-formFieldBorderWidthFocus)
      ${(props) => props.hasError ? "var(--lns-color-danger)" : "var(--lns-color-blurple)"};
  }

  &:focus {
    outline: 1px solid transparent;
    box-shadow: var(--lns-formFieldBorderShadowFocus);
  }

  &:focus:hover {
    outline: 1px solid transparent;
    box-shadow: var(--lns-formFieldBorderShadowFocus);
  }

  &:disabled {
    color: ${getColorValue("disabledContent")};
    background-color: ${getColorValue("disabledBackground")};
    cursor: default;
  }
`;
var Image3 = styled18.img`
  height: 100%;
  width: auto;
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
  opacity: ${({ isDisabled }) => isDisabled ? 0.5 : 1};
`;
var Group = styled18.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;
var ErrorMessage = styled18.span`
  color: var(--lns-color-red);
  margin-top: var(--lns-space-xsmall);
  display: block;
  width: 100%;
  grid-column-start: 1;
  grid-column-end: 3;
`;
var isGrouped = (options) => Array.isArray(options) && options.length > 0 && "group" in options[0];
var getSelectedOptionObject = ({ options, selectedOptionValue }) => {
  if (!options || !selectedOptionValue) {
    return { icon: null, title: null };
  }
  if (isGrouped(options)) {
    for (const option of options) {
      const foundItem = option.items.find(
        (item) => item.value === selectedOptionValue
      );
      if (foundItem) {
        return foundItem;
      }
    }
  } else {
    const foundItem = options.find((item) => item.value === selectedOptionValue);
    return foundItem || { icon: null, title: null };
  }
  return { icon: null, title: null };
};
var getIcon = ({ options, selectedItem, selectedOptionValue }) => {
  if (selectedItem) {
    return selectedItem.icon;
  }
  if (selectedOptionValue) {
    return getSelectedOptionObject({ options, selectedOptionValue }).icon;
  }
};
var getTitle = ({
  options,
  selectedItem,
  selectedOptionValue,
  selectPlaceholder
}) => {
  if (selectedItem) {
    return selectedItem.title;
  }
  if (selectedOptionValue) {
    return getSelectedOptionObject({ options, selectedOptionValue }).title;
  }
  return selectPlaceholder;
};
var getHeaderAccessibilityProps = ({
  selectedItem,
  getInputProps,
  getToggleButtonProps,
  ariaMenuName
}) => {
  const valueLabel = selectedItem ? `selected value is ${selectedItem.title}` : "no value selected";
  const toggleLabel = getToggleButtonProps == null ? void 0 : getToggleButtonProps()["aria-label"];
  return {
    // Ensures all options within the list of selections can be narrated by a screen reader
    "aria-activedescendant": getInputProps()["aria-activedescendant"],
    // The existing aria-label includes whether or not the menu is open or closed, and we add the valueLabel to make a screen reader narrate what is selected
    "aria-label": [ariaMenuName, toggleLabel, valueLabel].filter(Boolean).join(", ")
  };
};
var SelectHeader = ({
  getToggleButtonProps,
  inputValue,
  selectedItem,
  selectedOptionValue,
  selectPlaceholder,
  isDisabled,
  options,
  getInputProps,
  ariaMenuName,
  hasError
}) => {
  const icon = getIcon({ options, selectedItem, selectedOptionValue });
  const hasIcon = Boolean(icon);
  const hasPlaceholder = !selectedOptionValue && !selectedItem;
  const iconColumn = hasIcon ? "auto" : "";
  const columns = `${iconColumn} 1fr auto`;
  const color = isDisabled ? "disabledContent" : void 0;
  return /* @__PURE__ */ React23.createElement(
    SelectHeaderWrapper,
    __spreadProps(__spreadValues(__spreadValues({}, getToggleButtonProps()), getHeaderAccessibilityProps({
      selectedItem,
      getInputProps,
      getToggleButtonProps,
      ariaMenuName
    })), {
      hasValue: inputValue || selectedOptionValue,
      disabled: isDisabled,
      columns,
      hasError
    }),
    hasIcon && (typeof icon === "string" ? /* @__PURE__ */ React23.createElement(container_default, { radius: "50", width: 3, height: 3, overflow: "hidden" }, /* @__PURE__ */ React23.createElement(align_default, { alignment: "center" }, /* @__PURE__ */ React23.createElement(Image3, { src: icon, alt: "", isDisabled }))) : /* @__PURE__ */ React23.createElement(
      icon_default,
      {
        icon: getIcon({ options, selectedItem, selectedOptionValue }),
        color
      }
    )),
    /* @__PURE__ */ React23.createElement(text_default, { hasEllipsis: true, color: hasPlaceholder ? "bodyDimmed" : "inherit" }, getTitle({
      options,
      selectedItem,
      selectedOptionValue,
      selectPlaceholder
    })),
    /* @__PURE__ */ React23.createElement(icon_default, { icon: /* @__PURE__ */ React23.createElement(SvgChevronDown, null), color })
  );
};
var CustomHeader = ({
  selectedOptionValue,
  selectedItem,
  trigger,
  getToggleButtonProps,
  options,
  selectPlaceholder,
  isDisabled,
  getInputProps,
  ariaMenuName,
  hasError,
  errorMessage
}) => {
  const buttonProps = () => {
    return __spreadValues(__spreadValues({}, getToggleButtonProps()), getHeaderAccessibilityProps({
      selectedItem,
      getInputProps,
      getToggleButtonProps,
      ariaMenuName
    }));
  };
  const getSelectedItem = () => {
    if (selectedItem) {
      return selectedItem;
    }
    if (selectedOptionValue) {
      return getSelectedOptionObject({ options, selectedOptionValue });
    }
  };
  const triggerContent = __spreadProps(__spreadValues({}, getSelectedItem()), {
    placeholder: selectPlaceholder,
    isDisabled,
    hasError,
    errorMessage
  });
  return trigger(triggerContent, buttonProps());
};
var getSelectedOption = (value, options) => {
  if (isGrouped(options)) {
    for (const option of options) {
      const foundItem = option.items.find((item) => item.value === value);
      if (foundItem) {
        return foundItem;
      }
    }
  } else {
    return options.find((item) => item.value === value);
  }
};
var didSelectedOptionValueChange = (selectedOptionValue, prevSelectedItem) => {
  return Boolean(
    prevSelectedItem && selectedOptionValue !== prevSelectedItem.value
  );
};
var renderOption = (item, index, selectedItem, selectedOptionValue, highlightedIndex, getItemProps) => {
  const isSelected = !selectedItem && item.value === selectedOptionValue || selectedItem && selectedItem.value === item.value;
  return /* @__PURE__ */ React23.createElement(
    MenuItem,
    __spreadProps(__spreadValues({
      key: index,
      getItemProps,
      icon: item.icon,
      hidden: item.hidden
    }, getItemProps({
      key: `${item.value}-${index}`,
      index,
      item,
      disabled: item.isDisabled,
      "aria-selected": isSelected
    })), {
      isDisabled: item.isDisabled,
      hasDivider: item.hasDivider,
      isHighlighted: highlightedIndex === index,
      isSelected
    }),
    item.title
  );
};
var SelectMenu = (_a) => {
  var _b = _a, {
    options,
    selectedItem,
    selectedOptionValue,
    highlightedIndex,
    getItemProps
  } = _b, menuProps = __objRest(_b, [
    "options",
    "selectedItem",
    "selectedOptionValue",
    "highlightedIndex",
    "getItemProps"
  ]);
  if (!isGrouped(options)) {
    return /* @__PURE__ */ React23.createElement(menu_default, __spreadValues({}, menuProps), options.map(
      (item, index) => renderOption(
        item,
        index,
        selectedItem,
        selectedOptionValue,
        highlightedIndex,
        getItemProps
      )
    ));
  }
  let downshiftIndex = 0;
  return /* @__PURE__ */ React23.createElement(menu_default, __spreadValues({}, menuProps), options.map((group) => {
    const groupId = `group-${group.group.replace(/\s+/g, "-")}`;
    return /* @__PURE__ */ React23.createElement("li", { key: groupId }, /* @__PURE__ */ React23.createElement(spacer_default, { left: "medium", top: "small", bottom: "xsmall" }, /* @__PURE__ */ React23.createElement(text_default, { id: groupId, size: "body-sm", fontWeight: "bold" }, group.group)), /* @__PURE__ */ React23.createElement(Group, { role: "group", "aria-labelledby": groupId }, group.items.map((item) => {
      return renderOption(
        item,
        downshiftIndex++,
        selectedItem,
        selectedOptionValue,
        highlightedIndex,
        getItemProps
      );
    })));
  }));
};
var Select = (_a) => {
  var _b = _a, {
    container,
    onChange,
    menuZIndex = 1100,
    menuMaxWidth,
    menuMaxHeight = 34,
    menuMinWidth,
    ariaMenuName,
    selectedOptionValue,
    onOuterClick,
    options,
    placeholder,
    menuPosition = "left",
    isDisabled,
    onOpenChange,
    trigger,
    hasError,
    errorMessage = "Oops, that didn't work."
  } = _b, props = __objRest(_b, [
    "container",
    "onChange",
    "menuZIndex",
    "menuMaxWidth",
    "menuMaxHeight",
    "menuMinWidth",
    "ariaMenuName",
    "selectedOptionValue",
    "onOuterClick",
    "options",
    "placeholder",
    "menuPosition",
    "isDisabled",
    "onOpenChange",
    "trigger",
    "hasError",
    "errorMessage"
  ]);
  const environment = getDownshiftEnvironment(container);
  const [downshiftIsOpen, setDownshiftIsOpen] = useState(false);
  const [prevSelectedItem, setPrevSelectedItem] = useState(
    getSelectedOption(selectedOptionValue, options)
  );
  const [selectedItem, setSelectedItem] = useState(prevSelectedItem);
  const onDownshiftChange = (item) => {
    setSelectedItem(item);
    onChange && onChange(item ? item : "");
  };
  const downshiftProps = {
    itemToString: (item) => item ? item.value : "",
    onChange: onDownshiftChange,
    onOuterClick,
    environment,
    selectedItem,
    isOpen: downshiftIsOpen
  };
  if (environment) {
    downshiftProps.environment = environment;
  }
  const { layerProps, triggerProps, renderLayer, triggerBounds } = useLayer({
    isOpen: downshiftIsOpen,
    container,
    ResizeObserver,
    placement: menuPositions[menuPosition],
    auto: true,
    snap: true
  });
  useEffect2(() => {
    if (didSelectedOptionValueChange(selectedOptionValue, prevSelectedItem)) {
      const selectedItem2 = getSelectedOption(selectedOptionValue, options);
      setPrevSelectedItem(selectedItem2);
      setSelectedItem(selectedItem2);
    }
  }, [selectedOptionValue, options, prevSelectedItem]);
  useEffect2(() => {
    onOpenChange && onOpenChange(downshiftIsOpen);
  }, [downshiftIsOpen, onOpenChange]);
  const stateReducer = (state, changes) => {
    if (changes.isOpen !== void 0) {
      if (changes.type === Downshift.stateChangeTypes.keyDownEscape) {
        setDownshiftIsOpen(false);
        return { isOpen: false };
      }
      setDownshiftIsOpen(changes.isOpen);
    }
    return changes;
  };
  return /* @__PURE__ */ React23.createElement(SelectWrapper, __spreadValues({}, props), /* @__PURE__ */ React23.createElement(Downshift, __spreadProps(__spreadValues({}, downshiftProps), { stateReducer }), ({
    getItemProps,
    getInputProps,
    getMenuProps,
    getToggleButtonProps,
    isOpen,
    inputValue,
    highlightedIndex,
    selectedItem: selectedItem2
  }) => {
    return (
      // Don't set the role to combobox to ensure a consistent experience for screen readers
      /* @__PURE__ */ React23.createElement("div", { role: "presentation" }, /* @__PURE__ */ React23.createElement("div", __spreadValues({}, triggerProps), trigger ? /* @__PURE__ */ React23.createElement(
        CustomHeader,
        {
          getToggleButtonProps,
          selectedItem: selectedItem2,
          selectedOptionValue,
          selectPlaceholder: placeholder,
          isDisabled,
          options,
          trigger,
          getInputProps,
          ariaMenuName,
          hasError,
          errorMessage
        }
      ) : /* @__PURE__ */ React23.createElement(
        SelectHeader,
        {
          getToggleButtonProps,
          selectedItem: selectedItem2,
          selectedOptionValue,
          selectPlaceholder: placeholder,
          options,
          inputValue,
          isDisabled,
          getInputProps,
          ariaMenuName,
          hasError
        }
      )), downshiftIsOpen && isOpen && renderLayer(
        /* @__PURE__ */ React23.createElement(
          "div",
          __spreadProps(__spreadValues({}, layerProps), {
            style: __spreadProps(__spreadValues({}, layerProps.style), {
              zIndex: menuZIndex,
              width: menuMinWidth ? "auto" : triggerBounds == null ? void 0 : triggerBounds.width
            })
          }),
          /* @__PURE__ */ React23.createElement(
            SelectMenu,
            {
              options,
              selectedItem: selectedItem2,
              selectedOptionValue,
              highlightedIndex,
              getItemProps,
              position: menuPosition,
              downshiftMenuProps: getMenuProps,
              maxWidth: menuMaxWidth,
              maxHeight: menuMaxHeight,
              minWidth: menuMinWidth
            }
          )
        )
      ), hasError && !downshiftIsOpen && /* @__PURE__ */ React23.createElement(ErrorMessage, null, errorMessage))
    );
  }));
};
var select_default = Select;

// src/components/backdrop/backdrop.tsx
import styled19 from "@emotion/styled";
import React24 from "react";
import { useTransition } from "transition-hook";

// src/hooks/use-prevent-scroll.ts
import { useLayoutEffect } from "react";
function usePreventScroll(level, enabled) {
  const safeDocument = document;
  useLayoutEffect(() => {
    const html = safeDocument == null ? void 0 : safeDocument.documentElement;
    const body = safeDocument == null ? void 0 : safeDocument.body;
    if (safeDocument == void 0 || !html || !body) {
      return;
    }
    if (enabled) {
      const scrollBarWidth = window.innerWidth - html.clientWidth;
      const bodyPaddingRight = parseInt(
        window.getComputedStyle(body).getPropertyValue("padding-right"),
        /* Force radixValue to be base-10 system to avoid errors:
         * https://stackoverflow.com/questions/6611824/why-do-we-need-to-use-radix-parameter-when-calling-parseint
         */
        10
      ) || 0;
      switch (level) {
        case "html": {
          html.style.position = "relative";
          html.style.overflow = "hidden";
          body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`;
          break;
        }
        case "body": {
          body.style.setProperty("position", "relative");
          body.style.setProperty("overflow", "hidden");
          body.style.setProperty(
            "padding-right",
            `${bodyPaddingRight + scrollBarWidth}px`
          );
          break;
        }
        default:
          return;
      }
    }
    return () => {
      switch (level) {
        case "html": {
          html.style.position = "";
          html.style.overflow = "";
          body.style.paddingRight = "";
          break;
        }
        case "body": {
          body.style.removeProperty("position");
          body.style.removeProperty("overflow");
          body.style.removeProperty("padding-right");
          break;
        }
        default:
          return;
      }
    };
  }, [safeDocument, enabled, level]);
}
var use_prevent_scroll_default = usePreventScroll;

// src/components/backdrop/backdrop.tsx
var duration = 300;
var BackdropWrapper = styled19.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  background: ${(props) => getColorValue(props.backgroundColor)};
  z-index: ${(props) => props.zIndex};
  overflow: hidden;
`;
var ChildrenWrapper = styled19.div`
  overflow: auto;
  height: 100%;
`;
var Backdrop = (_a) => {
  var _b = _a, {
    children,
    isOpen,
    zIndex = 1e3,
    backgroundColor = "backdropDark"
  } = _b, props = __objRest(_b, [
    "children",
    "isOpen",
    "zIndex",
    "backgroundColor"
  ]);
  const { stage, shouldMount } = useTransition(isOpen, duration);
  use_prevent_scroll_default("html", isOpen);
  return /* @__PURE__ */ React24.createElement(React24.Fragment, null, shouldMount && /* @__PURE__ */ React24.createElement(
    BackdropWrapper,
    __spreadValues({
      backgroundColor,
      zIndex,
      style: {
        transition: `opacity ${duration}ms`,
        opacity: stage === "enter" ? 1 : 0
      }
    }, props),
    /* @__PURE__ */ React24.createElement(ChildrenWrapper, null, children)
  ));
};
var backdrop_default = Backdrop;

// src/components/modal/modal.tsx
import styled20 from "@emotion/styled";
import FocusTrap from "focus-trap-react";
import React26, { useEffect as useEffect3 } from "react";

// src/components/icon/available-icons/close.tsx
import CloseIcon from "@atlaskit/icon/core/close";
import * as React25 from "react";
function SvgClose() {
  return /* @__PURE__ */ React25.createElement(CloseIcon, { label: "", testId: "ads-refreshed-icon" });
}

// src/components/modal/modal.tsx
var DEFAULT_MODAL_CARD_HEIGHT = "70vh";
var ContentWrapper = styled20.div`
  display: grid;
  grid-template-rows: ${(props) => props.rows};
  position: relative;
`;
var ModalCardWrapper = styled20.dialog`
  top: ${(props) => getPlacement(getSizeValue(props.maxHeight), props.placement).top};
  background-color: ${getColorValue("overlay")};
  color: ${getColorValue("body")};
  bottom: ${(props) => getPlacement(props.maxHeight, props.placement).bottom};
  ${getShadow("large")};
  ${getRadius("xlarge")};
  // Unsets bottom-radius for bottom-aligned modals
  border-bottom-left-radius: ${(props) => props.placement === "bottom" ? "initial" : void 0};
  border-bottom-right-radius: ${(props) => props.placement === "bottom" ? "initial" : void 0};
  ${(props) => getSize("max-height", props.maxHeight)};
  ${(props) => getSize("max-width", props.maxWidth)};
  margin: 0 auto;
  position: ${(props) => getPlacement(props.maxHeight, props.placement).position};
  overflow: auto;
  width: 100%;
  // TODO: LNS-150: Bake dialog resets into native resets file
  border: 0;
  padding: 0;
  &::backdrop {
    background: var(--lns-color-overlay);
  }
`;
var CloseIconSection = styled20.div`
  position: absolute;
  top: ${u(1.5)};
  right: ${u(1.5)};
  z-index: 1;
`;
var RightButtonsSection = styled20.div`
  margin-left: auto;

  * {
    vertical-align: middle;
  }
`;
var TitleSection = styled20.div`
  padding-left: var(--lns-space-xlarge);
  padding-right: var(--lns-space-xlarge);
  padding-top: var(--lns-space-xlarge);
  padding-bottom: ${(props) => props.bottom};
  flex-shrink: 0;
`;
var ButtonsSection = styled20.div`
  padding-left: var(--lns-space-xlarge);
  padding-right: var(--lns-space-xlarge);
  padding-bottom: var(--lns-space-xlarge);
  padding-top: ${(props) => props.hasDividers ? "var(--lns-space-medium)" : props.top};
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
var ChildrenSection2 = styled20.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding-top: ${(props) => props.hasTitle && !props.noPadding ? 0 : !props.hasTitle && !props.noPadding ? "var(--lns-space-xlarge)" : 0};
  padding-bottom: ${(props) => props.hasButtons && !props.noPadding ? 0 : !props.hasButtons && !props.noPadding ? "var(--lns-space-xlarge)" : 0};
  padding-left: ${(props) => props.noPadding ? 0 : "var(--lns-space-xlarge)"};
  padding-right: ${(props) => props.noPadding ? 0 : "var(--lns-space-xlarge)"};
  border-style: solid;
  border-color: ${getColorValue("border")};
  border-width: ${(props) => props.hasDividers ? "1px 0" : "0"};
`;
var ModalCardChildrenSection = styled20.div`
  overflow: auto;

  ${(props) => getMaxHeight(props.maxHeight)};

  & > * {
    ${(props) => getMaxHeight(props.maxHeight)};
  }
`;
var getMaxHeight = (maxHeight) => {
  if (typeof maxHeight === "number") {
    return getSize("max-height", maxHeight);
  }
  return "max-height: " + maxHeight;
};
var ModalCard = (_a) => {
  var _b = _a, {
    children,
    onCloseClick,
    isOpen,
    maxWidth = 60,
    maxHeight = DEFAULT_MODAL_CARD_HEIGHT,
    placement = "center",
    ariaLabel,
    ariaModal,
    ariaLabelledBy,
    ref,
    removeClose,
    initialFocus
  } = _b, props = __objRest(_b, [
    "children",
    "onCloseClick",
    "isOpen",
    "maxWidth",
    "maxHeight",
    "placement",
    "ariaLabel",
    "ariaModal",
    "ariaLabelledBy",
    "ref",
    "removeClose",
    "initialFocus"
  ]);
  const keyListener = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      if (!removeClose) {
        onCloseClick(e);
      }
    }
  };
  useEffect3(() => {
    window.addEventListener("keydown", keyListener);
    return () => {
      window.removeEventListener("keydown", keyListener);
    };
  }, [isOpen, onCloseClick]);
  use_prevent_scroll_default("html", isOpen);
  return /* @__PURE__ */ React26.createElement(
    FocusTrap,
    {
      active: isOpen,
      focusTrapOptions: __spreadValues({
        clickOutsideDeactivates: false,
        allowOutsideClick: true
      }, initialFocus !== void 0 ? { initialFocus } : {})
    },
    /* @__PURE__ */ React26.createElement(
      ModalCardWrapper,
      __spreadValues({
        open: isOpen,
        maxWidth,
        maxHeight,
        placement,
        onClick: (e) => e.stopPropagation(),
        ref,
        "aria-label": ariaLabel,
        "aria-modal": ariaModal,
        "aria-labelledby": ariaLabelledBy
      }, props),
      !removeClose && onCloseClick && /* @__PURE__ */ React26.createElement(CloseIconSection, null, /* @__PURE__ */ React26.createElement(
        icon_button_default,
        {
          altText: "Close",
          icon: /* @__PURE__ */ React26.createElement(SvgClose, null),
          onClick: onCloseClick
        }
      )),
      /* @__PURE__ */ React26.createElement(
        ModalCardChildrenSection,
        __spreadProps(__spreadValues({}, removeClose ? { tabIndex: 0 } : { tabIndex: -1 }), {
          maxHeight
        }),
        children
      )
    )
  );
};
var Modal = React26.forwardRef(
  (_a, ref) => {
    var _b = _a, {
      children,
      id,
      isOpen,
      mainButton,
      secondaryButton,
      alternativeButton,
      title,
      noPadding,
      onCloseClick,
      onBackgroundClick,
      onKeyDown,
      hasDividers,
      maxHeight = "70vh",
      maxWidth = 60,
      placement = "center",
      zIndex = 1e3,
      ariaLabel,
      ariaModal = true,
      ariaLabelledBy,
      initialFocus
    } = _b, props = __objRest(_b, [
      "children",
      "id",
      "isOpen",
      "mainButton",
      "secondaryButton",
      "alternativeButton",
      "title",
      "noPadding",
      "onCloseClick",
      "onBackgroundClick",
      "onKeyDown",
      "hasDividers",
      "maxHeight",
      "maxWidth",
      "placement",
      "zIndex",
      "ariaLabel",
      "ariaModal",
      "ariaLabelledBy",
      "initialFocus"
    ]);
    var _a2;
    const titleId = id ? `${id}-modal-title` : "modal-title";
    const hasButtons = mainButton || secondaryButton || alternativeButton ? true : false;
    const closeClickHandler = (e) => {
      if (onBackgroundClick) {
        e.stopPropagation();
        onBackgroundClick(e);
        return;
      }
      onCloseClick(e);
    };
    return /* @__PURE__ */ React26.createElement(backdrop_default, __spreadValues({ isOpen, zIndex }, props), /* @__PURE__ */ React26.createElement(
      container_default,
      {
        height: "100%",
        onClick: closeClickHandler,
        onKeyDown
      },
      /* @__PURE__ */ React26.createElement(
        ModalCard,
        {
          ref,
          id,
          isOpen,
          maxHeight,
          maxWidth,
          placement,
          onCloseClick,
          ariaLabel,
          ariaModal,
          ariaLabelledBy: (_a2 = ariaLabelledBy != null ? ariaLabelledBy : titleId) != null ? _a2 : void 0,
          initialFocus
        },
        /* @__PURE__ */ React26.createElement(
          ContentWrapper,
          {
            rows: `${title ? "auto " : ""} ${children ? "1fr " : ""} ${hasButtons ? "auto" : ""}`
          },
          title && /* @__PURE__ */ React26.createElement(
            TitleSection,
            {
              bottom: children ? "var(--lns-space-medium)" : "var(--lns-space-xlarge)"
            },
            /* @__PURE__ */ React26.createElement(text_default, { htmlTag: "h1", variant: "title", id: titleId }, title)
          ),
          /* @__PURE__ */ React26.createElement(
            ChildrenSection2,
            {
              noPadding,
              hasDividers,
              hasTitle: Boolean(title),
              hasButtons
            },
            children && children
          ),
          hasButtons && /* @__PURE__ */ React26.createElement(
            ButtonsSection,
            {
              top: children ? "var(--lns-space-xlarge)" : 0,
              hasDividers
            },
            alternativeButton,
            /* @__PURE__ */ React26.createElement(RightButtonsSection, null, secondaryButton && /* @__PURE__ */ React26.createElement(spacer_default, { right: "small", isInline: true }, secondaryButton), mainButton)
          )
        )
      )
    ));
  }
);
var modal_default = Modal;

// src/components/link/link.tsx
import { css as css3 } from "@emotion/react";
import styled21 from "@emotion/styled";
import React27 from "react";
var variants2 = {
  neutral: {
    color: getColorValue("inherit"),
    focusRing: getFocusRing(),
    underline: "inactive"
  },
  primary: {
    color: getColorValue("primary"),
    focusRing: getFocusRing(),
    underline: "inactive"
  },
  subtle: {
    color: getColorValue("body"),
    focusRing: getFocusRing(),
    underline: "hover"
  }
};
var statusStyles2 = {
  enabled: css3`
    cursor: pointer;
  `,
  disabled: css3`
    pointer-events: none;
    color: ${getColorValue("disabledContent")};
  `
};
var buttonStyles = {
  isButton: css3`
    background: none;
    border: none;
    font: inherit;
  `
};
var LinkWrapper = styled21.a`
  ${(props) => !props.disabled && `color: ${variants2[props.variant].color}`};
  ${(props) => props.disabled ? statusStyles2.disabled : statusStyles2.enabled};
  ${(props) => props.as === "button" && buttonStyles.isButton};
  ${(props) => `text-decoration: ${variants2[props.variant].underline === "inactive" ? "underline" : "none"}`};
  border-radius: 0.28em;
  box-shadow: 0 0 0 1px transparent;
  text-underline-offset: 0.35em;
  transition: 0.3s box-shadow;
  &:hover {
    ${(props) => `text-decoration: ${variants2[props.variant].underline === "hover" ? "underline" : "none"}`};
  }
  &:focus,
  &:focus-visible {
    outline: 1px solid transparent;
  }
  &:focus-visible {
    ${getFocusRing()};
  }
  &::-moz-focus-inner {
    border: 0;
  }
`;
var Link = (_a) => {
  var _b = _a, {
    children,
    href,
    variant = "primary",
    htmlTag = "a",
    isDisabled
  } = _b, props = __objRest(_b, [
    "children",
    "href",
    "variant",
    "htmlTag",
    "isDisabled"
  ]);
  return /* @__PURE__ */ React27.createElement(
    LinkWrapper,
    __spreadValues({
      href,
      variant,
      as: htmlTag,
      disabled: isDisabled
    }, props),
    children
  );
};
var availableVariants2 = Object.keys(variants2);
var link_default = Link;

// src/components/textarea/textarea.tsx
import styled22 from "@emotion/styled";
import React28 from "react";
var sizesStyles3 = {
  small: {
    padding: `${u(1.5)} ${u(1.75)}`,
    textSize: "small"
  },
  medium: {
    padding: `${u(1.5)} var(--lns-formFieldHorizontalPadding)`,
    textSize: "medium"
  }
};
var TextareaWrapper = styled22.textarea`
  width: 100%;
  border: none;
  font-family: inherit;
  color: inherit;
  background-color: ${getColorValue("formFieldBackground")};
  transition: 0.3s box-shadow;
  padding: ${(props) => sizesStyles3[props.size].padding};
  ${getRadius("large")};
  box-shadow: inset 0 0 0 var(--lns-formFieldBorderWidth)
    ${(props) => props.error ? "var(--lns-color-danger)" : "var(--lns-color-formFieldBorder)"};
  ${(props) => getTextSize(sizesStyles3[props.size].textSize)};
  resize: ${(props) => props.resize};

  &:hover {
    box-shadow: inset 0 0 0 var(--lns-formFieldBorderWidthFocus)
      ${(props) => props.error ? "var(--lns-color-danger)" : "var(--lns-color-blurple)"};
  }

  &:focus {
    outline: 1px solid
      ${(props) => props.error ? "var(--lns-color-orangeLight)" : "transparent"};
    box-shadow: ${(props) => props.error ? "var(--lns-formFieldBorderShadowError)" : "var(--lns-formFieldBorderShadowFocus)"};
  }

  &:disabled {
    color: ${getColorValue("disabledContent")};
    background-color: ${getColorValue("disabledBackground")};
  }

  &:disabled:hover {
    box-shadow: inset 0 0 0 var(--lns-formFieldBorderWidth)
      var(--lns-color-formFieldBorder);
  }

  &::placeholder {
    color: ${getColorValue("bodyDimmed")};
  }
`;
var Textarea = React28.forwardRef(
  (_a, ref) => {
    var _b = _a, {
      onChange,
      value,
      rows = 4,
      isDisabled,
      placeholder,
      size = "medium",
      resize = "both",
      error = null
    } = _b, props = __objRest(_b, [
      "onChange",
      "value",
      "rows",
      "isDisabled",
      "placeholder",
      "size",
      "resize",
      "error"
    ]);
    return /* @__PURE__ */ React28.createElement(React28.Fragment, null, /* @__PURE__ */ React28.createElement(
      TextareaWrapper,
      __spreadValues({
        disabled: isDisabled,
        onChange,
        placeholder,
        ref,
        rows,
        value,
        size,
        resize,
        error
      }, props)
    ), error ? /* @__PURE__ */ React28.createElement(React28.Fragment, null, /* @__PURE__ */ React28.createElement(spacer_default, { bottom: "xmsall" }), /* @__PURE__ */ React28.createElement(text_default, { color: "danger", fontWeight: "regular", size: "body-md" }, error)) : null);
  }
);
var textarea_default = Textarea;

// src/components/typeahead/typeahead.tsx
import styled23 from "@emotion/styled";
import Downshift2 from "downshift";
import React29, {
  useEffect as useEffect4,
  useState as useState2,
  useMemo,
  forwardRef as forwardRef3,
  useRef as useRef2,
  useCallback as useCallback2
} from "react";
import { useLayer as useLayer2 } from "react-laag";
import ResizeObserver2 from "resize-observer-polyfill";
var TypeaheadWrapper = styled23.div`
  position: relative;
`;
var Group2 = styled23.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;
var ErrorMessage2 = styled23.span`
  color: var(--lns-color-red);
  margin-top: var(--lns-space-xsmall);
  display: block;
  width: 100%;
  grid-column-start: 1;
  grid-column-end: 3;
`;
var isGrouped2 = (options) => Array.isArray(options) && options.length > 0 && "group" in options[0];
var getSelectedOptionObject2 = ({ options, selectedOptionValue }) => {
  if (!options || !selectedOptionValue) {
    return { icon: null, title: null };
  }
  if (isGrouped2(options)) {
    for (const option of options) {
      const foundItem = option.items.find(
        (item) => item.value === selectedOptionValue
      );
      if (foundItem) {
        return foundItem;
      }
    }
  } else {
    const foundItem = options.find((item) => item.value === selectedOptionValue);
    return foundItem || { icon: null, title: null };
  }
  return { icon: null, title: null };
};
var getIcon2 = ({ options, selectedItem, selectedOptionValue }) => {
  if (selectedItem) {
    return selectedItem.icon;
  }
  if (selectedOptionValue) {
    return getSelectedOptionObject2({ options, selectedOptionValue }).icon;
  }
};
var getTitle2 = ({
  options,
  selectedItem,
  selectedOptionValue,
  placeholder
}) => {
  if (selectedItem) {
    return selectedItem.title;
  }
  if (selectedOptionValue) {
    return getSelectedOptionObject2({ options, selectedOptionValue }).title;
  }
  return placeholder;
};
var getHeaderAccessibilityProps2 = ({
  selectedItem,
  getInputProps,
  ariaMenuName
}) => {
  const valueLabel = selectedItem ? `selected value is ${selectedItem.title}` : "no value selected";
  return {
    // Ensures all options within the list of selections can be narrated by a screen reader
    "aria-activedescendant": getInputProps()["aria-activedescendant"],
    // The existing aria-label includes whether or not the menu is open or closed, and we add the valueLabel to make a screen reader narrate what is selected
    "aria-label": [ariaMenuName, valueLabel].filter(Boolean).join(", ")
  };
};
var TypeaheadHeaderWrapper = styled23.button`
  position: relative;
  width: 100%;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;

  &:disabled {
    cursor: default;
  }
`;
var TypeaheadInputField = styled23.input`
  -webkit-appearance: none;
  font-family: inherit;
  width: 100%;
  height: var(--lns-formFieldHeight);
  border: none;
  color: inherit;
  background-color: ${getColorValue("formFieldBackground")};
  transition: 0.3s box-shadow;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: ${(props) => props.hasIcon ? u(5.5) : "var(--lns-formFieldHorizontalPadding)"};
  padding-right: ${(props) => props.hasAddOn ? u(5.5) : "var(--lns-formFieldHorizontalPadding)"};
  border-radius: var(--lns-formFieldRadius);
  box-shadow: inset 0 0 0
    ${(props) => props.hasError ? "var(--lns-formFieldBorderWidthFocus) var(--lns-color-danger)" : "var(--lns-formFieldBorderWidth) var(--lns-color-formFieldBorder)"};

  ${getSize("font-size", "medium")};

  &:hover:not(:disabled):not(:focus) {
    box-shadow: inset 0 0 0 var(--lns-formFieldBorderWidthFocus)
      ${(props) => props.hasError ? "var(--lns-color-danger)" : "var(--lns-color-blurple)"};
  }

  &:focus {
    outline: 1px solid transparent;
    box-shadow: var(--lns-formFieldBorderShadowFocus);
  }

  &:disabled {
    color: ${getColorValue("disabledContent")};
    background-color: ${getColorValue("disabledBackground")};
  }

  &:disabled:hover {
    box-shadow: inset 0 0 0 var(--lns-formFieldBorderWidth)
      var(--lns-color-formFieldBorder);
  }

  &::placeholder {
    color: ${getColorValue("bodyDimmed")};
  }
`;
var IconSection3 = styled23.div`
  position: absolute;
  pointer-events: none;
  width: ${u(6)};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
`;
var AddOnSection = styled23.div`
  position: absolute;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0;
  width: ${u(6)};
  top: 50%;
  transform: translateY(-50%);
`;
var TextOverlay = styled23.div`
  position: absolute;
  top: 0;
  left: ${(props) => props.hasIcon ? u(5.5) : "var(--lns-formFieldHorizontalPadding)"};
  right: ${u(5.5)};
  bottom: 0;
  display: flex;
  align-items: center;
  pointer-events: none;
  color: inherit;
`;
var TypeaheadImage = styled23.img`
  height: 100%;
  width: auto;
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
  opacity: ${({ isDisabled }) => isDisabled ? 0.5 : 1};
`;
var TypeaheadHeader = ({
  selectedItem,
  selectedOptionValue,
  placeholder,
  isDisabled,
  options,
  getInputProps,
  ariaMenuName,
  isOpen,
  onInputFocus,
  hasError,
  hasLoader,
  inputValue,
  handleInputValueChange,
  inputRef
}) => {
  const icon = getIcon2({ options, selectedItem, selectedOptionValue });
  const hasIcon = Boolean(icon);
  const color = isDisabled ? "disabledContent" : void 0;
  const handleClickAndFocus = () => {
    if (!isDisabled) {
      onInputFocus();
    }
  };
  const inputProps = __spreadValues(__spreadValues({
    role: "combobox",
    "aria-autocomplete": "list",
    "aria-haspopup": "listbox",
    "aria-expanded": isOpen
  }, getHeaderAccessibilityProps2({
    selectedItem,
    getInputProps,
    ariaMenuName
  })), getInputProps({
    disabled: isDisabled,
    onFocus: handleClickAndFocus,
    onClick: handleClickAndFocus,
    value: inputValue,
    onBlur: () => {
      handleInputValueChange("");
    },
    onChange: (e) => handleInputValueChange(e.target.value)
  }));
  const showPlaceholder = !inputValue && !selectedOptionValue;
  return /* @__PURE__ */ React29.createElement(TypeaheadHeaderWrapper, { onClick: handleClickAndFocus, disabled: isDisabled }, hasIcon && /* @__PURE__ */ React29.createElement(IconSection3, null, typeof icon === "string" ? /* @__PURE__ */ React29.createElement(container_default, { radius: "50", width: 3, height: 3, overflow: "hidden" }, /* @__PURE__ */ React29.createElement(align_default, { alignment: "center" }, /* @__PURE__ */ React29.createElement(TypeaheadImage, { src: icon, alt: "", isDisabled }))) : /* @__PURE__ */ React29.createElement(icon_default, { icon, color })), /* @__PURE__ */ React29.createElement(
    TypeaheadInputField,
    __spreadProps(__spreadValues({
      ref: inputRef
    }, inputProps), {
      hasIcon,
      hasAddOn: true,
      hasError,
      isDisabled
    })
  ), !inputValue && /* @__PURE__ */ React29.createElement(TextOverlay, { hasIcon }, /* @__PURE__ */ React29.createElement(text_default, { hasEllipsis: true, color: showPlaceholder ? "bodyDimmed" : "inherit" }, getTitle2({
    options,
    selectedItem,
    selectedOptionValue,
    placeholder
  }))), /* @__PURE__ */ React29.createElement(AddOnSection, null, hasLoader ? /* @__PURE__ */ React29.createElement(loader_default, { size: "small" }) : /* @__PURE__ */ React29.createElement(icon_default, { icon: /* @__PURE__ */ React29.createElement(SvgChevronDown, null), color })));
};
var getSelectedOption2 = (value, options) => {
  var _a;
  if (isGrouped2(options)) {
    for (const option of options) {
      const foundItem = option.items.find((item) => item.value === value);
      if (foundItem) {
        return foundItem;
      }
    }
  } else {
    return (_a = options.find((item) => item.value === value)) != null ? _a : null;
  }
  return null;
};
var didSelectedOptionValueChange2 = (selectedOptionValue, prevSelectedItem) => {
  const didChange = (selectedOptionValue || null) != (prevSelectedItem == null ? void 0 : prevSelectedItem.value);
  return didChange;
};
var renderOption2 = (item, index, selectedItem, selectedOptionValue, highlightedIndex, getItemProps) => {
  const isSelected = !selectedItem && item.value === selectedOptionValue || selectedItem && selectedItem.value === item.value;
  return /* @__PURE__ */ React29.createElement(
    MenuItem,
    __spreadProps(__spreadValues({
      key: index,
      getItemProps,
      icon: item.icon,
      hidden: item.hidden
    }, getItemProps({
      key: `${item.value}-${index}`,
      index,
      item,
      disabled: item.isDisabled,
      "aria-selected": isSelected
    })), {
      isDisabled: item.isDisabled,
      hasDivider: item.hasDivider,
      isHighlighted: highlightedIndex === index,
      isSelected
    }),
    item.title
  );
};
var TypeaheadMenu = (_a) => {
  var _b = _a, {
    options,
    selectedItem,
    selectedOptionValue,
    highlightedIndex,
    getItemProps,
    isLoading,
    loadingMessage,
    emptyResultsMessage,
    hasAvailableOptions
  } = _b, menuProps = __objRest(_b, [
    "options",
    "selectedItem",
    "selectedOptionValue",
    "highlightedIndex",
    "getItemProps",
    "isLoading",
    "loadingMessage",
    "emptyResultsMessage",
    "hasAvailableOptions"
  ]);
  const defaultLoadingMessage = loadingMessage || /* @__PURE__ */ React29.createElement(loader_default, null);
  const defaultEmptyResultsMessage = emptyResultsMessage || "No results";
  if (isLoading) {
    return /* @__PURE__ */ React29.createElement(menu_default, __spreadValues({ as: "div" }, menuProps), /* @__PURE__ */ React29.createElement(container_default, { padding: "large" }, /* @__PURE__ */ React29.createElement(align_default, { alignment: "center" }, defaultLoadingMessage)));
  }
  if (!hasAvailableOptions) {
    return /* @__PURE__ */ React29.createElement(menu_default, __spreadValues({ as: "div" }, menuProps), /* @__PURE__ */ React29.createElement(container_default, { padding: "large" }, /* @__PURE__ */ React29.createElement(align_default, { alignment: "center" }, defaultEmptyResultsMessage)));
  }
  if (!isGrouped2(options)) {
    return /* @__PURE__ */ React29.createElement(menu_default, __spreadValues({}, menuProps), options.map(
      (item, index) => renderOption2(
        item,
        index,
        selectedItem,
        selectedOptionValue,
        highlightedIndex,
        getItemProps
      )
    ));
  }
  let downshiftIndex = 0;
  return /* @__PURE__ */ React29.createElement(menu_default, __spreadValues({}, menuProps), options.map((group) => {
    const groupId = `group-${group.group.replace(/\s+/g, "-")}`;
    return /* @__PURE__ */ React29.createElement("li", { key: groupId }, /* @__PURE__ */ React29.createElement(spacer_default, { left: "medium", top: "small", bottom: "xsmall" }, /* @__PURE__ */ React29.createElement(text_default, { id: groupId, size: "body-sm", fontWeight: "bold" }, group.group)), /* @__PURE__ */ React29.createElement(Group2, { role: "group", "aria-labelledby": groupId }, group.items.map((item) => {
      return renderOption2(
        item,
        downshiftIndex++,
        selectedItem,
        selectedOptionValue,
        highlightedIndex,
        getItemProps
      );
    })));
  }));
};
var Typeahead = forwardRef3(
  (_a, ref) => {
    var _b = _a, {
      container,
      onOptionChange,
      onInputValueChange,
      menuZIndex = 1100,
      menuMaxWidth,
      menuMaxHeight = 34,
      menuMinWidth,
      ariaMenuName,
      selectedOptionValue,
      onOuterClick,
      options,
      placeholder,
      menuPosition = "left",
      isDisabled,
      onOpenChange,
      isLoading,
      loadingMessage,
      emptyResultsMessage,
      errorMessage
    } = _b, props = __objRest(_b, [
      "container",
      "onOptionChange",
      "onInputValueChange",
      "menuZIndex",
      "menuMaxWidth",
      "menuMaxHeight",
      "menuMinWidth",
      "ariaMenuName",
      "selectedOptionValue",
      "onOuterClick",
      "options",
      "placeholder",
      "menuPosition",
      "isDisabled",
      "onOpenChange",
      "isLoading",
      "loadingMessage",
      "emptyResultsMessage",
      "errorMessage"
    ]);
    const environment = getDownshiftEnvironment(container);
    const internalInputRef = useRef2(null);
    const inputRef = useCallback2(
      (node) => {
        internalInputRef.current = node;
        if (ref) {
          typeof ref === "function" ? ref(node) : ref.current = node;
        }
      },
      [ref]
    );
    const [inputValue, setInputValue] = useState2("");
    const [downshiftIsOpen, setDownshiftIsOpen] = useState2(false);
    const [prevSelectedItem, setPrevSelectedItem] = useState2(
      getSelectedOption2(selectedOptionValue, options)
    );
    const [selectedItem, setSelectedItem] = useState2(
      prevSelectedItem
    );
    const handleInputValueChange = (value) => {
      setInputValue(value);
      onInputValueChange && onInputValueChange(value);
    };
    const onDownshiftChange = (item) => {
      const value = item || null;
      setSelectedItem(value);
      onOptionChange && onOptionChange(value);
    };
    const downshiftProps = {
      itemToString: (item) => item ? item.value : "",
      onChange: onDownshiftChange,
      onOuterClick,
      environment,
      selectedItem,
      isOpen: downshiftIsOpen
    };
    if (environment) {
      downshiftProps.environment = environment;
    }
    const { layerProps, triggerProps, renderLayer, triggerBounds } = useLayer2({
      isOpen: downshiftIsOpen,
      container,
      ResizeObserver: ResizeObserver2,
      placement: menuPositions[menuPosition],
      auto: true,
      snap: true
    });
    useEffect4(() => {
      if (didSelectedOptionValueChange2(selectedOptionValue, prevSelectedItem)) {
        const item = getSelectedOption2(selectedOptionValue, options);
        setPrevSelectedItem(item);
        setSelectedItem(item);
        setInputValue("");
      }
    }, [selectedOptionValue, options, prevSelectedItem]);
    useEffect4(() => {
      var _a2;
      onOpenChange && onOpenChange(downshiftIsOpen);
      if (!downshiftIsOpen) {
        (_a2 = internalInputRef.current) == null ? void 0 : _a2.blur();
      }
    }, [downshiftIsOpen, onOpenChange]);
    const hasAvailableOptions = useMemo(() => {
      if (!Array.isArray(options)) {
        return false;
      }
      return isGrouped2(options) ? options.some((group) => group.items.length > 0) : options.length > 0;
    }, [options]);
    const stateReducer = (state, changes) => {
      if (changes.isOpen !== void 0) {
        if (changes.type === Downshift2.stateChangeTypes.keyDownEscape) {
          setDownshiftIsOpen(false);
          return { isOpen: false };
        }
        setDownshiftIsOpen(changes.isOpen);
      }
      return changes;
    };
    return /* @__PURE__ */ React29.createElement(TypeaheadWrapper, __spreadValues({}, props), /* @__PURE__ */ React29.createElement(Downshift2, __spreadProps(__spreadValues({}, downshiftProps), { stateReducer }), ({
      getItemProps,
      getInputProps,
      getMenuProps,
      isOpen,
      highlightedIndex,
      selectedItem: selectedItem2
    }) => {
      return (
        // Don't set the role to combobox to ensure a consistent experience for screen readers
        /* @__PURE__ */ React29.createElement("div", { role: "presentation" }, /* @__PURE__ */ React29.createElement("div", __spreadValues({}, triggerProps), /* @__PURE__ */ React29.createElement(
          TypeaheadHeader,
          {
            inputRef,
            selectedItem: selectedItem2,
            selectedOptionValue,
            placeholder,
            isDisabled,
            options,
            getInputProps,
            ariaMenuName,
            inputValue,
            handleInputValueChange,
            isOpen: downshiftIsOpen && isOpen,
            onInputFocus: () => {
              if (hasAvailableOptions || isLoading) {
                setDownshiftIsOpen(true);
              }
            },
            hasLoader: isLoading,
            hasError: Boolean(errorMessage)
          }
        )), downshiftIsOpen && isOpen && renderLayer(
          /* @__PURE__ */ React29.createElement(
            "div",
            __spreadProps(__spreadValues({}, layerProps), {
              style: __spreadProps(__spreadValues({}, layerProps.style), {
                zIndex: menuZIndex,
                width: menuMinWidth ? "auto" : triggerBounds == null ? void 0 : triggerBounds.width
              })
            }),
            /* @__PURE__ */ React29.createElement(
              TypeaheadMenu,
              {
                options,
                selectedItem: selectedItem2,
                selectedOptionValue,
                hasAvailableOptions,
                highlightedIndex,
                getItemProps,
                isLoading,
                loadingMessage,
                emptyResultsMessage,
                position: menuPosition,
                downshiftMenuProps: getMenuProps,
                maxWidth: menuMaxWidth,
                maxHeight: menuMaxHeight,
                minWidth: menuMinWidth
              }
            )
          )
        ), Boolean(errorMessage) && !downshiftIsOpen ? /* @__PURE__ */ React29.createElement(ErrorMessage2, null, errorMessage) : null)
      );
    }));
  }
);
Typeahead.displayName = "Typeahead";
var typeahead_default = Typeahead;

// src/components/dropdown/dropdown.tsx
import styled24 from "@emotion/styled";
import Downshift3 from "downshift";
import React30, { useEffect as useEffect5, useState as useState3 } from "react";
import { useLayer as useLayer3 } from "react-laag";
import ResizeObserver3 from "resize-observer-polyfill";
var getAccessibilityProps = ({
  ariaMenuName,
  getInputProps,
  isOpen
}) => {
  return {
    // Ensures all options within the list of selections can be narrated by a screen reader
    "aria-activedescendant": getInputProps()["aria-activedescendant"],
    "aria-expanded": isOpen,
    // Provides a screen-readable label for the dropdown
    "aria-label": ariaMenuName ? ariaMenuName : ""
  };
};
var TriggerSection = styled24.div`
  display: inline-block;
  vertical-align: middle;
`;
var Dropdown = (_a) => {
  var _b = _a, {
    ariaMenuName,
    menuPosition = "left",
    menuZIndex = 1100,
    options,
    trigger,
    triggerCallback,
    isOpen: isOpenFromProps,
    menuMinWidth = 24,
    menuMaxWidth = 48,
    menuMaxHeight,
    container,
    onOuterClick,
    triggerOffset = 0,
    onOpenChange
  } = _b, props = __objRest(_b, [
    "ariaMenuName",
    "menuPosition",
    "menuZIndex",
    "options",
    "trigger",
    "triggerCallback",
    "isOpen",
    "menuMinWidth",
    "menuMaxWidth",
    "menuMaxHeight",
    "container",
    "onOuterClick",
    "triggerOffset",
    "onOpenChange"
  ]);
  const environment = getDownshiftEnvironment(container);
  const [downshiftIsOpen, setDownshiftIsOpen] = useState3(false);
  const isOpen = isOpenFromProps || downshiftIsOpen;
  const { layerProps, triggerProps, renderLayer } = useLayer3({
    isOpen,
    container,
    placement: menuPositions[menuPosition],
    ResizeObserver: ResizeObserver3,
    auto: true,
    snap: true,
    triggerOffset
  });
  useEffect5(() => {
    onOpenChange && onOpenChange(isOpen);
  }, [isOpen, onOpenChange]);
  const stateReducer = (state, changes) => {
    if (changes.isOpen !== void 0) {
      setDownshiftIsOpen(changes.isOpen);
    }
    return changes;
  };
  return /* @__PURE__ */ React30.createElement(
    Downshift3,
    {
      stateReducer,
      itemToString: (item) => item ? item.title : "",
      onSelect: (item) => item && !item.disabled && item.onClick && item.onClick(),
      onOuterClick,
      environment
    },
    ({
      getInputProps,
      getItemProps,
      getMenuProps,
      getToggleButtonProps,
      highlightedIndex,
      isOpen: isOpen2
    }) => /* @__PURE__ */ React30.createElement(
      "div",
      __spreadValues(__spreadValues({}, props), triggerCallback ? {
        // the Downshift component appears to set the following props,
        // which we do not want applied to this element
        role: null,
        "aria-haspopup": null,
        "aria-expanded": null,
        "aria-labelledby": null
      } : {}),
      /* @__PURE__ */ React30.createElement("div", __spreadValues({}, triggerProps), triggerCallback ? triggerCallback(__spreadValues(__spreadValues({}, getToggleButtonProps()), getAccessibilityProps({
        ariaMenuName,
        getInputProps,
        isOpen: isOpen2
      }))) : /* @__PURE__ */ React30.createElement(TriggerSection, __spreadValues({}, getToggleButtonProps({})), trigger)),
      isOpen2 && renderLayer(
        /* @__PURE__ */ React30.createElement(
          "div",
          __spreadProps(__spreadValues({}, layerProps), {
            style: __spreadProps(__spreadValues({}, layerProps.style), { zIndex: menuZIndex })
          }),
          /* @__PURE__ */ React30.createElement(
            menu_default,
            {
              position: menuPosition,
              minWidth: menuMinWidth,
              maxWidth: menuMaxWidth,
              maxHeight: menuMaxHeight,
              downshiftMenuProps: getMenuProps
            },
            options.map((item, index) => {
              return /* @__PURE__ */ React30.createElement(
                MenuItem,
                __spreadValues({
                  key: index,
                  isHighlighted: highlightedIndex === index,
                  isDisabled: item.disabled,
                  isSelected: item.selected,
                  icon: item.icon,
                  hasDivider: item.hasDivider,
                  getItemProps,
                  index
                }, getItemProps({
                  key: index,
                  index,
                  item,
                  disabled: item.disabled
                })),
                item.title
              );
            })
          )
        )
      )
    )
  );
};
var dropdown_default = Dropdown;

// src/components/form-field/form-field.tsx
import styled27 from "@emotion/styled";
import React33, { isValidElement } from "react";

// src/components/radio/radio.tsx
import styled25 from "@emotion/styled";
import React31, { forwardRef as forwardRef4 } from "react";
var RadioLabel = styled25.label`
  display: block;
  position: relative;

  .RadioBox:after {
    background-color: transparent;
  }
`;
var RadioInput = styled25.input`
  position: absolute;
  opacity: 0;

  &:not(:disabled) {
    cursor: pointer;

    & ~ .RadioBox {
      border: 2px solid ${getColorValue("body")};
    }

    &:checked ~ .RadioBox {
      border: 2px solid ${getColorValue("body")};
    }
  }

  &:disabled,
  &:disabled ~ .RadioBox {
    pointer-events: none;
  }

  &:disabled ~ .RadioBox {
    background-color: ${getColorValue("disabledBackground")};
  }

  &:checked {
    & ~ .RadioBox:after {
      background-color: ${getColorValue("blurple")};
    }

    &:disabled ~ .RadioBox:after {
      background-color: ${getColorValue("disabledContent")};
    }
  }

  &:focus-visible ~ .RadioBox {
    ${getFocusRing()};
  }
`;
var RadioBox = styled25.span`
  cursor: pointer;
  width: ${u(2.25)};
  height: ${u(2.25)};
  ${getRadius("full")};
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;

  &:after {
    content: '';
    width: ${u(1)};
    height: ${u(1)};
    ${getRadius("full")};
    background-color: ${getColorValue("white")};
  }
`;
var Radio = forwardRef4(
  (_a, ref) => {
    var _b = _a, {
      isDisabled,
      isChecked,
      onFocus,
      onChange,
      onBlur
    } = _b, props = __objRest(_b, [
      "isDisabled",
      "isChecked",
      "onFocus",
      "onChange",
      "onBlur"
    ]);
    return /* @__PURE__ */ React31.createElement(RadioLabel, { htmlFor: props.id }, /* @__PURE__ */ React31.createElement(
      RadioInput,
      __spreadValues({
        type: "radio",
        disabled: isDisabled,
        checked: isChecked,
        onFocus,
        onChange,
        onBlur,
        ref
      }, props)
    ), /* @__PURE__ */ React31.createElement(RadioBox, { className: "RadioBox" }));
  }
);
var radio_default = Radio;

// src/components/switch/switch.tsx
import styled26 from "@emotion/styled";
import React32 from "react";
var sizes2 = {
  medium: {
    switchHeight: 16,
    switchWidth: 32,
    knobOffset: 2
  },
  large: {
    switchHeight: 20,
    switchWidth: 36,
    knobOffset: 2
  }
};
var colorStyles = {
  knob: {
    active: {
      enabled: getColorValue("white"),
      disabled: getColorValue("disabledContent")
    },
    inactive: {
      enabled: getColorValue("white"),
      disabled: getColorValue("disabledContent")
    }
  },
  track: {
    active: {
      enabled: getColorValue("blurple"),
      disabled: getColorValue("disabledBackground")
    },
    inactive: {
      enabled: getColorValue("grey6"),
      disabled: getColorValue("disabledBackground")
    }
  }
};
var getKnobTravel = (props) => {
  return sizes2[props.switchSize].switchWidth - sizes2[props.switchSize].switchHeight;
};
var getKnobSize = (props) => {
  return sizes2[props.switchSize].switchHeight - sizes2[props.switchSize].knobOffset * 2;
};
var SwitchLabel = styled26.label`
  display: block;
  position: relative;
`;
var SwitchInput = styled26.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;

  // to overlap SwitchBox and occupy the same space
  z-index: 1;
  margin: 0;
  width: ${(props) => sizes2[props.switchSize].switchWidth}px;
  height: ${(props) => sizes2[props.switchSize].switchHeight}px;

  &:focus-visible ~ .SwitchBox {
    ${getFocusRing()};
  }
  &:not(:checked) {
    & + .SwitchBox {
      background-color: ${colorStyles.track.inactive.enabled};
    }
    &:disabled + .SwitchBox {
      background-color: ${colorStyles.track.inactive.disabled};
    }
  }
  &:checked {
    & + .SwitchBox {
      background-color: ${colorStyles.track.active.enabled};
    }
    &:disabled + .SwitchBox {
      background-color: ${colorStyles.track.active.disabled};
    }
    & + .SwitchBox:after {
      transform: translateX(${(props) => getKnobTravel(props)}px);
    }
  }
  &:disabled {
    pointer-events: none;
  }
`;
var SwitchBox = styled26.div`
  width: ${(props) => sizes2[props.switchSize].switchWidth}px;
  height: ${(props) => sizes2[props.switchSize].switchHeight}px;
  position: relative;
  border-radius: var(--lns-radius-full);
  transition: 0.2s;
  cursor: ${(props) => props.isDisabled ? "default" : "pointer"};
  &:after {
    content: '';
    position: absolute;
    top: ${(props) => sizes2[props.switchSize].knobOffset}px;
    left: ${(props) => sizes2[props.switchSize].knobOffset}px;
    width: ${(props) => getKnobSize(props)}px;
    height: ${(props) => getKnobSize(props)}px;
    border-radius: var(--lns-radius-full);
    transition: 0.15s;
    background-color: ${(props) => props.isDisabled ? colorStyles.knob.active.disabled : colorStyles.knob.active.enabled};
  }
`;
var Switch = (_a) => {
  var _b = _a, {
    isActive,
    isDisabled,
    onChange,
    size = "medium",
    ariaLabelledby,
    ariaLabel
  } = _b, props = __objRest(_b, [
    "isActive",
    "isDisabled",
    "onChange",
    "size",
    "ariaLabelledby",
    "ariaLabel"
  ]);
  if (ariaLabelledby && ariaLabel) {
    throw new Error(
      "ariaLabelledby and ariaLabel serve the same purpose and therefore cannot be used at the same time. Choose the one that best suites your needs."
    );
  }
  return /* @__PURE__ */ React32.createElement(SwitchLabel, { htmlFor: props.id }, /* @__PURE__ */ React32.createElement(
    SwitchInput,
    __spreadProps(__spreadValues({}, props), {
      checked: isActive,
      disabled: isDisabled,
      onChange,
      type: "checkbox",
      switchSize: size,
      "aria-labelledby": ariaLabelledby,
      "aria-label": ariaLabel,
      "aria-checked": isActive
    })
  ), /* @__PURE__ */ React32.createElement(
    SwitchBox,
    {
      className: "SwitchBox",
      isDisabled,
      isActive,
      switchSize: size
    }
  ));
};
var switch_default = Switch;

// src/components/form-field/form-field.tsx
var directionStyles = {
  row: {
    wrapper: {
      display: "grid",
      gridTemplateColumns: "auto 1fr",
      alignItems: "center"
    },
    label: { marginLeft: "var(--lns-space-small)" },
    errorMessage: { marginLeft: "var(--lns-space-small)" }
  },
  "row-reverse": {
    wrapper: {
      display: "grid",
      gridTemplateColumns: "1fr auto",
      alignItems: "center"
    },
    label: {}
  },
  column: {
    wrapper: {},
    label: { marginBottom: "var(--lns-space-xsmall)" }
  }
};
var FormFieldWrapper = styled27.div`
  ${(props) => props.direction && directionStyles[props.direction].wrapper};
`;
var Label = styled27.label`
  display: block;
  ${(props) => {
  var _a;
  return props.direction && ((_a = directionStyles[props.direction]) == null ? void 0 : _a.label);
}};
  ${(props) => props.isLabelClickable && "cursor: pointer"};
`;
var ErrorMessage3 = styled27.span`
  color: var(--lns-color-red);
  margin-top: var(--lns-space-xsmall);
  display: block;
  width: 100%;
  grid-column-start: 1;
  grid-column-end: 3;
`;
var interactiveComponents = [
  radio_default,
  checkbox_default,
  switch_default
];
var isInteractiveComponent = (component) => {
  return interactiveComponents.includes(component);
};
var FormField = (_a) => {
  var _b = _a, {
    label,
    children,
    errorMessage,
    labelFor,
    direction = "column"
  } = _b, props = __objRest(_b, [
    "label",
    "children",
    "errorMessage",
    "labelFor",
    "direction"
  ]);
  const isLabelClickable = React33.Children.toArray(children).some(
    (child) => isValidElement(child) && // The child might be a div, span, etc (type string) so we
    // have to typeguard before we check if our child is of interactive
    typeof child.type !== "string" && isInteractiveComponent(child.type)
  );
  const labelElement = label && /* @__PURE__ */ React33.createElement(
    Label,
    {
      direction,
      htmlFor: labelFor,
      isLabelClickable
    },
    label
  );
  return /* @__PURE__ */ React33.createElement(FormFieldWrapper, __spreadValues({ direction }, props), direction === "row" && /* @__PURE__ */ React33.createElement(React33.Fragment, null, children, labelElement), direction === "column" && /* @__PURE__ */ React33.createElement(React33.Fragment, null, labelElement, children), direction === "row-reverse" && /* @__PURE__ */ React33.createElement(React33.Fragment, null, labelElement, children), errorMessage && /* @__PURE__ */ React33.createElement(ErrorMessage3, null, errorMessage));
};
var form_field_default = FormField;

// src/components/notification-bar/notification-bar.tsx
import styled28 from "@emotion/styled";
import React37, { useEffect as useEffect7 } from "react";

// src/hooks/use-on-click-outside.js
import React34 from "react";
function useOnClickOutside(ref, handler) {
  React34.useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

// src/hooks/use-focused-element.tsx
import { useCallback as useCallback3, useEffect as useEffect6, useState as useState4 } from "react";
function useFocusedElement(ref) {
  const [isFocused, setIsFocused] = useState4(false);
  const handleFocus = useCallback3(
    (e) => {
      const currentRef = ref.current;
      if (e.type === "focusin" && e.target === currentRef) {
        setIsFocused(true);
      }
    },
    [ref]
  );
  const handleBlur = useCallback3(
    (e) => {
      const currentRef = ref.current;
      if (e.type === "focusout" && e.target === currentRef) {
        setIsFocused(false);
      }
    },
    [ref]
  );
  useEffect6(() => {
    document.addEventListener("focusin", handleFocus);
    document.addEventListener("focusout", handleBlur);
    return () => {
      document.removeEventListener("focusin", handleFocus);
      document.removeEventListener("focusout", handleBlur);
    };
  }, [handleFocus, handleBlur]);
  return Boolean(isFocused);
}

// src/hooks/use-push-page-down.ts
import { useLayoutEffect as useLayoutEffect2 } from "react";
function usePushPageDown(enabled) {
  const safeDocument = document;
  useLayoutEffect2(() => {
    const html = safeDocument == null ? void 0 : safeDocument.documentElement;
    const body = safeDocument == null ? void 0 : safeDocument.body;
    if (safeDocument == void 0 || !html || !body) {
      return;
    }
    if (enabled) {
      body.style.setProperty("padding-top", "3.25rem");
      body.style.setProperty("transition", "padding-top 350ms");
    }
    return () => {
      body.style.removeProperty("padding-top");
    };
  }, [safeDocument, enabled]);
}
var use_push_page_down_default = usePushPageDown;

// src/components/icon/available-icons/info.tsx
import InformationCircleIcon from "@atlaskit/icon/core/information-circle";
import * as React35 from "react";
function SvgInfo() {
  return /* @__PURE__ */ React35.createElement(InformationCircleIcon, { label: "", testId: "ads-refreshed-icon" });
}

// src/components/icon/available-icons/warning-alert.tsx
import React36 from "react";
var SvgWarningAlert = (props) => /* @__PURE__ */ React36.createElement("svg", __spreadValues({ viewBox: "0 0 24 24", fill: "none" }, props), /* @__PURE__ */ React36.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M7.42 2.293A1 1 0 0 1 8.127 2h7.245a1 1 0 0 1 .708.293l5.127 5.127a1 1 0 0 1 .293.707v7.245a1 1 0 0 1-.293.708l-5.127 5.127a1 1 0 0 1-.707.293H8.128a1 1 0 0 1-.708-.293L2.293 16.08A1 1 0 0 1 2 15.373V8.128a1 1 0 0 1 .293-.708L7.42 2.293ZM8.542 4 4 8.542v6.416L8.542 19.5h6.416l4.542-4.542V8.542L14.958 4H8.542Zm2.208 11.25a1 1 0 0 1 1-1h.009a1 1 0 1 1 0 2h-.009a1 1 0 0 1-1-1Zm2-7a1 1 0 1 0-2 0v3.5a1 1 0 1 0 2 0v-3.5Z"
  }
));

// src/components/notification-bar/notification-bar.tsx
var severityStyles = {
  info: {
    bgColor: "var(--lns-color-blurple)",
    icon: /* @__PURE__ */ React37.createElement(SvgInfo, null),
    color: "var(--lns-color-white)",
    fontFamily: "inherit"
  },
  warning: {
    bgColor: "var(--lns-color-warning)",
    icon: /* @__PURE__ */ React37.createElement(SvgWarningAlert, null),
    color: "var(--lns-color-grey8)",
    fontFamily: "inherit"
  },
  error: {
    bgColor: "var(--lns-color-danger)",
    icon: /* @__PURE__ */ React37.createElement(SvgAlertTriangle, null),
    color: "var(--lns-color-white)",
    fontFamily: "inherit"
  },
  internal: {
    icon: /* @__PURE__ */ React37.createElement("span", { role: "img" }, "\u{1F514}"),
    color: "var(--lns-color-tealLight)",
    bgColor: "var(--lns-color-grey8)",
    fontFamily: "var(--lns-fontFamily-code)"
  }
};
var DURATION = 350;
var NotificationBarWrapper = styled28.aside`
  --paddingXOffset: var(--lns-space-large);
  --alignItems: start;

  display: grid;
  align-items: var(--alignItems);
  justify-content: space-between;
  grid-template-columns: 1fr auto;
  ${(props) => `background-color: ${severityStyles[props.severity].bgColor}`};
  ${(props) => `font-family: ${severityStyles[props.severity].fontFamily}`};

  ${(props) => `color: ${severityStyles[props.severity].color}`};
  position: fixed;
  padding: var(--lns-space-medium) var(--paddingXOffset);
  top: 0;
  left: 0;
  transition:
    ${DURATION}ms box-shadow,
    ${DURATION}ms transform;
  width: 100%;
  box-sizing: border-box;
  z-index: 1100;
  opacity: ${(props) => props.isOpen ? "1" : "0"};
  transform: ${(props) => props.isOpen ? "translateY(0px)" : "translateY(-100%)"};
  @media (min-width: 872px) {
    --alignItems: center;
  }
`;
var NotificationBar = ({
  children,
  onCloseClick,
  isOpen,
  severity = "info",
  id
}) => {
  var _a, _b, _c;
  useEffect7(() => {
    if (!isOpen) {
      return;
    }
    const keyListener = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseClick && onCloseClick();
      }
    };
    window.addEventListener("keydown", keyListener);
    return () => {
      window.removeEventListener("keydown", keyListener);
    };
  }, [isOpen, onCloseClick]);
  use_push_page_down_default(isOpen);
  const isInternalAlert = severity === "internal";
  return isOpen ? /* @__PURE__ */ React37.createElement(NotificationBarWrapper, { isOpen, severity, id }, /* @__PURE__ */ React37.createElement(
    arrange_default,
    {
      alignItems: { default: "start", small: "center" },
      justifyContent: "space-between",
      autoFlow: isInternalAlert ? "column" : void 0,
      columns: !isInternalAlert ? ["1fr auto"] : void 0
    },
    /* @__PURE__ */ React37.createElement(
      container_default,
      {
        paddingY: { default: "xsmall", xsmall: 0 },
        paddingLeft: !isInternalAlert ? { default: 0, medium: u(3.5) } : void 0,
        width: "100%"
      },
      /* @__PURE__ */ React37.createElement(
        arrange_default,
        {
          autoFlow: "column",
          gap: isInternalAlert ? "medium" : "small",
          justifyContent: "center"
        },
        ((_a = severityStyles[severity]) == null ? void 0 : _a.icon) ? /* @__PURE__ */ React37.createElement(align_default, { alignment: "topLeft" }, /* @__PURE__ */ React37.createElement(
          icon_default,
          {
            icon: severityStyles[severity].icon,
            color: (_b = severityStyles[severity].color) != null ? _b : "var(--lns-color-white)"
          }
        )) : null,
        " ",
        children
      )
    )
  ), onCloseClick && /* @__PURE__ */ React37.createElement(
    icon_button_default,
    {
      iconColor: (_c = severityStyles[severity].color) != null ? _c : "var(--lns-color-white)",
      tabIndex: 0,
      altText: "Close",
      icon: /* @__PURE__ */ React37.createElement(SvgClose, null),
      onClick: onCloseClick
    }
  )) : null;
};
var notification_bar_default = NotificationBar;

// src/components/toast/toast.tsx
import { keyframes as keyframes2 } from "@emotion/react";
import styled29 from "@emotion/styled";
import React38, { useEffect as useEffect8 } from "react";
var WEBAPP = "web-app";
var CHROME_EXTENSION = "chrome-extension";
var toastDurations = { short: 3e3, long: 8e3 };
var enter = (toastDuration, platform) => keyframes2`
  0% {
    opacity: 0;
    transform: translate(-50%, ${u(platform === CHROME_EXTENSION ? -8 : 8)});
  }
  // (300 / toastDuration) * 100 evaluates to 10% for short. Longer durations will have the same speed of animation
  ${300 / toastDuration * 100}% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
  // 100 - (300 / toastDuration) * 100 evaluates to 90% for short. Longer durations will have the same speed of animation
  ${100 - 300 / toastDuration * 100}% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;
var getTop = (platform) => {
  switch (platform) {
    case WEBAPP:
      return "unset";
    case CHROME_EXTENSION:
      return u(4);
    default:
      return "unset";
  }
};
var getBottom = (platform) => {
  switch (platform) {
    case WEBAPP:
      return u(4);
    case CHROME_EXTENSION:
      return "unset";
    default:
      return u(4);
  }
};
var ToastWrapper = styled29.div`
  animation: ${(props) => enter(props.toastDuration, props.platform)}
    ${(props) => props.toastDuration}ms forwards;
  background-color: ${getColorValue("backgroundInverse")};
  ${getRadius("250")};
  top: ${(props) => getTop(props.platform)};
  bottom: ${(props) => getBottom(props.platform)};
  ${getShadow("large")};
  color: ${getColorValue("bodyInverse")};
  display: grid;
  grid-auto-flow: column;
  gap: var(--lns-space-small);
  justify-content: space-between;
  left: 50%;
  max-width: ${u(50)}; // Fallback when min() function is not supported
  max-width: min(90%, ${u(50)});
  padding: ${u(1.5)} var(--lns-space-medium) ${u(1.5)} var(--lns-space-large);
  position: fixed;
  transform: translateX(-50%);
  width: max-content;
  z-index: ${(props) => props.zIndex};
`;
var ChildrenSection3 = styled29.div`
  align-self: center;
`;
var Toast = ({
  children,
  isOpen,
  onCloseClick,
  zIndex = 1100,
  duration: duration2 = "short",
  platform = "web-app"
}) => {
  const toastDuration = toastDurations[duration2];
  useEffect8(() => {
    const timer = setTimeout(() => {
      if (isOpen) {
        onCloseClick();
      }
    }, toastDuration);
    return () => clearTimeout(timer);
  }, [isOpen]);
  return /* @__PURE__ */ React38.createElement(React38.Fragment, null, isOpen && /* @__PURE__ */ React38.createElement(
    ToastWrapper,
    {
      role: "presentation",
      onClick: (e) => e.stopPropagation(),
      zIndex,
      isOpen,
      toastDuration,
      platform
    },
    /* @__PURE__ */ React38.createElement(ChildrenSection3, { "aria-live": "polite" }, children),
    onCloseClick && /* @__PURE__ */ React38.createElement(
      icon_button_default,
      {
        altText: "Close",
        icon: /* @__PURE__ */ React38.createElement(SvgClose, null),
        onClick: onCloseClick,
        iconColor: "bodyInverse"
      }
    )
  ));
};
var toast_default = Toast;

// src/components/tooltip/tooltip.tsx
import styled30 from "@emotion/styled";
import React39, { useState as useState5, useRef as useRef3, useEffect as useEffect9 } from "react";
import { useHover, useLayer as useLayer4, mergeRefs } from "react-laag";
import ResizeObserver4 from "resize-observer-polyfill";
var placements = {
  topLeft: "top-start",
  topCenter: "top-center",
  topRight: "top-end",
  bottomLeft: "bottom-start",
  bottomCenter: "bottom-center",
  bottomRight: "bottom-end",
  leftTop: "left-start",
  leftCenter: "left-center",
  leftBottom: "left-end",
  rightTop: "right-start",
  rightCenter: "right-center",
  rightBottom: "right-end"
};
var tooltipMinHeight = 4;
var textHeight = textSizes.small.fontSize * textSizes.small.lineHeight;
var tooltipYPadding = (tooltipMinHeight - textHeight) / 2;
var TooltipBoxWrapper = styled30.div`
  background-color: ${getColorValue("backgroundInverse")};
  color: ${getColorValue("bodyInverse")};
  ${getRadius("150")};
  ${getFontWeight("bold")};
  ${getTextSize("small")};
  ${getShadow("medium")};
  ${(props) => getSize("max-width", props.maxWidth)};
  z-index: 1100;
  padding: ${u(tooltipYPadding)} ${u(1.5)};
  z-index: ${(props) => props.zIndex};
`;
var ShortcutWrapper = styled30.div`
  background-color: ${getColorValue("grey7")};
  border-radius: 3px;
  color: ${getColorValue("grey3")};
  ${getFontWeight("bold")};
  ${getTextSize("small")};
  padding-left: ${u(0.5)};
  padding-right: ${u(0.5)};
`;
var ShortcutBox = ({
  children
}) => /* @__PURE__ */ React39.createElement(ShortcutWrapper, null, children);
var TooltipBox = (_a) => {
  var _b = _a, {
    children,
    maxWidth,
    onMouseEnter,
    onMouseLeave,
    layerProps,
    zIndex
  } = _b, rest = __objRest(_b, [
    "children",
    "maxWidth",
    "onMouseEnter",
    "onMouseLeave",
    "layerProps",
    "zIndex"
  ]);
  return (
    // These are being added to hide the tooltip when users hover over
    /* eslint-disable-next-line styled-components-a11y/no-static-element-interactions */
    /* @__PURE__ */ React39.createElement(
      TooltipBoxWrapper,
      __spreadValues(__spreadValues({
        maxWidth,
        onMouseEnter,
        onMouseLeave,
        zIndex
      }, layerProps), rest),
      children
    )
  );
};
var TooltipChildren = styled30.div`
  display: ${(props) => props.isInline ? "inline-block" : "block"};
  ${(props) => props.verticalAlign && `vertical-align: ${props.verticalAlign}`};
  &:focus-visible {
    // Note: 0px solid transparent prevents focus rings from disappearing for -ms-high-contrast.
    // TODO(LNS-183): Provide more robust polyfill/support for :focus for older versions of Safari, which don't support :focus-visible
    outline: 0px solid transparent;
    box-shadow: var(--lns-formFieldBorderShadowFocus);
  }
`;
function getInitialDelaySpeed(delay) {
  switch (delay) {
    case "immediate":
      return 200;
    case "long":
      return 800;
    default:
      return 200;
  }
}
var Tooltip = (_a) => {
  var _b = _a, {
    ariaLive = false,
    children,
    content,
    shortcut,
    placement = "topCenter",
    keepOpen,
    triggerOffset = 4,
    maxWidth = 26,
    isInline = true,
    isDisabled,
    container,
    tabIndex = 0,
    zIndex = 1100,
    verticalAlign = "middle",
    delay = "immediate",
    tooltipId
  } = _b, rest = __objRest(_b, [
    "ariaLive",
    "children",
    "content",
    "shortcut",
    "placement",
    "keepOpen",
    "triggerOffset",
    "maxWidth",
    "isInline",
    "isDisabled",
    "container",
    "tabIndex",
    "zIndex",
    "verticalAlign",
    "delay",
    "tooltipId"
  ]);
  const [show, hoverProps] = useHover({
    delayEnter: getInitialDelaySpeed(delay),
    delayLeave: 200
  });
  const [isOverTooltip, setIsOverTooltip] = useState5(false);
  const [isOpen, setIsOpen] = useState5(false);
  const [enterOrSpaceKeyDown, setEnterOrSpaceKeyDown] = useState5(false);
  const focusRef = useRef3();
  const isTooltipDisabled = !content || isDisabled;
  useEffect9(() => {
    if (isTooltipDisabled) {
      setIsOpen(false);
      return;
    }
    const keepTooltipOpenOnHover = isOverTooltip && keepOpen;
    if (show || keepTooltipOpenOnHover) {
      setIsOpen(true);
    }
    if (!show && !keepTooltipOpenOnHover && !enterOrSpaceKeyDown) {
      setIsOpen(false);
    }
  }, [
    content,
    isDisabled,
    isOverTooltip,
    isTooltipDisabled,
    keepOpen,
    setIsOpen,
    show,
    enterOrSpaceKeyDown
  ]);
  const handleFocus = () => {
    setEnterOrSpaceKeyDown(false);
    if (!isTooltipDisabled) {
      setIsOpen(true);
    }
  };
  const handleBlur = () => {
    setIsOpen(false);
    setEnterOrSpaceKeyDown(false);
  };
  useEffect9(() => {
    if (!isOpen) {
      return;
    }
    const keyListener = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleBlur();
      }
    };
    window.addEventListener("keydown", keyListener);
    return () => {
      window.removeEventListener("keydown", keyListener);
    };
  }, [isOpen, setIsOpen]);
  const { layerProps, triggerProps, renderLayer } = useLayer4({
    isOpen,
    placement: placements[placement],
    ResizeObserver: ResizeObserver4,
    triggerOffset,
    container,
    auto: true
  });
  return /* @__PURE__ */ React39.createElement(React39.Fragment, null, /* @__PURE__ */ React39.createElement(
    TooltipChildren,
    __spreadProps(__spreadValues(__spreadValues({}, triggerProps), hoverProps), {
      onClick: (e) => {
        if (e.detail === 0) {
          setEnterOrSpaceKeyDown(true);
        }
      },
      onFocus: handleFocus,
      onBlur: handleBlur,
      isInline,
      verticalAlign,
      tabIndex: isTooltipDisabled ? -1 : tabIndex,
      ref: mergeRefs(triggerProps.ref, focusRef)
    }),
    children
  ), ariaLive && /* @__PURE__ */ React39.createElement("span", { className: "srOnly", "aria-live": "polite" }, isOpen && content), isOpen && renderLayer(
    /* @__PURE__ */ React39.createElement("div", __spreadProps(__spreadValues({}, layerProps), { style: __spreadProps(__spreadValues({}, layerProps.style), { zIndex }) }), /* @__PURE__ */ React39.createElement(
      TooltipBox,
      __spreadValues({
        maxWidth,
        onMouseEnter: () => setIsOverTooltip(true),
        onMouseLeave: () => setIsOverTooltip(false),
        role: "tooltip",
        id: tooltipId
      }, rest),
      /* @__PURE__ */ React39.createElement(arrange_default, { gap: "small" }, /* @__PURE__ */ React39.createElement(text_default, { size: "small", fontWeight: "bold" }, content), shortcut && /* @__PURE__ */ React39.createElement(arrange_default, { gap: "xsmall" }, shortcut.map((char, index) => /* @__PURE__ */ React39.createElement(ShortcutBox, { key: index }, char))))
    ))
  ));
};
var availablePlacements = Object.keys(placements);
var tooltip_default = Tooltip;

// src/components/skeleton/skeleton.tsx
import { css as css4 } from "@emotion/react";
import styled31 from "@emotion/styled";
import React40 from "react";
var SkeletonAnimation = css4`
  @media (prefers-reduced-motion: no-preference) {
    animation: shimmer 2s infinite linear;
    background: linear-gradient(
      to right,
      var(--lns-color-disabledBackground) 4%,
      var(--lns-color-backgroundHover) 25%,
      var(--lns-color-disabledBackground) 36%
    );
    background-size: 1000px 100%;
    @keyframes shimmer {
      0% {
        background-position: -1000px 0;
      }
      100% {
        background-position: 1000px 0;
      }
    }
  }
`;
var SkeletonTextWrapper = styled31.div`
  ${(props) => getTextSize(props.size)};
  color: transparent;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    background-color: var(--lns-color-disabledBackground);
    border-radius: var(--lns-radius-full);
    width: 100%;
    display: block;
    height: 71.45%;
    top: 0.2em;
    ${(props) => props.animated && SkeletonAnimation}
  }

  ${(props) => props.lines > 1 && `
      &:nth-of-type(3n+1) {
        width: calc(100% - 2.25rem);
      }
      &:nth-of-type(3n) {
        width: calc(100% - 4.125rem);
      }
    }
  `};
`;
var SkeletonContainerWrapper = styled31.div`
  background-color: var(--lns-color-disabledBackground);
  ${(props) => getRadius(props.radius)};
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  ${(props) => props.animated && SkeletonAnimation}
`;
var SkeletonText = ({
  size = "body-md",
  lines = 1,
  animated = false
}) => {
  return /* @__PURE__ */ React40.createElement(React40.Fragment, null, [...Array(lines)].map((_, i) => /* @__PURE__ */ React40.createElement(
    SkeletonTextWrapper,
    {
      key: i,
      size,
      lines,
      animated
    },
    "Loading"
  )));
};
var SkeletonContainer = ({
  animated = false,
  height = "40px",
  radius = "full",
  width = "40px"
}) => {
  return /* @__PURE__ */ React40.createElement(React40.Fragment, null, /* @__PURE__ */ React40.createElement(
    SkeletonContainerWrapper,
    {
      animated,
      height,
      radius,
      width
    }
  ));
};

// src/components/logo/logo.tsx
import styled32 from "@emotion/styled";
import React41 from "react";
var LoomAiGradientDef = (customId) => {
  return /* @__PURE__ */ React41.createElement("defs", null, /* @__PURE__ */ React41.createElement(
    "radialGradient",
    {
      id: `ai-logo-${customId}-gradient-1`,
      cx: "50%",
      cy: "50%",
      r: "100%",
      fx: "0%",
      fy: "0%"
    },
    /* @__PURE__ */ React41.createElement("stop", { offset: "30%", stopColor: "#97ACFD" }),
    /* @__PURE__ */ React41.createElement("stop", { offset: "33%", stopColor: "#B3B2F4" }),
    /* @__PURE__ */ React41.createElement("stop", { offset: "43%", stopColor: "#DEB0E0" }),
    /* @__PURE__ */ React41.createElement("stop", { offset: "50%", stopColor: "#DFC6E5" }),
    /* @__PURE__ */ React41.createElement("stop", { offset: "72%", stopColor: "#6663F6" })
  ), /* @__PURE__ */ React41.createElement(
    "radialGradient",
    {
      id: `ai-logo-${customId}-gradient-2`,
      r: "100%",
      fx: "40%",
      fy: "72%"
    },
    /* @__PURE__ */ React41.createElement("stop", { offset: "20%", stopColor: "#615CF500" }),
    /* @__PURE__ */ React41.createElement("stop", { offset: "32%", stopColor: "#615CF550" }),
    /* @__PURE__ */ React41.createElement("stop", { offset: "48%", stopColor: "#6663F6" })
  ), /* @__PURE__ */ React41.createElement(
    "radialGradient",
    {
      id: `ai-logo-${customId}-gradient-3`,
      r: "100%",
      fx: "0%",
      fy: "100%"
    },
    /* @__PURE__ */ React41.createElement("stop", { offset: "25%", stopColor: "#6663F6" }),
    /* @__PURE__ */ React41.createElement("stop", { offset: "38%", stopColor: "#6E68F450" }),
    /* @__PURE__ */ React41.createElement("stop", { offset: "45%", stopColor: "#6E68F400" })
  ));
};
var symbolLogoPath = "M30 15.4433C30 16.6091 29.0933 16.8581 27.9562 16.9301C22.5158 17.2323 16.7962 22.686 16.4795 28.112C16.422 29.2634 16.173 30.1702 15.0072 30.1702C13.8414 30.1702 13.578 29.2634 13.5205 28.0976C13.2038 22.686 7.48416 17.2323 2.05814 16.9301C0.906735 16.8581 0 16.6091 0 15.4433C0 14.2775 0.906735 14.043 2.05814 13.971C7.48416 13.6687 13.2038 7.65433 13.5205 2.22831C13.578 1.0769 13.827 0.170166 15.0072 0.170166C16.1874 0.170166 16.422 1.0769 16.4795 2.22831C16.7962 7.65433 22.5158 13.6687 27.9419 13.971C29.0933 14.043 30 14.2919 30 15.4433Z";
var SymbolLogoSvg = (_a) => {
  var _b = _a, { brand, symbolColor, customId } = _b, props = __objRest(_b, ["brand", "symbolColor", "customId"]);
  switch (brand) {
    case "ai":
      return /* @__PURE__ */ React41.createElement("svg", __spreadValues({ "aria-label": "Loom AI", viewBox: "0 0 30 31", fill: "none" }, props), /* @__PURE__ */ React41.createElement("title", null, "Loom AI"), !symbolColor ? /* @__PURE__ */ React41.createElement(React41.Fragment, null, LoomAiGradientDef(customId), [...Array(3)].map((_, i) => /* @__PURE__ */ React41.createElement(
        "path",
        {
          key: i,
          d: symbolLogoPath,
          fill: `url(#ai-logo-${customId}-gradient-${i + 1}`
        }
      ))) : /* @__PURE__ */ React41.createElement("path", { d: symbolLogoPath, fill: getColorValue(symbolColor) }));
    case "apptile":
      return /* @__PURE__ */ React41.createElement("svg", __spreadValues({ "aria-label": "Loom", viewBox: "0 0 40 40", fill: "none" }, props), /* @__PURE__ */ React41.createElement("title", null, "Loom"), /* @__PURE__ */ React41.createElement(
        "path",
        {
          d: "M0 12C0 5.37258 5.37258 0 12 0H28C34.6274 0 40 5.37258 40 12V28C40 34.6274 34.6274 40 28 40H12C5.37258 40 0 34.6274 0 28V12Z",
          fill: symbolColor ? getColorValue(symbolColor) : getColorValue("blurple")
        }
      ), /* @__PURE__ */ React41.createElement(
        "path",
        {
          d: "M32.3962 18.6213H25.1467L31.4251 14.9965L30.0463 12.6077L23.768 16.2325L27.392 9.95464L25.0032 8.57506L21.3792 14.8529V7.604H18.6215V14.8536L14.9961 8.57506L12.6081 9.95395L16.2327 16.2318L9.95437 12.6077L8.57552 14.9958L14.8539 18.6206H7.60449V21.3784H14.8532L8.57552 25.0032L9.95437 27.392L16.2321 23.7679L12.6074 30.0457L14.9961 31.4246L18.6208 25.1461V32.3957H21.3785V25.1468L25.0025 31.4246L27.3912 30.0457L23.7665 23.7672L30.0449 27.392L31.4238 25.0032L25.1461 21.3791H32.3947V18.6213H32.3962ZM20.0003 23.7505C17.921 23.7505 16.2355 22.0651 16.2355 19.9856C16.2355 17.9062 17.921 16.2207 20.0003 16.2207C22.0797 16.2207 23.7651 17.9062 23.7651 19.9856C23.7651 22.0651 22.0797 23.7505 20.0003 23.7505Z",
          fill: "white"
        }
      ));
    default:
      return /* @__PURE__ */ React41.createElement("svg", __spreadValues({ "aria-label": "Loom", viewBox: "0 0 31 30", fill: "none" }, props), /* @__PURE__ */ React41.createElement("title", null, "Loom"), /* @__PURE__ */ React41.createElement(
        "path",
        {
          d: "M30.01 13.43h-9.142l7.917-4.57-1.57-2.72-7.918 4.57 4.57-7.915-2.72-1.57-4.571 7.913V0h-3.142v9.139L8.863 1.225l-2.721 1.57 4.57 7.913L2.796 6.14 1.225 8.86l7.917 4.57H0v3.141h9.141l-7.916 4.57 1.57 2.72 7.918-4.57-4.571 7.915 2.72 1.57 4.572-7.914V30h3.142v-9.334l4.655 8.06 2.551-1.472-4.656-8.062 8.087 4.668 1.571-2.72-7.916-4.57h9.141v-3.14h.001zm-15.005 5.84a4.271 4.271 0 11-.001-8.542 4.271 4.271 0 01.001 8.542z",
          fill: symbolColor ? getColorValue(symbolColor) : getColorValue("primary")
        }
      ));
  }
};
var WordmarkLogoSvg = (_a) => {
  var _b = _a, { brand, wordmarkColor } = _b, props = __objRest(_b, ["brand", "wordmarkColor"]);
  switch (brand) {
    case "ai":
      return /* @__PURE__ */ React41.createElement(
        "svg",
        __spreadValues({
          "aria-label": "Loom AI",
          viewBox: "0 0 94 23",
          fill: wordmarkColor
        }, props),
        /* @__PURE__ */ React41.createElement("title", null, "Loom AI"),
        /* @__PURE__ */ React41.createElement("path", { d: "M4.12637 22.4624H0V0H4.12637V22.4624Z" }),
        /* @__PURE__ */ React41.createElement("path", { d: "M13.3999 19.1737C15.4166 19.1737 17.2781 17.7155 17.2781 14.8301C17.2781 11.9448 15.4166 10.4866 13.3999 10.4866C11.3833 10.4866 9.52175 11.9448 9.52175 14.8301C9.52175 17.6845 11.3833 19.1737 13.3999 19.1737ZM13.3999 6.7325C17.9606 6.7325 21.4045 10.1143 21.4045 14.8301C21.4045 19.515 17.9606 22.9277 13.3999 22.9277C8.83919 22.9277 5.39538 19.515 5.39538 14.8301C5.39538 10.1143 8.83919 6.7325 13.3999 6.7325Z" }),
        /* @__PURE__ */ React41.createElement("path", { d: "M29.7548 19.1737C31.7714 19.1737 33.6329 17.7155 33.6329 14.8301C33.6329 11.9448 31.7714 10.4866 29.7548 10.4866C27.7381 10.4866 25.8766 11.9448 25.8766 14.8301C25.8766 17.6845 27.7381 19.1737 29.7548 19.1737ZM29.7548 6.7325C34.3155 6.7325 37.7593 10.1143 37.7593 14.8301C37.7593 19.515 34.3155 22.9277 29.7548 22.9277C25.194 22.9277 21.7502 19.515 21.7502 14.8301C21.7502 10.1143 25.194 6.7325 29.7548 6.7325Z" }),
        /* @__PURE__ */ React41.createElement("path", { d: "M43.1622 22.4624H39.0358V7.19788H42.976V9.05941C43.8137 7.57019 45.7683 6.76353 47.4437 6.76353C49.5224 6.76353 51.1978 7.66326 51.9734 9.30761C53.1834 7.44609 54.7967 6.76353 56.8134 6.76353C59.6367 6.76353 62.3359 8.46992 62.3359 12.5653V22.4624H58.3336V13.403C58.3336 11.7586 57.5269 10.5176 55.6344 10.5176C53.8659 10.5176 52.8111 11.8827 52.8111 13.5271V22.4624H48.7157V13.403C48.7157 11.7586 47.878 10.5176 46.0165 10.5176C44.2171 10.5176 43.1622 11.8517 43.1622 13.5271V22.4624Z" }),
        /* @__PURE__ */ React41.createElement("path", { d: "M84.1324 22.4624L82.3019 17.4363H73.3666L71.5361 22.4624H67.0064L75.4453 0.46538H80.4093L88.7862 22.4624H84.1324ZM77.8342 5.21226L74.7937 13.5271H80.8747L77.8342 5.21226Z" }),
        /* @__PURE__ */ React41.createElement("path", { d: "M94 22.4624H89.6565V0.46538H94V22.4624Z" })
      );
    default:
      return /* @__PURE__ */ React41.createElement(
        "svg",
        __spreadValues({
          "aria-label": "Loom",
          viewBox: "0 0 62 23",
          fill: wordmarkColor
        }, props),
        /* @__PURE__ */ React41.createElement("title", null, "Loom"),
        /* @__PURE__ */ React41.createElement("path", { d: "M.109 21.973V.027h4.028v21.946H.109zM38.742 7.059h3.846v1.82c.818-1.456 2.727-2.244 4.362-2.244 2.03 0 3.665.88 4.422 2.485 1.18-1.82 2.756-2.485 4.725-2.485 2.756 0 5.39 1.667 5.39 5.668v9.67h-3.906v-8.851c0-1.607-.788-2.82-2.636-2.82-1.727 0-2.757 1.335-2.757 2.942v8.73h-3.997v-8.852c0-1.607-.817-2.82-2.635-2.82-1.757 0-2.787 1.305-2.787 2.942v8.73h-4.027V7.059zM13.24 22.405c-4.537 0-7.824-3.367-7.824-7.889 0-4.45 3.276-7.896 7.824-7.896 4.57 0 7.824 3.478 7.824 7.896 0 4.49-3.288 7.889-7.824 7.889zm0-12.135a4.25 4.25 0 00-4.244 4.247 4.25 4.25 0 004.244 4.247 4.25 4.25 0 004.243-4.247 4.25 4.25 0 00-4.243-4.247zM29.667 22.405c-4.538 0-7.824-3.367-7.824-7.889 0-4.45 3.276-7.896 7.824-7.896 4.57 0 7.824 3.478 7.824 7.896 0 4.49-3.29 7.889-7.824 7.889zm0-12.186a4.3 4.3 0 00-4.293 4.296 4.3 4.3 0 004.293 4.296 4.3 4.3 0 004.293-4.296 4.3 4.3 0 00-4.293-4.296z" })
      );
  }
};
var combinedLogoPath = "M100 7.76427C100 8.35691 99.539 8.48348 98.961 8.52007C96.1953 8.67371 93.2877 11.4461 93.1267 14.2045C93.0975 14.7898 92.9709 15.2508 92.3783 15.2508C91.7856 15.2508 91.6517 14.7898 91.6225 14.1972C91.4615 11.4461 88.5539 8.67371 85.7955 8.52007C85.2102 8.48348 84.7492 8.35691 84.7492 7.76427C84.7492 7.17162 85.2102 7.05237 85.7955 7.01578C88.5539 6.86213 91.4615 3.80464 91.6225 1.04628C91.6517 0.460948 91.7783 0 92.3783 0C92.9782 0 93.0975 0.460948 93.1267 1.04628C93.2877 3.80464 96.1953 6.86213 98.9537 7.01578C99.539 7.05237 100 7.17894 100 7.76427Z";
var CombinedLogoSvg = (_a) => {
  var _b = _a, {
    brand,
    wordmarkColor,
    symbolColor,
    customId
  } = _b, props = __objRest(_b, [
    "brand",
    "wordmarkColor",
    "symbolColor",
    "customId"
  ]);
  switch (brand) {
    case "ai":
      return /* @__PURE__ */ React41.createElement("svg", __spreadValues({ "aria-label": "Loom AI", viewBox: "0 0 100 30", fill: "none" }, props), /* @__PURE__ */ React41.createElement("title", null, "Loom AI"), !symbolColor ? /* @__PURE__ */ React41.createElement(React41.Fragment, null, LoomAiGradientDef(customId), [...Array(3)].map((_, i) => /* @__PURE__ */ React41.createElement(
        "path",
        {
          key: i,
          d: combinedLogoPath,
          fill: `url(#ai-logo-${customId}-gradient-${i + 1}`
        }
      ))) : /* @__PURE__ */ React41.createElement("path", { d: combinedLogoPath, fill: getColorValue(symbolColor) }), /* @__PURE__ */ React41.createElement("g", { fill: wordmarkColor }, /* @__PURE__ */ React41.createElement("path", { d: "M4.1997 29.5909H0.570312V9.83386H4.1997V29.5909Z" }), /* @__PURE__ */ React41.createElement("path", { d: "M12.3563 26.6983C14.1301 26.6983 15.7674 25.4157 15.7674 22.8778C15.7674 20.34 14.1301 19.0574 12.3563 19.0574C10.5826 19.0574 8.94526 20.34 8.94526 22.8778C8.94526 25.3884 10.5826 26.6983 12.3563 26.6983ZM12.3563 15.7555C16.3678 15.7555 19.3968 18.73 19.3968 22.8778C19.3968 26.9984 16.3678 30.0002 12.3563 30.0002C8.34491 30.0002 5.31587 26.9984 5.31587 22.8778C5.31587 18.73 8.34491 15.7555 12.3563 15.7555Z" }), /* @__PURE__ */ React41.createElement("path", { d: "M26.7414 26.6983C28.5152 26.6983 30.1525 25.4157 30.1525 22.8778C30.1525 20.34 28.5152 19.0574 26.7414 19.0574C24.9676 19.0574 23.3303 20.34 23.3303 22.8778C23.3303 25.3884 24.9676 26.6983 26.7414 26.6983ZM26.7414 15.7555C30.7528 15.7555 33.7819 18.73 33.7819 22.8778C33.7819 26.9984 30.7528 30.0002 26.7414 30.0002C22.73 30.0002 19.7009 26.9984 19.7009 22.8778C19.7009 18.73 22.73 15.7555 26.7414 15.7555Z" }), /* @__PURE__ */ React41.createElement("path", { d: "M38.534 29.5909H34.9047V16.1648H38.3703V17.8022C39.1071 16.4923 40.8263 15.7828 42.2999 15.7828C44.1282 15.7828 45.6018 16.5742 46.284 18.0205C47.3483 16.3831 48.7673 15.7828 50.5411 15.7828C53.0243 15.7828 55.3984 17.2837 55.3984 20.8858V29.5909H51.8782V21.6226C51.8782 20.1763 51.1687 19.0847 49.5041 19.0847C47.9486 19.0847 47.0208 20.2854 47.0208 21.7317V29.5909H43.4187V21.6226C43.4187 20.1763 42.6819 19.0847 41.0446 19.0847C39.4619 19.0847 38.534 20.2581 38.534 21.7317V29.5909Z" }), /* @__PURE__ */ React41.createElement("path", { d: "M74.5698 29.5909L72.9598 25.1701H65.1006L63.4906 29.5909H59.5064L66.929 10.2432H71.2951L78.6631 29.5909H74.5698ZM69.0302 14.4184L66.3559 21.7317H71.7045L69.0302 14.4184Z" }), /* @__PURE__ */ React41.createElement("path", { d: "M83.249 29.5909H79.4285V10.2432H83.249V29.5909Z" })));
    case "apptile":
      return /* @__PURE__ */ React41.createElement("svg", __spreadValues({ "aria-label": "Loom", viewBox: "0 0 103 40", fill: "none" }, props), /* @__PURE__ */ React41.createElement("title", null, "Loom"), /* @__PURE__ */ React41.createElement(
        "path",
        {
          d: "M0 12C0 5.37258 5.37258 0 12 0H28C34.6274 0 40 5.37258 40 12V28C40 34.6274 34.6274 40 28 40H12C5.37258 40 0 34.6274 0 28V12Z",
          fill: symbolColor ? getColorValue(symbolColor) : getColorValue("blurple")
        }
      ), /* @__PURE__ */ React41.createElement(
        "path",
        {
          d: "M32.3962 18.6213H25.1467L31.4251 14.9965L30.0463 12.6077L23.768 16.2325L27.392 9.95464L25.0032 8.57506L21.3792 14.8529V7.604H18.6215V14.8536L14.9961 8.57506L12.6081 9.95395L16.2327 16.2318L9.95437 12.6077L8.57552 14.9958L14.8539 18.6206H7.60449V21.3784H14.8532L8.57552 25.0032L9.95437 27.392L16.2321 23.7679L12.6074 30.0457L14.9961 31.4246L18.6208 25.1461V32.3957H21.3785V25.1468L25.0025 31.4246L27.3912 30.0457L23.7665 23.7672L30.0449 27.392L31.4238 25.0032L25.1461 21.3791H32.3947V18.6213H32.3962ZM20.0003 23.7505C17.921 23.7505 16.2355 22.0651 16.2355 19.9856C16.2355 17.9062 17.921 16.2207 20.0003 16.2207C22.0797 16.2207 23.7651 17.9062 23.7651 19.9856C23.7651 22.0651 22.0797 23.7505 20.0003 23.7505Z",
          fill: "white"
        }
      ), /* @__PURE__ */ React41.createElement("g", { fill: wordmarkColor }, /* @__PURE__ */ React41.createElement("path", { d: "M47.6001 29.5076V10H51.1816V29.5076H47.6001Z" }), /* @__PURE__ */ React41.createElement("path", { d: "M81.9516 16.2509H85.3718V17.8682C86.0987 16.575 87.7961 15.8739 89.2499 15.8739C91.0549 15.8739 92.5086 16.6556 93.1818 18.0832C94.2314 16.4659 95.633 15.8739 97.3834 15.8739C99.8338 15.8739 102.177 17.356 102.177 20.9122V29.5076H98.7027V21.6402C98.7027 20.2119 98.0019 19.1345 96.3591 19.1345C94.8238 19.1345 93.9079 20.3202 93.9079 21.7485V29.5084H90.3541V21.6402C90.3541 20.2119 89.6272 19.1345 88.0104 19.1345C86.4483 19.1345 85.5323 20.2933 85.5323 21.7485V29.5084H81.9516V16.2509Z" }), /* @__PURE__ */ React41.createElement("path", { d: "M59.2755 29.8916C55.2407 29.8916 52.3189 26.899 52.3189 22.8795C52.3189 18.9241 55.2312 15.8603 59.2755 15.8603C63.3394 15.8603 66.232 18.9526 66.232 22.8795C66.232 26.8697 63.3086 29.8916 59.2755 29.8916ZM59.2755 19.1051C57.1944 19.1051 55.5018 20.7983 55.5018 22.8803C55.5018 24.9624 57.1944 26.6555 59.2755 26.6555C61.3565 26.6555 63.0484 24.9624 63.0484 22.8803C63.0484 20.7983 61.3565 19.1051 59.2755 19.1051Z" }), /* @__PURE__ */ React41.createElement("path", { d: "M73.8823 29.8916C69.8476 29.8916 66.9258 26.899 66.9258 22.8795C66.9258 18.9241 69.8381 15.8603 73.8823 15.8603C77.9463 15.8603 80.8389 18.9526 80.8389 22.8795C80.8389 26.8697 77.9139 29.8916 73.8823 29.8916ZM73.8823 19.0601C71.7776 19.0601 70.0652 20.7738 70.0652 22.8788C70.0652 24.9837 71.7776 26.6974 73.8823 26.6974C75.9871 26.6974 77.6995 24.9837 77.6995 22.8788C77.6988 20.7738 75.9863 19.0601 73.8823 19.0601Z" })));
    default:
      return /* @__PURE__ */ React41.createElement("svg", __spreadValues({ "aria-label": "Loom", viewBox: "0 0 100 30", fill: "none" }, props), /* @__PURE__ */ React41.createElement("title", null, "Loom"), /* @__PURE__ */ React41.createElement(
        "path",
        {
          d: "M30.01 13.43h-9.142l7.917-4.57-1.57-2.72-7.918 4.57 4.57-7.915-2.72-1.57-4.571 7.913V0h-3.142v9.139L8.863 1.225l-2.721 1.57 4.57 7.913L2.796 6.14 1.225 8.86l7.917 4.57H0v3.141h9.141l-7.916 4.57 1.57 2.72 7.918-4.57-4.571 7.915 2.72 1.57 4.572-7.914V30h3.142v-9.334l4.655 8.06 2.551-1.472-4.656-8.062 8.087 4.668 1.571-2.72-7.916-4.57h9.141v-3.14h.001zm-15.005 5.84a4.271 4.271 0 11-.001-8.542 4.271 4.271 0 01.001 8.542z",
          fill: symbolColor ? getColorValue(symbolColor) : getColorValue("primary")
        }
      ), /* @__PURE__ */ React41.createElement(
        "path",
        {
          d: "M38.109 25.973V4.027h4.028v21.946h-4.028zM76.742 11.059h3.846v1.82c.818-1.455 2.727-2.244 4.362-2.244 2.03 0 3.665.88 4.422 2.485 1.18-1.82 2.756-2.485 4.725-2.485 2.756 0 5.39 1.667 5.39 5.668v9.67h-3.906v-8.851c0-1.607-.788-2.82-2.636-2.82-1.727 0-2.757 1.335-2.757 2.942v8.73h-3.996v-8.852c0-1.607-.818-2.82-2.636-2.82-1.757 0-2.787 1.305-2.787 2.942v8.73h-4.027V11.059zM51.24 26.405c-4.538 0-7.824-3.367-7.824-7.889 0-4.45 3.276-7.896 7.824-7.896 4.57 0 7.824 3.478 7.824 7.896 0 4.49-3.288 7.889-7.824 7.889zm0-12.135a4.25 4.25 0 00-4.244 4.247 4.25 4.25 0 004.244 4.247 4.25 4.25 0 004.243-4.247 4.25 4.25 0 00-4.243-4.247zM67.667 26.405c-4.538 0-7.824-3.367-7.824-7.889 0-4.45 3.276-7.896 7.824-7.896 4.57 0 7.824 3.478 7.824 7.896 0 4.49-3.29 7.889-7.824 7.889zm0-12.186a4.3 4.3 0 00-4.293 4.296 4.3 4.3 0 004.293 4.296 4.3 4.3 0 004.293-4.296 4.3 4.3 0 00-4.293-4.296z",
          fill: wordmarkColor
        }
      ));
  }
};
var LogoWrapper = styled32.span`
  display: block;
  ${(props) => props.maxWidth && getSize("max-width", props.maxWidth)};

  & > svg.lns-logoSvg {
    display: block;
    width: 100%;
    height: 100%;
    ${(props) => props.maxWidth && getSize("max-width", props.maxWidth)};
  }
`;
var Logo = (_a) => {
  var _b = _a, {
    variant = "combined",
    maxWidth,
    symbolColor,
    wordmarkColor = "body",
    brand = "loom",
    customId = ""
  } = _b, props = __objRest(_b, [
    "variant",
    "maxWidth",
    "symbolColor",
    "wordmarkColor",
    "brand",
    "customId"
  ]);
  return /* @__PURE__ */ React41.createElement(LogoWrapper, __spreadValues({ variant, maxWidth }, props), variant === "combined" && /* @__PURE__ */ React41.createElement(
    CombinedLogoSvg,
    {
      brand,
      symbolColor,
      wordmarkColor: getColorValue(wordmarkColor),
      customId,
      className: "lns-logoSvg"
    }
  ), variant === "symbol" && /* @__PURE__ */ React41.createElement(
    SymbolLogoSvg,
    {
      brand,
      symbolColor,
      customId,
      className: "lns-logoSvg"
    }
  ), variant === "wordmark" && /* @__PURE__ */ React41.createElement(
    WordmarkLogoSvg,
    {
      brand,
      wordmarkColor: getColorValue(wordmarkColor),
      className: "lns-logoSvg"
    }
  ));
};
var logo_default = Logo;

// src/components/logo-loader/logo-loader.tsx
import styled33 from "@emotion/styled";
import React42 from "react";

// src/constants/routes.ts
var LENS_CDN = "https://cdn.loom.com/assets/lens";

// src/components/logo-loader/logo-loader.tsx
var sizeToPx = {
  small: "40px",
  medium: "80px"
};
var LogoLoaderWrapper = styled33.span`
  animation: ${(props) => props.animation};
  background-image: url(${LENS_CDN}/${(props) => props.brand}-loader.svg);
  background-size: cover;
  background-position: left center;
  display: block;
  height: ${(props) => sizeToPx[props.size]};
  width: ${(props) => sizeToPx[props.size]};

  @keyframes spin {
    100% {
      background-position: right center;
    }
  }
`;
var LogoLoader = ({
  animation = "spin 2s infinite steps(49) forwards",
  brand = "loom",
  size = "medium"
}) => {
  return /* @__PURE__ */ React42.createElement(LogoLoaderWrapper, { animation, brand, size });
};
var logo_loader_default = LogoLoader;

// src/components/list/list.tsx
import { css as css5 } from "@emotion/react";
import styled34 from "@emotion/styled";
import React43 from "react";
var ssrComment = `/* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */`;
var variantStyles2 = {
  border: css5`
    .ListRowWrapper:last-child {
      border-bottom: 1px solid ${getColorValue("border")};
    }

    .ListRowWrapper,
    .ListRowWrapper:first-child ${ssrComment} {
      border-top: 1px solid ${getColorValue("border")};
    }
  `,
  stripe: css5`
    .ListRowWrapper {
      &:nth-child(odd) ${ssrComment} {
        background-color: ${getColorValue("backgroundSecondary")};
      }
    }

    .ListRowWrapper {
      ${getRadius("medium")};
    }
  `,
  clear: css5``
};
var ListWrapper = styled34.div`
  .ListRowWrapper {
    grid-template-columns: ${(props) => props.columns && props.columns};
    ${(props) => getSize("gap", props.gap)};
  }

  ${(props) => variantStyles2[props.variant]};
`;
var ListRowWrapper = styled34.div`
  display: grid;
  align-items: center;
  text-decoration: none;
  color: inherit;

  ${(props) => getSize("height", props.height)};
  ${(props) => getSize("min-height", props.minHeight)};
  ${(props) => getSize("max-height", props.maxHeight)};
  ${(props) => getSize("padding", props.padding)};
  ${(props) => getSize("padding-top", props.paddingTop)};
  ${(props) => getSize("padding-bottom", props.paddingBottom)};
  ${(props) => getSize("padding-left", props.paddingLeft)};
  ${(props) => getSize("padding-right", props.paddingRight)};

  ${(props) => props.paddingY && `
    ${getSize("padding-top", props.paddingY)}
    ${getSize("padding-bottom", props.paddingY)}
    `};

  ${(props) => props.paddingX && `
    ${getSize("padding-left", props.paddingX)}
    ${getSize("padding-right", props.paddingX)}
    `};

  ${(props) => (props.onClick || props.href) && `cursor: pointer;`};

  &.ListRowWrapper:nth-child(even),
  &.ListRowWrapper:nth-child(odd) ${ssrComment} {
    ${(props) => props.backgroundColor && `background-color: ${getColorValue(props.backgroundColor)}`};

    &:hover {
      ${(props) => (props.onClick || props.href) && `
      background-color: ${getColorValue("backgroundHover")};
      border-color: transparent;
      ${getRadius("medium")};
    `};
    }
  }
`;
var ListRow = (_a) => {
  var _b = _a, {
    children,
    htmlTag,
    className,
    backgroundColor,
    onClick,
    href
  } = _b, props = __objRest(_b, [
    "children",
    "htmlTag",
    "className",
    "backgroundColor",
    "onClick",
    "href"
  ]);
  const classNameFromProp = className ? ` ${className}` : ``;
  return /* @__PURE__ */ React43.createElement(
    ListRowWrapper,
    __spreadValues({
      role: "row",
      className: `ListRowWrapper${classNameFromProp}`,
      as: htmlTag,
      backgroundColor,
      onClick,
      tabIndex: 0,
      onKeyDown: (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onClick(e);
        }
      },
      href
    }, props),
    children
  );
};
var formatColumns = (columns) => columns.map((columnValue) => getSizeValue(columnValue)).join(" ");
var List = (_a) => {
  var _b = _a, {
    children,
    columns,
    gap,
    variant = "stripe"
  } = _b, props = __objRest(_b, [
    "children",
    "columns",
    "gap",
    "variant"
  ]);
  return /* @__PURE__ */ React43.createElement(
    ListWrapper,
    __spreadValues({
      columns: columns && formatColumns(columns),
      gap,
      variant
    }, props),
    children
  );
};
var list_default = List;

// src/components/tabs/tabs.tsx
import styled35 from "@emotion/styled";
import React44 from "react";
var TabsContext = React44.createContext({});
var negativeScrollOffset = (scrollOffset) => `calc(-1 * ${getSizeValue(scrollOffset)})`;
var Wrapper = styled35.div`
  ${(props) => props.scrollOffset && `margin: 0 ${negativeScrollOffset(props.scrollOffset)};
  `};
`;
var TabsNav = styled35.nav`
  --activeIndicatorHeight: 3px;

  display: flex;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  ${(props) => props.hasBottomBorder && "border-bottom: 1px solid var(--lns-color-border)"}

  ${(props) => props.scrollOffset && getSize("padding-left", props.scrollOffset)};

  &::-webkit-scrollbar {
    display: none;
  }

  li {
    ${(props) => props.hasFullTabs && `flex: 1 0`};
    &:not(:first-of-type) {
      margin-left: 1rem;
    }
  }

  li > * {
    width: 100%;
  }

  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
  }

  ul:after {
    content: '';
    flex-shrink: 0;
    ${(props) => props.scrollOffset && getSize("width", props.scrollOffset)};
  }
`;
var TabsNavPilled = styled35.nav`
  ${getRadius("200")};
  background-color: var(--lns-color-backgroundSecondary);

  padding: var(--lns-space-xsmall);

  display: flex;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ${(props) => props.scrollOffset && getSize("padding-left", props.scrollOffset)};

  &::-webkit-scrollbar {
    display: none;
  }

  li {
    flex: 1 0;
  }

  li > * {
    width: 100%;
  }

  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
  }

  ul:after {
    content: '';
    flex-shrink: 0;
    ${(props) => props.scrollOffset && getSize("width", props.scrollOffset)};
  }
`;
var TabWrapper = styled35.button`
  appearance: none;
  font: inherit;
  background: transparent;
  border: 0;
  ${getRadius("medium")};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  padding: 0 0 calc(var(--lns-space-small) + var(--activeIndicatorHeight)) 0;
  position: relative;
  color: inherit;
  text-decoration: none;
  flex-shrink: 0;
  ${getFontWeight("bold")};
  transition: 0.6s color;
  white-space: nowrap;
  color: ${(props) => getColorValue(props.isActive ? "body" : "bodyDimmed")};
  ${(props) => props.isActive && `border-color: ${getColorValue("primary")};
  `};

  &:focus,
  &:focus-visible {
    outline: 1px solid transparent;
  }

  &:focus-visible {
    ${getFocusRing(void 0, "inset")};
  }

  &:hover {
    color: ${getColorValue("body")};
    transition: 0.3s color;
  }

  &::after {
    bottom: 0;
    ${getRadius("medium")};
    content: '';
    height: var(--activeIndicatorHeight);
    position: absolute;
    width: 100%;
    ${(props) => props.isActive && `background-color: ${getColorValue("primary")}`};
  }
`;
var TabWrapperPilled = styled35.button`
  padding: ${u(1)} 0;

  appearance: none;
  font: inherit;
  background: transparent;
  border: none;
  ${getRadius("175")};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  position: relative;
  color: inherit;
  text-decoration: none;
  flex-shrink: 0;
  ${getFontWeight("bold")};

  transition: 0.6s color;
  white-space: nowrap;
  ${(props) => props.isActive && `background-color: ${getColorValue("background")};
    color: ${getColorValue("primary")};
  `};

  &:focus,
  &:focus-visible {
    outline: 1px solid transparent;
  }

  &:focus-visible {
    ${getFocusRing(void 0, "inset")};
  }

  &:hover {
    color: ${getColorValue("primary")};
    transition: 0.3s color;
  }
`;
var Tab = (_a) => {
  var _b = _a, {
    children,
    isActive,
    htmlTag = "button",
    icon
  } = _b, props = __objRest(_b, [
    "children",
    "isActive",
    "htmlTag",
    "icon"
  ]);
  const { isPilledDesign } = React44.useContext(TabsContext);
  if (isPilledDesign) {
    return /* @__PURE__ */ React44.createElement("li", null, /* @__PURE__ */ React44.createElement(
      TabWrapperPilled,
      __spreadValues({
        as: htmlTag,
        isActive,
        icon
      }, props),
      icon && /* @__PURE__ */ React44.createElement(container_default, { htmlTag: "span", paddingRight: children && "small" }, /* @__PURE__ */ React44.createElement(icon_default, { icon, color: "currentColor" })),
      children
    ));
  }
  return /* @__PURE__ */ React44.createElement("li", null, /* @__PURE__ */ React44.createElement(TabWrapper, __spreadValues({ as: htmlTag, isActive, icon }, props), icon && /* @__PURE__ */ React44.createElement(container_default, { htmlTag: "span", paddingRight: children && "small" }, /* @__PURE__ */ React44.createElement(icon_default, { icon, color: "currentColor" })), children));
};
var Tabs = (_a) => {
  var _b = _a, {
    children,
    scrollOffset,
    hasFullTabs,
    isPilledDesign,
    hasBottomBorder = false
  } = _b, props = __objRest(_b, [
    "children",
    "scrollOffset",
    "hasFullTabs",
    "isPilledDesign",
    "hasBottomBorder"
  ]);
  const tabsContent = isPilledDesign ? /* @__PURE__ */ React44.createElement(
    TabsNavPilled,
    __spreadValues({
      hasFullTabs,
      scrollOffset
    }, props),
    /* @__PURE__ */ React44.createElement("ul", null, children)
  ) : /* @__PURE__ */ React44.createElement(
    TabsNav,
    __spreadValues({
      hasFullTabs,
      scrollOffset,
      hasBottomBorder
    }, props),
    /* @__PURE__ */ React44.createElement("ul", null, children)
  );
  if (scrollOffset) {
    return /* @__PURE__ */ React44.createElement(Wrapper, { scrollOffset }, tabsContent);
  }
  return /* @__PURE__ */ React44.createElement(TabsContext.Provider, { value: { isPilledDesign } }, tabsContent);
};
var tabs_default = Tabs;

// src/components/pill/pill.tsx
import styled36 from "@emotion/styled";
import React45 from "react";
var PillWrapper = styled36.div`
  display: inline-grid;
  grid-auto-flow: column;
  align-items: center;
  vertical-align: middle;
  padding: 0 ${u(1.5)};
  min-height: ${u(3.25)};
  color: ${(props) => getColorValue(props.color)};
  background-color: ${(props) => getColorValue(props.backgroundColor)};
  ${getRadius("100")};
  ${getTextSize("small")};
  ${getFontWeight("bold")};
  ${getSize("gap", "xsmall")};
`;
var Pill = (_a) => {
  var _b = _a, {
    color,
    backgroundColor,
    children,
    icon,
    iconPosition = "left"
  } = _b, props = __objRest(_b, [
    "color",
    "backgroundColor",
    "children",
    "icon",
    "iconPosition"
  ]);
  const iconComponent = /* @__PURE__ */ React45.createElement(
    container_default,
    {
      htmlTag: "span",
      paddingLeft: iconPosition === "right" && "xsmall",
      paddingRight: iconPosition === "left" && "xsmall"
    },
    /* @__PURE__ */ React45.createElement(icon_default, { icon, color: "currentColor", size: 2 })
  );
  return /* @__PURE__ */ React45.createElement(PillWrapper, __spreadValues({ color, backgroundColor }, props), icon && iconPosition === "left" && iconComponent, children, icon && iconPosition === "right" && iconComponent);
};
var pill_default = Pill;

// src/components/popover/popover.tsx
import styled37 from "@emotion/styled";
import {
  autoUpdate,
  flip,
  offset as floatingUiOffset,
  limitShift,
  shift,
  useFloating
} from "@floating-ui/react-dom";
import React46, { useEffect as useEffect10 } from "react";
import ReactDOM from "react-dom";
import { useTransition as useTransition2 } from "transition-hook";
var placements2 = {
  topLeft: "top-start",
  topCenter: "top",
  topRight: "top-end",
  bottomLeft: "bottom-start",
  bottomCenter: "bottom",
  bottomRight: "bottom-end",
  leftTop: "left-start",
  leftCenter: "left",
  leftBottom: "left-end",
  rightTop: "right-start",
  rightCenter: "right",
  rightBottom: "right-end"
};
var Wrapper2 = styled37.div`
  position: relative;
  width: fit-content;
  // transform forces the popover to calculate the position from the trigger instead of the viewport
  transform: translate(0);
  z-index: ${(props) => props.childrenZIndex};
`;
var ContentWrapper2 = styled37.div`
  ${(props) => props.zIndex && `z-index: ${props.zIndex}`};
`;
var Popover = (_a) => {
  var _b = _a, {
    children,
    content,
    offset = 0.5,
    boundaryOffset = 0.5,
    isOpen,
    zIndex = 500,
    childrenZIndex = 1,
    placement = "topCenter",
    rootId,
    boundaryElement = "body",
    transitionDuration = 0,
    transitionDelay = 0
  } = _b, props = __objRest(_b, [
    "children",
    "content",
    "offset",
    "boundaryOffset",
    "isOpen",
    "zIndex",
    "childrenZIndex",
    "placement",
    "rootId",
    "boundaryElement",
    "transitionDuration",
    "transitionDelay"
  ]);
  const unitOffset = offset * unit;
  const unitBoundaryOffset = boundaryOffset * unit;
  const isBrowser = typeof window !== "undefined";
  const rootNode = rootId && isBrowser ? document.getElementById(rootId) : void 0;
  const { stage, shouldMount } = useTransition2(
    isOpen,
    transitionDuration + transitionDelay
  );
  const getBoundaryElement = () => {
    if (boundaryElement === "body" && isBrowser) {
      return document.body;
    }
    return boundaryElement;
  };
  const { x, y, reference, floating, strategy, update, refs } = useFloating({
    placement: placements2[placement],
    middleware: [
      shift({
        padding: unitBoundaryOffset,
        boundary: boundaryElement ? getBoundaryElement() : void 0,
        limiter: limitShift()
      }),
      flip({
        fallbackPlacements: ["top", "bottom"],
        fallbackStrategy: "initialPlacement"
      }),
      floatingUiOffset(unitOffset)
    ],
    strategy: "fixed"
  });
  useEffect10(() => {
    if (!refs.reference.current || !refs.floating.current) {
      return;
    }
    return autoUpdate(refs.reference.current, refs.floating.current, update);
  }, [refs.reference, refs.floating, update, shouldMount]);
  const contentProps = {
    zIndex,
    ref: floating,
    style: {
      position: strategy,
      top: y != null ? y : "",
      left: x != null ? x : "",
      transition: `opacity ${transitionDuration}ms ${transitionDelay}ms`,
      opacity: stage === "enter" ? 1 : 0
    }
  };
  return /* @__PURE__ */ React46.createElement(Wrapper2, __spreadProps(__spreadValues({ ref: reference }, props), { childrenZIndex }), children, shouldMount && /* @__PURE__ */ React46.createElement(React46.Fragment, null, !rootNode && /* @__PURE__ */ React46.createElement(ContentWrapper2, __spreadValues({}, contentProps), content), rootNode && ReactDOM.createPortal(
    /* @__PURE__ */ React46.createElement(ContentWrapper2, __spreadValues({}, contentProps), content),
    rootNode
  )));
};
var popover_default = Popover;

// src/components/illustration/illustration.tsx
import styled38 from "@emotion/styled";
import React47 from "react";
var IllustrationWrapper = styled38.span`
  display: block;
  color: ${(props) => props.color ? getColorValue(props.color) : getColorValue("grey8")};
  ${(props) => props.size && getSize("width", props.size)};
  ${(props) => props.size && getSize("height", props.size)};

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`;
var Illustration = (_a) => {
  var _b = _a, {
    altText,
    illustration,
    color = "orange",
    size = 12
  } = _b, props = __objRest(_b, [
    "altText",
    "illustration",
    "color",
    "size"
  ]);
  return /* @__PURE__ */ React47.createElement(
    IllustrationWrapper,
    __spreadValues({
      "aria-hidden": "true",
      "aria-label": altText,
      color,
      size
    }, props),
    illustration
  );
};
var illustration_default = Illustration;

// src/components/split/split.tsx
import { css as css6 } from "@emotion/react";
import styled39 from "@emotion/styled";
import React48, { Children, cloneElement } from "react";
var getSizeStyles = (props) => css6`
  ${getSize("width", props.width)};
  ${getSize("height", props.height)};
  ${getSize("min-width", props.minWidth)};
  ${getSize("min-height", props.minHeight)};
  ${getSize("max-width", props.maxWidth)};
  ${getSize("max-height", props.maxHeight)};
`;
var SplitWrapper = styled39.div`
  display: flex;
  ${(props) => getResponsiveOneOf("align-items", props.alignItems)};
  ${(props) => props.justifyContent && getResponsiveOneOf("justify-content", props.justifyContent)};
  ${(props) => props.alignContent && getResponsiveOneOf("align-content", props.alignContent)};
  ${(props) => getResponsiveOneOf("flex-wrap", props.wrap)};
  ${(props) => props.direction && getResponsiveOneOf("flex-direction", props.direction)};
  ${(props) => props.gap && getSize("gap", props.gap)};
  ${(props) => props.rowGap && getSize("row-gap", props.rowGap)};
  ${(props) => props.columnGap && getSize("column-gap", props.columnGap)};
  ${(props) => getSizeStyles(props)};
  ${(props) => getListContainer(props.as)};
`;
var SplitSectionWrapper = styled39.div`
  ${(props) => getResponsiveNumber("flex-grow", props.grow)};
  ${(props) => getResponsiveNumber("flex-shrink", props.shrink)};
  ${(props) => props.basis && getSize("flex-basis", props.basis)};
  ${(props) => getSizeStyles(props)};
`;
var SplitSection = (_a) => {
  var _b = _a, {
    children,
    grow,
    shrink,
    basis,
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    htmlTag = "div",
    className,
    style
  } = _b, props = __objRest(_b, [
    "children",
    "grow",
    "shrink",
    "basis",
    "width",
    "height",
    "minWidth",
    "minHeight",
    "maxWidth",
    "maxHeight",
    "htmlTag",
    "className",
    "style"
  ]);
  if (className || style) {
    console.warn(customStylesWarning);
  }
  return /* @__PURE__ */ React48.createElement(
    SplitSectionWrapper,
    __spreadValues({
      as: htmlTag,
      grow,
      shrink,
      basis,
      width,
      height,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight
    }, props),
    children
  );
};
var Split = (_a) => {
  var _b = _a, {
    children,
    gap = "initial",
    rowGap,
    columnGap,
    alignItems = "center",
    justifyContent,
    alignContent,
    wrap = "wrap",
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    htmlTag = "div",
    className,
    style
  } = _b, props = __objRest(_b, [
    "children",
    "gap",
    "rowGap",
    "columnGap",
    "alignItems",
    "justifyContent",
    "alignContent",
    "wrap",
    "width",
    "height",
    "minWidth",
    "minHeight",
    "maxWidth",
    "maxHeight",
    "htmlTag",
    "className",
    "style"
  ]);
  if (className || style) {
    console.warn(customStylesWarning);
  }
  return /* @__PURE__ */ React48.createElement(
    SplitWrapper,
    __spreadValues({
      as: htmlTag,
      gap,
      rowGap,
      columnGap,
      alignItems,
      justifyContent,
      alignContent,
      wrap,
      width,
      height,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight
    }, props),
    htmlTag === "ul" || htmlTag === "ol" ? Children.map(children, (child) => {
      if (child.type === SplitSection || child.type === Split) {
        return cloneElement(child, { htmlTag: "li" });
      }
      return child;
    }) : children
  );
};
var split_default = Split;

// src/components/color-picker/color-picker.tsx
import styled40 from "@emotion/styled";
import React49, { useState as useState6 } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
var ColorfulWrapper = styled40.div`
  padding: var(--lns-space-medium);
  & .react-colorful {
    width: auto;
    height: auto;
  }
  & .react-colorful__saturation {
    height: ${u(14)};
    border-bottom: none;
    box-shadow: inset 0 0 0 1px var(--lns-color-border);
    ${getRadius(100)};
    margin-bottom: var(--lns-space-small);
  }

  & .react-colorful__hue {
    height: ${u(2)};
    width: 100%;
    box-shadow: inset 0 0 0 1px var(--lns-color-border);
    ${getRadius("50")};
    margin-bottom: var(--lns-space-medium);
  }

  & .react-colorful__saturation-pointer {
    width: ${u(1)};
    height: ${u(1)};
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 0 0 3px var(--lns-color-border);
    border-radius: var(--lns-radius-medium);
  }
  & .react-colorful__hue-pointer {
    width: ${u(1)};
    height: ${u(2.5)};
    border-radius: 2px;
    box-shadow: 0 0 0 2px var(--lns-color-border);
    cursor: pointer;
    border: 2px solid white;
  }
`;
var ColorPickerContainer = styled40.div`
  position: relative;
  width: ${u(31)};
  background-color: var(--lns-color-overlay);
  ${getRadius("250")};
  box-shadow:
    0 0 0 1px var(--lns-color-border),
    var(--lns-shadow-medium);
`;
var InputContainer = styled40.div`
  position: relative;
  width: 100%;

  input {
    padding: 0 0 0 ${u(4)};
    height: ${u(4)};
    width: 100%;
    font: inherit;
    font-size: var(--lns-fontSize-small);
    border: none;
    box-shadow: inset 0 0 0 var(--lns-formFieldBorderWidth)
      var(--lns-color-formFieldBorder);
    ${getRadius("150")};
    transition: 0.3s box-shadow;
    background-color: var(--lns-color-overlay);
    color: var(--lns-color-body);

    &:hover {
      box-shadow: inset 0 0 0 var(--lns-formFieldBorderWidthFocus)
        var(--lns-color-blurple);
    }

    &:focus {
      outline: 1px solid transparent;
      box-shadow: var(--lns-formFieldBorderShadowFocus);
    }
  }
`;
var ColorBox = styled40.div`
  position: absolute;
  width: ${u(3)};
  height: ${u(3)};
  left: var(--lns-space-xsmall);
  top: var(--lns-space-xsmall);
  border: 1px solid rgba(0, 0, 0, 0.1);
  ${getRadius("100")};
  background-color: ${(props) => props.color};
`;
var ButtonWrapper2 = styled40.div`
  position: relative;
  border-radius: var(--lns-radius-medium);
  padding: 0 var(--lns-space-medium) var(--lns-space-medium)
    var(--lns-space-medium);
`;
var SwatchesContainer = styled40.div`
  display: grid;
  grid-template-columns: repeat(7, ${u(3)});
  gap: ${u(1)} ${u(1)};
  border-bottom: 1px solid var(--lns-color-border);
  padding: var(--lns-space-medium);
`;
var Swatch = styled40.div`
  cursor: pointer;
  width: ${u(3)};
  height: ${u(3)};
  ${getRadius("100")};
  background-color: ${(props) => props.color};
  border: ${(props) => props.selected === props.color ? "1px solid white" : "1px solid var(--lns-color-border)"};
  box-shadow: ${(props) => props.selected === props.color && "0 0 0 2px var(--lns-color-focusRing)"};
`;
var SwatchSelector = ({ swatches, currentColor, onSwatchClick }) => {
  const selectedSwatch = swatches.includes(currentColor) && currentColor;
  return /* @__PURE__ */ React49.createElement(SwatchesContainer, null, swatches.map((swatch) => /* @__PURE__ */ React49.createElement(
    Swatch,
    {
      key: swatch,
      color: swatch,
      selected: selectedSwatch,
      onClick: () => onSwatchClick(swatch),
      role: "button",
      tabIndex: 0,
      onKeyDown: (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onSwatchClick(swatch);
        }
      }
    }
  )));
};
var ColorSelector = ({ color, setColor }) => {
  return /* @__PURE__ */ React49.createElement(ColorfulWrapper, null, /* @__PURE__ */ React49.createElement(HexColorPicker, { color, onChange: setColor }), /* @__PURE__ */ React49.createElement(InputContainer, null, /* @__PURE__ */ React49.createElement(HexColorInput, { prefixed: true, color, onChange: setColor }), /* @__PURE__ */ React49.createElement(ColorBox, { color })));
};
var ColorPicker = (_a) => {
  var _b = _a, {
    defaultColor = "#ffffff",
    confirmButton,
    swatches,
    onChange
  } = _b, props = __objRest(_b, [
    "defaultColor",
    "confirmButton",
    "swatches",
    "onChange"
  ]);
  const [tempColor, setTempColor] = useState6(
    defaultColor ? defaultColor : "#FFFFFF"
  );
  const handleOnChange = (hex) => {
    setTempColor(hex);
    onChange(hex);
  };
  const onSwatchClick = (swatch) => {
    handleOnChange(swatch);
  };
  return /* @__PURE__ */ React49.createElement(ColorPickerContainer, __spreadValues({}, props), swatches && /* @__PURE__ */ React49.createElement(
    SwatchSelector,
    {
      swatches,
      currentColor: tempColor,
      onSwatchClick
    }
  ), /* @__PURE__ */ React49.createElement(ColorSelector, { color: tempColor, setColor: handleOnChange }), confirmButton && /* @__PURE__ */ React49.createElement(ButtonWrapper2, null, confirmButton));
};
var color_picker_default = ColorPicker;

// src/components/ellipses-loader/ellipses-loader.tsx
import { keyframes as keyframes3 } from "@emotion/react";
import styled41 from "@emotion/styled";
import React50 from "react";
var speed2 = 2;
var sizes3 = {
  small: {
    totalSize: u(2.25),
    height: u(0.5625),
    dotSize: u(0.375),
    gap: u(0.25)
  },
  medium: {
    totalSize: u(3),
    height: u(0.75),
    dotSize: u(0.5),
    gap: u(0.375)
  },
  large: {
    totalSize: u(6),
    height: u(1.5),
    dotSize: u(1),
    gap: u(0.75)
  }
};
var getTotalSize2 = (props) => sizes3[props.size].totalSize;
var getHeight = (props) => sizes3[props.size].height;
var getDotSize2 = (props) => sizes3[props.size].dotSize;
var getGap = (props) => sizes3[props.size].gap;
var getBounceDistance = (props) => sizes3[props.size].dotSize;
var createDotBounce = (bounceDistance) => keyframes3`
  0%, 40%, 100% {
    transform: translateY(50%);
  }
  20% {
    transform: translateY(calc(50% - ${bounceDistance}));
  }
`;
var EllipsesLoaderWrapper = styled41.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: ${(props) => getHeight(props)};
  width: ${(props) => getTotalSize2(props)};
  gap: ${(props) => getGap(props)};
`;
var Dot2 = styled41.span`
  width: ${(props) => getDotSize2(props)};
  height: ${(props) => getDotSize2(props)};
  border-radius: 50%;
  background-color: ${(props) => getColorValue(props.color)};
  transform: translateY(50%);
  animation: ${(props) => createDotBounce(getBounceDistance(props))} ${speed2}s
    ease-in-out infinite;
  animation-fill-mode: both;
  animation-delay: ${(props) => props.delay}s;
`;
var EllipsesLoader = (_a) => {
  var _b = _a, {
    color = "body",
    size = "medium"
  } = _b, props = __objRest(_b, [
    "color",
    "size"
  ]);
  return /* @__PURE__ */ React50.createElement(EllipsesLoaderWrapper, __spreadValues({ size }, props), /* @__PURE__ */ React50.createElement(Dot2, { color, size, delay: 0 }), /* @__PURE__ */ React50.createElement(Dot2, { color, size, delay: 0.2 }), /* @__PURE__ */ React50.createElement(Dot2, { color, size, delay: 0.4 }));
};
var availableSizes3 = Object.keys(sizes3);
var ellipses_loader_default = EllipsesLoader;

// src/components/waveform-loader/waveform-loader.tsx
import { keyframes as keyframes4 } from "@emotion/react";
import styled42 from "@emotion/styled";
import React51 from "react";
var sizes4 = {
  medium: {
    totalSize: u(3),
    // 24px
    barHeight: u(2.25)
    // 18px
  }
};
var speeds = {
  fast: 1.2,
  slow: 1.7
};
var AI_PRIMARY_ANIMATED_LINEAR_GRADIENT = "linear-gradient(270deg, #565ADD 10.58%, #DC43BE 41.83%, #565ADD 69.23%, #565ADD 96.63%)";
var GRADIENT_ANIMATION_SPEED = 2;
var BARS_COUNT = 5;
var BAR_WIDTH = u(0.25);
var getBarHeight = (props) => sizes4[props.size || "medium"].barHeight;
var getTotalSize3 = (props) => sizes4[props.size || "medium"].totalSize;
var getAnimationSpeed = (props) => speeds[props.speed || "fast"];
var ripple = keyframes4`
  0%, 100% {
    transform: scaleY(0.3);
  }
  50% {
    transform: scaleY(1);
  }
`;
var backgroundAnimation = keyframes4`
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: 100% center;
  }
`;
var fadeIn = keyframes4`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
var WaveformLoaderWrapper = styled42.span`
  display: inline-flex;
  align-items: center;
  justify-content: space-evenly;
  height: ${(props) => getTotalSize3(props)};
  width: ${(props) => getTotalSize3(props)};
  position: relative;
`;
var Bar = styled42.span`
  width: ${BAR_WIDTH};
  height: ${(props) => getBarHeight(props)};
  background: ${(props) => props.color === "ai-primary" ? AI_PRIMARY_ANIMATED_LINEAR_GRADIENT : getColorValue(props.color)};
  background-size: ${(props) => getTotalSize3(props)}
    ${(props) => getTotalSize3(props)};
  background-position: ${(props) => {
  const barCenterRatio = (props.index + 1) / (BARS_COUNT + 1);
  const offsetRatio = barCenterRatio - 0.5;
  return `calc(${getTotalSize3(props)} * ${offsetRatio}) center`;
}};
  opacity: 0; /* Ensure it starts invisible */
  transform: scaleY(0.3);
  transform-origin: center;
  animation:
    ${fadeIn} 50ms ease-out forwards,
    ${ripple} ${(props) => getAnimationSpeed(props)}s ease-in-out infinite,
    ${backgroundAnimation} ${GRADIENT_ANIMATION_SPEED}s linear infinite;

  animation-delay: ${(props) => -1 + props.index * (getAnimationSpeed(props) / BARS_COUNT)}s;
  position: relative;
`;
var WaveformLoader = (_a) => {
  var _b = _a, {
    size = "medium",
    speed: speed3 = "fast",
    color = "body"
  } = _b, props = __objRest(_b, [
    "size",
    "speed",
    "color"
  ]);
  const barsList = Array.from({ length: BARS_COUNT }, (_, index) => /* @__PURE__ */ React51.createElement(Bar, { key: index, index, size, speed: speed3, color }));
  return /* @__PURE__ */ React51.createElement(WaveformLoaderWrapper, __spreadValues({ size, color }, props), barsList);
};
var availableSizes4 = Object.keys(sizes4);
var availableSpeeds = Object.keys(speeds);
var waveform_loader_default = WaveformLoader;

// src/illustrations/accounts-and-billing.js
import * as React52 from "react";
function IllustrationAccountsBilling(props) {
  return /* @__PURE__ */ React52.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 102 101",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React52.createElement(
      "path",
      {
        d: "M96.072 5.826H5.928v90.145h90.144V5.826z",
        stroke: "currentColor",
        strokeWidth: 10,
        strokeMiterlimit: 10
      }
    ),
    /* @__PURE__ */ React52.createElement(
      "path",
      {
        d: "M69.38 59.21c14.74 0 26.691-11.95 26.691-26.692S84.121 5.826 69.38 5.826c-14.741 0-26.692 11.95-26.692 26.692S54.638 59.21 69.38 59.21zM1 95.973h100M1 77.28h100M1 59.213h100M5.928 1v58.213M24.605 1v58.213M42.674 1v58.213",
        stroke: "currentColor",
        strokeWidth: 10,
        strokeMiterlimit: 10
      }
    )
  );
}
var accounts_and_billing_default = IllustrationAccountsBilling;

// src/illustrations/invite.js
import * as React53 from "react";
function IllustrationInvite(props) {
  return /* @__PURE__ */ React53.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 100 101",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React53.createElement(
      "path",
      {
        d: "M50.028 25.007A24.999 24.999 0 0034.586 1.905a25.022 25.022 0 00-27.26 5.42 25.002 25.002 0 0017.688 42.687V25.007h25.014z",
        fill: "currentColor"
      }
    ),
    /* @__PURE__ */ React53.createElement(
      "path",
      {
        d: "M74.986 50.012a25.02 25.02 0 0023.11-15.436 24.993 24.993 0 00-5.422-27.25 25.017 25.017 0 00-42.702 17.681h25.014v25.005z",
        fill: "currentColor"
      }
    ),
    /* @__PURE__ */ React53.createElement(
      "path",
      {
        d: "M49.972 74.99a25 25 0 0015.442 23.102 25.025 25.025 0 0027.26-5.42 25.002 25.002 0 00-17.688-42.687V74.99H49.972z",
        fill: "currentColor"
      }
    ),
    /* @__PURE__ */ React53.createElement(
      "path",
      {
        d: "M25.014 100.003a25.003 25.003 0 0023.103-15.44 25.017 25.017 0 00-5.42-27.259A25.005 25.005 0 00.006 74.991h25.007v25.012z",
        fill: "currentColor"
      }
    )
  );
}
var invite_default = IllustrationInvite;

// src/illustrations/archived.js
import * as React54 from "react";
function IllustrationArchived(props) {
  return /* @__PURE__ */ React54.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 100 101",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React54.createElement(
      "path",
      {
        d: "M0 .002v100h100v-100H0zm90 90H10v-80h80v80z",
        fill: "currentColor"
      }
    ),
    /* @__PURE__ */ React54.createElement(
      "path",
      {
        d: "M87 13.002H53.68c8.41 1.53 15 8.2 16.46 16.63H87v-16.63zM46.32 13.002H13v16.63h16.86c1.45-8.43 8.05-15.1 16.46-16.63zM13 32.632v15.87h18.19c3.12-7.32 10.35-12.47 18.81-12.47 8.46 0 15.69 5.15 18.81 12.47H87v-15.87H13zM13 67.372h20.4c3.71-5.15 9.76-8.52 16.59-8.52 6.84 0 12.88 3.36 16.59 8.52H87v-15.87H13v15.87zM13 87.002h23.47c3.61-3.18 8.34-5.12 13.53-5.12 5.19 0 9.92 1.93 13.53 5.12H87v-16.63H13v16.63z",
        fill: "currentColor"
      }
    )
  );
}
var archived_default = IllustrationArchived;

// src/illustrations/lead-with-transparency.js
import * as React55 from "react";
function IllustrationLeadwithTransparency(props) {
  return /* @__PURE__ */ React55.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 110 101",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React55.createElement(
      "path",
      {
        d: "M55 100.888a54.867 54.867 0 0031.361-9.8H23.64a54.867 54.867 0 0031.361 9.8zM20.482 88.728h69.025a54.887 54.887 0 008.8-8.911H11.682a56.245 56.245 0 008.8 8.911zM9.262 76.492h91.476a54.95 54.95 0 004.411-7.957H4.851a54.95 54.95 0 004.41 7.957zM3.124 64.255h103.752a54.896 54.896 0 001.969-7.002H1.166a53.117 53.117 0 001.958 7.002zM0 46.015c0 2.03.121 4.039.33 6.003h109.34c.22-1.975.33-3.973.33-6.003v-.033H0v.033zM.363 39.782h109.274a54.71 54.71 0 00-.814-5.07H1.177a55.308 55.308 0 00-.814 5.07zM3.2 27.556H106.8a58.547 58.547 0 00-1.672-4.115H4.873A51.945 51.945 0 003.2 27.556zM9.405 15.32h91.19a59.831 59.831 0 00-2.321-3.161H11.726a59.814 59.814 0 00-2.321 3.16zM23.716.888a57.211 57.211 0 00-2.959 2.195h68.475A52.837 52.837 0 0086.273.888H23.716z",
        fill: "currentColor"
      }
    )
  );
}
var lead_with_transparency_default = IllustrationLeadwithTransparency;

// src/illustrations/ask-for-more.js
import * as React56 from "react";
function IllustrationAskforMore(props) {
  return /* @__PURE__ */ React56.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 100 100",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React56.createElement(
      "path",
      {
        d: "M100 38.086V0H61.914v9.93h21.132L54.963 38.013V16.88h-9.93v21.132L16.951 9.93h21.135V0H0v38.086h9.93V16.951l28.083 28.082H16.88v9.93h21.132L9.93 83.046V61.914H0V100h38.086v-9.93H16.951l28.082-28.086v21.135h9.93V61.984L83.046 90.07H61.914V100H100V61.914h-9.93v21.132L61.987 54.963H83.12v-9.93H61.987L90.07 16.951v21.135H100z",
        fill: "currentColor"
      }
    )
  );
}
var ask_for_more_default = IllustrationAskforMore;

// src/illustrations/learning-and-development.js
import * as React57 from "react";
function IllustrationLearningDevelopment(props) {
  return /* @__PURE__ */ React57.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 142 142",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React57.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M19.945 50.767l50.766 50.766 50.765-50.766 19.944 19.944-51.672 51.673c-10.514 10.514-27.56 10.514-38.075 0L.001 70.711l19.944-19.944z",
        fill: "currentColor"
      }
    ),
    /* @__PURE__ */ React57.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M70.509 55.733l-27.901-27.63L23.57 47.14l28.354 28.084c10.264 10.264 26.904 10.264 37.168 0l28.48-28.362-19.038-19.037L70.51 55.733z",
        fill: "currentColor"
      }
    ),
    /* @__PURE__ */ React57.createElement(
      "circle",
      {
        cx: 70.71,
        cy: 24.88,
        transform: "rotate(-45 70.71 24.88)",
        fill: "currentColor",
        r: 17.592
      }
    )
  );
}
var learning_and_development_default = IllustrationLearningDevelopment;

// src/illustrations/business-plan.js
import * as React58 from "react";
function IllustrationBusinessPlan(props) {
  return /* @__PURE__ */ React58.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 101 100",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React58.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M47.333 0H0v47.333h47.333V0zM74 0H52.667v21.333H74V0zM52.667 26H74v21.333H52.667V26zm-5.333 26.667H0V100h47.333V52.667zm52.666 0H52.667V100H100V52.667zM78.667 26H100v21.333H78.667V26zm3-10.333h2.667v2.666h-2.667v-2.666zm-3 5.666v-8.666h8.667v8.666h-8.667zM84.334 3h-2.667v2.667h2.667V3zm-5.667-3v8.667h8.667V0h-8.667zm15.668 15.667H97v2.666h-2.666v-2.666zm-3 5.666v-8.666H100v8.666h-8.666zM97 3h-2.666v2.667H97V3zm-5.666-3v8.667H100V0h-8.666z",
        fill: "currentColor"
      }
    )
  );
}
var business_plan_default = IllustrationBusinessPlan;

// src/illustrations/loom-plans.js
import * as React59 from "react";
function IllustrationLoomPlans(props) {
  return /* @__PURE__ */ React59.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 100 100",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React59.createElement(
      "path",
      {
        d: "M0 12.288L12.287 0v87.71h37.706L37.706 100H0v-87.71zM49.994 63.743l12.287-12.276v36.245h37.72L87.714 100h-37.72V63.743zM49.994 33.336l12.287-12.288v18.129h37.72L87.714 51.465h-37.72V33.336z",
        fill: "currentColor"
      }
    ),
    /* @__PURE__ */ React59.createElement(
      "path",
      {
        d: "M49.993 12.288L62.28 0v9.064H100L87.713 21.353h-37.72v-9.065z",
        fill: "currentColor"
      }
    )
  );
}
var loom_plans_default = IllustrationLoomPlans;

// src/illustrations/collaborate-with-teammates.js
import * as React60 from "react";
function IllustrationCollaboratewithTeammatesSharedLibrary(props) {
  return /* @__PURE__ */ React60.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 100 100",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React60.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M0 0h100v100H0V0zm17.12 10.344h-6.54v6.54h6.54v-6.54zm6.392-.61l6.396 1.364-1.364 6.396-6.397-1.365 1.365-6.396zM17.89 23.208l-6.396-1.365-1.365 6.396 6.396 1.365 1.365-6.396zM50.496 8.99l4.507 4.74-4.74 4.507-4.507-4.74 4.74-4.507zm-32.25 41.271l-4.507-4.74L9 50.03l4.507 4.74 4.74-4.508zm18.708-41.1l5.702 3.204-3.203 5.702-5.702-3.204 3.203-5.702zM17.906 36.999l-5.702-3.204L9 39.497l5.702 3.204 3.204-5.702zm46.62-27.57l2.216 6.153L60.59 17.8l-2.216-6.154 6.153-2.216zm-46.12 53.986l-3.69-5.4-5.4 3.69 3.69 5.4 5.4-3.69zM77.57 9.96l.82 6.488-6.489.82-.82-6.488 6.489-.82zM17.577 77.17l-1.733-6.306-6.307 1.733 1.733 6.306 6.307-1.733zm7.303-55.86l5.627 3.334-3.333 5.627-5.627-3.333 3.333-5.627zm29.716 6.384l-2.311-6.118-6.119 2.311 2.312 6.118 6.118-2.31zm-15.582-6.457l3.744 5.363-5.363 3.744-3.744-5.363 5.363-3.744zm27.458 7.017l-1.45-6.378-6.378 1.451 1.45 6.377 6.378-1.45zm11.731-5.521l-.411 6.527-6.527-.411.41-6.527 6.528.41zm-47.559 15.49l-4.362-4.873-4.873 4.362 4.362 4.873 4.873-4.361zm22.144-4.204l1.542 6.356-6.356 1.541-1.542-6.355 6.356-1.542zm-10.132 5.2l-3.201-5.703-5.704 3.2 3.201 5.704 5.704-3.201zm23.253-4.438l-.165 6.538-6.538-.165.165-6.538 6.538.165zm12.84.891l-6.31-1.72-1.719 6.31 6.31 1.72 1.72-6.31zm-51.5 10.013l3.238 5.683-5.683 3.237-3.238-5.683 5.683-3.237zm26.346 7.784l.11-6.539-6.54-.11-.11 6.54 6.54.11zm-13.008-7.287l1.58 6.347-6.347 1.58-1.58-6.348 6.347-1.58zM66.6 47.896l-6.29-1.793-1.792 6.29 6.29 1.793 1.792-6.29zm6.863-2.197l5.718 3.174-3.174 5.718-5.719-3.174 3.175-5.718zM28.985 58.767l-6.513.598.598 6.513 6.513-.598-.598-6.513zm19.734-.761l5.978 2.654-2.655 5.978-5.977-2.655 2.654-5.977zm-7.014 1.293l-6.523-.477-.478 6.522 6.523.478.478-6.523zm20.341-1.573l5.108 4.084-4.084 5.108-5.108-4.084 4.084-5.108zm17.236 5.44l-3.703-5.39-5.391 3.702 3.703 5.391 5.39-3.703zm-55.967 7.587l6.458 1.034-1.034 6.458-6.458-1.034 1.034-6.458zm31.473 2.343l-5.81-3.004-3.003 5.81 5.81 3.004 3.003-5.81zm-19.53-2.16l6.51.615-.615 6.512-6.512-.616.616-6.511zm31.919 3.807l-4.375-4.862-4.862 4.374 4.374 4.862 4.863-4.374zm8.616-4.746l3.444 5.56-5.56 3.444-3.444-5.56 5.56-3.444zM17.121 83.406h-6.54v6.54h6.54v-6.54zm7.036-1.184l6.1 2.356-2.356 6.101-6.1-2.356 2.356-6.101zm30.846 4.345l-4.507-4.74-4.74 4.508 4.508 4.739 4.739-4.507zm-18.049-4.57l5.702 3.205-3.203 5.701L33.75 87.7l3.203-5.702zm29.788 6.422l-2.216-6.154-6.153 2.217 2.216 6.153 6.153-2.216zm10.827-5.623l.82 6.489-6.489.82-.82-6.489 6.489-.82zm12.605-72.452h-6.54v6.54h6.54v-6.54zm-5.627 11.5l6.396 1.365-1.365 6.396-6.396-1.365 1.365-6.396zm6.752 28.417l-4.507-4.74-4.739 4.508 4.507 4.74 4.74-4.508zm-6.044-16.466L90.957 37l-3.204 5.702-5.701-3.204 3.203-5.702zm6.205 29.62l-3.69-5.4-5.4 3.69 3.69 5.4 5.4-3.69zm-2.563 7.449l1.733 6.306-6.306 1.733-1.734-6.306 6.307-1.733zm1.276 12.542h-6.54v6.54h6.54v-6.54z",
        fill: "currentColor"
      }
    )
  );
}
var collaborate_with_teammates_default = IllustrationCollaboratewithTeammatesSharedLibrary;

// src/illustrations/option-grants.js
import * as React61 from "react";
function IllustrationOptionGrants(props) {
  return /* @__PURE__ */ React61.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 101 101",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React61.createElement(
      "path",
      {
        fill: "currentColor",
        d: "M.001 53.596h47.333v47.333H.001zM52.667 53.596H100v47.333H52.667zM52.667 26.929H74v21.333H52.667zM52.667.929H74v21.333H52.667zM78.667 26.929H100v21.333H78.667zM78.667 13.596h8.667v8.667h-8.667zM78.667.929h8.667v8.667h-8.667zM91.335 13.596h8.667v8.667h-8.667zM91.335.929h8.667v8.667h-8.667zM0 .929h47.333v47.333H0z"
      }
    )
  );
}
var option_grants_default = IllustrationOptionGrants;

// src/illustrations/community.js
import * as React62 from "react";
function IllustrationCommunity(props) {
  return /* @__PURE__ */ React62.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 101 100",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React62.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M62.467 36.689c5.566-3.544 9.253-9.73 9.253-16.769C71.72 8.92 62.713 0 51.603 0c-8.12 0-15.118 4.766-18.295 11.627a17.717 17.717 0 00-15.593-9.231C7.942 2.396.02 10.241.02 19.919c0 7.906 5.286 14.589 12.55 16.77C5.296 38.874 0 45.565 0 53.48c0 8.41 5.977 15.439 13.954 17.146-5.396 1.6-9.329 6.554-9.329 12.419 0 7.158 5.86 12.96 13.089 12.96s13.089-5.802 13.089-12.96c0-5.865-3.933-10.819-9.33-12.419a17.725 17.725 0 0011.834-8.813 20.078 20.078 0 007.207 8.31c-3.692 3.111-6.034 7.745-6.034 12.92 0 9.365 7.667 16.957 17.124 16.957 9.457 0 17.123-7.592 17.123-16.956 0-5.176-2.342-9.81-6.033-12.92 4.51-2.953 7.75-7.655 8.733-13.13 1.583 6.234 7.282 10.85 14.069 10.85 8.011 0 14.505-6.431 14.505-14.364 0-7.934-6.494-14.365-14.505-14.365-6.787 0-12.486 4.616-14.069 10.85-1-5.566-4.332-10.334-8.96-13.276zm-29.16 8.458a20.083 20.083 0 017.433-8.458 20.063 20.063 0 01-7.433-8.477A17.705 17.705 0 0122.86 36.69a17.725 17.725 0 0110.447 8.457zM59.671 19.92c0 4.413-3.612 7.99-8.069 7.99-4.456 0-8.069-3.577-8.069-7.99s3.613-7.99 8.07-7.99c4.456 0 8.069 3.577 8.069 7.99zm4.036 33.56c0 6.619-5.42 11.985-12.104 11.985-6.685 0-12.104-5.366-12.104-11.986 0-6.619 5.42-11.985 12.104-11.985 6.685 0 12.104 5.366 12.104 11.986zm-41.96.001c0 2.207-1.806 3.995-4.034 3.995-2.228 0-4.034-1.788-4.034-3.995 0-2.206 1.806-3.995 4.034-3.995 2.228 0 4.035 1.789 4.035 3.995zm61.309 29.562c0-1.335 1.092-2.416 2.44-2.416 1.347 0 2.439 1.081 2.439 2.416 0 1.334-1.092 2.415-2.44 2.415-1.347 0-2.44-1.081-2.44-2.415zm2.44-10.37c-5.784 0-10.472 4.643-10.472 10.37 0 5.726 4.688 10.368 10.471 10.368s10.472-4.642 10.472-10.368c0-5.727-4.689-10.37-10.472-10.37zm.345-55.186c-1.347 0-2.44 1.081-2.44 2.416 0 1.334 1.093 2.415 2.44 2.415s2.44-1.081 2.44-2.415c0-1.335-1.093-2.416-2.44-2.416zm-10.47 2.416c0-5.727 4.687-10.37 10.47-10.37s10.471 4.643 10.471 10.37c0 5.726-4.688 10.368-10.47 10.368-5.784 0-10.472-4.642-10.472-10.368zM44.52 83.043c0-3.873 3.171-7.014 7.084-7.014 3.912 0 7.084 3.14 7.084 7.015 0 3.874-3.172 7.014-7.084 7.014-3.913 0-7.084-3.14-7.084-7.014zm-26.806-3.018c-1.684 0-3.05 1.352-3.05 3.02 0 1.667 1.366 3.02 3.05 3.02 1.684 0 3.05-1.353 3.05-3.02 0-1.668-1.366-3.02-3.05-3.02zm-6.398-60.106c0-3.5 2.865-6.337 6.4-6.337 3.533 0 6.398 2.837 6.398 6.337 0 3.5-2.865 6.337-6.399 6.337s-6.399-2.837-6.399-6.337zm74.18 27.15c-3.576 0-6.474 2.87-6.474 6.41 0 3.541 2.898 6.411 6.474 6.411 3.575 0 6.474-2.87 6.474-6.41 0-3.541-2.899-6.411-6.474-6.411zM27.397 53.48c0 5.296-4.335 9.589-9.683 9.589-5.347 0-9.682-4.293-9.682-9.589 0-5.295 4.335-9.588 9.682-9.588 5.348 0 9.683 4.293 9.683 9.588z",
        fill: "currentColor"
      }
    )
  );
}
var community_default = IllustrationCommunity;

// src/illustrations/community-alt.js
import * as React63 from "react";
function IllustrationCommunityAlt(props) {
  return /* @__PURE__ */ React63.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 96 96",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React63.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M48 8.727C26.31 8.727 8.727 26.31 8.727 48c0 6.558 1.608 12.74 4.45 18.175a35.829 35.829 0 01-.462-5.749c0-19.647 15.927-35.573 35.574-35.573 19.646 0 35.573 15.926 35.573 35.573 0 1.395-.08 2.77-.236 4.123a39.123 39.123 0 003.647-16.55C87.273 26.31 69.69 8.728 48 8.728zm.708 78.539c.328-.006.655-.016.98-.03a27 27 0 001.832-.156c6.84-1.128 12.056-7.069 12.056-14.227 0-7.964-6.456-14.42-14.42-14.42-7.964 0-14.42 6.456-14.42 14.42 0 7.814 6.215 14.176 13.972 14.413zM26.177 75.655a23.374 23.374 0 01-.168-2.802c0-12.784 10.363-23.148 23.147-23.148 12.648 0 22.928 10.145 23.144 22.742a26.734 26.734 0 002.835-12.02c0-14.828-12.02-26.847-26.846-26.847-14.827 0-26.847 12.02-26.847 26.846a26.722 26.722 0 004.735 15.229zm22.58 20.342a36.51 36.51 0 01-.635.002H48C21.49 96 0 74.51 0 48 0 21.49 21.49 0 48 0s48 21.49 48 48c0 25.236-19.475 45.923-44.216 47.853a23.393 23.393 0 01-3.027.144z",
        fill: "currentColor"
      }
    )
  );
}
var community_alt_default = IllustrationCommunityAlt;

// src/illustrations/parental-leave.js
import * as React64 from "react";
function IllustrationParentalLeave(props) {
  return /* @__PURE__ */ React64.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 100 101",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React64.createElement(
      "path",
      {
        d: "M49.027 25.443a24.514 24.514 0 10-24.513 24.513V25.443h24.513zM75.486 49.956a24.513 24.513 0 10-24.513-24.513h24.513v24.513zM50.973 76.415a24.514 24.514 0 1024.513-24.513v24.513H50.973zM24.514 51.902a24.513 24.513 0 1024.513 24.513H24.514V51.902z",
        fill: "currentColor"
      }
    )
  );
}
var parental_leave_default = IllustrationParentalLeave;

// src/illustrations/content-limit.js
import * as React65 from "react";
function IllustrationContentLimit(props) {
  return /* @__PURE__ */ React65.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 100 100",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React65.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M0 0h100v100H0V0zm10 10h80v80H10V10zm10 10h60v10H20V20zm30 27h22c-2.57-9.778-11.443-17-22.008-17C39.411 30 30.554 37.222 28 47h22zm0 0c9.389 0 17 7.387 17 16.5S59.389 80 50 80s-17-7.387-17-16.5S40.611 47 50 47z",
        fill: "currentColor"
      }
    )
  );
}
var content_limit_default = IllustrationContentLimit;

// src/illustrations/pto.js
import * as React66 from "react";
function IllustrationPto(props) {
  return /* @__PURE__ */ React66.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 110 111",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React66.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M55 110.929c30.376 0 55-24.624 55-55s-24.624-55-55-55-55 24.624-55 55 24.624 55 55 55zm-6.108-79.595l6.11-24.877 6.09 24.877h-12.2zm-18.63-18.26l7.149 24.595 10.563-6.091-17.711-18.504zm.387 35.831L12.145 31.194l24.595 7.148-6.091 10.563zM5.528 55.93l24.877 6.092V49.82L5.528 55.93zM36.74 73.498l-24.595 7.148L30.65 62.935l6.091 10.563zm-6.477 25.266l17.711-18.503-10.563-6.092-7.148 24.595zm30.83-18.257L55 105.384l-6.109-24.877h12.2zm18.622 18.257L72.567 74.17l-10.563 6.092 17.711 18.503zm-.383-35.829l18.503 17.711-24.595-7.148 6.092-10.563zm25.121-7.005l-24.877-6.11v12.202l24.877-6.092zM73.24 38.342l24.595-7.148-18.503 17.711-6.092-10.563zm6.475-25.268L62.004 31.578l10.563 6.091 7.148-24.595zM52.271 44.978l2.73-11.092 2.71 11.091h-5.44zm-8.293-8.136l3.187 10.95 4.7-2.71-7.887-8.24zm.177 15.953l-8.24-7.888 10.951 3.187-2.711 4.7zm-11.198 3.134l11.092 2.712V53.2l-11.092 2.728zm13.91 7.816l-10.952 3.187 8.24-7.888 2.711 4.7zm-2.889 11.252l7.888-8.24-4.7-2.711-3.188 10.95zm13.734-8.12L55 77.951l-2.728-11.074h5.44zm8.293 8.12l-3.187-10.951-4.7 2.711 7.887 8.24zm-.18-15.953l8.24 7.888-10.95-3.187 2.71-4.7zm11.202-3.115L65.953 53.2v5.44l11.074-2.71zm-13.912-7.835l10.95-3.187-8.24 7.888-2.71-4.7zm2.89-11.252l-7.888 8.24 4.701 2.71 3.187-10.95z",
        fill: "currentColor"
      }
    )
  );
}
var pto_default = IllustrationPto;

// src/illustrations/custom-branding.js
import * as React67 from "react";
function IllustrationCustomBranding(props) {
  return /* @__PURE__ */ React67.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 134 134",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React67.createElement(
      "path",
      {
        d: "M64.657 63.942L19.983 19.267l-.708.707 44.708 44.708L9.227 33.067l-.5.866L63.4 65.5h-.063L2.407 49.176l-.26.966L59.475 65.5H0v3h55.604L1.889 82.89l.776 2.898 53.719-14.391L8.227 99.2l1.5 2.598 48.184-27.82-39.343 39.343.709.708-.002.001.708.708v-.002l.707.706 39.298-39.299-27.787 48.128 2.598 1.5 27.83-48.202-14.404 53.764 2.898.776L65.5 78.447V134h3V78.395l14.39 53.715.98-.262v.002l.966-.258v-.003l.953-.255-14.392-53.719L99.2 125.772l2.598-1.5-27.803-48.154 39.326 39.325.711-.711.007.007.707-.708-.007-.007.703-.702-39.325-39.326 48.154 27.803 1.5-2.598-48.157-27.804 53.719 14.391.776-2.897L78.395 68.5H134v-3H74.525l57.326-15.358-.259-.966L70.661 65.5h-.064l54.674-31.567-.5-.866-54.697 31.58 44.673-44.673-.707-.707-44.728 44.728 31.621-54.768-.866-.5-31.576 54.69 16.345-61.01-.966-.26L67.5 63.252V0h-1v63.15L50.157 2.148l-.966.258 16.368 61.098L33.933 8.727l-.866.5 31.59 54.715z",
        fill: "currentColor"
      }
    )
  );
}
var custom_branding_default = IllustrationCustomBranding;

// src/illustrations/record.js
import * as React68 from "react";
function IllustrationRecord(props) {
  return /* @__PURE__ */ React68.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 100 100",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React68.createElement("g", { clipPath: "url(#Record_svg__clip0)", fill: "currentColor" }, /* @__PURE__ */ React68.createElement("path", { d: "M79.819 62.343c6.818-16.462-.999-35.334-17.46-42.153-16.463-6.82-35.336.998-42.155 17.46-6.819 16.462.998 35.335 17.46 42.154 16.463 6.819 35.335-.999 42.154-17.46zM53.659 0h-7.303v8.763h7.303V0zM40.498.773l-6.87 1.84 2.268 8.465 6.87-1.84L40.498.772zM28.003 4.978l-5.996 3.46 4.38 7.59 5.996-3.46-4.38-7.59zM17.048 12.274l-4.761 4.76 6.196 6.197 4.761-4.76-6.196-6.197zM8.34 22.174L5.07 27.84l7.588 4.381 3.271-5.666-7.588-4.381zM2.522 33.984L.878 40.121l8.464 2.268 1.644-6.137-8.464-2.268zM8.763 46.926H0v6.163h8.763v-6.163zM9.362 57.697L.898 59.965l1.595 5.953 8.464-2.268-1.595-5.953zM12.806 68.033l-7.589 4.382 2.987 5.173 7.589-4.382-2.987-5.173zM18.811 77.097l-6.196 6.197 4.09 4.09 6.196-6.197-4.09-4.09zM26.969 84.311L22.587 91.9l4.844 2.797 4.382-7.59-4.844-2.796zM36.721 89.14l-2.27 8.464 5.22 1.4 2.27-8.464-5.22-1.4zM52.607 91.237h-5.214V100h5.214v-8.763zM63.083 89.192l-4.839 1.296 2.268 8.464 4.839-1.296-2.268-8.464zM72.698 84.501l-4.173 2.41 4.381 7.59 4.174-2.41-4.382-7.59zM80.772 77.506L77.5 80.78l6.196 6.196 3.274-3.274-6.197-6.196zM86.813 68.694l-2.22 3.845 7.59 4.382 2.22-3.845-7.59-4.382zM90.385 58.633l-1.1 4.105 8.464 2.268 1.1-4.105-8.464-2.268zM100 47.962h-8.763v4.06H100v-4.06zM97.796 35.184l-8.464 2.267 1.002 3.739 8.464-2.268-1.002-3.738zM92.37 23.41l-7.589 4.381 1.84 3.188 7.59-4.382-1.84-3.187zM84.1 13.424l-6.197 6.195 2.467 2.469 6.198-6.195-2.467-2.469zM73.564 5.885l-4.383 7.588 2.858 1.65 4.383-7.587-2.858-1.651zM61.446 1.297l-2.27 8.465 3.005.805 2.27-8.464-3.005-.806z" })),
    /* @__PURE__ */ React68.createElement("defs", null, /* @__PURE__ */ React68.createElement("clipPath", { id: "Record_svg__clip0" }, /* @__PURE__ */ React68.createElement("path", { fill: "#fff", d: "M0 0h100v100H0z" })))
  );
}
var record_default = IllustrationRecord;

// src/illustrations/desktop-app-and-chrome-extension.js
import * as React69 from "react";
function IllustrationDesktopAppandChromeExtension(props) {
  return /* @__PURE__ */ React69.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 134 134",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React69.createElement(
      "path",
      {
        d: "M64.676 50.418L55.95.916l-1.164.207 8.727 49.502c.195-.042.384-.083.58-.119.194-.035.39-.059.584-.088zM44.664 3.828l-1.158.42L60.694 51.48c.378-.153.768-.29 1.158-.42L44.664 3.829zM34.058 8.656l-1.11.644 25.128 43.528c.36-.225.733-.443 1.111-.644L34.058 8.656zM24.444 15.243l-1.022.856L55.73 54.606c.33-.302.668-.586 1.022-.857L24.444 15.243zM16.117 23.403l-.892 1.058L53.73 56.769c.283-.366.579-.715.892-1.058L16.117 23.403zM9.336 32.88l-.715 1.241 43.534 25.135c.225-.425.461-.839.715-1.247L9.336 32.88zM4.295 43.387l-.508 1.394 47.24 17.194c.147-.473.318-.94.507-1.394L4.295 43.387zM1.153 54.606l-.266 1.519 49.502 8.727c.065-.509.153-1.017.266-1.513L1.153 54.606zM0 66.205v1.59h50.27a15.808 15.808 0 010-1.59H0zM50.375 69.076L.867 77.803l.296 1.66 49.508-8.726c-.066-.272-.119-.55-.166-.828a13.631 13.631 0 01-.13-.833zM3.746 89.102l.597 1.636 47.245-17.194a16.817 16.817 0 01-.591-1.636L3.747 89.102zM8.525 99.725l.893 1.548 43.534-25.135a16.699 16.699 0 01-.892-1.548L8.525 99.725zM15.086 109.361l1.182 1.413 38.518-32.32c-.42-.45-.816-.916-1.182-1.406L15.086 109.36zM23.207 117.715l1.448 1.217 32.32-38.518c-.503-.378-.993-.78-1.454-1.211l-32.314 38.512zM32.662 124.54l1.678.969 25.141-43.54c-.579-.29-1.14-.62-1.678-.975l-25.14 43.546zM43.152 129.623l1.873.679 17.2-47.25c-.638-.19-1.264-.42-1.873-.68l-17.2 47.251zM54.36 132.807l2.008.355 8.733-49.52a16.216 16.216 0 01-2.009-.354l-8.733 49.519zM65.951 134h2.092V83.718c-.703.047-1.4.042-2.092 0V134zM68.846 83.646l8.733 49.525 2.109-.372-8.733-49.525c-.343.082-.697.16-1.052.224-.348.06-.703.107-1.057.148zM88.883 130.337l2.063-.751-17.2-47.25c-.662.29-1.353.543-2.062.75l17.2 47.251zM99.528 125.585l1.944-1.123L76.325 80.91a16.63 16.63 0 01-1.944 1.123l25.147 43.552zM109.189 119.063l1.761-1.477-32.326-38.523c-.55.531-1.14 1.022-1.76 1.477l32.325 38.523zM117.575 110.967l1.506-1.796-38.53-32.332a16.83 16.83 0 01-1.506 1.797l38.53 32.331zM124.423 101.539l1.2-2.074-43.558-25.147a16.44 16.44 0 01-1.2 2.074l43.558 25.147zM129.54 91.069l.839-2.299-47.257-17.2c-.224.792-.508 1.56-.839 2.299l47.257 17.2zM132.764 79.867l.431-2.458-49.531-8.733c-.083.839-.23 1.66-.432 2.458l49.532 8.733zM133.999 68.272v-2.546h-50.3c.065.857.065 1.707.006 2.546H134zM83.666 65.383l49.543-8.732-.449-2.559-49.543 8.733a15.696 15.696 0 01.45 2.558zM130.415 45.33l-.904-2.493-47.269 17.205c.36.798.662 1.631.904 2.494l47.269-17.206zM125.7 34.671l-1.353-2.34-43.564 25.153a16.98 16.98 0 011.353 2.34L125.7 34.671zM119.213 24.988l-1.767-2.11-38.542 32.338c.644.65 1.235 1.353 1.773 2.103l38.536-32.331zM111.141 16.573l-2.145-1.802-32.338 38.542a17.328 17.328 0 012.145 1.802l32.338-38.542zM101.732 9.69l-2.47-1.424-25.159 43.576c.863.407 1.69.88 2.47 1.424L101.732 9.69zM74.07 51.817L91.28 4.537l-2.73-.993-17.188 47.227-.011.053c.939.255 1.849.585 2.718.993z",
        fill: "currentColor"
      }
    ),
    /* @__PURE__ */ React69.createElement(
      "path",
      {
        d: "M71.346 50.825l.017-.047 8.728-49.496-2.908-.514-8.662 49.1v.455a16.15 16.15 0 012.825.502z",
        fill: "currentColor"
      }
    ),
    /* @__PURE__ */ React69.createElement(
      "path",
      {
        d: "M71.354 50.825l.011-.053-.017.047c0 .006.006.006.006.006zM68.522 49.868V0h-3.043v50.323a16.573 16.573 0 012.966-.012l.077-.443z",
        fill: "currentColor"
      }
    ),
    /* @__PURE__ */ React69.createElement(
      "path",
      {
        d: "M68.52 50.317v-.449l-.077.444c.024 0 .053.005.077.005z",
        fill: "currentColor"
      }
    )
  );
}
var desktop_app_and_chrome_extension_default = IllustrationDesktopAppandChromeExtension;

// src/illustrations/remote-first.js
import * as React70 from "react";
function IllustrationRemoteFirst(props) {
  return /* @__PURE__ */ React70.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 110 110",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React70.createElement(
      "path",
      {
        d: "M55 105c27.615 0 50-22.386 50-50S82.615 5 55 5C27.386 5 5 27.386 5 55s22.386 50 50 50z",
        stroke: "currentColor",
        strokeWidth: 10,
        strokeMiterlimit: 10
      }
    ),
    /* @__PURE__ */ React70.createElement(
      "path",
      {
        d: "M60.849 5.33c13.693 12.157 22.34 29.89 22.34 49.653 0 19.744-8.63 37.495-22.322 49.652M49.131 5.33c-13.693 12.157-22.34 29.89-22.34 49.653 0 19.744 8.629 37.495 22.322 49.652",
        stroke: "currentColor",
        strokeWidth: 10,
        strokeMiterlimit: 10
      }
    ),
    /* @__PURE__ */ React70.createElement(
      "path",
      {
        d: "M97.467 26.024C86.589 36.9 71.58 43.61 54.999 43.61c-16.07 0-30.658-6.307-41.444-16.6M97.467 83.958C86.589 73.08 71.58 66.37 54.999 66.37c-16.07 0-30.658 6.307-41.444 16.6M104.981 55H5M55 104.982V5",
        stroke: "currentColor",
        strokeWidth: 10,
        strokeMiterlimit: 10
      }
    )
  );
}
var remote_first_default = IllustrationRemoteFirst;

// src/illustrations/device-compatibility.js
import * as React71 from "react";
function IllustrationDeviceCompatibility(props) {
  return /* @__PURE__ */ React71.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 110 110",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React71.createElement(
      "path",
      {
        d: "M55 0C24.626 0 0 24.626 0 55s24.626 55 55 55 55-24.626 55-55S85.374 0 55 0zm0 109.525L.49 55 55 .49l54.525 54.525L55 109.525z",
        fill: "currentColor"
      }
    ),
    /* @__PURE__ */ React71.createElement(
      "path",
      {
        d: "M27.923 27.923v54.139H82.06V27.923H27.923zm27.076 52.074c-13.798 0-24.982-11.184-24.982-24.982S41.201 30.032 55 30.032c13.799 0 24.983 11.185 24.983 24.983 0 13.783-11.184 24.982-24.983 24.982z",
        fill: "currentColor"
      }
    )
  );
}
var device_compatibility_default = IllustrationDeviceCompatibility;

// src/illustrations/roadmap.js
import * as React72 from "react";
function IllustrationRoadmap(props) {
  return /* @__PURE__ */ React72.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 100 100",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React72.createElement("path", { d: "M100 100H0V0h100v100zM10 90h80V10H10v80z", fill: "currentColor" }),
    /* @__PURE__ */ React72.createElement(
      "path",
      {
        d: "M50.008 39.806L80 54v-9.806L50.008 30 20 44.194V54l30.008-14.194zM80 20H20v10h60V20z",
        fill: "currentColor"
      }
    )
  );
}
var roadmap_default = IllustrationRoadmap;

// src/illustrations/downgrade.js
import * as React73 from "react";
function IllustrationDowngrade(props) {
  return /* @__PURE__ */ React73.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 100 100",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React73.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M0 0h100v100H0V0zm32.854 35.063L10.163 10h79.674L67.146 35.063h22.691L63.96 53.295h25.877L61.804 66.97h28.033l-25.895 9.357h25.895l-23.902 6.477h23.902L50 90l-39.837-7.197h23.902l-23.902-6.477h25.895l-25.895-9.357h28.033L10.163 53.295H36.04L10.163 35.063h22.691z",
        fill: "currentColor"
      }
    )
  );
}
var downgrade_default = IllustrationDowngrade;

// src/illustrations/screenshot.js
import * as React74 from "react";
function IllustrationScreenshot(props) {
  return /* @__PURE__ */ React74.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 100 100",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React74.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M100 0H0v100h100V0zM10 17.071V90h72.929L64.594 71.665v8.412h-10V54.594h25.434v10h-8.363L90 82.929V10H17.071l18.43 18.43.07-8.546 9.999.08-.204 25.443H19.973v-10h8.363L10 17.07zm19.745 37.701h-10v25.483H45.18v-10h-8.365l33.44-33.452v8.425h10V19.745H54.822v10h8.35L29.745 63.18v-8.409z",
        fill: "currentColor"
      }
    )
  );
}
var screenshot_default = IllustrationScreenshot;

// src/illustrations/embrace-the-weird.js
import * as React75 from "react";
function IllustrationEmbracetheWeird(props) {
  return /* @__PURE__ */ React75.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 110 110",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React75.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M50.028 9.658C27.178 12.136 9.39 31.491 9.39 55c0 8.832 2.51 17.078 6.857 24.063-2.302-8.325-2.151-17.035.801-24.035l-.015-.03.245-.498a25.44 25.44 0 01.81-1.65c6.717-13.595 20.721-22.947 36.91-22.948 12.318-.013 23.354 5.414 30.887 13.98.329-5.954-1.19-12.893-4.87-19.106-5.552-9.378-15.74-16.548-30.987-15.116v-.002zm42.655 45.894l.272-.551-.017-.034c2.956-7.012 3.1-15.739.787-24.075A45.397 45.397 0 01100.61 55c0 23.515-17.795 42.873-40.654 45.344v-.004c-15.246 1.431-25.435-5.739-30.987-15.117-3.678-6.212-5.198-13.148-4.87-19.102 7.534 8.562 18.582 13.976 30.902 13.976 16.2 0 30.185-9.394 36.896-22.95.28-.52.542-1.052.786-1.595zM55 0C24.624 0 0 24.624 0 55s24.624 55 55 55 55-24.624 55-55S85.376 0 55 0zm27.39 54.998c-3.929-6.688-10.221-11.812-17.719-14.21 4.53 3.092 7.504 8.297 7.504 14.195 0 5.93-3.012 11.157-7.582 14.243 7.533-2.393 13.855-7.527 17.798-14.228zM27.592 55c3.927-6.69 10.223-11.806 17.728-14.205-4.525 3.093-7.494 8.294-7.494 14.188 0 5.934 3.01 11.165 7.585 14.25C37.858 66.845 31.527 61.71 27.591 55zM55 47.198a7.785 7.785 0 000 15.57c4.287 0 7.784-3.49 7.784-7.785A7.785 7.785 0 0055 47.198z",
        fill: "currentColor"
      }
    )
  );
}
var embrace_the_weird_default = IllustrationEmbracetheWeird;

// src/illustrations/share-with-your-team.js
import * as React76 from "react";
function IllustrationSharewithYourTeamTeamLibrary(props) {
  return /* @__PURE__ */ React76.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 100 100",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React76.createElement(
      "g",
      {
        clipPath: "url(#Share_with_Your_Team_(Team_Library)_svg__clip0)",
        fill: "currentColor"
      },
      /* @__PURE__ */ React76.createElement("path", { d: "M33.33 24.946V8.384L24.946 0v24.946H0l8.384 8.384H33.33v-8.384zM58.286 33.33h8.385V8.384L58.286 0v24.946H33.331l8.394 8.384h16.561z" }),
      /* @__PURE__ */ React76.createElement("path", { d: "M100 8.384L91.614 0v24.946H66.67l8.385 8.384H100V8.384zM33.33 58.286V41.724l-8.384-8.394v24.956H0l8.384 8.384H33.33v-8.384zM33.33 58.286l8.395 8.384H66.67V41.724l-8.385-8.394v24.956H33.331zM66.67 58.286l8.384 8.384H100V41.724l-8.385-8.394v24.956H66.67zM24.946 66.67v24.946H0L8.384 100H33.33V75.054l-8.384-8.384zM58.286 66.67v24.946H33.331L41.725 100H66.67V75.054l-8.385-8.384zM66.67 91.616L75.053 100h24.945V75.054l-8.384-8.384v24.946H66.67z" })
    ),
    /* @__PURE__ */ React76.createElement("defs", null, /* @__PURE__ */ React76.createElement("clipPath", { id: "Share_with_Your_Team_(Team_Library)_svg__clip0" }, /* @__PURE__ */ React76.createElement("path", { fill: "#fff", d: "M0 0h100v100H0z" })))
  );
}
var share_with_your_team_default = IllustrationSharewithYourTeamTeamLibrary;

// src/illustrations/enterprise-plan.js
import * as React77 from "react";
function IllustrationEnterprisePlan(props) {
  return /* @__PURE__ */ React77.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 101 100",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React77.createElement(
      "path",
      {
        fill: "currentColor",
        d: "M.001 52.667h47.333V100H.001zM52.667 52.667H100V100H52.667zM52.667 26H74v21.333H52.667zM52.667 0H74v21.333H52.667zM78.667 26H100v21.333H78.667zM78.667 12.667h8.667v8.667h-8.667zM78.667 0h8.667v8.667h-8.667zM91.335 12.667h8.667v8.667h-8.667zM91.335 0h8.667v8.667h-8.667zM0 0h47.333v47.333H0z"
      }
    )
  );
}
var enterprise_plan_default = IllustrationEnterprisePlan;

// src/illustrations/share.js
import * as React78 from "react";
function IllustrationShare(props) {
  return /* @__PURE__ */ React78.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 100 101",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React78.createElement(
      "path",
      {
        d: "M34.27 50.002v15.73H50c-8.69 0-15.73-7.04-15.73-15.73zM65.73 50.002v-15.73H50c8.69 0 15.73 7.04 15.73 15.73zM50 34.272H34.27v15.73c0-8.69 7.04-15.73 15.73-15.73z",
        fill: "currentColor"
      }
    ),
    /* @__PURE__ */ React78.createElement(
      "path",
      {
        d: "M50 65.732h15.73v-15.73c0 8.69-7.04 15.73-15.73 15.73z",
        fill: "currentColor"
      }
    ),
    /* @__PURE__ */ React78.createElement(
      "path",
      {
        d: "M0 .002v100h100v-100H0zm81.46 10c3.48 1.79 6.2 4.84 7.57 8.54h-7.57v-8.54zm-15.73 0c6.1 0 11.38 3.47 13.99 8.54H65.73v-8.54zm-15.73 0c6.1 0 11.38 3.47 13.99 8.54H36.01c2.61-5.07 7.89-8.54 13.99-8.54zm-15.73 0v8.54H20.28c2.61-5.07 7.89-8.54 13.99-8.54zm-15.73 80c-3.48-1.79-6.2-4.84-7.57-8.54h7.57v8.54zm0-10.28c-5.07-2.61-8.54-7.89-8.54-13.99h8.54v13.99zm0-15.73c-5.07-2.61-8.54-7.89-8.54-13.99 0-6.1 3.47-11.38 8.54-13.99v27.98zm0-29.72H10c0-6.1 3.47-11.38 8.54-13.99v13.99zm0-15.73h-7.57c1.37-3.7 4.09-6.75 7.57-8.54v8.54zm62.92 71.46v-8.54h7.57c-1.37 3.7-4.09 6.75-7.57 8.54zm0-10.28v-13.99H90c0 6.1-3.47 11.38-8.54 13.99zm0-29.72v-13.99c5.07 2.61 8.54 7.89 8.54 13.99 0 6.1-3.47 11.38-8.54 13.99v-13.99c0 8.69-7.04 15.73-15.73 15.73h15.73c0 8.69-7.04 15.73-15.73 15.73h13.99c-2.61 5.07-7.89 8.54-13.99 8.54v-8.54-15.73c0 8.69-7.04 15.73-15.73 15.73h13.99c-2.61 5.07-7.89 8.54-13.99 8.54-6.1 0-11.38-3.47-13.99-8.54H50c-8.69 0-15.73-7.04-15.73-15.73v24.27c-6.1 0-11.38-3.47-13.99-8.54h13.99c-8.69 0-15.73-7.04-15.73-15.73h15.73c-8.69 0-15.73-7.04-15.73-15.73 0-8.69 7.04-15.73 15.73-15.73H18.54c0-8.69 7.04-15.73 15.73-15.73v15.73c0-8.69 7.04-15.73 15.73-15.73 8.69 0 15.73 7.04 15.73 15.73v-15.73c8.69 0 15.73 7.04 15.73 15.73v-13.99c5.07 2.61 8.54 7.89 8.54 13.99H65.73c8.69 0 15.73 7.04 15.73 15.73z",
        fill: "currentColor"
      }
    )
  );
}
var share_default = IllustrationShare;

// src/illustrations/faq-and-security.js
import * as React79 from "react";
function IllustrationFaQandSecurity(props) {
  return /* @__PURE__ */ React79.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 100 100",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React79.createElement(
      "path",
      {
        d: "M50 70c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20z",
        fill: "currentColor"
      }
    ),
    /* @__PURE__ */ React79.createElement("path", { d: "M31 50V0H0v100h99.999V69H31V50z", fill: "currentColor" }),
    /* @__PURE__ */ React79.createElement("path", { d: "M100 66V0H34v31h35v35h31z", fill: "currentColor" })
  );
}
var faq_and_security_default = IllustrationFaQandSecurity;

// src/illustrations/starred.js
import * as React80 from "react";
function IllustrationStarred(props) {
  return /* @__PURE__ */ React80.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 101 101",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React80.createElement(
      "path",
      {
        d: "M38.963 0C17.45 0 0 18.136 0 40.495v8.507h9.444C30.967 49.002 48 30.41 48 8.05V.002L38.963 0zM100.002 38.965c0-21.513-18.136-38.963-40.495-38.963H51v9.444c0 21.523 18.592 38.556 40.951 38.556H100l.002-9.037zM61.039 100.004c21.513 0 38.963-18.136 38.963-40.495v-8.507h-9.444c-21.523 0-38.556 18.592-38.556 40.951v8.049l9.037.002zM0 61.039c0 21.513 18.136 38.963 40.495 38.963h8.507v-9.444c0-21.523-18.592-38.556-40.952-38.556H.002L0 61.039z",
        fill: "currentColor"
      }
    )
  );
}
var starred_default = IllustrationStarred;

// src/illustrations/five-minute-limit.js
import * as React81 from "react";
function Illustration5MinuteLimit(props) {
  return /* @__PURE__ */ React81.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 110 110",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React81.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M55 10c-24.853 0-45 20.147-45 45s20.147 45 45 45 45-20.147 45-45-20.147-45-45-45zM0 55C0 24.624 24.624 0 55 0s55 24.624 55 55-24.624 55-55 55S0 85.376 0 55zm33.8-35.64H76v10H43.8v20.19h11.75v-9.87c14.131 0 25.59 11.459 25.59 25.59S69.681 90.86 55.55 90.86 29.96 79.401 29.96 65.27h10c0 8.609 6.981 15.59 15.59 15.59s15.59-6.981 15.59-15.59c0-8.535-6.863-15.47-15.37-15.588v9.868H33.8V19.36z",
        fill: "currentColor"
      }
    )
  );
}
var five_minute_limit_default = Illustration5MinuteLimit;

// src/illustrations/starter-plus-plan.js
import * as React82 from "react";
function IllustrationStarterPlusPlan(props) {
  return /* @__PURE__ */ React82.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 100 100",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React82.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M55.666 3h15.333v15.333H55.666V3zm-3 18.333V0h21.333v21.333H52.666zM70.999 29H55.666v15.333h15.333V29zm-18.333-3v21.333h21.333V26H52.666zm-5.333 26.667H0V100h47.333V52.667zm52.666 0H52.666V100h47.333V52.667zM97 29H81.668v15.333H97V29zm-18.332-3v21.333H100V26H78.666zm3-10.333h2.666v2.666h-2.666v-2.666zm-3 5.666v-8.666h8.666v8.666h-8.666zM84.332 3h-2.666v2.667h2.666V3zm-5.666-3v8.667h8.666V0h-8.666zm15.667 15.667h2.667v2.666h-2.667v-2.666zm-3 5.666v-8.666h8.667v8.666h-8.667zM97.001 3h-2.667v2.667h2.667V3zm-5.667-3v8.667h8.667V0h-8.667zm-44 0H0v47.333h47.333V0z",
        fill: "currentColor"
      }
    )
  );
}
var starter_plus_plan_default = IllustrationStarterPlusPlan;

// src/illustrations/getting-started.js
import * as React83 from "react";
function IllustrationGettingStarted(props) {
  return /* @__PURE__ */ React83.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 106 106",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React83.createElement(
      "path",
      {
        d: "M53 101c26.51 0 48-21.49 48-48S79.51 5 53 5 5 26.49 5 53s21.49 48 48 48z",
        stroke: "currentColor",
        strokeWidth: 10,
        strokeMiterlimit: 10
      }
    ),
    /* @__PURE__ */ React83.createElement(
      "path",
      {
        d: "M53 100.986c26.51 0 48-14.563 48-32.527 0-17.965-21.49-32.528-48-32.528S5 50.494 5 68.46c0 17.964 21.49 32.527 48 32.527z",
        stroke: "currentColor",
        strokeWidth: 10,
        strokeMiterlimit: 10
      }
    ),
    /* @__PURE__ */ React83.createElement(
      "path",
      {
        d: "M53 100.998c26.51 0 48-8.682 48-19.39 0-10.71-21.49-19.391-48-19.391S5 70.898 5 81.607c0 10.71 21.49 19.391 48 19.391z",
        stroke: "currentColor",
        strokeWidth: 10,
        strokeMiterlimit: 10
      }
    ),
    /* @__PURE__ */ React83.createElement(
      "path",
      {
        d: "M53 100.984c26.51 0 48-3.908 48-8.728S79.51 83.53 53 83.53 5 87.436 5 92.256s21.49 8.728 48 8.728z",
        stroke: "currentColor",
        strokeWidth: 10,
        strokeMiterlimit: 10
      }
    )
  );
}
var getting_started_default = IllustrationGettingStarted;

// src/illustrations/strong-upload-speed.js
import * as React84 from "react";
function IllustrationStrongUploadSpeed(props) {
  return /* @__PURE__ */ React84.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 111 110",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React84.createElement(
      "path",
      {
        d: "M.223 57.064l-.208-.356a55.069 55.069 0 002.244 13.991l44.404-40.904-46.44 27.27zM3.27 73.804C10.953 94.924 31.208 110 55 110c23.926 0 44.285-15.269 51.865-36.582l-51.582-47.53L3.27 73.804zm88.867-9.358v24.36L64.838 63.584v39.003a1.49 1.49 0 01-1.486 1.486H47.287a1.49 1.49 0 01-1.486-1.486V63.585l-27.388 25.22V64.446l36.914-33.983 36.81 33.983zM107.861 70.299a54.916 54.916 0 002.125-13.442L63.873 29.78 107.861 70.3zM63.115 25.873l46.886 27.537c-.148-5.228-1.01-10.293-2.526-15.06l-44.36-12.477zM2.482 38.543C.966 43.356.119 48.465 0 53.753l47.436-27.864L2.482 38.543z",
        fill: "currentColor"
      }
    ),
    /* @__PURE__ */ React84.createElement(
      "path",
      {
        d: "M106.241 34.934C98.216 14.482 78.302 0 55.001 0 31.625 0 11.68 14.57 3.7 35.112l51.582-14.511 50.958 14.333z",
        fill: "currentColor"
      }
    )
  );
}
var strong_upload_speed_default = IllustrationStrongUploadSpeed;

// src/illustrations/growth-through-empathy.js
import * as React85 from "react";
function IllustrationGrowththroughEmpathy(props) {
  return /* @__PURE__ */ React85.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 104 100",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React85.createElement(
      "path",
      {
        d: "M98.75 100.001c0-25.889-20.986-46.876-46.874-46.876C25.987 53.125 5 74.112 5 100.001",
        stroke: "currentColor",
        strokeWidth: 10,
        strokeMiterlimit: 10
      }
    ),
    /* @__PURE__ */ React85.createElement(
      "path",
      {
        d: "M16.704 100.001c0-19.416 15.74-35.171 35.172-35.171 19.43 0 35.171 15.74 35.171 35.171",
        stroke: "currentColor",
        strokeWidth: 10,
        strokeMiterlimit: 10
      }
    ),
    /* @__PURE__ */ React85.createElement(
      "path",
      {
        d: "M28.213 100.001c0-13.07 10.593-23.648 23.648-23.648 13.054 0 23.662 10.579 23.662 23.648",
        stroke: "currentColor",
        strokeWidth: 10,
        strokeMiterlimit: 10
      }
    ),
    /* @__PURE__ */ React85.createElement(
      "path",
      {
        d: "M39.736 100c0-6.692 5.432-12.124 12.124-12.124 6.693 0 12.124 5.432 12.124 12.124M5 0c0 25.889 20.987 46.875 46.875 46.875C77.764 46.875 98.751 25.89 98.751 0",
        stroke: "currentColor",
        strokeWidth: 10,
        strokeMiterlimit: 10
      }
    ),
    /* @__PURE__ */ React85.createElement(
      "path",
      {
        d: "M87.047 0c0 19.416-15.74 35.171-35.172 35.171-19.43 0-35.171-15.74-35.171-35.171",
        stroke: "currentColor",
        strokeWidth: 10,
        strokeMiterlimit: 10
      }
    ),
    /* @__PURE__ */ React85.createElement(
      "path",
      {
        d: "M75.538 0c0 13.07-10.593 23.648-23.648 23.648-13.054 0-23.662-10.579-23.662-23.648",
        stroke: "currentColor",
        strokeWidth: 10,
        strokeMiterlimit: 10
      }
    ),
    /* @__PURE__ */ React85.createElement(
      "path",
      {
        d: "M64.015 0c0 6.693-5.432 12.124-12.124 12.124S39.767 6.693 39.767.002",
        stroke: "currentColor",
        strokeWidth: 10,
        strokeMiterlimit: 10
      }
    )
  );
}
var growth_through_empathy_default = IllustrationGrowththroughEmpathy;

// src/illustrations/troubleshooting.js
import * as React86 from "react";
function IllustrationTroubleshooting(props) {
  return /* @__PURE__ */ React86.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 110 110",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React86.createElement(
      "path",
      {
        d: "M5 55h99.984c0 27.61-22.375 50-50 50S5 82.61 5 55z",
        fill: "currentColor",
        stroke: "currentColor",
        strokeWidth: 10,
        strokeMiterlimit: 10
      }
    ),
    /* @__PURE__ */ React86.createElement(
      "path",
      {
        d: "M55 105c27.614 0 50-22.386 50-50S82.614 5 55 5 5 27.386 5 55s22.386 50 50 50z",
        stroke: "currentColor",
        strokeWidth: 10,
        strokeMiterlimit: 10
      }
    ),
    /* @__PURE__ */ React86.createElement(
      "path",
      {
        d: "M23.534 55C23.534 37.62 37.62 23.534 55 23.534c17.382 0 31.466 14.085 31.466 31.466",
        stroke: "currentColor",
        strokeWidth: 10,
        strokeMiterlimit: 10
      }
    ),
    /* @__PURE__ */ React86.createElement(
      "path",
      {
        d: "M42.053 55c0-7.138 5.794-12.932 12.932-12.932 7.138 0 12.932 5.794 12.932 12.932",
        stroke: "currentColor",
        strokeWidth: 10,
        strokeMiterlimit: 10
      }
    )
  );
}
var troubleshooting_default = IllustrationTroubleshooting;

// src/illustrations/health-plans.js
import * as React87 from "react";
function IllustrationHealthPlans(props) {
  return /* @__PURE__ */ React87.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 100 101",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React87.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M100 .929H0v100h100v-100zm-54.528 18.32v4.298l9.051-4.299h-9.05zm0 14.937v-5.883h9.051l-9.05 5.883zm0 3.166v7.467l9.051-7.467h-9.05zm0 18.1V46.4h9.051l-9.05 9.05zm0 1.586v7.467l9.051-7.467h-9.05zm0 16.517v-5.883h9.051l-9.05 5.883zm0 4.75v4.3l9.051-4.3h-9.05zM88.01 91.66v-2.715h2.715l-2.715 2.715zm0-13.354v4.3l2.715-4.3H88.01zm0-4.75v-5.883h2.715l-2.715 5.883zm0-16.517v7.467l2.715-7.467H88.01zm0-1.586V46.4h2.715l-2.715 9.05zm0-18.1v7.467l2.715-7.467H88.01zm0-3.166v-5.883h2.715l-2.715 5.883zm0-14.938v4.3l2.715-4.3H88.01zm0-6.334V10.2h2.715l-2.715 2.716zm-10.633 76.03v2.715l4.3-2.715h-4.3zm0-6.34v-4.299h4.3l-4.3 4.3zm0-14.932v5.883l4.3-5.883h-4.3zm0-3.167v-7.467h4.3l-4.3 7.467zm0-18.104v9.05l4.3-9.05h-4.3zm0-1.582v-7.467h4.3l-4.3 7.467zm0-16.516v5.883l4.3-5.883h-4.3zm0-4.756v-4.299h4.3l-4.3 4.3zm0-13.348v2.716l4.3-2.716h-4.3zM66.741 91.66v-2.715h5.883l-5.883 2.715zm0-13.354v4.3l5.883-4.3h-5.883zm0-4.75v-5.883h5.883l-5.883 5.883zm0-16.517v7.467l5.883-7.467h-5.883zm0-1.586V46.4h5.883l-5.883 9.05zm0-18.1v7.467l5.883-7.467h-5.883zm0-3.166v-5.883h5.883l-5.883 5.883zm0-14.938v4.3l5.883-4.3h-5.883zm0-6.334V10.2h5.883l-5.883 2.716zm-10.634 76.03v2.715l7.467-2.715h-7.467zm0-6.339v-4.3h7.467l-7.467 4.3zm0-14.932v5.883l7.467-5.883h-7.467zm0-3.168v-7.467h7.467l-7.467 7.467zm0-18.104v9.051l7.467-9.05h-7.467zm0-1.582v-7.467h7.467l-7.467 7.467zm0-16.516v5.883l7.467-5.883h-7.467zm0-4.755v-4.3h7.467l-7.467 4.3zm.001-13.348v2.715l7.467-2.715h-7.467zm-10.636 2.715v-2.716h9.051l-9.05 2.716zm-9.051 76.029v2.715l7.467-2.715H36.42zm0-6.34v-4.299h7.467l-7.467 4.3zm0-14.932v5.883l7.467-5.883H36.42zm0-3.167v-7.467h7.467l-7.467 7.467zm0-18.104v9.05l7.467-9.05H36.42zm0-1.582v-7.467h7.467l-7.467 7.467zm0-16.516v5.883l7.467-5.883H36.42zm0-4.756v-4.299h7.467l-7.467 4.3zm0-13.348v2.716l7.467-2.716H36.42zm-9.05 81.46v-2.715h5.883l-5.883 2.715zm0-13.354v4.3l5.883-4.3h-5.883zm0-4.75v-5.883h5.883l-5.883 5.883zm0-16.517v7.467l5.883-7.467h-5.883zm0-1.586V46.4h5.883l-5.883 9.05zm0-18.1v7.467l5.883-7.467h-5.883zm0-3.166v-5.883h5.883l-5.883 5.883zm0-14.938v4.3l5.883-4.3h-5.883zm0-6.334V10.2h5.883l-5.883 2.716zm-9.05 76.03v2.715l4.299-2.715h-4.3zm0-6.34v-4.299h4.299l-4.3 4.3zm0-14.932v5.883l4.299-5.883h-4.3zm0-3.167v-7.467h4.299l-4.3 7.467zm0-18.104v9.05l4.299-9.05h-4.3zm0-1.582v-7.467h4.299l-4.3 7.467zm0-16.516v5.883l4.299-5.883h-4.3zm0-4.756v-4.299h4.299l-4.3 4.3zm0-13.348v2.716l4.299-2.716h-4.3zm27.151 81.46v-2.715h9.051l-9.05 2.715zM9.27 88.944v2.715l2.715-2.715H9.27zm0-6.34v-4.299h2.715l-2.715 4.3zm0-14.932v5.883l2.715-5.883H9.27zm0-3.167v-7.467h2.715L9.27 64.505zm0-18.104v9.05l2.715-9.05H9.27zm0-1.582v-7.467h2.715L9.27 44.819zm0-16.516v5.883l2.715-5.883H9.27zm0-4.756v-4.299h2.715l-2.715 4.3zm0-13.348v2.715l2.716-2.715H9.268z",
        fill: "currentColor"
      }
    )
  );
}
var health_plans_default = IllustrationHealthPlans;

// src/illustrations/upgrade.js
import * as React88 from "react";
function IllustrationUpgrade(props) {
  return /* @__PURE__ */ React88.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 100 100",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React88.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M100 100H0V0h100v100zM67.146 64.937L89.837 90H10.163l22.691-25.063H10.163L36.04 46.705H10.163L38.196 33.03H10.163l25.895-9.357H10.163l23.902-6.477H10.163L50 10l39.837 7.197H65.935l23.902 6.477H63.942l25.895 9.357H61.804l28.033 13.674H63.96l25.877 18.232H67.146z",
        fill: "currentColor"
      }
    )
  );
}
var upgrade_default = IllustrationUpgrade;

// src/illustrations/how-to-use-loom.js
import * as React89 from "react";
function IllustrationHowtoUseLoom(props) {
  return /* @__PURE__ */ React89.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 110 110",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React89.createElement(
      "path",
      {
        d: "M61.125 97.536H48.768v12.373h12.357V97.536zM81.608 88.743l-10.701 6.179 6.186 10.714 10.701-6.178-6.186-10.715zM94.92 70.897l-6.178 10.7 10.715 6.187 6.178-10.701-10.714-6.186zM89.445 61.127V48.77H78.014l9.91-5.724-6.178-10.71-9.895 5.724 5.724-9.895-10.71-6.179-5.724 9.895V20.45H48.769V31.88l-5.724-9.895-10.71 6.179 5.723 9.91-9.91-5.723-6.179 10.71 9.91 5.724H20.45v12.356h11.43l-9.91 5.724 6.179 10.71 9.91-5.723-5.723 9.91 10.71 6.178 5.724-9.91v11.431h12.356V78.032l5.724 9.91 10.71-6.178-5.724-9.895 9.895 5.724 6.179-10.71-9.91-5.724h11.447v-.031zM54.947 71.413c-9.095 0-16.465-7.37-16.465-16.465 0-9.095 7.37-16.465 16.465-16.465 9.095 0 16.465 7.37 16.465 16.465 0 9.095-7.37 16.465-16.465 16.465zM109.91 48.77H97.538v12.356h12.372V48.77zM99.46 22.114l-10.714 6.187L94.925 39l10.714-6.186-6.178-10.7zM77.082 4.276L70.896 14.99l10.701 6.179 6.186-10.715-10.7-6.178zM61.125 0H48.768v12.373h12.357V0zM32.825 4.281L22.124 10.46l6.186 10.714 10.701-6.178-6.186-10.715zM10.449 22.127L4.27 32.828l10.714 6.186 6.178-10.7-10.714-6.187zM12.373 48.77H0v12.356h12.373V48.77zM14.99 70.881L4.274 77.067l6.178 10.701 10.715-6.186-6.179-10.7zM28.311 88.746L22.125 99.46l10.701 6.179 6.186-10.715-10.7-6.178z",
        fill: "currentColor"
      }
    )
  );
}
var how_to_use_loom_default = IllustrationHowtoUseLoom;

// src/illustrations/upload-drag-and-drop.js
import * as React90 from "react";
function IllustrationUploadDragAndDrop(props) {
  return /* @__PURE__ */ React90.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 100 100",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React90.createElement(
      "path",
      {
        d: "M100 38.086V0H61.914v9.93h21.132L54.963 38.013V16.88h-9.93v21.132L16.951 9.93h21.135V0H0v38.086h9.93V16.951l28.083 28.082H16.88v9.93h21.132L9.93 83.046V61.914H0V100h38.086v-9.93H16.951l28.082-28.086v21.135h9.93V61.984L83.046 90.07H61.914V100H100V61.914h-9.93v21.132L61.987 54.963H83.12v-9.93H61.987L90.07 16.951v21.135H100z",
        fill: "currentColor"
      }
    )
  );
}
var upload_drag_and_drop_default = IllustrationUploadDragAndDrop;

// src/illustrations/use-cases.js
import * as React91 from "react";
function IllustrationUseCases(props) {
  return /* @__PURE__ */ React91.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 100 100",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React91.createElement(
      "path",
      {
        d: "M0 0v100h100V0H0zm90 90H61.91l20.87-12.52L90 89.52V90zm0-71.25H29.01L90 26.56v8.82l-42.3-5.42L90 42.3v9.12l-27.61-8.05L90 56.78v9.73l-15.29-7.42L90 71.34v11.22L76.02 71.35 61.06 90H49.84l24.82-30.94-8.62-4.19L48.98 90h-9.73l22.71-46.76-9.21-2.68L38.34 90h-9.12l17.53-60.15-10.48-1.35L28.4 90h-8.82l9.12-71.25h-9.94V90H10V10h80v8.75z",
        fill: "currentColor"
      }
    )
  );
}
var use_cases_default = IllustrationUseCases;

// src/illustrations/invite-members.js
import * as React92 from "react";
function IllustrationInviteMembers(props) {
  return /* @__PURE__ */ React92.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 134 134",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React92.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M67.59 60.288V0h-1.175v60.292L55.941.914l-1.157.204 10.474 59.374L44.636 3.841l-1.104.401 20.622 56.651L34.01 8.681l-1.017.588 30.144 52.213-38.752-46.184-.9.755 38.753 46.185-46.185-38.752-.755.9 46.184 38.752L9.27 32.993 8.68 34.01l52.212 30.144-56.65-20.622-.403 1.104 56.652 20.622L1.118 54.785l-.204 1.157 59.377 10.473H0v1.175h60.288L.914 78.058l.204 1.157 59.374-10.468L3.84 89.364l.402 1.104 56.651-20.617L8.681 99.99l.588 1.017 52.213-30.14-46.184 38.747.755.9 46.186-38.747-38.753 46.18.9.755 38.751-46.178-30.144 52.207 1.017.588 30.144-52.207-20.622 56.645 1.104.402 20.622-56.646-10.473 59.369 1.156.204 10.474-59.373V134h1.175V73.717l10.468 59.369 1.157-.204-10.468-59.37 20.617 56.647 1.104-.401-20.617-56.646 30.139 52.206 1.017-.587-30.14-52.208 38.747 46.179.9-.755-38.747-46.18 46.18 38.747.755-.9-46.179-38.746 52.208 30.139.588-1.017L73.112 69.85l56.646 20.617.401-1.104-56.646-20.617 59.369 10.468.204-1.157-59.37-10.468H134v-1.175H73.714l59.372-10.474-.204-1.156-59.369 10.473 56.646-20.622-.401-1.104-56.646 20.622 52.207-30.144-.588-1.017-52.208 30.144 46.179-38.752-.755-.9-46.18 38.753 38.747-46.185-.9-.755-38.746 46.184L101.007 9.27 99.99 8.68 69.85 60.893l20.617-56.65-1.104-.402-20.617 56.651L79.215 1.118 78.058.914 67.59 60.288z",
        fill: "currentColor"
      }
    )
  );
}
var invite_members_default = IllustrationInviteMembers;

// src/illustrations/wellness.js
import * as React93 from "react";
function IllustrationWellness(props) {
  return /* @__PURE__ */ React93.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 100 101",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React93.createElement(
      "path",
      {
        d: "M66.667.929a33.333 33.333 0 010 66.666V.93zM0 34.263a33.333 33.333 0 0166.667 0H0zM33.333 100.929a33.338 33.338 0 01-23.57-9.763 33.333 33.333 0 0123.57-56.903v66.666z",
        fill: "currentColor"
      }
    ),
    /* @__PURE__ */ React93.createElement(
      "path",
      {
        d: "M99.999 67.596a33.332 33.332 0 01-64.13 12.756 33.332 33.332 0 01-2.537-12.756h66.667zM33.334.93H.001v33.333h33.333z",
        fill: "currentColor"
      }
    ),
    /* @__PURE__ */ React93.createElement("path", { fill: "currentColor", d: "M100 67.595H66.667v33.333H100z" })
  );
}
var wellness_default = IllustrationWellness;

// src/illustrations/comments.js
import * as React94 from "react";
function IllustrationComments(props) {
  return /* @__PURE__ */ React94.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 96 96",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React94.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M96 0H0v96h96V0zM84 12H12v72h72V12z",
        fill: "currentColor"
      }
    ),
    /* @__PURE__ */ React94.createElement(
      "path",
      {
        fill: "currentColor",
        d: "M19.2 19.2h57.6v12H19.2zM19.2 38.4h57.6v12H19.2zM19.2 57.6h31.2v12H19.2z"
      }
    )
  );
}
var comments_default = IllustrationComments;

// src/illustrations/folders-empty-state-mobile.js
import * as React95 from "react";
function IllutrationFoldersEmptyStateMobile(props) {
  return /* @__PURE__ */ React95.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 96 96",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React95.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M0 67.2V96h96V0H67.2v67.2H0z",
        fill: "currentColor"
      }
    ),
    /* @__PURE__ */ React95.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M0 28.8V60h28.8V28.8H60V0H0v28.8z",
        fill: "currentColor"
      }
    )
  );
}
var folders_empty_state_mobile_default = IllutrationFoldersEmptyStateMobile;

// src/illustrations/help-ios.js
import * as React96 from "react";
function IllustrationHelpIos(props) {
  return /* @__PURE__ */ React96.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 96 96",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React96.createElement(
      "path",
      {
        d: "M22.8 12c5.965 0 10.8 4.835 10.8 10.8 0 .254-.008.505-.026.754C38.542 16.58 46.912 12 56.4 12 71.643 12 84 23.82 84 38.4c0 14.58-12.357 26.4-27.6 26.4-5.744 0-11.078-1.678-15.496-4.55A15.527 15.527 0 0143.2 68.4c0 8.616-6.984 15.6-15.6 15.6C18.985 84 12 77.016 12 68.4s6.985-15.6 15.6-15.6c2.444 0 4.757.562 6.816 1.564C30.892 49.93 28.8 44.399 28.8 38.4c0-2.6.393-5.11 1.125-7.483A10.76 10.76 0 0122.8 33.6c-5.964 0-10.8-4.835-10.8-10.8C12 16.835 16.836 12 22.8 12z",
        fill: "currentColor"
      }
    ),
    /* @__PURE__ */ React96.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M0 0h96v96H0V0zm12 12v72h72V12H12z",
        fill: "currentColor"
      }
    )
  );
}
var help_ios_default = IllustrationHelpIos;

// src/illustrations/my-videos-empty-state-mobile.js
import * as React97 from "react";
function IllustrationMyVideosEmptyStateMobile(props) {
  return /* @__PURE__ */ React97.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 96 96",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React97.createElement("path", { d: "M96 0H0v96h96V0zM84 12v72H12V12h72z", fill: "currentColor" }),
    /* @__PURE__ */ React97.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M85.023 48.341L48.341 11.66 11.66 48.341 48.34 85.023l36.682-36.682zm-56.69 0L48.34 28.333 28.333 48.34zm20.842 19.175L68.35 48.34 49.175 29.167v38.349z",
        fill: "currentColor"
      }
    )
  );
}
var my_videos_empty_state_mobile_default = IllustrationMyVideosEmptyStateMobile;

// src/illustrations/recents-empty-state-mobile.js
import * as React98 from "react";
function IllustrationRecentsEmptyStateMobile(props) {
  return /* @__PURE__ */ React98.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 96 96",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React98.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M0 0h96v28.704H47.844V12L12 48l35.844 36V67.305H96V96H0V0z",
        fill: "currentColor"
      }
    )
  );
}
var recents_empty_state_mobile_default = IllustrationRecentsEmptyStateMobile;

// src/illustrations/chrome-notifications-empty-state.js
import * as React99 from "react";
function IllustrationChromeNotificationsEmptyState(props) {
  return /* @__PURE__ */ React99.createElement(
    "svg",
    __spreadValues({
      viewBox: "0 0 96 96",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, props),
    /* @__PURE__ */ React99.createElement(
      "circle",
      {
        cx: 15.84,
        cy: 15.84,
        r: 11.04,
        stroke: "currentColor",
        strokeWidth: 9.6
      }
    ),
    /* @__PURE__ */ React99.createElement(
      "path",
      {
        d: "M59.52 15.84c0 5.963-5.022 11.04-11.52 11.04-6.498 0-11.52-5.077-11.52-11.04C36.48 9.877 41.502 4.8 48 4.8c6.498 0 11.52 5.077 11.52 11.04z",
        stroke: "currentColor",
        strokeWidth: 9.6
      }
    ),
    /* @__PURE__ */ React99.createElement("circle", { cx: 80.16, cy: 15.84, r: 15.84, fill: "currentColor" }),
    /* @__PURE__ */ React99.createElement(
      "path",
      {
        d: "M26.88 48c0 6.498-5.077 11.52-11.04 11.52C9.877 59.52 4.8 54.498 4.8 48c0-6.498 5.077-11.52 11.04-11.52 5.963 0 11.04 5.022 11.04 11.52z",
        stroke: "currentColor",
        strokeWidth: 9.6
      }
    ),
    /* @__PURE__ */ React99.createElement(
      "circle",
      {
        cx: 48,
        cy: 48,
        r: 11.52,
        stroke: "currentColor",
        strokeWidth: 9.6
      }
    ),
    /* @__PURE__ */ React99.createElement(
      "path",
      {
        d: "M91.2 48c0 6.498-5.077 11.52-11.04 11.52-5.963 0-11.04-5.022-11.04-11.52 0-6.498 5.077-11.52 11.04-11.52 5.963 0 11.04 5.022 11.04 11.52z",
        stroke: "currentColor",
        strokeWidth: 9.6
      }
    ),
    /* @__PURE__ */ React99.createElement(
      "circle",
      {
        cx: 15.84,
        cy: 80.16,
        r: 11.04,
        stroke: "currentColor",
        strokeWidth: 9.6
      }
    ),
    /* @__PURE__ */ React99.createElement(
      "path",
      {
        d: "M59.52 80.16c0 5.963-5.022 11.04-11.52 11.04-6.498 0-11.52-5.077-11.52-11.04 0-5.963 5.022-11.04 11.52-11.04 6.498 0 11.52 5.077 11.52 11.04z",
        stroke: "currentColor",
        strokeWidth: 9.6
      }
    ),
    /* @__PURE__ */ React99.createElement(
      "circle",
      {
        cx: 80.16,
        cy: 80.16,
        r: 11.04,
        stroke: "currentColor",
        strokeWidth: 9.6
      }
    )
  );
}
var chrome_notifications_empty_state_default = IllustrationChromeNotificationsEmptyState;
export {
  align_default as Align,
  arrange_default as Arrange,
  avatar_default as Avatar,
  backdrop_default as Backdrop,
  base_styles_default as BaseStyles,
  button_default as Button,
  checkbox_default as Checkbox,
  color_picker_default as ColorPicker,
  container_default as Container,
  distribute_default as Distribute,
  dropdown_default as Dropdown,
  ellipses_loader_default as EllipsesLoader,
  error_container_default as ErrorContainer,
  form_field_default as FormField,
  icon_default as Icon,
  icon_button_default as IconButton,
  IconButtonBox,
  illustration_default as Illustration,
  accounts_and_billing_default as IllustrationAccountsAndBilling,
  archived_default as IllustrationArchived,
  ask_for_more_default as IllustrationAskForMore,
  business_plan_default as IllustrationBusinessPlan,
  chrome_notifications_empty_state_default as IllustrationChromeNotificationsEmptyState,
  collaborate_with_teammates_default as IllustrationCollaborateWithTeammates,
  comments_default as IllustrationComments,
  community_default as IllustrationCommunity,
  community_alt_default as IllustrationCommunityAlt,
  content_limit_default as IllustrationContentLimit,
  custom_branding_default as IllustrationCustomBranding,
  desktop_app_and_chrome_extension_default as IllustrationDesktopAppAndChromeExtension,
  device_compatibility_default as IllustrationDeviceCompatibility,
  downgrade_default as IllustrationDowngrade,
  embrace_the_weird_default as IllustrationEmbraceTheWeird,
  enterprise_plan_default as IllustrationEnterprisePlan,
  faq_and_security_default as IllustrationFaqAndSecurity,
  five_minute_limit_default as IllustrationFiveMinuteLimit,
  getting_started_default as IllustrationGettingStarted,
  growth_through_empathy_default as IllustrationGrowthThroughEmpathy,
  health_plans_default as IllustrationHealthPlans,
  help_ios_default as IllustrationHelpIos,
  how_to_use_loom_default as IllustrationHowToUseLoom,
  invite_default as IllustrationInvite,
  invite_members_default as IllustrationInviteMembers,
  lead_with_transparency_default as IllustrationLeadWithTransparency,
  learning_and_development_default as IllustrationLearningAndDevelopment,
  loom_plans_default as IllustrationLoomPlans,
  my_videos_empty_state_mobile_default as IllustrationMyVideosEmptyStateMobile,
  option_grants_default as IllustrationOptionGrants,
  parental_leave_default as IllustrationParentalLeave,
  pto_default as IllustrationPto,
  recents_empty_state_mobile_default as IllustrationRecentsEmptyStateMobile,
  record_default as IllustrationRecord,
  remote_first_default as IllustrationRemoteFirst,
  roadmap_default as IllustrationRoadmap,
  screenshot_default as IllustrationScreenshot,
  share_default as IllustrationShare,
  share_with_your_team_default as IllustrationShareWithYourTeam,
  starred_default as IllustrationStarred,
  starter_plus_plan_default as IllustrationStarterPlusPlan,
  strong_upload_speed_default as IllustrationStrongUploadSpeed,
  troubleshooting_default as IllustrationTroubleshooting,
  upgrade_default as IllustrationUpgrade,
  upload_drag_and_drop_default as IllustrationUploadDragAndDrop,
  use_cases_default as IllustrationUseCases,
  wellness_default as IllustrationWellness,
  folders_empty_state_mobile_default as IllutrationFoldersEmptyStateMobile,
  JustifyContentRules,
  layout_default as Layout,
  link_default as Link,
  list_default as List,
  ListRow,
  loader_default as Loader,
  logo_default as Logo,
  logo_loader_default as LogoLoader,
  Media,
  menu_default as Menu,
  MenuItem,
  modal_default as Modal,
  ModalCard,
  notification_bar_default as NotificationBar,
  pill_default as Pill,
  popover_default as Popover,
  radio_default as Radio,
  select_default as Select,
  SkeletonContainer,
  SkeletonText,
  spacer_default as Spacer,
  split_default as Split,
  SplitSection,
  switch_default as Switch,
  Tab,
  tabs_default as Tabs,
  text_default as Text,
  text_button_default as TextButton,
  text_input_default as TextInput,
  textarea_default as Textarea,
  toast_default as Toast,
  tooltip_default as Tooltip,
  TooltipBox,
  typeahead_default as Typeahead,
  waveform_loader_default as WaveformLoader,
  accessibilityRules,
  alignSelfRules,
  alphaFunction,
  arrayToBreakpoints,
  backgroundColorRules,
  borderRules,
  breakpoints,
  buildGlobalStylesheet,
  colorRules,
  colorsNames,
  cssUtilities,
  darken,
  displayRules,
  ellipsisRules,
  flexDirectionRules,
  flexItemRules,
  flexWrapRules,
  fontWeightRules,
  fontWeightVariables,
  fontWeights,
  formFieldVariables,
  getAlignmentStyles,
  getAllCssVarsString,
  getColorAlpha,
  getColorScale,
  getColorValue,
  getColorsCssVarsObject,
  getCssVarsFromObject,
  getFocusRing,
  getFontWeight,
  getListContainer,
  getMediaCss,
  getOffsetFocusRing,
  getPlacement,
  getRadius,
  getResponsiveBoolean,
  getResponsiveColumns,
  getResponsiveGridSections,
  getResponsiveNumber,
  getResponsiveOneOf,
  getShadow,
  getSize,
  getSizeValue,
  getSizingCssVarsDeclarations,
  getSizingVariablesCssVarsObject,
  getSpacingSelectors,
  getTextSize,
  getThemeStyles,
  getThemeStylesString,
  getVariablesCssVarsObject,
  gradientVariables,
  gradients,
  growRules,
  heightRules,
  hslaBaseColors,
  hslaColors,
  hslaGreys,
  lighten,
  marginCrossRules,
  marginRules,
  minWidthRules,
  objectToBreakpoints,
  objectToRuleset,
  overflowRules,
  paddingCrossRules,
  paddingRules,
  pascalCaseToKebabCase,
  positionRules,
  radii,
  radiiRules,
  radiusVariables,
  saturate,
  shadowRules,
  shadowVariables,
  shadows,
  shortBreakpoints,
  shrinkRules,
  sidePositionRules,
  spaceVariables,
  spaces,
  textAlignmentRules,
  textSizeRules,
  textSizeVariables,
  textSizes,
  textVariantRules,
  themeColors,
  u,
  unit,
  unitVariables,
  useFocusedElement,
  useMedia,
  useOnClickOutside,
  use_prevent_scroll_default as usePreventScroll,
  use_push_page_down_default as usePushPageDown,
  widthRules
};
//# sourceMappingURL=index.js.map
