# Etherauth
Ethereum smart-contract based engine for user authentication and keys management

Etherauth is a simple and powerful authentication mechanism, allowing sites not to store critical security info about user, such as password hashes, that allows users to create their own identities in Etehreum blockchain, manage and use them for authentication purposes on any site, having only the read-only access to Ethereum blockchain

Authentication is performed on the client-side, using Ethereum's web3.js. User indentity is controlled by user's master account, that is used for children accounts recovery or punishment.

Public keys of accounts and implementation of all management logic are in Ethereum smart-contract, client-side code is a standalone static js file. 

## Install

1) install Metamask extension or use any other web3 provider
2) open static file with auth js inside, login, manage

