import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function Chatpage() {
    const fetchChats = async () => {
        const data = await axios.get("/api/chat")
        setChats(data)
    }
    useEffect(() => {
        fetchChats()
    }, [])

    const [chats, setChats] = useState([])
    return (
        <>

        {chats.map((chat)=>(
            <div key={chat.Id} >{chat.chatName}</div>
        ))}
        
        </>



    )
}

export default Chatpage