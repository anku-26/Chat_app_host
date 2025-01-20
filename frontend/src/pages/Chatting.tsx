
import { useWebSocket } from "../utility/WebSocketContext";
import { useRef, useState, useEffect } from "react";


export const Chatting = () => {
  const ws = useWebSocket(); // Get the shared WebSocket instance
  const inputRef = useRef();
  const [messages, setMessages] = useState<string[]>(["Hello from server!"]);

  useEffect(() => {
    if (!ws) return;
        
    // Listen to messages from the server
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data); // Parse incoming JSON
  
        if (data.type === "chat" && data.payload?.message) {
          setMessages((prev) => [...prev, `Server: ${data.payload.message}`]);
        }
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    };

  
    return () => {
      console.log("Leaving Chatting page.");
    };
  }, [ws]);



  useEffect(() => {
    const clearMessagesInterval = setInterval(() => {
      setMessages([]);
      console.log("Chat cleared after 5 minutes.");
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    return () => clearInterval(clearMessagesInterval); // Cleanup interval on unmount
  }, []);

  

  const sendMessage = () => {
   // @ts-ignore
    if (inputRef.current?.value && ws) {
      //@ts-ignore
      const message = inputRef.current.value;

      // Add the sender's message to the messages array
      setMessages((prev) => [...prev, `You: ${message}`]);

      // Send the message to the server
      ws.send(
        JSON.stringify({
          type: "chat",
          payload: { message },
        })
      );
      // Clear the input field
      // @ts-ignore
      inputRef.current.value = "";
    }
  };
  return (
    <div className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 h-screen flex justify-center items-center">
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 h-96 w-96 rounded-md flex flex-col justify-between p-4">
        {/* Messages Section */}
        <div className="flex-grow overflow-y-auto">
        {messages.map((msg, index) => (
  <div
    key={index}
    className="p-2 mb-4 rounded-xl  text-white text-lg font-semibold shadow-lg transform transition duration-300    bg-gradient-to-r from-emerald-500 to-emerald-900"
  >
    {msg}
  </div>
))}

        </div>
  
        {/* Input and Button Section */}
        <div className="flex items-center gap-2">
          <input   
          // @ts-ignore
            ref={inputRef}
            className="flex-grow px-4 py-2 border rounded-lg   focus:outline-none    text-black text-md font-semibold shadow-lg  bg-gradient-to-r from-slate-300 to-slate-500"
            placeholder="Type a message"
          />
          <button
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg transform 
            transition-transform duration-300 hover:scale-105 hover:from-purple-600 hover:to-blue-500 focus:outline-none focus:ring-4 
            focus:ring-purple-300" onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
  
  


         
  
};
