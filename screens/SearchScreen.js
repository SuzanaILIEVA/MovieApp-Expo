import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useCallback, useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import debounce from "lodash.debounce";
import {
  fallBackPosterImage,
  fetchSearchMovies,
  image185,
} from "../api/Moviedb";

const { width, height } = Dimensions.get("window");
const SearchScreen = () => {
  const navigation = useNavigation();
  let movieName = "Ant-Man and the Wasp: Quantumania";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (value) => {
    // console.log("value : ", value);
    if (value && value.length > 2) {
      setLoading(true);
      fetchSearchMovies({
        query: value,
        include_adult: "false",
        language: "en-US",
        page: "1",
      }).then((data) => {
        setLoading(false);
        // console.log("got movies :", data);
        if (data && data.results) setResults(data.results);
      });
    } else {
      setLoading(false);
      setResults([]);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView style={{ backgroundColor: "#1e201d", flex: 1 }}>
      <View
        style={{
          marginHorizontal: 10,
          marginBottom: 8,
          justifyContent: "space-between",
          alignItems: "center",
          borderColor: "gray",
          borderWidth: 2,
          borderRadius: 40,
          marginTop: 60,
          flexDirection: "row",
        }}
      >
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          style={{
            padding: 10,
            textAlign: "left",
            fontWeight: "semibold",
            color: "#fff",
            fontSize: 20,
            marginLeft: 15,
          }}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            padding: 9,
            margin: 5,
            backgroundColor: "#eab308",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FontAwesome6 name="xmark" size={30} color={"#fff"} />
        </TouchableOpacity>
      </View>

      {/* results */}
      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 10 }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "600",
              marginTop: 15,
            }}
          >
            Resultes ({results.length})
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
              paddingVertical: 20,
              paddingHorizontal: 3,
            }}
          >
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.push("Movie", item)}
                >
                  <View style={{ marginBottom: 10 }}>
                    <Image
                      // source={require("../assets/images/movieposter2.jpg")}
                      source={{
                        uri: image185(item?.poster_path) || fallBackPosterImage,
                      }}
                      style={{
                        height: height * 0.35,
                        width: width * 0.43,
                        borderRadius: 20,
                      }}
                    />
                    <Text
                      style={{
                        color: "gray",
                        fontSize: 18,
                        marginTop: 5,
                        marginBottom: 30,
                      }}
                    >
                      {item?.title?.length > 18
                        ? item?.title.slice(0, 18) + "..."
                        : item?.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/images/clapboard-4489924_1280.png")}
            style={{ height: height * 0.4, width: width * 0.7, marginTop: 40 }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
