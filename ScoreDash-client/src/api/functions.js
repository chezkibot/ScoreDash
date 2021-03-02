import axios from "axios";

const createToken = async (user) => {
  const token = user && (await user.getIdToken());
  const payloadHeader = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return payloadHeader;
};

export const createUser = async (user) => {
  const header = await createToken(user);
  try {
    const res = await axios.post(
      "https://scoredash.herokuapp.com/api/users/create",
      "",
      header
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export default createToken;
