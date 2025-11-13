// SPDX-License-Identifier: Symbeon-Vault
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title SEVE Token
 * @dev ERC-20 token for SEVE Framework Protocol
 * @author EON Team - Symbeon Tech
 */
contract SEVEToken is ERC20, Ownable, ReentrancyGuard, Pausable {
    // Token parameters
    uint256 public constant TOTAL_SUPPLY = 1_000_000_000 * 10**18; // 1 billion tokens
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 10**18;
    
    // Distribution parameters
    uint256 public constant TEAM_ALLOCATION = 200_000_000 * 10**18; // 20%
    uint256 public constant DEVELOPMENT_ALLOCATION = 300_000_000 * 10**18; // 30%
    uint256 public constant COMMUNITY_ALLOCATION = 250_000_000 * 10**18; // 25%
    uint256 public constant PARTNERSHIP_ALLOCATION = 150_000_000 * 10**18; // 15%
    uint256 public constant RESERVE_ALLOCATION = 100_000_000 * 10**18; // 10%
    
    // Vesting parameters
    uint256 public constant VESTING_DURATION = 365 days; // 1 year
    uint256 public constant CLIFF_DURATION = 90 days; // 3 months
    
    // Staking parameters
    uint256 public constant STAKING_REWARD_RATE = 10; // 10% APY
    uint256 public constant GOVERNANCE_STAKING_RATE = 8; // 8% APY
    
    // State variables
    mapping(address => uint256) public stakedAmount;
    mapping(address => uint256) public stakingStartTime;
    mapping(address => bool) public isStaking;
    
    mapping(address => uint256) public governanceStakedAmount;
    mapping(address => uint256) public governanceStakingStartTime;
    mapping(address => bool) public isGovernanceStaking;
    
    uint256 public totalStaked;
    uint256 public totalGovernanceStaked;
    
    // Events
    event TokensStaked(address indexed user, uint256 amount, uint256 timestamp);
    event TokensUnstaked(address indexed user, uint256 amount, uint256 reward);
    event GovernanceStaked(address indexed user, uint256 amount);
    event GovernanceUnstaked(address indexed user, uint256 amount, uint256 reward);
    
    constructor() ERC20("SEVE Token", "SEVE") {
        // Initial distribution
        _mint(msg.sender, TEAM_ALLOCATION);
        _mint(msg.sender, DEVELOPMENT_ALLOCATION);
        _mint(msg.sender, COMMUNITY_ALLOCATION);
        _mint(msg.sender, PARTNERSHIP_ALLOCATION);
        _mint(msg.sender, RESERVE_ALLOCATION);
    }
    
    /**
     * @dev Stake tokens for rewards
     * @param amount Amount of tokens to stake
     */
    function stake(uint256 amount) external nonReentrant whenNotPaused {
        require(amount > 0, "Amount must be greater than 0");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        
        if (isStaking[msg.sender]) {
            // Claim existing rewards before restaking
            claimStakingRewards();
        }
        
        _transfer(msg.sender, address(this), amount);
        stakedAmount[msg.sender] += amount;
        stakingStartTime[msg.sender] = block.timestamp;
        isStaking[msg.sender] = true;
        totalStaked += amount;
        
        emit TokensStaked(msg.sender, amount, block.timestamp);
    }
    
    /**
     * @dev Unstake tokens and claim rewards
     * @param amount Amount of tokens to unstake
     */
    function unstake(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be greater than 0");
        require(isStaking[msg.sender], "Not staking");
        require(stakedAmount[msg.sender] >= amount, "Insufficient staked amount");
        
        uint256 reward = calculateStakingRewards(msg.sender);
        
        stakedAmount[msg.sender] -= amount;
        totalStaked -= amount;
        
        if (stakedAmount[msg.sender] == 0) {
            isStaking[msg.sender] = false;
        }
        
        _transfer(address(this), msg.sender, amount + reward);
        
        emit TokensUnstaked(msg.sender, amount, reward);
    }
    
    /**
     * @dev Claim staking rewards without unstaking
     */
    function claimStakingRewards() public nonReentrant {
        require(isStaking[msg.sender], "Not staking");
        
        uint256 reward = calculateStakingRewards(msg.sender);
        require(reward > 0, "No rewards to claim");
        
        stakingStartTime[msg.sender] = block.timestamp;
        _mint(msg.sender, reward);
        
        emit TokensUnstaked(msg.sender, 0, reward);
    }
    
    /**
     * @dev Calculate staking rewards for a user
     * @param user User address
     * @return reward Calculated reward amount
     */
    function calculateStakingRewards(address user) public view returns (uint256) {
        if (!isStaking[user]) return 0;
        
        uint256 stakingDuration = block.timestamp - stakingStartTime[user];
        uint256 annualReward = (stakedAmount[user] * STAKING_REWARD_RATE) / 100;
        uint256 reward = (annualReward * stakingDuration) / 365 days;
        
        return reward;
    }
    
    /**
     * @dev Stake tokens for governance participation
     * @param amount Amount of tokens to stake for governance
     */
    function stakeForGovernance(uint256 amount) external nonReentrant whenNotPaused {
        require(amount > 0, "Amount must be greater than 0");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        
        if (isGovernanceStaking[msg.sender]) {
            claimGovernanceRewards();
        }
        
        _transfer(msg.sender, address(this), amount);
        governanceStakedAmount[msg.sender] += amount;
        governanceStakingStartTime[msg.sender] = block.timestamp;
        isGovernanceStaking[msg.sender] = true;
        totalGovernanceStaked += amount;
        
        emit GovernanceStaked(msg.sender, amount);
    }
    
    /**
     * @dev Unstake governance tokens and claim rewards
     * @param amount Amount of tokens to unstake
     */
    function unstakeGovernance(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be greater than 0");
        require(isGovernanceStaking[msg.sender], "Not governance staking");
        require(governanceStakedAmount[msg.sender] >= amount, "Insufficient governance staked amount");
        
        uint256 reward = calculateGovernanceRewards(msg.sender);
        
        governanceStakedAmount[msg.sender] -= amount;
        totalGovernanceStaked -= amount;
        
        if (governanceStakedAmount[msg.sender] == 0) {
            isGovernanceStaking[msg.sender] = false;
        }
        
        _transfer(address(this), msg.sender, amount + reward);
        
        emit GovernanceUnstaked(msg.sender, amount, reward);
    }
    
    /**
     * @dev Claim governance staking rewards
     */
    function claimGovernanceRewards() public nonReentrant {
        require(isGovernanceStaking[msg.sender], "Not governance staking");
        
        uint256 reward = calculateGovernanceRewards(msg.sender);
        require(reward > 0, "No rewards to claim");
        
        governanceStakingStartTime[msg.sender] = block.timestamp;
        _mint(msg.sender, reward);
        
        emit GovernanceUnstaked(msg.sender, 0, reward);
    }
    
    /**
     * @dev Calculate governance staking rewards
     * @param user User address
     * @return reward Calculated reward amount
     */
    function calculateGovernanceRewards(address user) public view returns (uint256) {
        if (!isGovernanceStaking[user]) return 0;
        
        uint256 stakingDuration = block.timestamp - governanceStakingStartTime[user];
        uint256 annualReward = (governanceStakedAmount[user] * GOVERNANCE_STAKING_RATE) / 100;
        uint256 reward = (annualReward * stakingDuration) / 365 days;
        
        return reward;
    }
    
    /**
     * @dev Get user's voting power for governance
     * @param user User address
     * @return votingPower User's voting power
     */
    function getVotingPower(address user) external view returns (uint256) {
        uint256 stakingPower = stakedAmount[user];
        uint256 governancePower = governanceStakedAmount[user];
        
        return stakingPower + governancePower;
    }
    
    /**
     * @dev Pause contract in case of emergency
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    /**
     * @dev Unpause contract
     */
    function unpause() external onlyOwner {
        _unpause();
    }
    
    /**
     * @dev Override transfer to allow staking/unstaking
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override {
        super._beforeTokenTransfer(from, to, amount);
        
        require(!paused() || from == owner() || to == owner(), "Transfers paused");
    }
}
