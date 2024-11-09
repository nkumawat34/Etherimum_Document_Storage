import web3 from './web3.js'

const contractAddress = "0x4AbFbB66B3A906FD7a989BDFc1810a3F9477A8BA";

const contractABI =[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_documentId",
				"type": "string"
			}
		],
		"name": "deleteDocument",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			}
		],
		"name": "registerUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_imageID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_imageName",
				"type": "string"
			}
		],
		"name": "setImageID_Name",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_documentName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_documentId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_documentHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_documentSignature",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_issuedBy",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_issuedFor",
				"type": "string"
			}
		],
		"name": "uploadDocument",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllUsers",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "documentName",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "documentCId",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "documentHash",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "documentSignature",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "issuedBy",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "issuedFor",
								"type": "string"
							}
						],
						"internalType": "struct EtherDocs.Document[]",
						"name": "documents",
						"type": "tuple[]"
					},
					{
						"internalType": "string",
						"name": "imageID",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "imageName",
						"type": "string"
					}
				],
				"internalType": "struct EtherDocs.User[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			}
		],
		"name": "getDocuments",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "documentName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "documentCId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "documentHash",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "documentSignature",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "issuedBy",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "issuedFor",
						"type": "string"
					}
				],
				"internalType": "struct EtherDocs.Document[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			}
		],
		"name": "getImagePath",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "imageID",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "imageName",
						"type": "string"
					}
				],
				"internalType": "struct EtherDocs.Image",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "user_emails",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "users",
		"outputs": [
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "imageID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "imageName",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_documentHash",
				"type": "string"
			}
		],
		"name": "verifyDocument",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
export default new web3.eth.Contract(contractABI, contractAddress);
