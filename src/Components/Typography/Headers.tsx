import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";
import { COLORS } from "../../Style/Colors";
import { Font, FontWeight } from "../../Style/Font";

const styles = StyleSheet.create({
  shared: {
    letterSpacing: 0,
  },
});

export type HeaderProps = {
  color?: string;
} & TextProps;

type HeaderVariants = "h1" | "h2" | "h3";
const variantStyle = (variant: HeaderVariants) => {
  switch (variant) {
    case "h1":
      return {
        ...styles.shared,
        marginBottom: 8,
        lineHeight: 30,
        ...Font({ fontSize: 26, fontWeight: FontWeight.bold }),
      };
    case "h2":
      return {
        ...styles.shared,
        marginBottom: 8,
        lineHeight: 26,
        ...Font({ fontSize: 20, fontWeight: FontWeight.bold }),
      };
    case "h3":
      return {
        ...styles.shared,
        lineHeight: 22,
        ...Font({ fontSize: 18, fontWeight: FontWeight.bold }),
      };
  }
};

const createHeader = (variant: HeaderVariants): React.FC<HeaderProps> => ({
  color = COLORS.gray1,
  children,
  style,
  ...props
}) => (
  <Text
    style={[
      variantStyle(variant),
      {
        color,
      },
      style,
    ]}
    {...props}
  >
    {children}
  </Text>
);

export const H1 = createHeader("h1");
export const H2 = createHeader("h2");
export const H3 = createHeader("h3");
