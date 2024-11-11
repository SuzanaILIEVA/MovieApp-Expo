import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { image500 } from "../api/Moviedb";

const { width, height } = Dimensions.get("window");
const MovieCard = ({ item }) => {
  const navigation = useNavigation();
  const handleClick = () => {
    navigation.navigate("Movie", item);
  };

  // console.log("item poster path:", item.poster_path);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => handleClick(item)}>
        <Image
          // source={require("../assets/images/marverl.jpg")}
          source={{ uri: image500(item.poster_path) }}
          style={{
            width: width * 0.6,
            height: height * 0.4,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 20,
    marginBottom: 10,
  },
  image: {
    width: "100%", // %100 genişlik
    height: height * 0.4, // Yükseklik ayarı
    borderRadius: 20,
    elevation: "#fff",
  },
});
