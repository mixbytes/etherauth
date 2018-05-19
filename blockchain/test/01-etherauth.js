'use strict';

import expectThrow from '../../submodules/openzeppelin-solidity/test/helpers/expectThrow';
import expectEvent from '../../submodules/openzeppelin-solidity/test/helpers/expectEvent';

const BigNumber = web3.BigNumber;
const chai =require('chai');
chai.use(require('chai-bignumber')(BigNumber));
chai.use(require('chai-as-promised')); // Order is important
chai.should();

const EtherAuth = artifacts.require("EtherAuth");

contract('EtherAuth', function(accounts) {
	const acc = {owner: accounts[0], user: accounts[1], user2: accounts[2], user3: accounts[3], user4: accounts[4], anyone: accounts[9]};
	const login = "login123";
	const login2 = "login456";
	const zero_address = "0x0000000000000000000000000000000000000000";

	beforeEach(async function () {
		this.inst = await EtherAuth.new({from: acc.owner});
	});


	it('should return zero auth address for non-existing user', async function() {
		const storedAuthKey = await this.inst.authAddress(login, {from: acc.anyone});
		storedAuthKey.should.be.equal(zero_address);
	});

	it('should be able to create new account and get its authAddress', async function() {
		await this.inst.createAccount(login, {from: acc.user,});
		const storedAuthKey = await this.inst.authAddress(login, {from: acc.anyone});
		storedAuthKey.should.be.equal(acc.user);
	});

	it('should fail to re-register existing account', async function() {
		await this.inst.createAccount(login, {from: acc.user,});
		await expectThrow(this.inst.createAccount(login, {from: acc.user,}));
	});

	it('should fail if login length > 32 bytes', async function() {
		const notToLongLogin = "11111111112222222222333333333344";
		const toLongLogin    = "111111111122222222223333333333444";
		await this.inst.createAccount(notToLongLogin, {from: acc.user,});
		await expectThrow(this.inst.createAccount(toLongLogin, {from: acc.user,}));
	});

	it('should fail if login length < 2 bytes', async function() {
		const notToShortLogin = "111";
		const toShortLogin    = "11";
		await this.inst.createAccount(notToShortLogin, {from: acc.user,});
		await expectThrow(this.inst.createAccount(toShortLogin, {from: acc.user,}));
	});

	it('should initially set recoveryAddress equal to authAddress', async function() {
		await this.inst.createAccount(login, {from: acc.user,});
		const storedAuthAddress = await this.inst.authAddress(login, {from: acc.anyone});
		const storedRecoveryAddress = await this.inst.recoveryAddress(login, {from: acc.anyone});
		storedRecoveryAddress.should.be.equal(storedAuthAddress);
	});

	it('should allow to change recoveryAddress', async function() {
		await this.inst.createAccount(login, {from: acc.user,});
		await this.inst.setRecoveryAddress(login, acc.user2, {from: acc.user});
		const storedRecoveryAddress = await this.inst.recoveryAddress(login, {from: acc.anyone});
		storedRecoveryAddress.should.be.equal(acc.user2);
	});

	it('should not allow auth address to change recovery address', async function() {
		await this.inst.createAccount(login, {from: acc.user,});
		await this.inst.setRecoveryAddress(login, acc.user2, {from: acc.user});
		await expectThrow(this.inst.setRecoveryAddress(login, acc.anyone, {from: acc.user}));
	});

	it('should allow to change auth address using auth address', async function() {
		await this.inst.createAccount(login, {from: acc.user,});
		await this.inst.setRecoveryAddress(login, acc.user2, {from: acc.user});

		await this.inst.setAuthAddress(login, acc.user2, {from: acc.user});
		const storedAuthAddress = await this.inst.authAddress(login, {from: acc.anyone});
		storedAuthAddress.should.be.equal(acc.user2);
	});

	it('should allow to change auth address using recovery address', async function() {
		await this.inst.createAccount(login, {from: acc.user,});
		await this.inst.setRecoveryAddress(login, acc.user2, {from: acc.user});

		await this.inst.setAuthAddress(login, acc.user2, {from: acc.user2});
		const storedAuthAddress = await this.inst.authAddress(login, {from: acc.anyone});
		storedAuthAddress.should.be.equal(acc.user2);
	});

	it('should not allow other accounts to change auth address', async function() {
		await this.inst.createAccount(login, {from: acc.user,});
		await this.inst.setRecoveryAddress(login, acc.user2, {from: acc.user});

		await expectThrow(this.inst.setAuthAddress(login, acc.anyone, {from: acc.anyone}));
	});

	it('should allow recovery address to delete account', async function() {
		await this.inst.createAccount(login, {from: acc.user,});
		await this.inst.setRecoveryAddress(login, acc.user2, {from: acc.user});

		await this.inst.dropAccount(login, {from: acc.user2});
		const storedAuthAddress = await this.inst.authAddress(login, {from: acc.anyone});
		storedAuthAddress.should.be.equal(zero_address);
		const storedRecoveryAddress = await this.inst.recoveryAddress(login, {from: acc.anyone});
		storedRecoveryAddress.should.be.equal(zero_address);
	});

	it('should not allow anyone to drop account', async function() {
		await this.inst.createAccount(login, {from: acc.user,});
		await expectThrow(this.inst.dropAccount(login, {from: acc.anyone}));
	});

	it('should not allow auth address to drop account', async function() {
		await this.inst.createAccount(login, {from: acc.user,});
		await this.inst.setRecoveryAddress(login, acc.user2, {from: acc.user});

		await expectThrow(this.inst.dropAccount(login, {from: acc.user}));
	});

	it('should allow create multiple accounts with different ', async function() {
		await this.inst.createAccount(login, {from: acc.user,});
		await this.inst.setRecoveryAddress(login, acc.user2, {from: acc.user});
		await this.inst.createAccount(login2, {from: acc.user3,});
		await this.inst.setRecoveryAddress(login2, acc.user4, {from: acc.user3});

		const auth1 = await this.inst.authAddress(login, {from: acc.anyone});
		auth1.should.be.equal(acc.user);
		const recov1 = await this.inst.recoveryAddress(login, {from: acc.anyone});
		recov1.should.be.equal(acc.user2);

		const auth2 = await this.inst.authAddress(login2, {from: acc.anyone});
		auth2.should.be.equal(acc.user3);
		const recov2 = await this.inst.recoveryAddress(login2, {from: acc.anyone});
		recov2.should.be.equal(acc.user4);
	});

	it('should send event on create', async function() {
		const trans = await this.inst.createAccount(login, {from: acc.user,});
		const createEvent = await expectEvent.inTransaction(trans, "Create");
		//console.dir(createEvent);
		createEvent.should.have.deep.property('args', {login: login})
	});

	it('should send event on change auth address', async function() {
		await this.inst.createAccount(login, {from: acc.user,});
		const trans = await this.inst.setAuthAddress(login, acc.user2, {from: acc.user});
		const Event = await expectEvent.inTransaction(trans, "AuthChange");
		Event.should.have.deep.property('args', {login: login, from: acc.user, to: acc.user2})
	});

	it('should send event on change recovery address', async function() {
		await this.inst.createAccount(login, {from: acc.user,});
		const trans = await this.inst.setRecoveryAddress(login, acc.user2, {from: acc.user});
		const Event = await expectEvent.inTransaction(trans, "RecoveryChange");
		Event.should.have.deep.property('args', {login: login, from: acc.user, to: acc.user2})
	});

	it('should send event on address drop', async function() {
		await this.inst.createAccount(login, {from: acc.user,});
		const trans = await this.inst.dropAccount(login, {from: acc.user});
		const Event = await expectEvent.inTransaction(trans, "Drop");
		Event.should.have.deep.property('args', {login: login, by: acc.user})
	});
});

