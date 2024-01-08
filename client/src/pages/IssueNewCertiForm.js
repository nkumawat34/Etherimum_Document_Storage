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

//import { useClient } from "../hooks/useClient";
import { Web3Storage } from 'web3.storage'
import Web3 from 'web3'
import axios from "axios";
import abi from "./abi_contractaddress";
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
  var location=useLocation()
  const [issueremail,setIssuermail]=useState(location.state)

  const storage= async ()=>{
 
      const client = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEQzN2Y5NGQ5ZjlDMGE3YzZCODcwN0NGMzVjYzc0MmZkRmE0MTIxQjUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTMwMzUxNjcxNzMsIm5hbWUiOiJCTE9DS0NIQUlOX1BST0pFQ1QifQ.zDGuOoQ1Wtf3dB6KOZeK5712jfzsZ2qCoDgGWZI4AH4"})

      const fileInput = document.getElementById("pdfFile")
     
     
       // Pack files into a CAR and send to web3.storage
    const rootCid = await client.put(fileInput.files) // Promise<CIDString>
   
    let provider = window.ethereum;
      
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    
    
    await abi.methods.uploadDocument(issueremail,file,String(rootCid),issueremail,studentemail).send({ from: accounts[0],gas: 300000 });
    
  }
  const getname=()=>{

    const fullPath=(document.getElementById("pdfFile").value)
    const startIndex = fullPath.lastIndexOf('\\') + 1; // Find the last backslash position
    const fileName = fullPath.slice(startIndex); // Get the file name after the last backslash
    setFile(fileName);
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
    alert(response.data.digitalSignature)
  })
  .catch(error => {
    // Handle errors
    console.error('Error:', error.message);
  });
*/

  
  axios.get('http://127.0.0.1:5000/liveface',{
  params:{
    param1:imagepath.imageID,
    param2:imagepath.imageName

  }})
  .then(response=>{
    //Handle erros
    if(response.data=="No")
        alert("You cannot upload document")
    else
      storage()
  })
    
  
    
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
        </Stack>
      </main>
    </>
  );
};

export default IssuerForm;
