/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

export default {
  // Gets all boards
  getUserBoards: function(uid) {
    return axios.get(`/api/${uid}/boards`);
  },
  // Gets the board with the given id
  getBoard: function(bid) {
    return axios.get(`/api/boards/${bid}`);
  },
  // Gets user by username
  getUserByUsername: function(username) {
    return axios.get(`/api/users/${username}`)
  },
  // Gets user by uid
  getUserById: function(uid) {
    return axios.get(`/api/users/${uid}`)
  },
  // Gets user with given uid
  loginUser: function(userData) {
    return axios.post(`/api/login`, userData);
  },
  // Add a new user to the database  
  newUser: function(userData) {
    return axios.post('/api/users', userData);
  },
  // Add a new board to the database
  newBoard: function(uid) {
      return axios.post(`/api/boards/${uid}/new`);
  },
  // Update a board with given id with data  
  updateBoard: function(bid, data) {
      return axios.put(`/api/boards/${bid}`, data);
  },
  // Add a new link
  newLink: function(linkData) {
      return axios.post('/api/links', linkData);
  },
  // Add a new image
  newImage: function(imgData) {
      return axios.post('/api/addImage', imgData);
  },
  // Add a new tag
  newTag: function(mediaId, tagData) {
      return axios.post(`/api/tags/${mediaId}`, tagData)
  },
  // Delete a link
  deleteLink: function(linkId) {
      return axios.delete(`/api/links/${linkId}`)
  },
  // Delete an image
  deleteImg: function(imgId) {
    return axios.delete(`/api/images/${imgId}`)
  },
  // Delete a tag
  deleteTag: function(tagId) {
    return axios.delete(`/api/tags/${tagId}`)
  }
};