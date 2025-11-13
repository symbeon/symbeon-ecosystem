// SPDX-License-Identifier: Symbeon-Vault
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./SEVEToken.sol";

/**
 * @title SEVE Protocol
 * @dev Main protocol contract for SEVE Framework licensing and agent management
 * @author EON Team - Symbeon Tech
 */
contract SEVEProtocol is Ownable, ReentrancyGuard, Pausable {
    // License structure
    struct License {
        address licensee;
        string version;
        uint256 duration;
        uint256 price;
        bool active;
        uint256 timestamp;
        bytes32 codeHash;
        string capabilities;
    }
    
    // Agent structure
    struct Agent {
        address agentAddress;
        string capabilities;
        uint256 performanceScore;
        bool verified;
        uint256 registrationTime;
        bytes32 agentHash;
        string metadata;
    }
    
    // Version pricing structure
    struct VersionInfo {
        uint256 price;
        bool available;
        string description;
        bytes32 codeHash;
        uint256 timestamp;
    }
    
    // State variables
    mapping(address => License[]) public licenses;
    mapping(address => Agent) public agents;
    mapping(string => VersionInfo) public versionPricing;
    mapping(address => bool) public authorizedLicensors;
    mapping(bytes32 => bool) public registeredCodeHashes;
    
    SEVEToken public seveToken;
    
    uint256 public totalLicensesSold;
    uint256 public totalRevenue;
    uint256 public protocolFeeRate = 100; // 1% (100 basis points)
    
    // Events
    event LicensePurchased(
        address indexed buyer, 
        string version, 
        uint256 price, 
        uint256 duration,
        bytes32 codeHash
    );
    event AgentRegistered(
        address indexed agent, 
        string capabilities, 
        bytes32 agentHash
    );
    event PerformanceUpdated(
        address indexed agent, 
        uint256 score
    );
    event AgentVerified(address indexed agent, bool verified);
    event VersionAdded(string version, uint256 price, bytes32 codeHash);
    event ProtocolFeeUpdated(uint256 newFeeRate);
    
    constructor(address _seveToken) {
        seveToken = SEVEToken(_seveToken);
        authorizedLicensors[msg.sender] = true;
    }
    
    /**
     * @dev Purchase a license for SEVE Framework
     * @param version Version of the framework
     * @param duration Duration of the license in days
     * @param capabilities Required capabilities
     */
    function purchaseLicense(
        string memory version,
        uint256 duration,
        string memory capabilities
    ) external nonReentrant whenNotPaused {
        require(versionPricing[version].available, "Version not available");
        require(duration > 0, "Duration must be greater than 0");
        
        uint256 price = versionPricing[version].price * duration / 365; // Pro-rated pricing
        require(seveToken.balanceOf(msg.sender) >= price, "Insufficient SEVE tokens");
        
        // Transfer tokens
        seveToken.transferFrom(msg.sender, address(this), price);
        
        // Calculate protocol fee
        uint256 protocolFee = (price * protocolFeeRate) / 10000;
        uint256 licensorRevenue = price - protocolFee;
        
        // Create license
        License memory newLicense = License({
            licensee: msg.sender,
            version: version,
            duration: duration,
            price: price,
            active: true,
            timestamp: block.timestamp,
            codeHash: versionPricing[version].codeHash,
            capabilities: capabilities
        });
        
        licenses[msg.sender].push(newLicense);
        totalLicensesSold++;
        totalRevenue += price;
        
        emit LicensePurchased(
            msg.sender, 
            version, 
            price, 
            duration,
            versionPricing[version].codeHash
        );
    }
    
    /**
     * @dev Register an AI agent
     * @param capabilities Agent capabilities
     * @param agentHash Hash of agent code
     * @param metadata Agent metadata
     */
    function registerAgent(
        string memory capabilities,
        bytes32 agentHash,
        string memory metadata
    ) external nonReentrant whenNotPaused {
        require(!agents[msg.sender].verified, "Agent already registered");
        require(agentHash != bytes32(0), "Invalid agent hash");
        require(!registeredCodeHashes[agentHash], "Agent hash already registered");
        
        Agent memory newAgent = Agent({
            agentAddress: msg.sender,
            capabilities: capabilities,
            performanceScore: 0,
            verified: false,
            registrationTime: block.timestamp,
            agentHash: agentHash,
            metadata: metadata
        });
        
        agents[msg.sender] = newAgent;
        registeredCodeHashes[agentHash] = true;
        
        emit AgentRegistered(msg.sender, capabilities, agentHash);
    }
    
    /**
     * @dev Update agent performance score
     * @param agent Agent address
     * @param score New performance score
     */
    function updatePerformance(
        address agent,
        uint256 score
    ) external onlyOwner {
        require(agents[agent].verified, "Agent not verified");
        require(score <= 100, "Score must be between 0 and 100");
        
        agents[agent].performanceScore = score;
        
        emit PerformanceUpdated(agent, score);
    }
    
    /**
     * @dev Verify an agent
     * @param agent Agent address
     * @param verified Verification status
     */
    function verifyAgent(
        address agent,
        bool verified
    ) external onlyOwner {
        require(agents[agent].agentAddress != address(0), "Agent not registered");
        
        agents[agent].verified = verified;
        
        emit AgentVerified(agent, verified);
    }
    
    /**
     * @dev Add a new version of SEVE Framework
     * @param version Version string
     * @param price Annual price in SEVE tokens
     * @param codeHash Hash of the code
     * @param description Version description
     */
    function addVersion(
        string memory version,
        uint256 price,
        bytes32 codeHash,
        string memory description
    ) external onlyOwner {
        require(price > 0, "Price must be greater than 0");
        require(codeHash != bytes32(0), "Invalid code hash");
        require(!registeredCodeHashes[codeHash], "Code hash already registered");
        
        versionPricing[version] = VersionInfo({
            price: price,
            available: true,
            description: description,
            codeHash: codeHash,
            timestamp: block.timestamp
        });
        
        registeredCodeHashes[codeHash] = true;
        
        emit VersionAdded(version, price, codeHash);
    }
    
    /**
     * @dev Set protocol fee rate
     * @param newFeeRate New fee rate in basis points (100 = 1%)
     */
    function setProtocolFeeRate(uint256 newFeeRate) external onlyOwner {
        require(newFeeRate <= 1000, "Fee rate too high"); // Max 10%
        
        protocolFeeRate = newFeeRate;
        
        emit ProtocolFeeUpdated(newFeeRate);
    }
    
    /**
     * @dev Authorize a licensor
     * @param licensor Licensor address
     * @param authorized Authorization status
     */
    function setAuthorizedLicensor(
        address licensor,
        bool authorized
    ) external onlyOwner {
        authorizedLicensors[licensor] = authorized;
    }
    
    /**
     * @dev Get user's active licenses
     * @param user User address
     * @return activeLicenses Array of active licenses
     */
    function getActiveLicenses(address user) external view returns (License[] memory) {
        License[] memory userLicenses = licenses[user];
        License[] memory activeLicenses = new License[](userLicenses.length);
        uint256 activeCount = 0;
        
        for (uint256 i = 0; i < userLicenses.length; i++) {
            if (userLicenses[i].active && 
                block.timestamp < userLicenses[i].timestamp + (userLicenses[i].duration * 1 days)) {
                activeLicenses[activeCount] = userLicenses[i];
                activeCount++;
            }
        }
        
        // Resize array to actual active count
        License[] memory result = new License[](activeCount);
        for (uint256 i = 0; i < activeCount; i++) {
            result[i] = activeLicenses[i];
        }
        
        return result;
    }
    
    /**
     * @dev Check if user has valid license for version
     * @param user User address
     * @param version Version to check
     * @return hasLicense True if user has valid license
     */
    function hasValidLicense(address user, string memory version) external view returns (bool) {
        License[] memory userLicenses = licenses[user];
        
        for (uint256 i = 0; i < userLicenses.length; i++) {
            if (userLicenses[i].active && 
                keccak256(bytes(userLicenses[i].version)) == keccak256(bytes(version)) &&
                block.timestamp < userLicenses[i].timestamp + (userLicenses[i].duration * 1 days)) {
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * @dev Get agent information
     * @param agent Agent address
     * @return agentInfo Agent information
     */
    function getAgentInfo(address agent) external view returns (Agent memory) {
        return agents[agent];
    }
    
    /**
     * @dev Get version information
     * @param version Version string
     * @return versionInfo Version information
     */
    function getVersionInfo(string memory version) external view returns (VersionInfo memory) {
        return versionPricing[version];
    }
    
    /**
     * @dev Withdraw protocol fees
     */
    function withdrawFees() external onlyOwner {
        uint256 balance = seveToken.balanceOf(address(this));
        require(balance > 0, "No fees to withdraw");
        
        seveToken.transfer(owner(), balance);
    }
    
    /**
     * @dev Pause protocol in case of emergency
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    /**
     * @dev Unpause protocol
     */
    function unpause() external onlyOwner {
        _unpause();
    }
}
