import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Button, Input, PricingCard, Avatar } from "@rneui/themed";
import NumericInput from "react-native-numeric-input";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../utils/typescript";
import { changeCount } from "../../redux/actions/countAction";

const HomeScreen = () => {
  const { countReducer } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();

  const [value, setValue] = useState<string>("");
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const getAppInfo = async () => {
      try {
        const value = await AsyncStorage.getItem("@name");
        if (value) {
          setValue(value);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getAppInfo();
  }, []);

  const storeData = async () => {
    try {
      await AsyncStorage.setItem("@name", name);
      setValue(name);
      setName("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeCount = (value: number) => {
    console.log(value);
    dispatch(changeCount(value));
  };

  return (
    <View style={styles.container}>
      {!value ? (
        <>
          <Input
            placeholder="Enter your name"
            onChangeText={(value) => setName(value)}
            value={name}
          />
          <Button
            disabled={name === ""}
            radius={"sm"}
            type="solid"
            title={"Save"}
            onPress={storeData}
          />
        </>
      ) : (
        <>
          <Avatar
            size={48}
            rounded
            source={{
              uri: "https://randomuser.me/api/portraits/men/36.jpg",
            }}
          />
          <Text style={{ marginBottom: 10 }}>
            Hello {value}. Welcome to my App!
          </Text>
          <NumericInput onChange={(value) => handleChangeCount(value)} />
          <PricingCard
            title="Free"
            price={`$${countReducer.count}`}
            info={["1 User", "Basic Support", "All Core Features"]}
            button={{ title: " GET STARTED", icon: "flight-takeoff" }}
            onButtonPress={() =>
              Alert.alert("Successful Purchase", `You have purchased`)
            }
          />
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
