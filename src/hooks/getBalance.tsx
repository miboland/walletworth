import React from "react";
import { useEffect, useState } from "react";
import { formatEther } from "@ethersproject/units";

interface IBalanceData {
  account: any;
  library: any;
  chainId: number | undefined;
}

const getBalance = ({ account, library, chainId }: IBalanceData) => {
  const [balance, setBalance] = useState<undefined | null | any>(null);

  useEffect((): any => {
    if (!!account && !!library) {
      let stale = false;

      library
        .getBalance(account)
        .then((balance: any) => {
          if (!stale) {
            setBalance(balance);
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(null);
          }
        });

      return () => {
        stale = true;
        setBalance(undefined);
      };
    }
  }, [account, library, chainId]);

  return balance === null ? "N/A" : balance ? formatEther(balance) : "";
};

export default getBalance;
