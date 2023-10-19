import React from 'react'
import { FormControl, Input, VStack, FormLabel, InputRightElement, Button, InputGroup } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {

    const [password, setPassword] = useState()
    const [email, setEmail] = useState();

    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    

    const handleClick = () => {
        setShow(!show)
    }

    const Toast = useToast();
    const history = useNavigate();
    const submitHandler = async () => {
        setLoading(true)
        if (!email || !password) {
            Toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "/api/user/login",
                { email, password },
                config
            );
            Toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            // setUser(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            history("/chats");
        } catch (error) {
            Toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
    }
    return (
        <VStack spacing="1px" color="black" >
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



            <Button
                color="green"
                bgColor={"white"}
                width={"100%"}
                onClick={submitHandler}
                marginTop={"15"}
            >
                Login
            </Button>
        </VStack>

    )
}


export default Login