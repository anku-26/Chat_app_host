interface ch {
    text : string
}


export const Chatbutton = (props:ch)=>{
    const defaultStyle = "text-white bg-blue-500 border font-medium rounded-xl border-4  flex items-center justify-center border-slate-900 p-2 "

    return <button className={defaultStyle}> {props.text}</button>


}