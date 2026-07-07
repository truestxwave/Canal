const AUTH_Port = 5213;
const MAIN_Port = 5056;
// Make sure to replace this with your actual backend host and ports if they are different.
//Check Via IPConfig or via command prompt using "ipconfig" command to get the correct IP address of your machine.
const HOST = "192.168.1.58";

export const AUTH_API = `http://${HOST}:${AUTH_Port}`; // auth backend
export const MAIN_API = `http://${HOST}:${MAIN_Port}`;   // main backend