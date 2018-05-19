pragma solidity ^0.4.23;

contract EtherAuth {
	mapping (bytes32 => address) authAddr ;
	mapping (bytes32 => address) recoveryAddr ;
	
	function createAccount(bytes32 _login) public {
		require(authAddr[_login] == address(0));
		authAddr[_login] = msg.sender;
		recoveryAddr[_login] = msg.sender;
	}

	function authAddress(bytes32 _login) view public returns (address){
		return authAddr[_login];
	}

	function setAuthAddress(bytes32 _login, address _addr) public {
		require(authAddr[_login] == msg.sender || recoveryAddr[_login] == msg.sender);
		authAddr[_login] = _addr;
	}

	function recoveryAddress(bytes32 _login) view public returns (address){
		return recoveryAddr[_login];
	}

	function setRecoveryAddress(bytes32 _login, address _addr) public {
		require(recoveryAddr[_login] == msg.sender);
		recoveryAddr[_login] = _addr;
	}

	function dropAccount(bytes32 _login) public {
		require(recoveryAddr[_login] == msg.sender);
		delete authAddr[_login];
		delete recoveryAddr[_login];
	}
}
