import dotenv from 'dotenv'
dotenv.config()
import { WebSocket, WebSocketServer } from "ws";  
interface ur {
    roomId : string,
    sockets : WebSocket
}   
const sockerarr : ur [] = [];

// console.log("PORT", process.env.PORT);
//@ts-ignore
const ws = new WebSocketServer({port : process.env.PORT | 8080});

ws.on("connection", (socket) =>{
      console.log("connected"); 

      socket.on("close", () => {
        console.log("Client disconnected");
      })

     socket.on("message", (massage)=>{
        const message = massage.toString();
        console.log("Raw message received:", message);
        const parseMsg = JSON.parse(message); 
        console.log(parseMsg.type);
      

        if(parseMsg.type==='join') {
          sockerarr.push({
            sockets : socket,
            roomId : parseMsg.payload.roomId,

          })

          console.log(
            `Client joined room: ${parseMsg.payload.roomId}, total clients: ${sockerarr.length}`
        );


        }

       else  if(parseMsg.type === 'chat'){
           let room  : string | undefined; 
            let sortarr = []; 
             
            for(let i=0; i<sockerarr.length; i++){
                if(sockerarr[i].sockets ===socket){
                    room=sockerarr[i].roomId;
                    break; 
                    
                }
            }
            
            if(!room){
                socket.send("you are not part of any room");
                console.log("room nahi mila hai"); 
                return ; 
            }
            console.log(`Broadcasting message to room: ${room}`);
           
           
            for (let i = 0; i < sockerarr.length; i++) {
                if (sockerarr[i].roomId === room && sockerarr[i].sockets != socket ) {
                    sockerarr[i].sockets.send(
                        JSON.stringify({
                            type: "chat",
                            payload: { message: parseMsg.payload.message }
                        })
                    );
                    
                }
            }

        }





     })


})