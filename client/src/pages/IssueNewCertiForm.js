import React, { useState, useRef } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputRightAddon,
  InputGroup,
  Alert,
  AlertIcon,
  AlertDescription,
  FormHelperText,
  Textarea,
  TagLabel,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

//import { useMetamask } from "../hooks/useMetamask"
//import { create } from 'ipfs-http-client'
//import { useClient } from "../hooks/useClient";
//import * as Client from '@web3-storage/w3up-client'
import Web3 from 'web3'
import axios from "axios";
import abi from "./abi_contractaddress";
import { NFTStorage, File } from 'nft.storage'
const IssuerForm = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onChange",
  });
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  //const { client } = useClient();
  const navigate = useNavigate();
  //const { isConnected } = useMetamask();
  const [studentemail,setEmail]=useState("")
  const [digitalsignature,setDigitalSignature]=useState("")
  var location=useLocation()
  const [issueremail,setIssuermail]=useState(location.state)

  const storage = async () => {
    
    // Pinata JWT Token
    const PINATA_JWT_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1ZTNjNjA1MS00Njc2LTQwZjMtODExMC03N2YwNzM5ZDZiYTUiLCJlbWFpbCI6Im5rdW1hd2F0MzRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImZlZmY5MWU4ZWRhY2MzYzk4MjcwIiwic2NvcGVkS2V5U2VjcmV0IjoiMzMyNDcyYjc2ZjM1NThlOGRkNWI4MTdmN2RiNzQ0ZmQzZjhlYWU1OTgwMTcxMDgyZjM5ZDc4NTNkYjIxM2FlMiIsImlhdCI6MTcyNjM3MzY5M30.trKiXBvfDb_m7-fS7Mf4WZnzV6bfW_SrSPgJ7kSRVl0"; // Replace with your Pinata JWT token
  
    // Get the file from the input
    const fileInput = document.getElementById('pdfFile');
    const selectedFile = fileInput.files[0];
  
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }
  
    
    // Create FormData for the file upload
    const formData = new FormData();
    formData.append('file', selectedFile);
  
    // Pinata API request options
    const options = {
      method: 'POST',
      headers: {
        Authorization: PINATA_JWT_TOKEN, // Add Pinata JWT for authentication
      },
      body: formData,
    };
  
    let rootCid;
    try {
      // Upload file to Pinata
      const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', options);
      const result = await response.json();
      rootCid = result.IpfsHash; // Extract CID from the response
      alert(`File uploaded successfully! CID: ${rootCid}`);
    } catch (error) {
      console.error('Error uploading file to Pinata:', error);
      return;
    }
  
    // Assuming you have the necessary setup for Web3
    let provider = window.ethereum;
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
  
    try {
      // Interact with smart contract (replace 'abi' and contract methods with actual contract details)
      await abi.methods.uploadDocument(
        issueremail, // Issuer's email
        selectedFile.name, // File name
        String(rootCid),   // File CID
        issueremail, // Issuer's email again (replace if different)
        studentemail // Student's email
      ).send({ from: account,gas:300000});
      alert('Document successfully uploaded to the smart contract!');
    } catch (error) {
      console.error('Error interacting with smart contract:', error);
    }
      
  /*
    // Sending an email notification using Axios
    const fullPath = document.getElementById("pdfFile1").value;
    const startIndex = fullPath.lastIndexOf('\\') + 1;
    const fileName = fullPath.slice(startIndex);
  
    axios.get("http://localhost:3000/email", {
      params: {
        param1: issueremail,
        param2: fileName,
      },
    })
    .then(response => {
      alert('Email notification sent successfully!');
    })
    .catch(error => {
      console.error('Error sending email notification:', error);
    });
    */
  };
  
  const getname=()=>{

    const fullPath=(document.getElementById("pdfFile").value)
    const startIndex = fullPath.lastIndexOf('\\') + 1; // Find the last backslash position
    const fileName = fullPath.slice(startIndex); // Get the file name after the last backslash
    setFile(fileName);
  }
  const encryptpdf=()=>{

    
    const fileInput = document.getElementById('pdfFile1');
    const selectedFile = fileInput.files[0];

    axios.get("http://127.0.0.1:5000/encryptpdf",{
      params:{
        param1:selectedFile.name,
        param2:selectedFile.name,
        param3:"Nk@12351235"
      }
    }).then(response=>{
      
    })
  
}
  async function onSubmit(data) {
    const fileInput = document.getElementById('pdfFile');
   const imagepath=await abi.methods.getImagePath(issueremail).call()
   alert(imagepath.imageID)
   // Define the data you want to pass
    
    //alert(imagepath.imageID,"Sadas")
const requestData = {
  param1: fileInput.files[0].name
}
/*
   // Make a GET request with the data as query parameters
axios.get('http://localhost:3000/generate_digital_signature', {
  params:requestData
})
  .then(response => {
    // Handle the response
    setDigitalSignature(response.data.digitalSignature)
    //document.getElementById("digital_signature").innerHTML=response.data.digitalSignature
    //alert(response.data.digitalSignature);
  })
  .catch(error => {
    // Handle errors
    console.error('Error:', error.message);
  });

*/
  
//storage()
  //console.log(imagepath.imageName)
  axios.get('http://127.0.0.1:5000/liveface',{
  params:{
    param1:imagepath.imageID,
    param2:imagepath.imageName

  }})
  .then(response=>{
    storage()
   // alert("Face Matched")
      

  }).catch(error)
  {
    console.log(error)
  }
    
  
 
  }

  return (
    <>
      <main>
        <Stack spacing={8} mx={"auto"} maxW={"2xl"} py={12} px={6} my={20}>
          <Text fontSize={"lg"} color={"teal.400"}>
            <ArrowBackIcon mr={2} />
            <Link to="/is-registered/issuer">Go Back</Link>
          </Text>

          <Stack>
            <Heading fontSize={"4xl"}>Issue a new certificate</Heading>
          </Stack>

          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <FormControl id="certificate_name">
                  <FormLabel>Certificate Name</FormLabel>
                  <Input
                    {...register("certificate_name", { required: true })}
                    isDisabled={isSubmitting}
                  />
                </FormControl>
                <FormControl id="new_name">
                  <FormLabel>Student Name</FormLabel>
                  <Input
                    {...register("new_name", { required: true })}
                    isDisabled={isSubmitting}
                  />
                </FormControl>
                <FormControl id="new_address">
                  <FormLabel>Email Address</FormLabel>
                  <Input
                    {...register("new_address", { required: true })}
                    onChange={(e)=>setEmail(e.target.value)}
                    isDisabled={isSubmitting}
                  />
                </FormControl>

                <FormControl id="doc">
                  <FormLabel>File Upload</FormLabel>
                  <input type="file" id="pdfFile1" name="pdfFile" accept=".pdf" required onChange={()=>encryptpdf()}/>
                </FormControl>

                <FormControl id="doc">
                  <FormLabel>Encrypted File</FormLabel>
                  <input type="file" id="pdfFile" name="pdfFile" accept=".pdf" required onChange={()=>getname()}/>
                </FormControl>
                {error ? (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertDescription mr={2}> {error}</AlertDescription>
                  </Alert>
                ) : null}

                {errors.issuer_name || errors.new_address || errors.doc ? (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertDescription mr={2}>
                      {" "}
                      All Fields are Required
                    </AlertDescription>
                  </Alert>
                ) : null}

                <Stack spacing={10}>
                  {/* conditional rendering if wallet is  connected will come here */}
                  <Stack spacing={3}>
                    {1 ? (
                      <Button
                        color={"white"}
                        bg={"teal.400"}
                        _hover={{
                          bg: "teal.300",
                        }}
                        type={"submit"}
                      >
                        Submit{" "}
                      </Button>
                    ) : (
                      <Alert status="warning">
                        <AlertIcon />
                        <AlertDescription mr={2}>
                          Please Connect Your Wallet First to Register
                        </AlertDescription>
                      </Alert>
                    )}
                  </Stack>
                </Stack>
              </Stack>
            </form>
          </Box>
          {digitalsignature!=""?
          <div id="digital_signature"><h1 className="text-2xl text-center">Digital Signature</h1>
            <p>{digitalsignature}</p>
          </div>:""
}
        </Stack>
      </main>
      
    </>
  );
};

export default IssuerForm;
