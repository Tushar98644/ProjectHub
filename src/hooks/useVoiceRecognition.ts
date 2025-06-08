import { useState } from "react";

export const useVoiceRecognition = (onResult: (text: string) => void) => {
    const [isListening, setIsListening] = useState(false);

    const startListening = () => {
        if (!("webkitSpeechRecognition" in window)) {
            alert(
                "Speech recognition not supported in this browser. Try Chrome."
            );
            return;
        }
        setIsListening(true);
        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onresult = (event: {
            results: { transcript: any }[][];
        }) => {
            const transcript = event.results[0][0].transcript;
            onResult(transcript);
            setIsListening(false);
        };
        recognition.onerror = (event: { error: any }) => {
            console.error("Speech recognition error:", event.error);
            alert(`Speech recognition error: ${event.error}`);
            setIsListening(false);
        };
        recognition.onend = () => {
            setIsListening(false);
        };
        recognition.start();
    };

    return { isListening, startListening };
};
