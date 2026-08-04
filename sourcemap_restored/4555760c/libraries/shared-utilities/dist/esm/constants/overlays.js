import {
  __spreadProps,
  __spreadValues
} from "../chunk-BYZ2GIR3.js";
import { OVERLAY_COLORS } from "./overlayColors";
import { OVERLAY_FONTS } from "./overlayFonts";
const UNSCALED_THIN_LINE_WIDTH_PX = 4;
const UNSCALED_THICK_LINE_WIDTH_PX = 12;
const UNSCALED_SHADOW_OFFSET_PX = 8;
const UNSCALED_BORDER_RADIUS = 16;
const VISIBLE_SHADOW_OPACITY = 0.3;
const SHADOW_BLUR_RADIUS = 10;
const SHADOW_COLOR = "#000000";
const BLUR_RADIUS = 30;
const BLUR_CLIP_PADDING = 2;
const DUPLICATE_OFFSET_PX = 40;
const DEFAULT_OVERLAY_TEXT = "Add text";
const DEFAULT_ARROW_OVERLAY_BASE_ATTRIBUTES = {
  canvasType: "arrow",
  canvasZIndex: 0,
  arrowColor: OVERLAY_COLORS.purple.color,
  arrowShadowColor: SHADOW_COLOR,
  arrowShadowBlurRadius: SHADOW_BLUR_RADIUS,
  arrowShadowOffsetX: UNSCALED_SHADOW_OFFSET_PX,
  arrowShadowOffsetY: UNSCALED_SHADOW_OFFSET_PX,
  arrowShadowOpacity: VISIBLE_SHADOW_OPACITY
};
const DEFAULT_ARROW_OVERLAY_VIDEO_ATTRIBUTES = __spreadProps(__spreadValues({}, DEFAULT_ARROW_OVERLAY_BASE_ATTRIBUTES), {
  arrowThickness: UNSCALED_THICK_LINE_WIDTH_PX,
  arrowWingLength: 50,
  arrowWingAngleDegrees: 45
});
const DEFAULT_ARROW_OVERLAY_SCREENSHOT_ATTRIBUTES = __spreadProps(__spreadValues({}, DEFAULT_ARROW_OVERLAY_BASE_ATTRIBUTES), {
  arrowThickness: UNSCALED_THIN_LINE_WIDTH_PX,
  arrowWingLength: 20,
  arrowWingAngleDegrees: 45
});
const DEFAULT_BOX_OVERLAY_ATTRIBUTES = {
  canvasType: "box",
  canvasZIndex: 0,
  boxBorderThickness: UNSCALED_THIN_LINE_WIDTH_PX,
  boxBorderColor: OVERLAY_COLORS.purple.color,
  boxBackgroundColor: "transparent",
  boxShadowColor: SHADOW_COLOR,
  boxShadowOffsetX: UNSCALED_SHADOW_OFFSET_PX,
  boxShadowOffsetY: UNSCALED_SHADOW_OFFSET_PX,
  boxShadowOpacity: VISIBLE_SHADOW_OPACITY,
  boxShadowBlurRadius: SHADOW_BLUR_RADIUS,
  boxCornerRadius: UNSCALED_BORDER_RADIUS
};
const DEFAULT_BLUR_OVERLAY_ATTRIBUTES = {
  canvasType: "blur",
  canvasZIndex: 0,
  blurRadius: BLUR_RADIUS,
  boxCornerRadius: UNSCALED_BORDER_RADIUS
};
const DEFAULT_TEXT_OVERLAY_ATTRIBUTES = {
  boxBackgroundColor: OVERLAY_COLORS.purple.backgroundColor,
  boxBackgroundCornerRadius: UNSCALED_BORDER_RADIUS,
  boxShadowBlurRadius: SHADOW_BLUR_RADIUS,
  boxShadowColor: SHADOW_COLOR,
  boxShadowOffsetX: UNSCALED_SHADOW_OFFSET_PX,
  boxShadowOffsetY: UNSCALED_SHADOW_OFFSET_PX,
  boxShadowOpacity: VISIBLE_SHADOW_OPACITY,
  canvasType: "text",
  canvasZIndex: 0,
  text: DEFAULT_OVERLAY_TEXT,
  textAlign: "left",
  textColor: OVERLAY_COLORS.purple.color,
  textFontFamily: OVERLAY_FONTS.simple.fontFamily,
  textFontSize: 65,
  textLetterSpacing: 0,
  textLineHeight: 1.2,
  textPadding: 24,
  textShadowBlurRadius: SHADOW_BLUR_RADIUS,
  textShadowColor: SHADOW_COLOR,
  textShadowOffsetX: UNSCALED_SHADOW_OFFSET_PX,
  textShadowOffsetY: UNSCALED_SHADOW_OFFSET_PX,
  textShadowOpacity: 0
};
const DEFAULT_IMAGE_OVERLAY_ATTRIBUTES = {
  canvasType: "image",
  canvasZIndex: 0,
  imageCornerRadius: UNSCALED_BORDER_RADIUS,
  imageShadowColor: SHADOW_COLOR,
  imageShadowOffsetX: UNSCALED_SHADOW_OFFSET_PX,
  imageShadowOffsetY: UNSCALED_SHADOW_OFFSET_PX,
  imageShadowOpacity: VISIBLE_SHADOW_OPACITY,
  imageShadowBlurRadius: SHADOW_BLUR_RADIUS
};
export {
  BLUR_CLIP_PADDING,
  BLUR_RADIUS,
  DEFAULT_ARROW_OVERLAY_SCREENSHOT_ATTRIBUTES,
  DEFAULT_ARROW_OVERLAY_VIDEO_ATTRIBUTES,
  DEFAULT_BLUR_OVERLAY_ATTRIBUTES,
  DEFAULT_BOX_OVERLAY_ATTRIBUTES,
  DEFAULT_IMAGE_OVERLAY_ATTRIBUTES,
  DEFAULT_OVERLAY_TEXT,
  DEFAULT_TEXT_OVERLAY_ATTRIBUTES,
  DUPLICATE_OFFSET_PX,
  SHADOW_BLUR_RADIUS,
  SHADOW_COLOR,
  UNSCALED_BORDER_RADIUS,
  UNSCALED_SHADOW_OFFSET_PX,
  UNSCALED_THICK_LINE_WIDTH_PX,
  UNSCALED_THIN_LINE_WIDTH_PX,
  VISIBLE_SHADOW_OPACITY
};
//# sourceMappingURL=overlays.js.map
