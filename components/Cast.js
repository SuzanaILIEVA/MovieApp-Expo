import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { fallbackPersonImage, image185 } from "../api/Moviedb";

const Cast = ({ cast, navigation }) => {
  let personName = "Keanu Reeves";
  let characterName = "John Wick";
  return (
    <View style={{ marginVertical: 6 }}>
      <Text
        style={{
          color: "#fff",
          fontSize: 20,
          marginHorizontal: 10,
          marginBottom: 15,
        }}
      >
        Top Cast
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{ marginRight: 20, alignItems: "center" }}
                onPress={() => navigation.navigate("Person", person)}
              >
                <View style={styles.castImg}>
                  <Image
                    // source={require("../assets/images/keanu.jpg")}
                    source={{
                      uri:
                        image185(person?.profile_path) || fallbackPersonImage,
                    }}
                    style={{ width: 120, height: 120, borderRadius: 20 }}
                  />
                </View>
                <Text style={{ color: "#fff", marginTop: 4 }}>
                  {person?.character.length > 10
                    ? person?.character.slice(0, 10) + "..."
                    : person?.character}
                </Text>
                <Text style={{ color: "#fff", marginTop: 4 }}>
                  {person?.original_name.length > 10
                    ? person?.original_name.slice(0, 10) + "..."
                    : person?.original_name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Cast;

const styles = StyleSheet.create({
  castImg: {
    overflow: "hidden",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#000",
    marginBottom: 10,
    alignItems: "center",
    height: 100,
    width: 100,
  },
});
