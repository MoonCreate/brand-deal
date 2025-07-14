    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.20;

    import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
    import "@openzeppelin/contracts/access/Ownable.sol";

    contract CreatorNFT is ERC721URIStorage, Ownable {
        uint256 private _newTokenId;

        struct Creator {
            uint256 id;
            address creator;
            string name;
            string uri;
        }

        mapping(uint256 => Creator) public existingCreator;
        mapping(string => bool) public isCreatorNameExist;

        event CreatorNFTMinted(uint256 indexed tokenId, address indexed owner, string indexed name, string metadataURI);

        constructor()
            ERC721("Creator Profile NFT", "CREATOR")
            Ownable(msg.sender)
        {}

        function mintCreatorNFT(address to, string calldata _name, string calldata _metadataURI)
            external
            returns (uint256)
        {
            if(to == address(0)){
                revert("ERC721: mint to the zero address");
            } 
            if(bytes(_metadataURI).length == 0){
                revert("Metadata URI cannot be empty");
            }
            if(isCreatorNameExist[_name] == true) {
                revert("Name for creator already exist");
            }

            _newTokenId++;

            Creator memory creator = Creator({
                id: _newTokenId,
                creator: to,
                name: _name,
                uri: _metadataURI
            });

            existingCreator[_newTokenId] = creator;
            isCreatorNameExist[_name] = true;

            _mint(to, _newTokenId);
            _setTokenURI(_newTokenId, _metadataURI); 

            emit CreatorNFTMinted(_newTokenId, to, _name, _metadataURI);
            return _newTokenId;
        }
    }