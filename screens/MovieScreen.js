import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { themeStyle } from "../theme";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from "../api/Moviedb";

const { width, height } = Dimensions.get("window");
const MovieScreen = () => {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  let movieName = "Ant-Man and the Wasp: Quantumania";

  const [isFavourite, toggleFavourite] = useState(false);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    //call the movie details api
    // console.log("item id : ", item.id);
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    // console.log("got movie details : ", data);
    if (data) setMovie(data);
    setLoading(false);
  };

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    console.log("got movieCredits : ", data);
    if (data && data.cast) setCast(data.cast);
  };

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    console.log("got similar movies : ", data);
    if (data && data.results) setSimilarMovies(data.results);
  };
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      style={{ flex: 1, backgroundColor: "#1e201d" }}
    >
      {/* back button and movie poster */}
      <View style={{ width: "100%" }}>
        <SafeAreaView
          style={{
            flex: 1,
            position: "absolute",
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

        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              //   source={require("../assets/images/movieposter2.jpg")}
              source={{ uri: image500(movie?.poster_path) }}
              style={{ width: width, height: height * 0.55 }}
            />
            <LinearGradient
              colors={["transparent", "rgba(22,22,22,0.9)", "rgba(23,23,23,1)"]}
              style={{
                width,
                height: height * 0.4,
                position: "absolute",
                bottom: 0,
                zIndex: 10,

                paddingHorizontal: 20,
              }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
          </View>
        )}
      </View>

      {/* MOVIE DETAILS */}
      <View style={{ marginTop: -(height * 0.09), marginBottom: 3 }}>
        {/* title */}
        <Text style={styles.moviename}>{movie?.title}</Text>

        {/* status ,release runtime */}
        {movie?.id ? (
          <Text style={styles.releasetext}>
            {movie?.status} • {movie?.release_date?.split("-")[0]} •{" "}
            {movie?.runtime} min
          </Text>
        ) : null}

        {/* genres */}
        <View style={styles.genres}>
          {movie?.genres?.map((genre, index) => {
            let showDot = index + 1 != movie.genres.length;
            return (
              <Text key={index} style={styles.genrestitle}>
                {genre?.name}
                {showDot ? " • " : null}
              </Text>
            );
          })}
        </View>

        {/* description */}

        <Text style={styles.genrestitle}>{movie?.overview}</Text>
      </View>
      {/* cast members */}
      {cast.length > 0 && <Cast cast={cast} navigation={navigation} />}

      {/* similar movie list */}
      {similarMovies.length > 0 && (
        <MovieList
          title="Similar Movies"
          hideSeeAll={true}
          data={similarMovies}
        />
      )}
    </ScrollView>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({
  moviename: {
    color: "white",
    fontSize: 37,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    zIndex: 10,
  },
  releasetext: {
    color: "gray",
    fontSize: 19,
    marginBottom: 5,
    textAlign: "center",
    zIndex: 10,
    marginTop: 10,
    fontWeight: "600",
  },
  genres: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  genrestitle: {
    color: "gray",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 10,
  },
});
