import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

//Internal Import

import {
  checkIfWalletConnected,
  connectWallet,
  connectingWithContract,
} from "../Utils/apiFeature";

export const ChatAppContext = React.createContext();

export const ChatAppProvider = ({ children }) => {
  //USE STATES
  const [account, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [friendLists, setFriendLists] = useState([]);
  const [friendMsg, setFriendMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [error, setError] = useState("");

  //CHAT USER DATA
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserAddress, setCurrentUserAddress] = useState("");

  const router = useRouter();

  //FETCH DATA ON LOAD
  const fetchData = async () => {
    try {
      //GET CONTRACT
      const contract = await connectingWithContract();

      //GET ACCOUNT
      const connectAccount = await connectWallet();
      setAccount(connectAccount);

      //GET USERNAME
      const userName = await contract.getUsername(connectAccount);
      setUserName(userName);

      //GET MY FRIEND LIST
      const friendLists = await contract.getMyFriendList();
      setFriendLists(friendLists);

      //GET ALL USER LIST
      const userList = await contract.getAllAppUsers();
      setUserLists(userList);
      
    } catch (error) {
      setError("Please Install and Connect your Wallet");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //READ MESSAGES
  const readMessage = async (friendAddress) => {
    try {
      const contract = await connectingWithContract();
      const read = await contract.readMessage(friendAddress);
      setFriendMsg(read);
    } catch (error) {
      setError("Currently You Have No Message");
    }
  };

  //CREATE ACCOUNT
  const createAccount = async ({ name, accountAddress }) => {
    try {
      if (name || accountAddress)
        setError("Name and AccAddress cannot be empty");

      const contract = await connectingWithContract();
      const getCreatedUser = await contract.createAccount(name);
      setLoading(true);
      await getCreatedUser.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setError("Error while creating your account ! Please try again");
    }
  };

  //ADD FRIEND
  const addFriends = async ({ name, accountAddress }) => {
    try {
      if (name || accountAddress)
        setError("Name and AccAddress cannot be empty");

      const contract = await connectingWithContract();
      const addMyFrined = await contract.addFriend(accountAddress, name);
      setLoading(true);
      await addMyFrined.wait();
      setLoading(false);
      router.push("/");
      window.location.reload();
    } catch (error) {
      setError("Failed to add the friend! Please try again");
    }
  };

  //SEND MESSAGE
  const sendMessage = async ({ msg, address }) => {
    try {
      if (msg || address) setError("Message cannot be empty");

      const contract = await connectingWithContract();
      const addMessage = await contract.sendMessage(address, msg);
      setLoading(true);
      await addMessage.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setError("Please reload and try again");
    }
  };

  //USER INFO
  const readUser = async (userAddress) => {
    const contract = await connectingWithContract();
    const userName = await contract.getUsername(userAddress);
    setCurrentUserName(userName);
    setCurrentUserAddress(userAddress);
  };

  return (
    <ChatAppContext.Provider
      value={{
        readMessage,
        createAccount,
        addFriends,
        sendMessage,
        readUser,
        connectWallet,
        checkIfWalletConnected,
        account,
        userName,
        friendLists,
        friendMsg,
        loading,
        userLists,
        error,
        currentUserName,
        currentUserAddress,
      }}
    >
      {children}
    </ChatAppContext.Provider>
  );
};
