// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./MockUSDC.sol";

contract CampaignContract is ERC1155URIStorage, Ownable {
    uint256 private _newTokenId;
    MockUSDC public USDC;

    uint256 public constant MARKETPLACE_FEE = 5; 

    struct Campaign {
        uint256 campaignNFTId;
        address ownerCampaign;    
        address approvedCreator;
        string campaignName;
        uint256 rewards;
        uint256 campaignDeadline;
        string uriCampaign;
        string submitMetadataUri;
    }

    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => mapping(address => bool)) public creatorPool;

    event CampaignMinted(
        uint256 indexed campaignNFTId, 
        address indexed ownerCampaign, 
        string indexed campaignName, 
        address approvedCreator, 
        uint256 stakedAmount, 
        uint256 campaignDeadline,
        string campaignMetadataURI
    );
    event CreatorAssignedToCampaign(uint256 indexed campaignId, address indexed owner, address indexed creatorAddress);
    event ResolveCampaign(uint256 indexed campaignId, address indexed creatorAddress, uint256 indexed rewards);
    event CreatorAssigned(
        uint256 indexed campaignId,
        address indexed creatorAddress,
        uint256 campaignDeadline
    );
    event CampaignApproved(
        uint256 indexed campaignId,
        address indexed approver,
        uint256 indexed rewards
    );
    event CreatorApply(uint256 indexed campaignId, address indexed creator);
    event SubmitTaskCreator(
        uint256 indexed campaignId,
        address indexed creatorAddress,
        string indexed submitMetadataUri
    );
    event CreatorCancelledApplyForCampaign(uint256 indexed campaignId, address indexed creator);

    constructor(string memory _uri, address _USDC)
        ERC1155(_uri)
        Ownable(msg.sender)
    {
        USDC = MockUSDC(_USDC);
    }

    function mintCampaignNFT(address from, string calldata _campaignName, uint256 _rewards, uint256 _deadline, string calldata metadataUri) public payable returns(uint256) {
        USDC.approve(address(this), _rewards);
        if (from == address(0)) {
        revert("ERC1155: mint to the zero address"); 
        }
        if (bytes(_campaignName).length == 0){
            revert("Campaign Name cannot be empty");
        }
        if(bytes(metadataUri).length == 0){
            revert("Metadata URI cannot be empty");
        }

        _newTokenId++;
        _mint(from, _newTokenId, 1, "");

        Campaign memory campaign = Campaign({
            campaignNFTId: _newTokenId,
            ownerCampaign: from,
            approvedCreator: address(0),
            campaignName: _campaignName,
            rewards: _rewards,
            campaignDeadline: _deadline,
            uriCampaign: metadataUri,
            submitMetadataUri: ""
        });

        
        USDC.transferFrom(from, address(this), _rewards);

        campaigns[_newTokenId] = campaign;
        emit CampaignMinted(_newTokenId, from, _campaignName, address(0), _rewards, block.timestamp + _deadline, metadataUri);

        return _newTokenId;
    }

    function resolveCampaign(uint256 _campaignId) public payable {
        Campaign memory campaign = campaigns[_campaignId];

        uint256 amountCreator = campaign.rewards - (campaign.rewards * MARKETPLACE_FEE / 100);

        USDC.transferFrom(address(this), campaign.approvedCreator, amountCreator);
        _burn(campaign.approvedCreator, _campaignId, 1);
        _burn(campaign.ownerCampaign, _campaignId, 1);

        emit ResolveCampaign(_campaignId, campaign.approvedCreator, amountCreator);

        delete campaigns[_campaignId];
    }

    function creatorApplyToCampaign(uint256 _campaignId, address _creator) public {
        if(creatorPool[_campaignId][_creator] == true) {
            revert("You have already been applied to this campaign");
        }

        creatorPool[_campaignId][_creator] = true;

        emit CreatorApply(_campaignId, _creator);
    }

    function submitTaskCampaignCreator(uint256 _campaignId, string memory _submitMetadataUri) public {
        Campaign storage campaign = campaigns[_campaignId];

        campaign.submitMetadataUri = _submitMetadataUri;

        emit SubmitTaskCreator(_campaignId, campaign.approvedCreator, _submitMetadataUri);
    }

    function cancelApply(uint256 _campaignId, address _creator) public {
        creatorPool[_campaignId][_creator] = false;

        emit CreatorCancelledApplyForCampaign(_campaignId, _creator);
    }
   
    function assignCreatorToCampaign(uint256 _campaignId, address _creatorAddress) public {
        if(creatorPool[_campaignId][_creatorAddress] == false) {
            revert("The Creator Not Yet Applied to this Campaign");
        }

        Campaign storage campaign = campaigns[_campaignId];

        campaign.approvedCreator = _creatorAddress;
        campaign.campaignDeadline = block.timestamp + campaign.campaignDeadline;
 
        _mint(_creatorAddress, _campaignId, 1, "");

        emit CreatorAssignedToCampaign(_campaignId, campaign.ownerCampaign, _creatorAddress);
        emit CreatorAssigned( _campaignId, _creatorAddress, campaign.campaignDeadline);
        emit CampaignApproved(_campaignId, campaign.ownerCampaign, campaign.rewards);
    }
}