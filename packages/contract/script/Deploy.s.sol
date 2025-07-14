// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {BrandNFT} from "../src/BrandNFT.sol";
import {CampaignContract} from "../src/CampaignContract.sol";
import {CreatorNFT} from "../src/CreatorNFT.sol";
import {BrandDeal} from "../src/BrandDeal.sol";
import {MockUSDC} from "../src/MockUSDC.sol";

contract DeployScript is Script {
    BrandNFT public brandNFT;
    CampaignContract public campaignContract;
    CreatorNFT public creatorNFT;
    BrandDeal public brandDeal;
    MockUSDC public mockUSDC;

    function setUp() public {}

    function run() public {
        uint256 deployer = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployer);

        mockUSDC = new MockUSDC();
        brandNFT = new BrandNFT();
        campaignContract = new CampaignContract("test", address(mockUSDC));
        creatorNFT = new CreatorNFT();
        brandDeal = new BrandDeal(address(brandNFT), address(creatorNFT), address(campaignContract));

        address brandDealAddress = address(brandDeal);
        brandNFT.transferOwnership(brandDealAddress);
        campaignContract.transferOwnership(brandDealAddress);
        creatorNFT.transferOwnership(brandDealAddress);
        
        vm.stopBroadcast();
    }
}
