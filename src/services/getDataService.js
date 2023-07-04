import axios from "axios";
const getData = async () => {
  return await axios
    .get("https://wisebot2.onrender.com")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const sendMessage = async () => {
  return await axios
  .get('https://wisebot2.onrender.com/send-message')
  .then((response) => {
    return response
  })
  .catch((error) => {
    console.log(error);
  });
}
export { getData, sendMessage };
