import axios from "axios";
const getData = async () => {
  return await axios
    .get("https://wisebot2.onrender.com/")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default getData;
