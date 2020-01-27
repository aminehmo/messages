import React, { useState, useEffect } from "react";
import { ExpoConfigView } from "@expo/samples";
import firebase from "@firebase/app";
import "firebase/auth";
import * as ImagePicker from "expo-image-picker";

import {
  View,
  Platform,
  Text,
  ScrollView,
  Button,
  StyleSheet,
  TextInput,
  Image
} from "react-native";
import db from "../db";

export default function SettingsScreen() {
  const [hasCameraRollPermission, setHasCameraRollPermission] = useState(false);

  const [displayName, setDisplayName] = useState("");
  const [photoURL, setphotoURL] = useState("");

  const askPermission = async () => {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    setHasCameraRollPermission(status === "granted");
  };

  const handlePickImage = () => {
    //show camera roll, allow user to select , set photoURL
    //use firebase storage
    //upload selcted image to default bucket, naming with uid
    // get url and set photoURL
  };

  useEffect(() => {
    askPermission();
  }, []);

  const handleSet = async () => {
    const snap = await db
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get();
    setDisplayName(snap.data().displayName);
    setphotoURL(snap.data().photoURL);
  };
  useEffect(() => {
    // setDisplayName(firebase.auth().currentUser.displayName);
    // setphotoURL(firebase.auth().currentUser.photoURL);
    handleSet();
  }, []);
  const handleSave = () => {
    db.collection("users")
      .doc(firebase.auth().currentUser.uid)
      .set({ displayName, photoURL });
    handleSet();

    // firebase.auth().currentUser.updateProfile({
    //   displayName,
    //   photoURL
    // });
  };
  return (
    <View style={styles.container}>
      <Text>picture</Text>
      {photoURL !== "" && (
        <Image
          style={{
            width: 70,
            height: 70,
            borderWidth: 3,
            borderColor: "black"
          }}
          source={{ uri: photoURL }}
        />
      )}
      <TextInput
        style={{
          height: 30,
          borderColor: "black",
          borderTopWidth: 1,
          fontSize: 24,
          borderBottomWidth: 0.5,
          backgroundColor: "white"
        }}
        onChangeText={setDisplayName}
        placeholder="Name"
        value={displayName}
      />
      <TextInput
        style={{
          height: 30,
          borderColor: "black",
          borderTopWidth: 1,
          fontSize: 24,
          borderBottomWidth: 0.5,
          backgroundColor: "white"
        }}
        onChangeText={setphotoURL}
        placeholder="Photo URL"
        value={photoURL}
      />
      <Button title="Pick Image" onPress={handlePickImage} />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

SettingsScreen.navigationOptions = {
  title: "Settings"
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
