const Instance = artifacts.require("EtherAuth");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(Instance);
};

