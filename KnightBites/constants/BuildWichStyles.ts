import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "@/constants/Colors";
import { ColorSpace } from "react-native-reanimated";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
    },
    foodPic: {
        position: "absolute",
        top: -20,
        left: 0,
        transform: [{ translateX: -5 }],
        width: 60,
        borderRadius: 2,
        height: 60,
        zIndex: 1,
        marginTop: 10
    },

    componentsContainer: {
        overflow: "hidden",
        justifyContent: "space-between",
        flexWrap: "wrap",
        padding: 20
    }
    ,
    unselected: {
        backgroundColor: '#EFEEEE',
        padding: 10,
        margin: 10,
        width: 120,
        height: 120,
        maxWidth: 120, // Constrain button width
        maxHeight: 120, // Constrain button height
        justifyContent: "flex-end",
        alignItems: "center", // Ensure text stays centered
        borderColor: Colors.light.text,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    
    selected: {
        backgroundColor: "#FFF6D3",
        padding: 10,
        margin: 10,
        width: 120,
        height: 120,
        maxWidth: 120, // Constrain button width
        maxHeight: 120, // Constrain button height
        justifyContent: "flex-end",
        alignItems: "center", // Ensure text stays centered
        borderColor: Colors.light.text,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    selectionText: {
        color: Colors.light.text,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontSize: 20,
    },
    title: {
        fontSize: 30,
        marginBottom: 40,
        marginTop: 40,
    },
    specInstrs: {
        backgroundColor: "white",
        borderColor: Colors.light.text,
        borderWidth: 1,
        borderRadius: 5,
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
        backgroundColor: "maroon",
        padding: 10,
        margin: 5,
        borderRadius: 2,
        width: 175,
        height: 60,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15,
        justifyContent: "center",
        alignContent: "center",
        borderColor: Colors.light.text
    },
    bottomButtonText: {
        color: "white",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontSize: 12,
    },
    bottomSpacer: {
      flex: 1,
    },

    nameBox: {
        backgroundColor: "white",
        borderColor: Colors.light.text,
        borderWidth: 1,
        borderRadius: 5,
        width: "80%",
        height: 50,
        padding: 10,
        fontSize: 20,
    },

    instructionText: {
        marginBottom: 20,
        marginRight: 20,
        marginLeft: 20,
        fontSize: 20,
        alignContent: "center",
        textAlign: "center"
    },
    grilledText: {
        marginBottom: 20,
        marginRight: 20,
        marginLeft: 20,
        fontSize: 20,
        alignContent: "center",
        textAlign: "center"
    }
  })


export default styles;
