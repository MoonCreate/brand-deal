// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {BrandNFT} from "../src/BrandNFT.sol";
import {CampaignNFT} from "../src/CampaignNFT.sol";
import {CreatorNFT} from "../src/CreatorNFT.sol";
import {PlatformCore} from "../src/PlatformCore.sol";

contract DeployScript is Script {
    BrandNFT public brandNFT;
    CampaignNFT public campaignNFT;
    CreatorNFT public creatorNFT;
    PlatformCore public platformCore;

    function setUp() public {}

    function run() public {
        uint256 deployer = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployer);

        brandNFT = new BrandNFT();
        campaignNFT = new CampaignNFT("test");
        creatorNFT = new CreatorNFT();
        platformCore = new PlatformCore(address(brandNFT), address(creatorNFT), address(campaignNFT));

        address platformCoreAddress = address(platformCore);
        brandNFT.transferOwnership(platformCoreAddress);
        campaignNFT.transferOwnership(platformCoreAddress);
        creatorNFT.transferOwnership(platformCoreAddress);
        
        vm.stopBroadcast();
    }
}
