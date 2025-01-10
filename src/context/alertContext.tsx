import { createContext } from "react";
import { AlertContextValue } from "../utils/types";

const defaultAlertContext: AlertContextValue = {
  createAlert: () => {
    console.warn("createAlert called outside of AlertContextProvider");
  },
};

const AlertContext = createContext<AlertContextValue>(defaultAlertContext);

export default AlertContext;
