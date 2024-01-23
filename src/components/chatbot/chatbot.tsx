'use client'
import { useState } from "react";
import { useChat } from "ai/react";
import Image from "next/image";
import { useSession } from "next-auth/react";

const Chat = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const { data: session } = useSession();

    const toggleChat = () => {
        setIsChatOpen(prevState => !prevState);
    };

    const { messages, input, handleInputChange, handleSubmit } = useChat();

    return (
        <div className="text-gray-500">
            {session && (
                <div
                    className="fixed bottom-6 right-8 md:right-20 md:bottom-16 cursor-pointer z-50"
                    onClick={toggleChat}
                >
                    <Image
                        src="/chatbot.webp"
                        alt="Chatbot Icon"
                        className="w-20 h-20"
                        width={100}
                        height={100}
                    />
                </div>
            )}
            {isChatOpen && (
                <div className="fixed bottom-24 right-7 md:right-20 md:bottom-36 z-40 md:w-96 w-80">
                    <div className="bg-white rounded-lg shadow-lg w-500 h-400 p-4">
                        <div className="h-60 overflow-y-auto whitespace-normal">
                            {messages.map(m => (
                                <div key={m.id} className="mb-2">
                                    <span className="font-bold">{m.role}:</span>
                                    <span className="ml-2">{m.content}</span>
                                </div>
                            ))}
                        </div>
                        <form className="flex mt-2" onSubmit={handleSubmit}>
                            <input
                                className="flex-1 px-2 py-1 border border-gray-300 rounded-md"
                                value={input}
                                placeholder="Ask anything..."
                                onChange={handleInputChange}
                            />
                            <button
                                type="submit"
                                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chat;
