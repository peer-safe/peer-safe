// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "./utils/Ownable.sol";


struct File {
    string _name;
    string _fileType;
    string _ipfsHash;
    string _key;
}

contract Vault is Ownable {
    string user;
    File[] files;
    constructor(address _owner, string memory _userName ) Ownable(msg.sender, _owner) {
        user = _userName;
    }

    function getAllFiles() external view returns(File[] memory) {
        return files;
    }

    function createFile(string memory name, string memory fileType, string memory ipfsHash, string memory key) external onlyOwner {
        File memory f = File(
           {
            _name: name,
            _fileType: fileType,
            _ipfsHash: ipfsHash,
            _key: key
           }
        );
        files.push(f);
    }
}