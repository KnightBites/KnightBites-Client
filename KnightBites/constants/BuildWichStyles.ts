import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "@/constants/Colors";
import { ColorSpace } from "react-native-reanimated";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    foodPic: {
        position: "absolute",
        top: 0,
        left: 0,
        width: 60,
        height: 60,
        borderRadius: 10,
    },
    unselected: {
        backgroundColor: Colors.light.background,
        padding: 10,
        margin: 5,
        borderRadius: 15,
        borderWidth: 1,
        width: 120,
        height: 120,
        justifyContent: "flex-end",
        alignContent: "center",
        borderColor: Colors.light.text
    },
    selected: {
        backgroundColor: "#EEEEAA",
        padding: 10,
        margin: 5,
        borderRadius: 15,
        borderWidth: 2,
        width: 120,
        height: 120,
        justifyContent: "flex-end",
        alignContent: "center",
        borderColor: Colors.light.text
    },
    selectionText: {
        color: Colors.light.text,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontSize: 20,
    },
    title: {
        fontSize: 25,
        marginBottom: 10,
        marginTop: 40
    },
    specInstrs: {
        backgroundColor: Colors.light.background,
        borderColor: Colors.light.text,
        borderWidth: 1,
        borderRadius: 15,
        width: "80%",
        height: 100,
        padding: 10,
        margin: 5,
        fontSize: 20,
    },
    bottom: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        width: "100%",
    },
    bottomButton: {
        backgroundColor: "red",
        padding: 10,
        margin: 5,
        borderRadius: 15,
        borderWidth: 1,
        width: 120,
        height: 60,
        justifyContent: "center",
        alignContent: "center",
        borderColor: Colors.light.text
    },
    bottomButtonText: {
        color: Colors.light.text,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontWeight: "bold",
    },
    bottomSpacer: {
      flex: 1,
    },
  })


export default styles;
