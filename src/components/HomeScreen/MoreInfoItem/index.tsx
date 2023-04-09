import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { ILabelIcon, IMoreInfoItem } from "../../../types/HomeScreenComponent";

const MoreInfoItem = ({ moreInfoItem }: { moreInfoItem: IMoreInfoItem }) => {
  const { labelIcon, labelText, valueText } = moreInfoItem;

  const renderLabelIcon = (labelIcon: ILabelIcon) => {
    switch (labelIcon.iconType) {
      case "ionicons":
        return <Ionicons name={labelIcon.iconName} size={24} color="white" />;
      case "feather":
        return <Feather name={labelIcon.iconName} size={24} color="white" />;
      default:
        return;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.moreInfoLabel}>
        {renderLabelIcon(labelIcon)}
        <Text style={styles.moreInfoDefaultText}>{labelText}</Text>
      </View>
      <Text style={styles.moreInfoDefaultText}>{valueText}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  moreInfoDefaultText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
  moreInfoLabel: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
});
export default MoreInfoItem;
