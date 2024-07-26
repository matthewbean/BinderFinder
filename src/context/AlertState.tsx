import { useState } from "react";
import AlertContext from "./alertContext";
import { alert } from "../utils/types";
import { useToast } from "@chakra-ui/react";

const AlertState = (props: any) => {
  const toast = useToast();

  //create alerts
  const createAlert = (alert: alert) => {
    toast({
      ...alert,
      duration: 5000,
      isClosable: true,
      position: "bottom-left",
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
