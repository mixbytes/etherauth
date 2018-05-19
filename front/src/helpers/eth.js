export const checkMetaMask = () => {
    if (!window.Web3) {
        return 'noMetamask';
    }

    if (!web3.eth.accounts[0]) {
        return 'unlockMetamask';
    }

    return 'okMetamask';
};