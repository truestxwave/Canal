const AUTH_Port = 5213;
const MAIN_Port = 5056;

const HOST = "192.168.1.100";

export const AUTH_API = `http://${HOST}:${AUTH_Port}`; // auth backend
export const MAIN_API = `http://${HOST}:${MAIN_Port}`;   // main backend