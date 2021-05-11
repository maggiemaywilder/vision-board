import axios from "axios";
const BASEURL = "https://pixabay.com/api/?key=20053744-d90ffc8b7653149ca73d2a0ac&q=";

export default {
  search: function(query) {
    return axios.get(BASEURL + query);
  }
};