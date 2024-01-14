import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { fetchTrending, } from "../hook/useFetch"; // Assuming Movie type is defined in useFetch
import { width, height, image500 } from "../constants/dimension";


import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type StackParamList = {
  // item: any;
  Movie: any;
  Home: any;
};
export type StackNavigation = NativeStackNavigationProp<StackParamList>;

const navigation = useNavigation<StackNavigation>();
export type StackNavigationProps = {
  navigation: StackNavigation;
};

const TrendingMovies: React.FC = ({ navigation }: StackNavigationProps) => {
  const [trending, setTrending] = useState<Object[]>([]); // Adjusted the type of trending
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = (item: Object) => {
    navigation.navigate("Movie", item);
  };

  const { isLoading, data, error } = fetchTrending();

  useEffect(() => {
    // Assuming getTrendingMovies is an asynchronous function
    const getTrendingMovies = async () => {
      if (data && data.results) {
        setTrending(data.results);
      }
    };

    getTrendingMovies();
  }, [data]); // Added data to dependency array

  return (
    <View>
      <Text style={{ color: "white", fontSize: 20, marginLeft: 4, marginBottom: 5 }}>
        Trending Movies
      </Text>
      {isLoading ? (
        <Text>YABABABBA</Text>
      ) : (
        <Carousel
          data={data?.results || []} // Added nullish coalescing for data.results
          renderItem={({ item }) => (
            <MovieCard item={item} handleClick={handleClick} />
          )}
          firstItem={1}
          inactiveSlideOpacity={0.6}
          sliderWidth={width}
          itemWidth={width * 0.62}
          slideStyle={{ display: "flex", alignItems: "center" }}
        />
      )}
    </View>
  );
};

interface MovieCardProps {
  item: any;
  handleClick: (item: any) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={{ uri: image500(item.poster_path) }}
        style={{
          width: width * 0.6,
          height: height * 0.4,
          borderRadius: 18, // Adjusted className to style and added borderRadius
        }}
      />
    </TouchableWithoutFeedback>
  );
};

export default TrendingMovies;
