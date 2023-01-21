var PeerSafeDeployer = artifacts.require("PeerSafeDeployer");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(PeerSafeDeployer);
};
