// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BaseKitJournal {
    struct Entry {
        address author;
        string message;
        uint256 timestamp;
    }

    Entry[] public entries;
    event NewEntry(address indexed author, string message, uint256 timestamp);

    function writeEntry(string memory _message) public {
        entries.push(Entry(msg.sender, _message, block.timestamp));
        emit NewEntry(msg.sender, _message, block.timestamp);
    }

    function getTotalEntries() public view returns (uint256) {
        return entries.length;
    }
}
