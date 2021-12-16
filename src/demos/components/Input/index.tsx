import {Input} from "../../../components";

export default function InputView(){
    return <div style={{margin:16}}>
        <Input onChange={(v)=>console.log(v)}/>
    </div>
}
