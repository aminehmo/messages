import * as WebBrowser from "expo-web-browser";
import React, { useState, useEffect } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import "@firebase/firestore";
// import firebase from "@firebase/app";
// import "firebase/auth";
// import "firebase/database";
import db from "../db.js";

export default ({ message, handleEdit }) => {
  const [user, setUser] = useState(null);

  handleUser = async () => {
    const snap = await db
      .collection(`users`)
      .doc(message.from)
      .get();
    console.log("message.from info ", message, snap.data());
    setUser(snap.data());
  };
  useEffect(() => {
    handleUser();
  }, []);
  const handleDelete = message => {
    // it will find the id of the specific messege that we want to delete
    db.collection("messages")
      .doc(message.id)
      .delete();
  };
  console.log("message0000000", message);

  return (
    user && (
      <>
        <View>
          <Image
            style={{
              width: 70,
              height: 70,
              borderWidth: 3,
              borderColor: "black"
            }}
            source={{ uri: user.photoURL }}
          />
          <Text style={styles.getStartedText}>
            {user.displayName} : {message.to} {message.text}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "#e6f9ff",
            flexDirection: "column",
            justifyContent: "space-evenly",
            borderTopWidth: 1,
            borderBottomWidth: 0.5,
            borderColor: "black"
          }}
        >
          <Button title="Edit" onPress={() => handleEdit(message)} />
          <Button title="Delete" onPress={() => handleDelete(message)} />
        </View>
      </>
    )
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
