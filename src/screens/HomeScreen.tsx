import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  Button,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import TrendingMovies from "../components/TrendingMovies";
import MovieList from "../components/MovieList";
import { width, height, ios } from "../constants/dimension";
import { useNavigation } from "@react-navigation/native";
import { fetchTopRated, fetchUpcoming, fetchTrending } from "../hook/useFetch";


type Props = {
  onPress(): void
  navigation: Function
}

export default function HomeScreen(props:Props) {
  const {onPress} = props
  const { data: upcomingData, error, isError } = fetchUpcoming();
  const isLoading = true; // Placeholder for loading state
  const { data: topRatedData } = fetchTopRated();
  const [upcoming, setUpcoming] = useState<any[]>([]); // Change the type accordingly
  const [topRated, setTopRated] = useState<any[]>([]); // Change the type accordingly
  const navigation = useNavigation();

  useEffect(() => {
    if (upcomingData) {
      setUpcoming(upcomingData.results);
    }
    console.log(isError, error, isLoading);
    if (topRatedData) setTopRated(topRatedData.results);
  }, [upcomingData]);

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: "#1e2b37",
      }}
    >
      <SafeAreaView className={ios ? "mb-1" : "mb-3"}>
        <StatusBar style="light" />
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 4 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../../assets/pop.png")}
              style={{ height: 40, width: 40, tintColor: "#fff" }}
            />
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
              Popcorn
            </Text>
          </View>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={navigation.navigate("Cart")}>
            <Entypo name="shopping-cart" size={32} strokeWidth={2} color="black" />
            {/* <Text style={{ position: 'absolute', right: 2, color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: 1 }}>
              {cart.length}
            </Text> */}
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        {isLoading ? (
          <View>
            <TrendingMovies />
            <MovieList title="Upcoming" data={upcoming} />
            <MovieList title="Top Rated" data={topRated} />
          </View>
        ) : (
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
            Loading...
          </Text>
        )}
      </ScrollView>
    </GestureHandlerRootView>
  );
}
