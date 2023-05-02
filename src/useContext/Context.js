import { createContext, useState, useEffect } from "react";

import { mails } from "../API/fakeFetch";

export const Context = createContext();

export const Provider = ({ children }) => {
  const [data, setData] = useState([]);
  const [backupData, setBackupData] = useState([]);
  const [trashMails, setTrashMails] = useState([]);
  const [spammedMails, setSpammedMails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [unreadMails, setUnreadMails] = useState(
    data?.filter((e) => e.unread === true)
  );

  console.log(data?.filter((e) => e.unread === false));
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = mails;
      setData(response);
      setBackupData(response);
      setIsLoading(false);
    } catch (err) {
      setError(err);
      console.error(err);
      setIsLoading(false);
    }
  };
  console.log(error);
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Context.Provider
        value={{
          data,
          setData,
          backupData,
          setBackupData,
          trashMails,
          setTrashMails,
          spammedMails,
          setSpammedMails,
          unreadMails,
          setUnreadMails,
          isLoading,
          error,
        }}
      >
        {children}
      </Context.Provider>
    </div>
  );
};
