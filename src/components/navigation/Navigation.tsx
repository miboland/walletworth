import React from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { LinkOutlined, WalletOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, PageHeader, Space } from "antd";

import { chainName } from "../../utils/chains";

const Navigation = () => {
  const { chainId, account, active, deactivate } = useWeb3React<Web3Provider>();

  const menu = (
    <Menu>
      <Menu.Item key="disconnect" onClick={() => deactivate()}>
        Disconnect
      </Menu.Item>
    </Menu>
  );

  const accountInfo =
    active && account ? (
      <Space key="wallet">
        <Button key="chain" id="chain" type="ghost">
          <LinkOutlined />
          {chainName(chainId)}
        </Button>
        <Dropdown.Button key="address" overlay={menu} type="ghost">
          <WalletOutlined />
          {`${account.slice(0, 6)}...${account.slice(
            account.length - 4,
            account.length
          )}`}
        </Dropdown.Button>
      </Space>
    ) : null;

  return (
    <PageHeader
      className="site-page-header"
      title="Wallet Worth:"
      subTitle="discover the balance of any Ethereum wallet"
      extra={[accountInfo]}
    />
  );
};

export default Navigation;
