import axios from "axios";

const API_URI = "https://gmailclone-server.onrender.com";

const API_GMAIL = async (urlObject, payload, type) => {
  return await axios({
    method: urlObject.method,
    url: `${API_URI}/${urlObject.endpoint}/${type}`,
    data: payload,
  });
};

export default API_GMAIL;
