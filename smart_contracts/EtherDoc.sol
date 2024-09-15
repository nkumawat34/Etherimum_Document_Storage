// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EtherDocs {
    // Structure to represent a document
    struct Document {
        string documentName; // Name of the document
        string documentId;   // Unique ID for the document (as a string)
        string issuedBy;
        string issuedFor;
    }

    // Structure to represent a user
    struct User {
        string email;          // User's email address
        Document[] documents;  // Array of documents
        string imageID;
        string imageName;
    }

    //Structure for image
    struct Image
    {
        string imageID;
        string imageName;

    }

    // Mapping from user email to User struct
    mapping(string => User) public users;
    string[] public user_emails;
    // Function to register a new user
    function getallUsers() public view returns(User[] memory)
    { User[] memory users1 = new User[](user_emails.length);

        for (uint i = 0; i < user_emails.length; i++) {
           
            users1[i] = users[user_emails[i]];
        }

        return users1;

    }
    function registerUser(string memory _email) public {
        require(bytes(_email).length > 0, "Email must not be empty");
        require(bytes(users[_email].email).length == 0, "User already registered");

        User storage newUser = users[_email];
        newUser.email = _email;
        user_emails.push(_email);
    }

    // Function to upload a document for a user
    function uploadDocument(string memory _email, string memory _documentName, string memory _documentId,string memory issuedBy,string memory issuedFor) public {
        require(bytes(_email).length > 0, "Email must not be empty");
        require(bytes(_documentName).length > 0, "Document name must not be empty");
        require(bytes(_documentId).length > 0, "Document ID must not be empty");
        require(bytes(users[_email].email).length > 0, "User must be registered");
         require(bytes(issuedBy).length > 0, "issuedBy must not be empty");
          require(bytes(issuedFor).length > 0, "issuedFor must not be empty");
        User storage user = users[_email];
        Document memory newDocument = Document(_documentName, _documentId,issuedBy,issuedFor);
        user.documents.push(newDocument);
    }

    // Function to get the list of documents for a user
    function getDocuments(string memory _email) public view returns (Document[] memory) {
        return users[_email].documents;
    }

    // Function to delete a document by its documentId
    function deleteDocument(string memory _email, string memory _documentId) public {
        require(bytes(_email).length > 0, "Email must not be empty");
        require(bytes(_documentId).length > 0, "Document ID must not be empty");
        
        User storage user = users[_email];
        for (uint256 i = 0; i < user.documents.length; i++) {
            if (keccak256(bytes(user.documents[i].documentId)) == keccak256(bytes(_documentId))) {
                // Found the matching document, remove it
                for (uint256 j = i; j < user.documents.length - 1; j++) {
                    user.documents[j] = user.documents[j + 1];
                }
                user.documents.pop(); // Remove the last element
                return;
            }
        }
    }
    function setImageID_Name(string memory email,string memory imageID,string memory imageName) public{

        User storage user = users[email];
        user.imageID=imageID;
        user.imageName=imageName;

    }
    function getImagePath(string memory email) public  view returns (Image memory){

         User storage user = users[email];

        Image memory image =Image(user.imageID,user.imageName);

        return image;
        
      

    }
}
