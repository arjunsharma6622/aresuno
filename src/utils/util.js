export const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://aresuno-server.vercel.app";

export const ToastParams = {
  position: "top-center",
  autoClose: 1000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  theme: "light",
  closeButton: false,
};
