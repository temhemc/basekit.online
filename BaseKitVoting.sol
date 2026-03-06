// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract BaseKitVoting {
    struct Proposal {
        string description;
        uint256 voteCount;
    }

    Proposal[] public proposals;
    mapping(address => bool) public hasVoted;
    address public manager;

    constructor() {
        manager = msg.sender;
        // BaseKit temalı ilk oylamalar
        proposals.push(Proposal("BaseKit UI Yenilensin", 0));
        proposals.push(Proposal("BaseKit'e Yeni Oyunlar Gelsin", 0));
    }

    // Oy kullanma fonksiyonu
    function vote(uint256 _proposalIndex) public {
        require(!hasVoted[msg.sender], "Zaten oy kullandiniz");
        require(_proposalIndex < proposals.length, "Gecersiz teklif");

        proposals[_proposalIndex].voteCount++;
        hasVoted[msg.sender] = true;
    }

    function getProposalCount() public view returns (uint256) {
        return proposals.length;
    }
}
