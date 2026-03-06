// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract BaseKitMilestone {
    address public owner;
    string[] public milestones;

    event MilestoneAdded(string description, uint256 timestamp);

    constructor() {
        owner = msg.sender;
        // İlk milestone (başarı) otomatik ekleniyor
        milestones.push("Base 5/5 Contract Marathon Completed");
    }

    function addMilestone(string memory _text) public {
        require(msg.sender == owner, "Sadece Temhem ekleyebilir");
        milestones.push(_text);
        emit MilestoneAdded(_text, block.timestamp);
    }

    function getMilestoneCount() public view returns (uint256) {
        return milestones.length;
    }
}
