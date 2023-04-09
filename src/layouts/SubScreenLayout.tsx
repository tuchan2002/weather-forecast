import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../components/Header";

interface SubScreenLayoutProps {
  children: ReactNode;
  title?: string;
}

const SubScreenLayout = ({
  children,
  title = "No Title",
}: SubScreenLayoutProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <View style={styles.container}>
        <Header title={title} />
        {children}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 16,
  },
});
export default SubScreenLayout;
