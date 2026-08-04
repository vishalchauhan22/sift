import "../chunk-BYZ2GIR3.js";
const OVERLAY_COLORS = {
  purple: {
    label: "Purple",
    color: "#625DF5",
    backgroundColor: "#E9E9FD",
    waveformColors: {
      expandedPinBorderColor: "#625DF5",
      collapsedPinBorderColor: "#E9E9FD",
      selectedRailBorderColor: "#625DF5"
    }
  },
  blue: {
    label: "Blue",
    color: "#1D7AFC",
    backgroundColor: "#E9F2FF",
    waveformColors: {
      expandedPinBorderColor: "#1D7AFC",
      collapsedPinBorderColor: "#E9F2FF",
      selectedRailBorderColor: "#1D7AFC"
    }
  },
  teal: {
    label: "Teal",
    color: "#2898BD",
    backgroundColor: "#E7F9FF",
    waveformColors: {
      expandedPinBorderColor: "#2898BD",
      collapsedPinBorderColor: "#E7F9FF",
      selectedRailBorderColor: "#2898BD"
    }
  },
  green: {
    label: "Green",
    color: "#22A06B",
    backgroundColor: "#DCFFF1",
    waveformColors: {
      expandedPinBorderColor: "#22A06B",
      collapsedPinBorderColor: "#DCFFF1",
      selectedRailBorderColor: "#22A06B"
    }
  },
  lime: {
    label: "Lime",
    color: "#6A9A23",
    backgroundColor: "#EFFFD6",
    waveformColors: {
      expandedPinBorderColor: "#6A9A23",
      collapsedPinBorderColor: "#EFFFD6",
      selectedRailBorderColor: "#6A9A23"
    }
  },
  yellow: {
    label: "Yellow",
    color: "#B38600",
    backgroundColor: "#FFF7D6",
    waveformColors: {
      expandedPinBorderColor: "#B38600",
      collapsedPinBorderColor: "#FFF7D6",
      selectedRailBorderColor: "#B38600"
    }
  },
  magenta: {
    label: "Magenta",
    color: "#CD519D",
    backgroundColor: "#FFECF8",
    waveformColors: {
      expandedPinBorderColor: "#CD519D",
      collapsedPinBorderColor: "#FFECF8",
      selectedRailBorderColor: "#CD519D"
    }
  },
  red: {
    label: "Red",
    color: "#C9372C",
    backgroundColor: "#FFECEB",
    waveformColors: {
      expandedPinBorderColor: "#C9372C",
      collapsedPinBorderColor: "#FFECEB",
      selectedRailBorderColor: "#C9372C"
    }
  },
  orange: {
    label: "Orange",
    color: "#E56910",
    backgroundColor: "#FFF3EB",
    waveformColors: {
      expandedPinBorderColor: "#E56910",
      collapsedPinBorderColor: "#FFF3EB",
      selectedRailBorderColor: "#E56910"
    }
  },
  gray: {
    label: "Gray",
    color: "#758195",
    backgroundColor: "#F1F2F4",
    waveformColors: {
      expandedPinBorderColor: "#758195",
      collapsedPinBorderColor: "#F1F2F4",
      selectedRailBorderColor: "#758195"
    }
  },
  white: {
    label: "White",
    color: "#FFFFFF",
    backgroundColor: "#000000",
    waveformColors: {
      expandedPinBorderColor: "#686868",
      collapsedPinBorderColor: "#000000",
      selectedRailBorderColor: "#686868"
    }
  },
  black: {
    label: "Black",
    color: "#000000",
    backgroundColor: "#FFFFFF",
    waveformColors: {
      expandedPinBorderColor: "#000000",
      collapsedPinBorderColor: "#E2E0E5",
      selectedRailBorderColor: "#000000"
    }
  }
};
const OVERLAY_COLOR_LOOKUP_MAP = Object.values(OVERLAY_COLORS).reduce((acc, overlayColor) => {
  acc[overlayColor.color] = overlayColor;
  return acc;
}, {});
const getOverlayColorFromHexColor = (hexColor) => {
  return OVERLAY_COLOR_LOOKUP_MAP[hexColor] || null;
};
const getOverlayColorForVideoOverlay = (overlay) => {
  const matchingOverlayColor = overlay.__typename === "VideoCanvasTextOverlay" ? getOverlayColorFromHexColor(overlay.textColor || "") : overlay.__typename === "VideoCanvasArrowOverlay" ? getOverlayColorFromHexColor(overlay.arrowColor || "") : overlay.__typename === "VideoCanvasBoxOverlay" ? getOverlayColorFromHexColor(overlay.boxBorderColor || "") : OVERLAY_COLORS.purple;
  return matchingOverlayColor != null ? matchingOverlayColor : OVERLAY_COLORS.purple;
};
export {
  OVERLAY_COLORS,
  OVERLAY_COLOR_LOOKUP_MAP,
  getOverlayColorForVideoOverlay,
  getOverlayColorFromHexColor
};
//# sourceMappingURL=overlayColors.js.map
