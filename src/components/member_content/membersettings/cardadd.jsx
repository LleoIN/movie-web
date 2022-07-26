import axios from "axios";
import { useState } from "react";
export default function Cardadd(props){
    const [bankName,setbankName] = useState("中國信託");
    const [cardName,setcardName] = useState("1585 8954 7790 5600");
    const [cardDate,setcardDate] = useState("2026/07");
    const [userName,setuserName] = useState("chen");

    console.log(props.users);
    function inputcontent(e){
        console.log(e.target.className,e.target.value);
        if(e.target.className === "form-control bankName"){
            console.log(123);
            setbankName(e.target.value);
        }
        if(e.target.className === "form-control cardName"){
            let a = Array.from(e.target.value.split(" ").join(""));
            let j = 4;
            for (var i = 0; i < a.length; i++) {
                if (i === j) {
                    j += 5;
                    a.splice(i, 0, " ");
                }
            }
            var b = a.join("");
            e.target.value = b;
            setcardName(e.target.value);
        }
        if(e.target.className === "form-control cardDate"){
            let a = Array.from(e.target.value.split("/").join(""));
            let q = 4;
            for (var c = 0; c < a.length; c++) {
                if (c === q) {
                    q += 5;
                    a.splice(c, 0, "/");
                }
            }
            var d = a.join("");
            e.target.value = d;
            setcardDate(e.target.value);
        }
        if(e.target.className === "form-control safePassword"){
            console.log(123);
        }
        if(e.target.className === "form-control userName"){
            console.log(123);
            setuserName(e.target.value);
        }
    }

    function Prevent(e){
        if(e.key === "Enter"){
            e.preventDefault();
        }
    }

    function submit(e){
        e.preventDefault();
        console.log(bankName,cardName,cardDate,userName);
        var arr = Array.from(cardDate);
        console.log(arr.slice(0,4).join("") , arr.slice(5,7).join(""));
        let all = [bankName,cardName,arr.slice(0,4).join(""),arr.slice(5,7).join(""),userName,props.users.user_id];
        console.log(all);
        axios.get(`http://localhost/icedog/ajax/Controller.php?q=${all}&id=card_add`).then((response) => {
            console.log(response.data);
            if(response.data){
                document.location.href = "http://localhost:3000/user/settings/cards";
            }
        });
    }

    return(
        <form className="credit_form" style={{color:"black",width:"80%",margin:"0 auto",marginTop:"35px"}}>
        <div className="form-group">
            <label htmlFor="exampleInputEmail1" style={{fontSize:"20px"}}>銀行名稱</label>
            <input style={{width:"50%"}} type="text" autoComplete="off" onChange={(e)=>{inputcontent(e)}} onKeyDown={(e)=>{Prevent(e)}} placeholder="中國信託" className="form-control bankName" value="中國信託" />
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputEmail1" style={{fontSize:"20px"}}>信用卡號碼</label>
            <input style={{width:"50%"}} type="text" autoComplete="off" maxLength={19} onChange={(e)=>{inputcontent(e)}} onKeyDown={(e)=>{Prevent(e)}} placeholder="1234 1234 1234 1234" className="form-control cardName" value="1585 8954 7790 5600" />
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputPassword1" style={{fontSize:"20px"}}>信用卡到期日</label>
            <input style={{width:"20%"}} type="text" autoComplete="off" maxLength={7} onChange={(e)=>{inputcontent(e)}} onKeyDown={(e)=>{Prevent(e)}} placeholder="MM/YY" className="form-control cardDate" value="2026/07"/>
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputPassword1" style={{fontSize:"20px"}}>安全驗證碼</label>
            <input style={{width:"13%"}} type="text" autoComplete="off" maxLength={3} onChange={(e)=>{inputcontent(e)}} onKeyDown={(e)=>{Prevent(e)}} placeholder="XXX" className="form-control safePassword" value="123" />
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputPassword1" style={{fontSize:"20px"}}>持卡名字</label>
            <input style={{width:"50%"}} type="text" autoComplete="off"  placeholder="持卡名字" onChange={(e)=>{inputcontent(e)}} onKeyDown={(e)=>{Prevent(e)}} className="form-control userName" value="chen" />
        </div>
        <button type="submit" onClick={(e)=>{submit(e)}} className="credit_btn btn-primary">確認</button>
    </form>
    )
}