 export const  idgen= ()=>{
const a= "123456789";
const b=a.length;
let c ="";
for(let i =0; i<4; i++){
    c+=a[Math.floor(b*Math.random())];
    
}
return c; 

}
