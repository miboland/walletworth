import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Statistic,
  Divider,
  Collapse,
  Space,
  Table,
} from "antd";
import "./AddressCollapse.css";
import getBalance from "../../hooks/getBalance";

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});

const { Panel } = Collapse;

const AddressCollapse = () => {
  const [currentBalance, setCurrentBalance] = useState<any>();
  const [activeKey, setActiveKey] = useState<any>(["2"]);
  const [savedResults, setSavedResults] = useState<any>([]);
  const [address, setAddress] = useState("");
  const [query, setQuery] = useState("");
  const { activate, account, active, chainId, library } = useWeb3React<
    Web3Provider
  >();

  const balance = getBalance({ account, library, chainId });

  const onClick = () => activate(injectedConnector);

  const onFinish = async (values: any) => {
    setAddress(values.address);

    if (values.save) {
      setActiveKey(["1", "2", "3"]);
      setSavedResults([
        ...savedResults,
        {
          address: values.address,
          balance,
          key: values.address,
          timestamp: new Date().toLocaleString(),
        },
      ]);
    } else {
      setActiveKey(["1", "2", ...activeKey]);
    }
  };

  const columns = [
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
    },
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
    },
  ];

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
                      address
                        ? `${address.slice(0, 6)}...${address.slice(
                            address.length - 4,
                            address.length
                          )}`
                        : null
                    }
                    value={balance ? `Ξ ${balance}` : ""}
                    precision={7}
                  />
                </Col>
              </Row>
            </Space>
          </Panel>
          <Panel header="Search Form" key="2">
            <Form name="basic" layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Wallet Address"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Please input a valid wallet address",
                  },
                ]}
              >
                <Input onChange={(e) => setQuery(e.currentTarget.value)} />
              </Form.Item>
              <Form.Item name="save" valuePropName="checked">
                <Checkbox>Save Results</Checkbox>
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
          <Panel header="Results Table" key="3">
            <Table columns={columns} dataSource={savedResults}></Table>
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
