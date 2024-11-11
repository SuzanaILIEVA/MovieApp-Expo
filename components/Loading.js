import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import { theme, themeStyle } from "../theme";

const { width, height } = Dimensions.get("window");
const Loading = () => {
  return (
    <View style={styles.container}>
      <Progress.CircleSnail
        thickness={12}
        size={160}
        color={theme.background}
      />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width,
    height,
  },
});
