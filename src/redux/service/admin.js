import axios from "axios";
import { apiGetListUser, apiPostUser, TokenCybersoft } from "./type";
import { apiLogin } from "./type";

export const login = async (userLogin) => {
  try {
    const data = await axios.post(apiLogin, userLogin, {
      headers: {
        TokenCyberSoft: TokenCybersoft,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const getListUser = async () => {
  try {
    const listUser = await axios.get(apiGetListUser, {
      headers: {
        TokenCyberSoft: TokenCybersoft,
      },
    });
    return listUser;
  } catch (error) {
    throw error;
  }
};
export const registerUser = async (data, token) => {
  try {
    console.log(data, token);
    const result = await axios.post(apiPostUser, data, {
      headers: {
        TokenCyberSoft: TokenCybersoft,
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
