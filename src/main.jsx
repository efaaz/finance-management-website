import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./components/ui/theme-provider.jsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes.jsx";
import { Provider } from "react-redux";
import store from "./app/store/store";


createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
);
