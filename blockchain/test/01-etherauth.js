'use strict';

import expectThrow from '../../submodules/openzeppelin-solidity/test/helpers/expectThrow';

const BigNumber = web3.BigNumber;
const chai =require('chai');
chai.use(require('chai-bignumber')(BigNumber));
chai.use(require('chai-as-promised')); // Order is important
chai.should();

const EtherAuth = artifacts.require("EtherAuth");

contract('EtherAuth', function(accounts) {
	const acc = {owner: accounts[0], user: accounts[1], user2: accounts[2], anyone: accounts[9]};
	beforeEach(async function () {
		this.inst = await EtherAuth.new({from: acc.owner});
	});

});

