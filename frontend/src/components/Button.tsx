 interface buttonI{
    text : string;
    onclick? : ()=>void;

 }
 
  const defaultStyle = "text-white bg-blue-500 border font-semibold rounded-xl border-4 max-w-40 max-h-20 flex items-center justify-center border-slate-900 p-6 "
 export const Button = (props : buttonI)=>{
    return <button onClick={props.onclick} className={defaultStyle}>
         {props.text}
    </button>


}

