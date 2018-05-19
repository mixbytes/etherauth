export var web3 = window.Web3
    ? new window.Web3(window.web3.currentProvider)
    : undefined;

export const checkMetaMask = () => {
    if (!window.Web3) {
        return 'noMetamask';
    }

    if (!web3.eth.accounts[0]) {
        return 'unlockMetamask';
    }

    return 'okMetamask';
};

export const getNetworkId = cb => {
    web3.version.getNetwork((err, netId) => {
        err && console.log(err);
        netId && cb(netId);
    });
};

export const getNetworkName = netId => {
    switch (netId.toString()) {
        case "1":
            return "Mainnet";
        case "3":
            return "Ropsten";
        case "4":
            return "Rinkeby";
        case "42":
            return "Kovan";
        default:
            return "Error! Unknown or deprecated network";
    }
};

export const getNetworkEtherscanAddress = netId => {
    switch (netId.toString()) {
        case "1":
            return "https://etherscan.io";
        case "3":
            return "https://ropsten.etherscan.io";
        case "4":
            return "https://rinkeby.etherscan.io";
        case "42":
            return "https://kovan.etherscan.io";
        default:
            return "Error! Unknown or deprecated network";
    }
};

export const isAddress = (hash) => {
    if (typeof hash === 'string') {
        return /^0x([A-Fa-f0-9]{40})$/.test(hash);
    } else {
        return false;
    }
};

export const isTx = (hash) => {
    if (typeof hash === 'string') {
        return /^0x([A-Fa-f0-9]{64})$/.test(hash);
    } else {
        return false;
    }
};