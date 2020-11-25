export const isBackendDev = (): boolean => {
  return "true" === (localStorage.getItem("backendDev") || "false");
};
const baseUrl = "http://it2810-80.idi.ntnu.no:3000";
const localUrl = "http://localhost:9000";
const getUrl = (): string => {
  if (isBackendDev()) {
    return "http://localhost:9000";
  }
  return baseUrl;
};

export const toggleBackend = () => {
  localStorage.setItem("backendDev", String(!isBackendDev()));
};

export const testLocalHealth = async () => {
  return await fetch(`${localUrl}/health`, { mode: "cors" })
    .then((r) => r.json())
    .then((r) => r.alive)
    .catch((err) => false);
};

export const clientError = {
  offline: "Backend is offline 🤯",
};

export default getUrl;
