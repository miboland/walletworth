import React from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";
import { Form, Input, Button, Checkbox, Card } from "antd";
import "./AddressInput.css";

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});

const AddressInput = () => {
  const { chainId, account, activate, active } = useWeb3React<Web3Provider>();

  const onClick = () => activate(injectedConnector);
  console.log(active);

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      {active ? (
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: false }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
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
            <Input />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember search</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
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

export default AddressInput;
