import React from "react";
import { useEffect, useState } from "react";
import "./App.css";

import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";

import AddressInput from "./components/inputs/AddressInput";
import Navigation from "./components/navigation/Navigation";
import InaccessibleView from "./components/guards/InaccessibleView/InaccessibleView";

declare const window: any;

const getLibrary = () => {
  return new ethers.providers.Web3Provider(window.ethereum);
};

const App = () => {
  if (!window.ethereum) {
    return <InaccessibleView />;
  }

  return (
    <>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Navigation />
        <main>
          <AddressInput />
        </main>
      </Web3ReactProvider>
    </>
  );
};

export default App;
