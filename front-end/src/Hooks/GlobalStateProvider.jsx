import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";

export const GlobalContext = createContext(null);

const GlobalStateProvider = ({ children }) => {
  // const APIHost = "https://pet-adoption-platform.onrender.com";
  const APIHost = "http://127.0.0.1:8000";

  const [userId, setUserId] = useState(
    parseInt(localStorage.getItem("user_id")) || null
  );
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userId) {
      fetch(`${APIHost}/user/list/?user_id=${userId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            setUser(data[0]);
          }
        });
    }
  }, [APIHost, userId]);

  const logout = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("User not logged in.");
      return;
    }

    const promise = () => {
      return fetch(`${APIHost}/user/logout/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            throw new Error(data.error);
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("user_id");
            setUser(localStorage.getItem("user_id") || null);
          }
        })
        .catch((error) => {
          throw error;
        });
    };

    toast.promise(promise, {
      loading: "Logging out. Please wait.",
      success: "Logged out successfully",
      error: (error) => {
        return error;
      },
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        APIHost,
        userId,
        setUserId,
        user,
        setUser,
        logout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

GlobalStateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalStateProvider;
