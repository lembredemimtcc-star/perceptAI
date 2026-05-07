import React from "react";
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
} from "react-native";

import { styles } from "@/styles/registerButton.styles";

type Props = TouchableOpacityProps & {
  title: string;
};

export function RegisterButton({
  title,
  ...rest
}: Props) {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.8}
      {...rest}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}