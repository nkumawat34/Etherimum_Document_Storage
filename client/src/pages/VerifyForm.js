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
  Toast,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import axios from "axios";

//import { useMetamask } from "../hooks/useMetamask";
//import { useClient } from "../hooks/useClient";

const VerifyForm = () => {
  //const { client } = useClient();
  const [error, setError] = useState("");
  const {
    handleSubmit,
    register,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onChange",
  });
  //const { isConnected } = useMetamask();
   
 
  //const inputRef = useRef();
  //const toast = useToast();
  const [digitalSignature,setDigitalSignature]=useState("")
  async function onSubmit(data) {
    //const formData = new FormData();
    const fileInput = document.getElementById('pdfFile');
   // formData.append("certificate", inputRef.current.files[0]);
const requestData = {
  param1: fileInput.files[0].name,
  param2:digitalSignature
}
   axios.get('http://localhost:3000/verify_digital_signature', {
  params:requestData
})
  .then(response => {
    // Handle the response
    if(response.data.isSignatureValid)
      alert("Verified")
    else
      alert("Not verified")
  })
  .catch(error => {
    // Handle errors
    console.error('Error:', error.message);
  });
   
   
  }

  return (
    <>
      <main>
        <Stack spacing={8} mx={"auto"} maxW={"2xl"} py={12} px={6} my={20}>
          <Text fontSize={"lg"} color={"teal.400"}>
            <ArrowBackIcon mr={2} />
            <Link to="/is-not-registered">Back to Home</Link>
          </Text>

          <Stack>
            <Heading fontSize={"4xl"}>Verify a document 📃</Heading>
          </Stack>

          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <FormControl id="Issued_by">
                  <FormLabel>Issuer Email Address</FormLabel>
                  <Input
                    {...register("Issued_by", { required: true })}
                    isDisabled={isSubmitting}
                  />
                </FormControl>

                <FormControl id="Issued_to">
                  <FormLabel>Student's Email Address</FormLabel>
                  <Input
                    {...register("Issued_to", { required: true })}
                    isDisabled={isSubmitting}
                  />
                </FormControl>

                <FormControl id="UUID">
                  <FormLabel>Digital Signature</FormLabel>
                  <Input
                    {...register("UUID", { required: true })}
                    isDisabled={isSubmitting}
                     onChange={(e)=>setDigitalSignature(e.target.value)}
                  />
                </FormControl>

                <FormControl id="target">
                  <FormLabel>File Upload</FormLabel>
                  <input type="file" id="pdfFile" name="pdfFile" accept=".pdf" required />
                    Only PDF format is acceptable
                  
                </FormControl>

                {error ? (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertDescription mr={2}> {error}</AlertDescription>
                  </Alert>
                ) : null}

                {errors.minimumContribution ||
                errors.name ||
                errors.description ||
                errors.UUID ||
                errors.target ? (
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
                        type="submit"
                      >
                        Submit{" "}
                      </Button>
                    ) : (
                      <Alert status="warning">
                        <AlertIcon />
                        <AlertDescription mr={2}>
                          Please Connect Your Wallet to Register
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

export default VerifyForm;
