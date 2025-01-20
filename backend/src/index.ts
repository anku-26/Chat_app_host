import dotenv from 'dotenv'
dotenv.config()
import { WebSocket, WebSocketServer } from "ws";  
interface ur {
    roomId : string,
    sockets : WebSocket
}   
const sockerarr : ur [] = [];


//@ts-ignore
const ws = new WebSocketServer({port : process.env.PORT | 8080});

ws.on("connection", (socket) =>{
      console.log("connected"); 
       console.log(sockerarr);


      socket.on("close", () => {   
        console.log("Client disconnected");
        for (let i = 0; i < sockerarr.length; i++) {
            if (sockerarr[i].sockets === socket) {
                console.log(`Removing client from room: ${sockerarr[i].roomId}`);
                sockerarr.splice(i, 1); // Remove the client entry
                break;
            }
        }
        console.log('Total remaining clients: ' + sockerarr.length);
    });
      


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