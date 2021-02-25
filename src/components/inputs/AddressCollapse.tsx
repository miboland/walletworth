import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Statistic,
  Collapse,
  Space,
} from "antd";
import "./AddressCollapse.css";
import useBalance from "../../hooks/useBalance";

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [1],
});

const { Panel } = Collapse;

const AddressCollapse = () => {
  const [currentBalance, setCurrentBalance] = useState<any>();
  const [activeKey, setActiveKey] = useState<any>(["2"]);
  const [address, setAddress] = useState("");
  const [query, setQuery] = useState("");
  const { activate, account, active, chainId, library } = useWeb3React<
    Web3Provider
  >();

  const balance = useBalance({ account: address, library, chainId });

  useEffect(() => {
    setCurrentBalance(balance);
  }, [balance]);

  const onClick = () => activate(injectedConnector);

  const onFinish = async (values: any) => {
    setAddress(values.address);
    setQuery("");

    if (values.save) {
      setActiveKey(["1", "2", "3"]);
    } else {
      setActiveKey(["1", "2", ...activeKey]);
    }
  };

  return (
    <div>
      {active ? (
        <Collapse
          defaultActiveKey={"2"}
          activeKey={activeKey}
          onChange={(key) => {
            setActiveKey(key);
          }}
        >
          <Panel header="Wallet Balance" key="1">
            <Space align="center">
              <Row>
                <Col>
                  <Statistic
                    title={
                      <a
                        href={`https://etherscan.io/address/${address}`}
                        target={"_blank"}
                      >
                        {address
                          ? `${address.slice(0, 6)}...${address.slice(
                              address.length - 4,
                              address.length
                            )}`
                          : null}
                      </a>
                    }
                    value={
                      currentBalance && currentBalance !== "N/A"
                        ? `Ξ ${currentBalance}`
                        : "Search for a wallet address"
                    }
                    precision={7}
                  />
                </Col>
              </Row>
            </Space>
          </Panel>
          <Panel header="Search Form" key="2">
            <Form name="basic" layout="vertical" onFinish={onFinish}>
              <Form.Item label="Wallet Address" name="address">
                <Input
                  onChange={(e) => setQuery(e.currentTarget.value)}
                  allowClear={true}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={query.length !== 42}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Panel>
        </Collapse>
      ) : (
        <>
          <div>
            <h3>Please connect MetaMask to use this Dapp.</h3>
          </div>
          <br />
          <Button type="primary" onClick={onClick}>
            Connect wallet
          </Button>
        </>
      )}
    </div>
  );
};

export default AddressCollapse;
