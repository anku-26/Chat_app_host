
interface Inputprops{
    text : string,
    refe? : string, 


}
const inputStyle = "text-black-700 border font-semibold rounded-xl border-4 max-w-40 max-h-14 flex items-center justify-center border-slate-900 p-6 "

 
export const Input = (props : Inputprops)=>{
    return <input ref = {props.refe} className={inputStyle} placeholder={props.text}></input>


}