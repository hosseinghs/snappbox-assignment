"use client";

import React, { createContext, useEffect, useContext, useState, ReactNode } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

interface NotifyContextType {
  showNotif: (message: string) => void;
}

const NotifyContext = createContext<NotifyContextType | undefined>(undefined);

let globalShowNotif: (message: string) => void = () => {
  console.warn("Notification handler is not initialized");
};

export const useNotify = (): NotifyContextType => {
  const context = useContext(NotifyContext);
  if (!context) {
    throw new Error("useNotify must be used within a NotifyProvider");
  }
  return context;
};

export const NotifyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showNotif = (message: string) => {
    setMessage(message);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMessage("");
  };

  useEffect(() => {
    globalShowNotif = showNotif;
  }, []);

  return (
    <NotifyContext.Provider value={{ showNotif }}>
      {children}
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </NotifyContext.Provider>
  );
};

export const getGlobalNotifyHandler = () => globalShowNotif;
