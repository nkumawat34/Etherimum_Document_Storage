import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {auth,storage} from './Firebase_config';
import firebaseConfig from './firebase';
import { collection, addDoc,doc ,updateDoc,getDocs,getDoc, query, where, onSnapshot} from "firebase/firestore"; 
import { useLocation } from 'react-router-dom';
import Web3 from 'web3';
import abi from "./abi_contractaddress";
import axios from 'axios';
import { Web3Storage } from 'web3.storage'
import { FirebaseError } from 'firebase/app';
import abi_contractaddress from './abi_contractaddress';




export default function Register(props) {
  
  const location = useLocation();
  const [file,setFile]=useState("")

  


 const [email,Setemail]=useState("");
const [password,Setpassword]=useState("");

const [repassword,setRePassword]=useState("")
const [name,setName]=useState("")

const auth = getAuth();
var usertype= location.state;
//This Fucntion is used for add data into firestore
  const user1=async (email,password,name)=>
  {
    
      try {
        alert("Hello")
        const docRef = await addDoc(collection(storage, "Users"), {
          email: email,
          password: password,
         name: name,
          documents:[],
        
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      } 
    }
    
  

  


    const getname=()=>{

      const fullPath=(document.getElementById("f").value)
      const startIndex = fullPath.lastIndexOf('\\') + 1; // Find the last backslash position
      const fileName = fullPath.slice(startIndex); // Get the file name after the last backslash
      setFile(fileName);
    }

const putfile=async (e)=>{
  
  const client = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEQzN2Y5NGQ5ZjlDMGE3YzZCODcwN0NGMzVjYzc0MmZkRmE0MTIxQjUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTMwMzUxNjcxNzMsIm5hbWUiOiJCTE9DS0NIQUlOX1BST0pFQ1QifQ.zDGuOoQ1Wtf3dB6KOZeK5712jfzsZ2qCoDgGWZI4AH4"})
  


  const fileInput = document.querySelector('input[type="file"]');
  // Pack files into a CAR and send to web3.storage
const rootCid = await client.put(fileInput.files) // Promise<CIDString>
alert(rootCid)
    
  let provider = window.ethereum;
      
  const web3 = new Web3(provider);
  const accounts = await web3.eth.getAccounts();

  await abi.methods.setImageID_Name(email,String(rootCid),file).send({ from: accounts[0],gas: 300000 });
  
    
    }
const signup= async ()=>{

  if(password!=repassword)
    {
      alert("Sorry you have entererd wrong password");
      return ;
    }
   
    let provider = window.ethereum;
    
      await provider.request({ method: "eth_requestAccounts" });
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
    
   
   
      
      if(usertype!="student")
      await abi.methods.registerUser(email).send({ from: accounts[0] });
      
      putfile()
    
   
  
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in s
    const user = userCredential.user;
    alert("Registered");

    
    //user1(email,password,name)
    
    // ...
  })
  .catch((error) => {
    
    const errorCode = error.code;
    
    const errorMessage = error.message;
    // ..
  });
  
}

  return (
    <section class="vh-100" style={{BackgroundColor: "#eee"}}>
     
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style={{BorderRadius: "25px"}}>
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form class="mx-1 mx-md-4">
                <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example1c" class="form-control" onChange={(e)=>setName(e.target.value)}/>
                      <label class="form-label" for="form3Example1c">Your Name</label>
                    </div>
                  </div>
                  
                  

                  
                 
                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example3c" class="form-control"  onChange={(e)=>{Setemail(e.target.value)}}/>
                      <label class="form-label" for="form3Example3c">Your Email</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4c" class="form-control" onChange={(e)=>Setpassword(e.target.value)}/>
                      <label class="form-label" for="form3Example4c">Password</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4cd" class="form-control"  onChange={(e)=>setRePassword(e.target.value)}/>
                      <label class="form-label" for="form3Example4cd">Repeat your password</label>
                    </div>
                  </div>

                  <div class="form-check d-flex justify-content-center mb-5">
                   <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                   
  
                    <label class="form-check-label" for="form2Example3">
                      I agree all statements in <a href="#!">Terms of service</a>
                    </label>
                  </div>
                  <center> {usertype!="student"?<input type="file" id="f" onChange={()=>getname()}></input>:"" }</center>
                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" class="btn btn-primary btn-lg" style={{marginTop:"5px"}} onClick={()=>{signup()}}>Register</button>
                  </div>

                </form>

              </div>
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  class="img-fluid" alt="Sample image"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}
