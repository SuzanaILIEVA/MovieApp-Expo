import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { themeStyle } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { fallBackPosterImage, image185 } from "../api/Moviedb";

const { width, height } = Dimensions.get("window");
const MovieList = ({ title, data, hideSeeAll }) => {
  let movieName = "Ant-Man and the Wasp: Quantumania";
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.upcoming}>
        <Text style={styles.title}>{title}</Text>

        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={[themeStyle.text, { fontSize: 25 }]}>See All</Text>
          </TouchableOpacity>
        )}
      </View>
      {/* Movie row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push("Movie", item)}
              style={{}}
            >
              <View style={{ gap: 3, marginRight: 25 }}>
                <Image
                  // source={require("../assets/images/ant4.jpeg")}
                  source={{
                    uri: image185(item.poster_path) || fallBackPosterImage,
                  }}
                  style={{
                    width: width * 0.33,
                    height: height * 0.22,
                    borderRadius: 30,
                  }}
                />

                <Text style={styles.movieName}>
                  {item.title && item.title.length > 1
                    ? item.title.slice(0, 11) + "..."
                    : item.title || "Başlık yok"}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MovieList;

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  upcoming: {
    marginHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 8,
    marginLeft: 16,
    color: "#fff",
  },
  movieName: {
    color: "gray",
    marginLeft: 10,
    fontSize: 16,
    marginBottom: 5,
    maxWidth: width * 0.33 - 20,
    overflow: "hidden",
    flexWrap: "nowrap",
  },
});
