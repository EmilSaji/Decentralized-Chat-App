// Import necessary modules from Hardhat
const { expect, assert } = require("chai");
const { ethers, network } = require("hardhat");

describe("ChatApp", function () {
  let ChatApp;
  let chatApp;
  let owner;
  let user1;
  let user2;

  // Deploy the contract before each test
  beforeEach(async function () {
    ChatApp = await ethers.getContractFactory("ChatApp");
    [owner, user1, user2] = await ethers.getSigners();

    chatApp = await ChatApp.deploy();
    await chatApp.deployed();
  });

  // Test case for createAccount function
  describe("createAccount", function () {
    it("Should create an account for a user", async function () {
      // Call the createAccount function
      await chatApp.connect(user1).createAccount("Alice");

      // Check if the user has been created successfully
      const userExists = await chatApp.checkUserExists(user1.address);
      expect(userExists).to.be.true;

      // Check if the user's name is correct
      const username = await chatApp.getUsername(user1.address);
      expect(username).to.equal("Alice");
    });

    it("Should revert if user already exists", async function () {
      // Call the createAccount function for the same user twice
      await chatApp.connect(user1).createAccount("Alice");

      // Attempt to create an account for the same user again
      await expect(chatApp.connect(user1).createAccount("Bob")).to.be.revertedWith("User already exists");
    });

    it("Should revert if username is empty", async function () {
      // Attempt to create an account with an empty username
      await expect(chatApp.connect(user1).createAccount("")).to.be.revertedWith("Username cannot be empty");
    });
  });

  // Test case for getAllAppUsers function
  describe("getAllAppUsers", function () {
    it("Should list all users", async function () {
      // Create accounts for multiple users
      await chatApp.connect(user1).createAccount("Alice");
      await chatApp.connect(user2).createAccount("Bob");

      // Get all users from the contract
      const allUsers = await chatApp.getAllAppUsers();

      // Log all users
      console.log("All users:");
      allUsers.forEach(user => {
        console.log(`Name: ${user.name}, Address: ${user.accountAddress}`);
      });

      // Check if all users are listed
      expect(allUsers).to.have.lengthOf(2); // The owner, user1, and user2
    });
  });
});
