pragma solidity ^0.4.23;

contract EtherAuth {
	mapping (string => address) authAddr ;
	mapping (string => address) recoveryAddr ;

	event Create(string login);
	event AuthChange(string login, address from, address to);
	event RecoveryChange(string login, address from, address to);
	event Drop(string login, address by);
	
	function createAccount(string _login) public {
		require(bytes(_login).length <= 32);
		require(bytes(_login).length > 2);
		require(authAddr[_login] == address(0));
		authAddr[_login] = msg.sender;
		recoveryAddr[_login] = msg.sender;
		//emit Create(bytes32ToString(_login));
		emit Create(_login);
	}

	function authAddress(string _login) view public returns (address){
		return authAddr[_login];
	}

	function setAuthAddress(string _login, address _addr) public {
		require(authAddr[_login] == msg.sender || recoveryAddr[_login] == msg.sender);
		emit AuthChange(_login, authAddr[_login], _addr);
		authAddr[_login] = _addr;
	}

	function recoveryAddress(string _login) view public returns (address){
		return recoveryAddr[_login];
	}

	function setRecoveryAddress(string _login, address _addr) public {
		require(recoveryAddr[_login] == msg.sender);
		emit RecoveryChange(_login, authAddr[_login], _addr);
		recoveryAddr[_login] = _addr;
	}

	function dropAccount(string _login) public {
		require(recoveryAddr[_login] == msg.sender);
		delete authAddr[_login];
		delete recoveryAddr[_login];
		emit Drop(_login, msg.sender);
	}

	//function bytes32ToString (bytes32 data) pure internal returns (string) {
	//	uint256 len = 0;
	//	uint256 j;
	//	byte char;
	//	for (j=0; j<32; j++) {
	//		char = byte(bytes32(uint(data) * 2 ** (8 * j)));
	//		if (char == 0) { break; }
	//		len ++;
	//	}
	//	bytes memory bytesString = new bytes(len);
	//	for (j=0; j< len; j++) {
	//		char = byte(bytes32(uint(data) * 2 ** (8 * j)));
	//		bytesString[j] = char;
	//	}
	//	return string(bytesString);
	//}

	function signerAddress(bytes32 data, uint8 v, bytes32 r, bytes32 s) pure public returns (address) {
		bytes memory prefix = "\x19Ethereum Signed Message:\n32";
		bytes32 prefixed = keccak256(prefix, data);
		return ecrecover(prefixed, v, r, s);
	}
	function signerAddressRaw(bytes32 data, uint8 v, bytes32 r, bytes32 s) pure public returns (address) {
		return ecrecover(data, v, r, s);
	}
}
