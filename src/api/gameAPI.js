import api from "./axios";

export const getGameLobby = () =>
  api.get("/game");