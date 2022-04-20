//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Pet is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    // variables

    address public owner;

    //events
    event PetCreated(string _name, uint256 _age, string _breed, address _owner);

    constructor() ERC721("Pet", "PETS") {
        owner = msg.sender;
    }

    function mintPetNFT(
        string memory _url,
        string memory _name,
        uint256 _age,
        string memory _breed,
        address _owner
    ) external {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, _url);
        // setApprovalForAll(_owner, true); // aprove market place to be the spender of the contract

        emit PetCreated(_name, _age, _breed, _owner);
    }
}
