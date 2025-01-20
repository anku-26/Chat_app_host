import { useWebSocket } from "../utility/WebSocketContext";
import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useNavigate } from "react-router-dom";
//@ts-ignore
import { idgen } from "../utility/randomId";

export const LandingPage = () => {
  const ws = useWebSocket(); // Get the shared WebSocket instance
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

 
  const random = () => {
    const generatedId = idgen();
    console.log(generatedId);
    setId(generatedId);
  };

  const back = () => {
    //@ts-ignore
    const inputId = inputRef.current.value;
    if (!ws) {
      console.log("WebSocket not available");
      return;
    }

    ws?.send(
      JSON.stringify({
        type: "join",
        payload: { roomId: inputId },
      })
    );
    console.log("Room joined. Navigating to /chat.");
    navigate("/chat");
  };

  return (
    <div className="bg-slate-500 flex items-center justify-center h-screen w-screen">
      <div className="flex flex-col gap-4 border p-12 rounded-xl bg-black">
        
        <Input text="Enter room ID"  
         //@ts-ignore
        refe={inputRef}></Input>
        <Button text="Join Room" onclick={back}></Button>
        <Button onclick={random} text="Generate RoomId"></Button>
        {id && <div className="bg-blue-500">Your room ID is: {id}</div>}
      </div>
    </div>
  );
};
