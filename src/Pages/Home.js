import React from 'react'
import { Container, Box,Text,Tabs,TabList,TabPanel,Tab,TabPanels } from '@chakra-ui/react'
import Login from '../Components/Authentication/Login'
import Signup from '../Components/Authentication/Signup'

function Home() {
    return (

        <Container maxW={"xl"} centerContent >
            <Box
                display="flex"
                justifyContent="center"
                p={1}
                bg={'white'}
                w={"100%"}
                m="40px 0 15px 0"
                borderRadius="lg"
                borderWidth="1px"
            >
                <Text fontSize="2xl" fontFamily="Work sans" color="black" >Chat-Connect</Text>
            </Box>
            <Box bg="white" padding="4" width="100%" >
                <Tabs variant='enclosed'>
                    <TabList>
                        <Tab width="50%" >Login</Tab>
                        <Tab width="50%" >Signup</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login/>
                        </TabPanel>
                        <TabPanel>
                            <Signup/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    )
}

export default Home