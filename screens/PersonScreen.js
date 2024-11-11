import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { themeStyle } from "../theme";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image } from "react-native";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import {
  fallbackPersonImage,
  fetchPersonDetails,
  fetchPersonMovies,
  image342,
} from "../api/Moviedb";

const { width, height } = Dimensions.get("window");
const PersonScreen = () => {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(false);
  const [personMovies, setPersonMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [person, setPerson] = useState({});

  useEffect(() => {
    setLoading(true);
    // console.log("person", item);

    getPersonDetails(item.id);
    getPersonMovies(item.id);
  }, [item]);

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id);
    // console.log("got person details : ", data);

    if (data) setPerson(data);
    setLoading(false);
  };

  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id);
    // console.log("got person movies : ", data);

    if (data && data.cast) setPersonMovies(data.cast);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#1e201d" }}>
      <SafeAreaView
        style={{
          flex: 1,
          zIndex: 10,
          paddingTop: 45,
          paddingBottom: 20,
          justifyContent: "center",
          zIndex: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
          width: "100%",
        }}
      >
        <TouchableOpacity
          style={[themeStyle.background, { borderRadius: 20, padding: 6 }]}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="left" size={30} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
          <AntDesign
            name="heart"
            size={30}
            color={isFavourite ? "red" : "white"}
          />
        </TouchableOpacity>
      </SafeAreaView>

      {/* person Details */}
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View style={styles.imgContainer}>
            <View style={styles.personImg}>
              <Image
                // source={require("../assets/images/keanu.jpg")}
                source={{
                  uri: image342(person?.profile_path) || fallbackPersonImage,
                }}
                style={{ height: height * 0.43, width: width * 0.74 }}
              />
            </View>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                fontSize: 35,
                color: "#fff",
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              {person?.name}
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: "gray",
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              {person?.place_of_birth ? "Place of Birth" : "London"}
            </Text>
          </View>

          <View style={styles.infoBox}>
            <View
              style={{
                borderRightWidth: 3,
                borderRightColor: "gray",
                paddingHorizontal: 5,
              }}
            >
              <Text
                style={{ color: "#fff", fontSize: 18, fontWeight: "semibold" }}
              >
                Gender
              </Text>
              <Text style={{ color: "gray", fontSize: 14 }}>
                {person?.gender == 1 ? "Female" : "Male"}
              </Text>
            </View>
            <View
              style={{
                borderRightWidth: 3,
                borderRightColor: "gray",
                paddingHorizontal: 5,
              }}
            >
              <Text
                style={{ color: "#fff", fontSize: 18, fontWeight: "semibold" }}
              >
                Birthday
              </Text>
              <Text style={{ color: "gray", fontSize: 14 }}>
                {person?.birthday}
              </Text>
            </View>
            <View
              style={{
                borderRightWidth: 3,
                borderRightColor: "gray",
                paddingHorizontal: 5,
              }}
            >
              <Text
                style={{ color: "#fff", fontSize: 18, fontWeight: "semibold" }}
              >
                Known for
              </Text>
              <Text style={{ color: "gray", fontSize: 14 }}>
                {person?.known_for_department}
              </Text>
            </View>
            <View
              style={{
                paddingHorizontal: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ color: "#fff", fontSize: 18, fontWeight: "semibold" }}
              >
                Popularity
              </Text>
              <Text style={{ color: "gray", fontSize: 14 }}>
                {person?.popularity?.toFixed(2)} %
              </Text>
            </View>
          </View>

          <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
            <Text style={{ color: "#fff", fontSize: 25 }}>Biography</Text>
            <Text style={{ color: "gray", fontSize: 19 }}>
              {person?.biography || "N/A"}
            </Text>
          </View>

          {/* movies */}
          <MovieList title="Movies" hideSeeAll={true} data={personMovies} />
        </View>
      )}
    </ScrollView>
  );
};

export default PersonScreen;

const styles = StyleSheet.create({
  imgContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 20,
  },

  personImg: {
    alignItems: "center",
    borderRadius: 150,
    overflow: "hidden",
    width: 300,
    height: 300,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "gray",
    shadowColor: "white",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 5,
    shadowRadius: 75,
    elevation: 20,
  },
  infoBox: {
    marginHorizontal: 10,
    marginVertical: 15,
    padding: 15,
    backgroundColor: "#2F2F2F",
    borderRadius: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
