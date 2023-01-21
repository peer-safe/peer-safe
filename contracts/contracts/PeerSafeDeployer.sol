// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "./utils/Ownable.sol";
import "./Vault.sol";


contract PeerSafeDeployer is Ownable {
    mapping(address => Vault) vaults;
    constructor () Ownable(msg.sender, msg.sender) {}

    function getVault(address _vaultOwner) external view returns(address) {
        Vault _v = vaults[_vaultOwner];
        if (_v.getOwner() == _vaultOwner) {
            return address(_v);
        }
        revert("ERR691: vault doesn't exist");
    }

    function deploy(string memory _userName) external returns(address) {
        Vault _v = new Vault(msg.sender, _userName);
        vaults[msg.sender] = _v;
        return address(_v);
    }
}