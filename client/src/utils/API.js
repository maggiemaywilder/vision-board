/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

export default {
  // Gets all boards
  getBoards: function() {
    return axios.get("/api/boards");
  },
  // Gets the board with the given id
  getBoard: function(id) {
    return axios.get("/api/board/" + id);
  },
  // Deletes the book with the given id
  getUsers: function() {
    return axios.get("/api/users/")
  },
  // Saves a book to the database
  getUser: function(uid) {
    return axios.get("/api/books" + uid);
  }
};