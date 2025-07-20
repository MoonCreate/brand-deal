export const brandDealContractABI = [
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "_brandNFT",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_creatorNFT",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_campaignContract",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "assignCreatorToCampaign",
    "inputs": [
      {
        "name": "_campaignId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_creatorAddress",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "brandNFT",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract BrandNFT"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "campaignContract",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract CampaignContract"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "cancelApply",
    "inputs": [
      {
        "name": "_campaignId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "createCampaign",
    "inputs": [
      {
        "name": "_campaignName",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_rewards",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_deadline",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_metadataURI",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "creatorApplyToCampaign",
    "inputs": [
      {
        "name": "_campaignId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "creatorNFT",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract CreatorNFT"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "creatorPool",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "owner",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "registerBrand",
    "inputs": [
      {
        "name": "_instanceName",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_metadataURI",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_NIB",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "registerCreator",
    "inputs": [
      {
        "name": "_name",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_metadataURI",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "renounceOwnership",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "resolveCampaign",
    "inputs": [
      {
        "name": "_campaignId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "submitTaskCampaignCreator",
    "inputs": [
      {
        "name": "_campaignId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_submitMetadataUri",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "transferOwnership",
    "inputs": [
      {
        "name": "newOwner",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "BrandRegistered",
    "inputs": [
      {
        "name": "brandNFTId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "brandAddress",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "name",
        "type": "string",
        "indexed": true,
        "internalType": "string"
      },
      {
        "name": "metadataURI",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      },
      {
        "name": "NIB",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "CampaignApproved",
    "inputs": [
      {
        "name": "campaignId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "approver",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "CampaignCreated",
    "inputs": [
      {
        "name": "campaignNFTId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "ownerCampaign",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "campaignName",
        "type": "string",
        "indexed": true,
        "internalType": "string"
      },
      {
        "name": "approvedCreator",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      },
      {
        "name": "stakedAmount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "campaignDeadline",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "campaignMetadataURI",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "CreatorApply",
    "inputs": [
      {
        "name": "campaignId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "creatorAddress",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "CreatorAssigned",
    "inputs": [
      {
        "name": "campaignId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "creatorAddress",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "CreatorCancelledApplyForCampaign",
    "inputs": [
      {
        "name": "campaignId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "creator",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "CreatorRegistered",
    "inputs": [
      {
        "name": "creatorNFTId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "creatorAddress",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "name",
        "type": "string",
        "indexed": true,
        "internalType": "string"
      },
      {
        "name": "metadataURI",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OwnershipTransferred",
    "inputs": [
      {
        "name": "previousOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "newOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "ResolveCampaign",
    "inputs": [
      {
        "name": "campaignId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "ownerCampaign",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "creatorAddress",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "SubmitTaskCreator",
    "inputs": [
      {
        "name": "campaignId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "creatorAddress",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "submitMetadataUri",
        "type": "string",
        "indexed": true,
        "internalType": "string"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "TaskSubmittedForReview",
    "inputs": [
      {
        "name": "campaignId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "creatorAddress",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "error",
    "name": "OwnableInvalidOwner",
    "inputs": [
      {
        "name": "owner",
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "type": "error",
    "name": "OwnableUnauthorizedAccount",
    "inputs": [
      {
        "name": "account",
        "type": "address",
        "internalType": "address"
      }
    ]
  }
] as const;