'use client'
import { Message_list } from "@/components";
import { Message } from "@/types/message";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Message_page = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const getMessages = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            try {
                const response = await axios.get("/api/message", config);
                setMessages(response.data);
            } catch (error) {
                console.error("Error fetching messages:", error);
                toast("An error occurred while fetching the messages", {
                    closeButton: true,
                    position: "top-right",
                    autoClose: 3000,
                    theme: "dark",
                });
            }
        };

        getMessages();
    }, []);

    return (
        <div className="flex flex-col md:gap-8 gap-0">
            <div className="font-extrabold text-white text-center pt-40 md:text-5xl text-4xl mx-8">
                See what{" "}
                <span className="bg-gradient-to-r from-[#4ca5ff] to-[#b673f8] bg-clip-text text-transparent">
                    the users have
                </span>{" "}
                to say about us !
            </div>
            <div className="py-8 pb-40 md:mx-12 mx-6 gap-8 grid md:grid-cols-2 grid-cols-1">
                {messages.map(message => (
                    <Message_list key={message._id} {...message} />
                ))}
            </div>
        </div>
    );
};

export default Message_page;
