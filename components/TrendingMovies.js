import { StyleSheet, Text, View, Dimensions, Animated } from "react-native";
import React, { useRef } from "react";

import MovieCard from "./MovieCard";

import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const itemWidth = width * 0.6; // Her bir resmin genişliğini ayarlıyoruz
const spacing = 20; // Aradaki boşluk

const TrendingMovies = ({ data }) => {
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };

  const scrollX = useRef(new Animated.Value(0)).current; // Kaydırma pozisyonunu takip eder
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trending</Text>

      <Animated.FlatList
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={itemWidth + spacing} // Her kaydırmada bir öğe kadar atlar
        snapToAlignment="center" // Öğeleri ekranın ortasında hizalar
        decelerationRate="fast" // Hızlı bir durma efekti verir
        contentContainerStyle={{
          paddingHorizontal: (width - itemWidth) / 2,
          paddingVertical: 10,
          paddingHorizontal: 20,
        }} // İlk ve son resmin tam ortalanmasını sağlar
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * (itemWidth + spacing),
            index * (itemWidth + spacing),
            (index + 1) * (itemWidth + spacing),
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8], // Ortadaki öğe büyür
            extrapolate: "clamp",
          });

          return (
            <View style={{ width: itemWidth, marginHorizontal: spacing / 2 }}>
              <Animated.View style={{ transform: [{ scale }] }}>
                <MovieCard item={item} handleClick={handleClick} />
              </Animated.View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default TrendingMovies;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 2,
  },
  title: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    marginHorizontal: 15,
    marginBottom: 10,
  },
  page: {
    page: {
      justifyContent: "center",
      alignItems: "center",
    },
  },
});
