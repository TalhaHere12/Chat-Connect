import { FormControl, Input, VStack, FormLabel, InputRightElement, Button, InputGroup, Toast } from '@chakra-ui/react'
import React from 'react'
import { useToast } from '@chakra-ui/react'
import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
function Signup() {
    const [name, setName] = useState()
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [show, setShow] = useState(false)
    const [confirmPassword, setConfirmpassword] = useState();
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);
    const history=useNavigate()
    const Toast=useToast();
    const handleClick = () => {
        setShow(!show)
    }
    const submitHandler =async () => {
        setLoading(true)
        if(!name || !email || !password || !confirmPassword){
            Toast({
                title: "Please fill all the fields",
                status: "warning",
                duration: 5000,
                isClosable: "true",
                position: "bottom"
            })
            setLoading(false)
            return
        }
        if(password !==confirmPassword){
            Toast({
                title: "Please enter the right password",
                status: "warning",
                duration: 5000,
                isClosable: "true",
                position: "bottom"
            })
            return
        }
        console.log(name,email,password,pic)
        try {
            const config={
                headers:{
                    "Content-type":"application/json"
                }
            }
            const {data}= await axios.post("/api/user",{name,email,password},config)
            console.log(data)
            Toast({
                title: "Registration successful",
                status: "success",
                duration: 5000,
                isClosable: "true",
                position: "bottom"
            })
            console.log(data)

            localStorage.setItem("userInfo",JSON.stringify(data))
            setLoading(false)
            history("/chats")
            
        } catch (error) {
            Toast({
                title: "Error Occured",
                description:error.response.data.message,
                status: "success",
                duration: 5000,
                isClosable: "true",
                position: "bottom"

            })
            setLoading(false)
        }
    }
    const postDetails = (pics) => {
        setLoading(true)
        if (pics === undefined) {
            Toast({
                title: "Please select an image",
                status: "warning",
                duration: 5000,
                isClosable: "true",
                position: "bottom"
            })
            return;
        }
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics)
            data.append("upload_preset", "chat-connect")
            data.append("cloud_name", "dsdvde1f1");
            fetch("https://api.cloudinary.com/v1_1/dsdvde1f1/image/upload", {
                method: "post",
                body: data,
            }).then((res) => res.json)
                .then((data) => {
                    setPic(data.url.toString());
                    console.log(data.url.toString());
                    setLoading(false);
                })
                // .then(data => {
                //     setPic(data.url.toString());
                //     console.log(data.url.toString());
                //     setLoading(false)
                // })
                .then((data) => {
                    if (data && data.url) {
                        setPic(data.url.toString());
                        console.log(data.url.toString());
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false)
                })
        } else {
            Toast({
                title: "Please select an image",
                status: "warning",
                duration: 5000,
                isClosable: "true",
                position: "bottom"
            })
            setLoading(false)
            return;
        }
    }
    return (
        <VStack spacing="1px" color="black" >
            <FormControl id='first-name' isRequired >
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder='Enter your name'
                    onChange={(e) => setName(e.target.value)}
                ></Input>
            </FormControl>
            <FormControl id='email' isRequired >
                <FormLabel>Email</FormLabel>
                <Input
                    placeholder='Enter your email'
                    onChange={(e) => setEmail(e.target.value)}
                ></Input>
            </FormControl>
            <FormControl id='password' isRequired >
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        placeholder='Enter your password'
                        onChange={(e) => setPassword(e.target.value)}
                        type={show ? "text" : "password"}
                    ></Input>
                    <InputRightElement width="4.5rem" >
                        <Button h="1.75rem" size="sm" onClick={handleClick} >
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id='confirm-password' isRequired >
                <FormLabel>Confirm-Password</FormLabel>
                <InputGroup>
                    <Input
                        placeholder='Enter your password'
                        onChange={(e) => setConfirmpassword(e.target.value)}
                        type={show ? "text" : "password"}
                    ></Input>
                    <InputRightElement width="4.5rem" >
                        <Button h="1.75rem" size="sm" onClick={handleClick} >
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id='pic' isRequired >
                <FormLabel>Upload Your Picture</FormLabel>
                <Input
                    type='file'
                    p={1.5}
                    accept="image/*"
                    onChange={(e) => postDetails(e.target.files[0])}
                ></Input>
            </FormControl>
            <Button
                color="green"
                bgColor={"white"}
                width={"100%"}
                onClick={submitHandler}
                marginTop={"15"}
                isLoading={loading}
            >
                Sign Up
            </Button>
        </VStack>
    )
}

export default Signup