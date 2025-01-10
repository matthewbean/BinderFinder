import AlertContext from "./alertContext";
import { alert } from "../utils/types";
import { toaster } from "@/components/ui/toaster";

const AlertState = (props: any) => {
  //create alerts
  const createAlert = (alert: alert): void => {
    console.log(alert);
    toaster.create({
      ...alert,
    });
  };

  return (
    <AlertContext.Provider
      value={{
        createAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
