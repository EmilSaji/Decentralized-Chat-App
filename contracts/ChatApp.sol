// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 < 0.9.0;

contract ChatApp {

    struct user {
        string name;
        friend[] friendList;
    }

    struct friend {
        address pubkey;
        string name;
    }

    struct message {
        address sender;
        uint256 timestamp;
        string msg;
    }

    struct allUsersStruct {
        string name;
        address accountAddress;
    }

    allUsersStruct[] getAllUsers;

    mapping(address => user) userList;
    mapping(bytes32 => message[]) allMessages; 

    //CHECK USER EXIST
    function checkUserExists(address pubkey) public view returns(bool) {
        return bytes(userList[pubkey].name).length > 0;
    }

    //CREATE ACCOUNT
    function createAccount(string calldata name) external {
        require(checkUserExists(msg.sender) == false, 'User already exists');
        require(bytes(name).length > 0, 'Username cannot be empty');

        userList[msg.sender].name = name;
        getAllUsers.push(allUsersStruct(name, msg.sender));
    }

    //GET USERNAME
    function getUsername( address pubkey) external view returns(string memory){ 
        require(checkUserExists(pubkey), 'User is not registered');
        return userList[pubkey].name;
    }

    //ADD FRIENDS
    function addFriend(address friend_key, string calldata name) external {
        require(checkUserExists(msg.sender), 'Create an account first');
        require(checkUserExists(friend_key), 'User is not registered');
        require(msg.sender != friend_key, 'User cannot add themselves as friend');
        require(checkAlreadyFriends(msg.sender, friend_key) == false, 'These Users are already friends');

        _addFriend(msg.sender, friend_key, name);
        _addFriend(friend_key, msg.sender, userList[msg.sender].name);

    }

    function checkAlreadyFriends(address pubKey1, address pubKey2) internal view returns (bool) {

        if(userList[pubKey1].friendList.length > userList[pubKey2].friendList.length) {
            address tmp = pubKey1;
            pubKey1 = pubKey2;
            pubKey2 = tmp;
        }

        for( uint256 i = 0; i < userList[pubKey1].friendList.length; i++) {
            if(userList[pubKey1].friendList[i].pubkey == pubKey2) return true;
        }
        return false;
    }

    function _addFriend(address me, address friend_key, string memory name) internal {
        friend memory newFriend = friend(friend_key, name);
        userList[me].friendList.push(newFriend);
    }

    //Get My Friends
    function getMyFriendList() external view returns(friend[] memory) {
        return userList[msg.sender].friendList;
    }

    //Get chat code
    function _getChatCode(address pubKey1, address pubKey2) internal pure returns(bytes32) {
        address smallerAddress = pubKey1 < pubKey2 ? pubKey1 : pubKey2;
        address largerAddress = pubKey1 < pubKey2 ? pubKey2 : pubKey1;
        return keccak256(abi.encodePacked(smallerAddress, largerAddress));
    }

    //Send Message 
    function sendMessage(address friend_key, string calldata _msg) external {
        require(checkUserExists(msg.sender), 'Create an account first');
        require(checkUserExists(friend_key), 'User is not registered');
        require(checkAlreadyFriends(msg.sender, friend_key), 'Must be friends first');

        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        message memory newMsg = message(msg.sender, block.timestamp, _msg);
        allMessages[chatCode].push(newMsg);
    }

    //Read Messages
    function readMessage(address friend_key) external view returns (message[] memory) {
        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        return allMessages[chatCode];
    }

    //get All Users
    function getAllAppUsers() public view returns(allUsersStruct[] memory){
        return getAllUsers;
    }
}