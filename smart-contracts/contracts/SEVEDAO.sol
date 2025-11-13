// SPDX-License-Identifier: Symbeon-Vault
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./SEVEToken.sol";

/**
 * @title SEVE DAO
 * @dev Decentralized Autonomous Organization for SEVE Framework governance
 * @author EON Team - Symbeon Tech
 */
contract SEVEDAO is Ownable, ReentrancyGuard, Pausable {
    // Proposal structure
    struct Proposal {
        uint256 id;
        address proposer;
        string title;
        string description;
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 startTime;
        uint256 endTime;
        bool executed;
        ProposalType proposalType;
        bytes data; // Encoded function call data
    }
    
    // Proposal types
    enum ProposalType {
        TECHNICAL,      // Technical changes to protocol
        FINANCIAL,      // Financial decisions
        PARTNERSHIP,    // Partnership proposals
        GOVERNANCE      // Governance changes
    }
    
    // Vote structure
    struct Vote {
        bool hasVoted;
        bool support;
        uint256 votingPower;
    }
    
    // State variables
    SEVEToken public seveToken;
    
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => Vote)) public votes;
    mapping(address => bool) public authorizedProposers;
    
    uint256 public proposalCount;
    uint256 public votingPeriod = 7 days;
    uint256 public executionDelay = 1 days;
    uint256 public quorumThreshold = 10; // 10% of total supply
    uint256 public supermajorityThreshold = 66; // 66% for major changes
    
    // Events
    event ProposalCreated(
        uint256 indexed proposalId,
        address indexed proposer,
        string title,
        ProposalType proposalType
    );
    event VoteCast(
        uint256 indexed proposalId,
        address indexed voter,
        bool support,
        uint256 votingPower
    );
    event ProposalExecuted(uint256 indexed proposalId);
    event ProposalTypeUpdated(uint256 indexed proposalId, ProposalType newType);
    
    constructor(address _seveToken) {
        seveToken = SEVEToken(_seveToken);
        authorizedProposers[msg.sender] = true;
    }
    
    /**
     * @dev Create a new proposal
     * @param title Proposal title
     * @param description Proposal description
     * @param proposalType Type of proposal
     * @param data Encoded function call data (if applicable)
     */
    function createProposal(
        string memory title,
        string memory description,
        ProposalType proposalType,
        bytes memory data
    ) external whenNotPaused returns (uint256) {
        require(authorizedProposers[msg.sender], "Not authorized to propose");
        require(bytes(title).length > 0, "Title cannot be empty");
        require(bytes(description).length > 0, "Description cannot be empty");
        
        uint256 proposalId = proposalCount++;
        
        proposals[proposalId] = Proposal({
            id: proposalId,
            proposer: msg.sender,
            title: title,
            description: description,
            votesFor: 0,
            votesAgainst: 0,
            startTime: block.timestamp,
            endTime: block.timestamp + votingPeriod,
            executed: false,
            proposalType: proposalType,
            data: data
        });
        
        emit ProposalCreated(proposalId, msg.sender, title, proposalType);
        
        return proposalId;
    }
    
    /**
     * @dev Vote on a proposal
     * @param proposalId Proposal ID
     * @param support True for yes, false for no
     */
    function vote(uint256 proposalId, bool support) external nonReentrant {
        Proposal storage proposal = proposals[proposalId];
        require(proposal.id == proposalId, "Proposal does not exist");
        require(block.timestamp >= proposal.startTime, "Voting not started");
        require(block.timestamp <= proposal.endTime, "Voting ended");
        require(!proposal.executed, "Proposal already executed");
        require(!votes[proposalId][msg.sender].hasVoted, "Already voted");
        
        uint256 votingPower = seveToken.getVotingPower(msg.sender);
        require(votingPower > 0, "No voting power");
        
        votes[proposalId][msg.sender] = Vote({
            hasVoted: true,
            support: support,
            votingPower: votingPower
        });
        
        if (support) {
            proposal.votesFor += votingPower;
        } else {
            proposal.votesAgainst += votingPower;
        }
        
        emit VoteCast(proposalId, msg.sender, support, votingPower);
    }
    
    /**
     * @dev Execute a proposal
     * @param proposalId Proposal ID
     */
    function executeProposal(uint256 proposalId) external nonReentrant {
        Proposal storage proposal = proposals[proposalId];
        require(proposal.id == proposalId, "Proposal does not exist");
        require(block.timestamp > proposal.endTime, "Voting not ended");
        require(!proposal.executed, "Proposal already executed");
        require(block.timestamp >= proposal.endTime + executionDelay, "Execution delay not met");
        
        uint256 totalVotes = proposal.votesFor + proposal.votesAgainst;
        uint256 totalSupply = seveToken.totalSupply();
        uint256 quorum = (totalSupply * quorumThreshold) / 100;
        
        require(totalVotes >= quorum, "Quorum not reached");
        
        bool passed = false;
        
        // Check if proposal passed based on type
        if (proposal.proposalType == ProposalType.GOVERNANCE) {
            // Supermajority required for governance changes
            passed = (proposal.votesFor * 100) / totalVotes >= supermajorityThreshold;
        } else {
            // Simple majority for other proposals
            passed = proposal.votesFor > proposal.votesAgainst;
        }
        
        require(passed, "Proposal not passed");
        
        proposal.executed = true;
        
        // Execute proposal based on type
        if (proposal.proposalType == ProposalType.TECHNICAL) {
            _executeTechnicalProposal(proposalId);
        } else if (proposal.proposalType == ProposalType.FINANCIAL) {
            _executeFinancialProposal(proposalId);
        } else if (proposal.proposalType == ProposalType.PARTNERSHIP) {
            _executePartnershipProposal(proposalId);
        } else if (proposal.proposalType == ProposalType.GOVERNANCE) {
            _executeGovernanceProposal(proposalId);
        }
        
        emit ProposalExecuted(proposalId);
    }
    
    /**
     * @dev Execute technical proposal
     * @param proposalId Proposal ID
     */
    function _executeTechnicalProposal(uint256 proposalId) internal {
        // Implementation for technical changes
        // This would typically involve calling functions on the SEVE Protocol contract
        Proposal storage proposal = proposals[proposalId];
        
        // Example: Update protocol parameters
        // This is a placeholder - actual implementation would depend on specific technical changes
        emit ProposalExecuted(proposalId);
    }
    
    /**
     * @dev Execute financial proposal
     * @param proposalId Proposal ID
     */
    function _executeFinancialProposal(uint256 proposalId) internal {
        // Implementation for financial decisions
        // This would typically involve treasury management
        Proposal storage proposal = proposals[proposalId];
        
        // Example: Allocate funds for development
        // This is a placeholder - actual implementation would depend on specific financial decisions
        emit ProposalExecuted(proposalId);
    }
    
    /**
     * @dev Execute partnership proposal
     * @param proposalId Proposal ID
     */
    function _executePartnershipProposal(uint256 proposalId) internal {
        // Implementation for partnership decisions
        // This would typically involve authorizing new partners
        Proposal storage proposal = proposals[proposalId];
        
        // Example: Authorize new licensor
        // This is a placeholder - actual implementation would depend on specific partnerships
        emit ProposalExecuted(proposalId);
    }
    
    /**
     * @dev Execute governance proposal
     * @param proposalId Proposal ID
     */
    function _executeGovernanceProposal(uint256 proposalId) internal {
        // Implementation for governance changes
        // This would typically involve updating DAO parameters
        Proposal storage proposal = proposals[proposalId];
        
        // Example: Update voting parameters
        // This is a placeholder - actual implementation would depend on specific governance changes
        emit ProposalExecuted(proposalId);
    }
    
    /**
     * @dev Get proposal details
     * @param proposalId Proposal ID
     * @return proposal Proposal details
     */
    function getProposal(uint256 proposalId) external view returns (Proposal memory) {
        return proposals[proposalId];
    }
    
    /**
     * @dev Get user's vote on a proposal
     * @param proposalId Proposal ID
     * @param voter Voter address
     * @return vote Vote details
     */
    function getUserVote(uint256 proposalId, address voter) external view returns (Vote memory) {
        return votes[proposalId][voter];
    }
    
    /**
     * @dev Get proposal status
     * @param proposalId Proposal ID
     * @return status Proposal status string
     */
    function getProposalStatus(uint256 proposalId) external view returns (string memory) {
        Proposal memory proposal = proposals[proposalId];
        
        if (proposal.id != proposalId) {
            return "Non-existent";
        }
        
        if (proposal.executed) {
            return "Executed";
        }
        
        if (block.timestamp < proposal.startTime) {
            return "Pending";
        }
        
        if (block.timestamp <= proposal.endTime) {
            return "Active";
        }
        
        if (block.timestamp < proposal.endTime + executionDelay) {
            return "Execution Delay";
        }
        
        uint256 totalVotes = proposal.votesFor + proposal.votesAgainst;
        uint256 totalSupply = seveToken.totalSupply();
        uint256 quorum = (totalSupply * quorumThreshold) / 100;
        
        if (totalVotes < quorum) {
            return "Failed - No Quorum";
        }
        
        bool passed = false;
        if (proposal.proposalType == ProposalType.GOVERNANCE) {
            passed = (proposal.votesFor * 100) / totalVotes >= supermajorityThreshold;
        } else {
            passed = proposal.votesFor > proposal.votesAgainst;
        }
        
        return passed ? "Passed" : "Failed";
    }
    
    /**
     * @dev Set voting period
     * @param newVotingPeriod New voting period in seconds
     */
    function setVotingPeriod(uint256 newVotingPeriod) external onlyOwner {
        require(newVotingPeriod >= 1 days, "Voting period too short");
        require(newVotingPeriod <= 30 days, "Voting period too long");
        
        votingPeriod = newVotingPeriod;
    }
    
    /**
     * @dev Set execution delay
     * @param newExecutionDelay New execution delay in seconds
     */
    function setExecutionDelay(uint256 newExecutionDelay) external onlyOwner {
        require(newExecutionDelay <= 7 days, "Execution delay too long");
        
        executionDelay = newExecutionDelay;
    }
    
    /**
     * @dev Set quorum threshold
     * @param newQuorumThreshold New quorum threshold in percentage
     */
    function setQuorumThreshold(uint256 newQuorumThreshold) external onlyOwner {
        require(newQuorumThreshold >= 5, "Quorum threshold too low");
        require(newQuorumThreshold <= 50, "Quorum threshold too high");
        
        quorumThreshold = newQuorumThreshold;
    }
    
    /**
     * @dev Set supermajority threshold
     * @param newSupermajorityThreshold New supermajority threshold in percentage
     */
    function setSupermajorityThreshold(uint256 newSupermajorityThreshold) external onlyOwner {
        require(newSupermajorityThreshold >= 51, "Supermajority threshold too low");
        require(newSupermajorityThreshold <= 90, "Supermajority threshold too high");
        
        supermajorityThreshold = newSupermajorityThreshold;
    }
    
    /**
     * @dev Authorize a proposer
     * @param proposer Proposer address
     * @param authorized Authorization status
     */
    function setAuthorizedProposer(address proposer, bool authorized) external onlyOwner {
        authorizedProposers[proposer] = authorized;
    }
    
    /**
     * @dev Pause DAO in case of emergency
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    /**
     * @dev Unpause DAO
     */
    function unpause() external onlyOwner {
        _unpause();
    }
}
