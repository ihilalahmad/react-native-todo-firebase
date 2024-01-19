import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from "../config/config";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const todoDbRef = firebase.firestore().collection("todos");
  const [addData, setAddData] = useState("");
  const navigation = useNavigation();

  //fetching data from firestore database
  useEffect(() => {
    todoDbRef.orderBy("createdAt", "desc").onSnapshot((querySnapShot) => {
      const todos = [];
      querySnapShot.forEach((document) => {
        const { todoTitle } = document.data();
        todos.push({
          id: document.id,
          todoTitle,
        });
      });
      setTodos(todos);
    });
  }, []);

  //adding a todo in firebase db
  const addTodo = () => {
    //check if we have a todo
    if (addData && addData.length > 0) {
      //getting the timestamp
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        todoTitle: addData,
        createdAt: timestamp,
      };
      todoDbRef
        .add(data)
        .then(() => {
          setAddData("");
          Keyboard.dismiss();
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  //deleting a todo from firebase db
  const deleteTodo = (todos) => {
    todoDbRef
      .doc(todos.id)
      .delete()
      .then(() => {
        alert("Successfully deleted.");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <SafeAreaView style={styles.styleMainContainer}>
      <View style={styles.styleFormContainer}>
        <TextInput
          placeholder="Add a new todo"
          value={addData}
          onChangeText={(input) => setAddData(input)}
          style={styles.styleInputField}
        />
        <TouchableOpacity
          style={styles.styleButton}
          onPress={() => {
            addData === "" ? alert("Todo text cannot be empty") : addTodo();
          }}
        >
          <Text style={styles.styleButtonText}>Add Todo</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        numColumns={1}
        renderItem={({ item }) => (
          <View>
            <Pressable
              style={styles.styleTodoItemContainer}
              onPress={() => navigation.navigate("Details", { item })}
            >
              <View style={styles.styleTodoTextContainer}>
                <Text style={styles.styleTodoText}>
                  {item.todoTitle[0].toUpperCase() + item.todoTitle.slice(1)}
                </Text>
              </View>
              <FontAwesome
                name="trash-o"
                color="red"
                onPress={() => deleteTodo(item)}
                style={styles.styleTodoIcon}
              />
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  styleMainContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    // backgroundColor: "teal",
  },
  styleFormContainer: {
    flexDirection: "row",
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 40,
  },
  styleInputField: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
  },
  styleButton: {
    height: 47,
    borderRadius: 5,
    backgroundColor: "#788eec",
    width: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  styleButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  styleTodoItemContainer: {
    backgroundColor: "#e5e5e5",
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  styleTodoIcon: {
    marginTop: 5,
    fontSize: 20,
    marginRight: 14,
  },
  styleTodoTextContainer: {
    alignItems: "center",
    flexDirection: "column",
    marginLeft: 20,
  },
  styleTodoText: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 22,
  },
});

export default Home;
