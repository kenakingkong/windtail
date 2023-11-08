namespace Constants {
  export const UNITS = {
    PX: "px",
    REM: "rem",
  };

  export const CSS_PROPERTIES = {
    GAP: "gap",
    HEIGHT: "height",
    MARGIN: "margin",
    PADDING: "padding",
    FONT_SIZE: "font_size",
    WIDTH: "width",
  };

  export const CATEGORIES = {
    SPACING: "spacing",
    TYPOGRAPHY: "typography",
  };

  export const CSS_PROPERTY_IDENTIFIER_GROUPS = {
    xy: ["x", "y"],
    spacing: ["x", "y", "s", "e", "b", "r", "t", "l"],
  };

  export const TAILWIND_CLASS_PROPERTIES = {
    [CSS_PROPERTIES.GAP]: {
      name: CSS_PROPERTIES.GAP,
      category: CATEGORIES.SPACING,
      prefix: "gap-",
      propertyPrefixes: CSS_PROPERTY_IDENTIFIER_GROUPS.xy,
    },
    [CSS_PROPERTIES.HEIGHT]: {
      name: CSS_PROPERTIES.HEIGHT,
      category: CATEGORIES.SPACING,
      prefix: "h",
      propertyPrefixes: [],
    },
    [CSS_PROPERTIES.MARGIN]: {
      name: CSS_PROPERTIES.MARGIN,
      category: CATEGORIES.SPACING,
      prefix: "m",
      propertyPrefixes: CSS_PROPERTY_IDENTIFIER_GROUPS.spacing,
    },
    [CSS_PROPERTIES.PADDING]: {
      name: CSS_PROPERTIES.PADDING,
      category: CATEGORIES.SPACING,
      prefix: "p",
      propertyPrefixes: CSS_PROPERTY_IDENTIFIER_GROUPS.spacing,
    },
    [CSS_PROPERTIES.FONT_SIZE]: {
      name: CSS_PROPERTIES.FONT_SIZE,
      category: CATEGORIES.TYPOGRAPHY,
      prefix: "text",
      propertyPrefixes: [],
    },
    [CSS_PROPERTIES.WIDTH]: {
      name: CSS_PROPERTIES.WIDTH,
      category: CATEGORIES.SPACING,
      prefix: "w",
      propertyPrefixes: [],
    },
  };
}

export default Constants;
