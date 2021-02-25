import React from "react";
import "./InaccessibleView.css";
import { ethers } from "ethers";
import { Button, PageHeader } from "antd";

declare const window: any;

const InaccessibleView = () => {
  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Wallet Worth:"
        subTitle="discover the balance of any Ethereum wallet"
      />
      <main>
        <div>
          <h3>Please install MetaMask to use this Dapp.</h3>
        </div>

        <br />
        <div>
          <Button
            href="https://metamask.io/"
            target="_blank"
            type="primary"
            id="install"
          >
            <h3>{"Install MetaMask"}</h3>
          </Button>
        </div>
      </main>
    </>
  );
};

export default InaccessibleView;
