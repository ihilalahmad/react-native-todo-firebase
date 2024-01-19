import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { firebase } from "../config/config";
import { useNavigation } from "@react-navigation/native";

const Details = ({ route }) => {
  const todosDbRef = firebase.firestore().collection("todos");
  const [textHeading, onChangeHeadingText] = useState(
    route.params.item.todoTitle
  );
  const navigation = useNavigation();

  //updating a todo in firebase db
  const updateTodo = () => {
    if (textHeading && textHeading.length > 0) {
      todosDbRef
        .doc(route.params.item.id)
        .update({
          todoTitle: textHeading,
        })
        .then(() => {
          navigation.navigate("Home");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <View style={styles.styleMainContainer}>
      <TextInput
        style={styles.textField}
        onChangeText={onChangeHeadingText}
        value={textHeading}
        placeholder="Update todo"
      />
      <TouchableOpacity
        style={styles.buttonUpdate}
        onPress={() => updateTodo()}
      >
        <Text>Update Todo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  styleMainContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    paddingTop: 56,
    paddingLeft: 16,
    paddingRight: 16,
  },
  textField: {
    marginBottom: 10,
    padding: 10,
    fontSize: 15,
    color: "black",
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  buttonUpdate: {
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    // elevation: 10,
    backgroundColor: "#0de065",
  },
});

export default Details;
