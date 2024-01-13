import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../hook/store";
import { fetchMovieDetails, fetchMovieCredits, fetchSimilarMovies } from "../hook/useFetch";
import { styles } from "../styles/themes";
import { width, height, ios, image500 } from "../constants/dimension";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";

const topMargin = ios ? "" : "mt-3";

interface MovieScreenProps {}

const MovieScreen: React.FC<MovieScreenProps> = () => {
  const [movie, setMovie] = useState<any>([]);
  const [cast, setCast] = useState<any>([]);
  const [similarMovies, setSimilarMovies] = useState<any>([]);
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const { isLoading, data: details, error } = fetchMovieDetails();
  const { data: credits } = fetchMovieCredits();
  const { data: similar } = fetchSimilarMovies();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.items);

  useEffect(() => {
    if (details) setMovie(details);
    if (credits && credits.cast) setCast(credits.cast);
    if (similar && similar.results) setSimilarMovies(similar.results);
  }, [details, credits, similar]);

  const handleAddToCart = (item: any) => {
    if (!item) return;
    dispatch(addItem(item));
  };

  return isLoading ? (
    <View>
      <Text className="text-2xl text-white my-6">Loading...</Text>
    </View>
  ) : (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      {/* back button and movie poster */}
      <View className="w-full">
        <SafeAreaView
          className={
            "absolute z-20 w-full flex-row justify-between px-10 " + topMargin
          }
        >
          <TouchableOpacity onPress={() => navigation.goBack()} className="p-1">
            <MaterialIcons
              name="chevron-left"
              size={32}
              strokeWidth={2.5}
              color="gold"
            />
          </TouchableOpacity>
          {/* Another Touchable Opacity showing the cart */}
        </SafeAreaView>
        <View>
          <Image
            source={{ uri: image500(movie?.poster_path) }}
            style={{
              width: width,
              height: height * 0.55,
            }}
            className="rounded-3xl"
          />
          <LinearGradient
            colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
            style={{ width, height: height * 0.4 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0"
          />
        </View>
      </View>

      {/* Movie details */}
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        <Text className="text-white text-center text-3xl font-bold tracking-wider">
          {movie?.title}
        </Text>
        {movie?.id ? (
          <Text className="text-neutral-400 font-semibold text-base text-center">
            {movie?.status} | {movie?.release_date?.split("-")[0]} |{" "}
            {movie?.runtime} min
          </Text>
        ) : null}
        <View className="flex-row justify-center mx-4 space-x-2">
          {movie?.genres?.map((genre: any, index: number) => {
            let showLine = index + 1 !== movie.genres.length;
            return (
              <Text
                key={index}
                className="text-neutral-400 font-semibold text-base text-center"
              >
                {genre?.name} {showLine ? " |" : null}
              </Text>
            );
          })}
        </View>
        {/* description */}
        <Text className="text-neutral-400 text-sm mx-4  my-7 tracking-wide">
          {movie?.overview}
        </Text>
        <TouchableOpacity
          className="flex-row justify-center items-center mt-20 "
          onPress={() => {
            handleAddToCart(movie);
          }}
        >
          <View className="rounded-xl bg-violet-600 hover:bg-violet-800">
            <Text className=" text-center p-3 text-white  text-xl font-semibold tracking-wider">
              Rent Movie
            </Text>
          </View>
        </TouchableOpacity>
        <Cast cast={cast} navigation={navigation} />
        <MovieList
          title="Similar Movies"
          hideSeeAll={true}
          data={similarMovies}
        />
      </View>
    </ScrollView>
  );
};

export default MovieScreen;
