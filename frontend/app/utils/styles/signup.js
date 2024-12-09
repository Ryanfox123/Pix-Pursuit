import { StyleSheet } from "react-native";
import Colours from "../Colours";

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: Colours.LIGHTGREY,
    alignItems: "center",
    borderColor: "black",
    border: "1",
    justifyContent: "flex-end",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  signUpContainer: {
    gap: 15,
    width: "80%",
    borderRadius: 10,
    padding: 20,
    borderColor: "#D9D9D9",
    borderWidth: 2,
    backgroundColor: "rgba(300, 300, 300, 0.8)",
  },
  inputText: {
    padding: 15,
    height: 50,
    borderRadius: 10,
    backgroundColor: Colours.LIGHTGREY,
    color: "white",
    borderColor: "#D9D9D9",
    borderWidth: 2,
    color: "black",
  },
  forgotAndSignUpText: {
    color: "white",
    fontSize: 11,
  },
  createBtn: {
    width: "80%",
    backgroundColor: Colours.AQUA_BLUE,
    borderRadius: 15,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "auto",
  },
  cancelBtn: {
    width: "80%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "auto",
    color: "white",
    borderColor: "#D9D9D9",
    borderWidth: 2,
    color: "black",
  },
  welcome: {
    fontSize: 20,
    marginBottom: 30,
  },
  errorMsg: {
    color: "red",
    width: 200,
    textAlign: "center",
    marginHorizontal: "auto",
  },
});
