  export const chainName = (chainId: number | undefined) => {
    switch (chainId) {
      case 1:
        return "Mainnet";
      case 3:
        return "Ropsten";
      case 4:
        return "Rinkeby";
      case 42:
        return "Kovan";
      case 5:
        return "Goerli";
      default:
        return "Mainnet";
    }
  };