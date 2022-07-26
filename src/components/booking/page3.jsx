import { Link } from "react-router-dom";
import { useState } from "react";
import List from "./list";
export default function Page2(props){
    console.log(props);
    console.log(props.ticket);
    const [count,setcount] = useState(0);
    const [seatCH,setseatCH] = useState("");
    let seatName="";
    props.screen.map((elm) => {
        return elm.cinemasName === props.cinema &&
            elm.categorysName === props.categorysName &&
            elm.movieName_CN === props.movieName &&
            elm.show_date === props.date &&
            elm.show_time === props.time?
            props.ticket.map((elm1)=>{
                return elm1.screen_id === elm.screen_id ? seatName = elm1.seat_name
                :"";
            })
            :"";
    });
    console.log(seatName);
    let set = [];
    for(var a = 0;a < 6;a++){
        for(var b = 1; b < 21;b++){
            if(a === 0){
                set.push(`A${b}`);
            }
            if(a === 1){
                set.push(`B${b}`);
            }
            if(a === 2){
                set.push(`C${b}`);
            }
            if(a === 3){
                set.push(`D${b}`);
            }
            if(a === 4){
                set.push(`E${b}`);
            }
            if(a === 5){
                set.push(`F${b}`);
            }
        }
    }
    
    let seat = set.map((elm,key)=>
    seatName.includes(elm)?<button  key={key} value={elm} style={{backgroundColor:"rgb(216, 91, 91)",pointerEvents:"none",margin:`${key === 4 || key === 14 || key === 24 || key ===34 || key === 44 || key === 54 || key === 64 || key === 74 || key === 84 || key === 94 || key === 104 || key === 114?"0 70px 15px 0":"0 10px 15px 0"}`,width:"37px",height:"37px",border:"0",color:"white"}} onClick={(e)=>{changeSeat(e)}}>{elm}</button>
           :<button style={{backgroundColor:"rgb(161, 159, 159)",margin:`${key === 4 || key === 14 || key === 24 || key ===34 || key === 44 || key === 54 || key === 64 || key === 74 || key === 84 || key === 94 || key === 104 || key === 114?"0 70px 15px 0":"0 10px 15px 0"}`,width:"37px",height:"37px",border:"0",color:"white"}} key={key} value={elm} onClick={(e)=>{changeSeat(e)}}>{elm}</button>
    )
    function changeSeat(e){
        console.log(e.target.value);
        if(e.target.style.backgroundColor !== "rgb(216, 91, 91)" && !seatName.includes(e.target.value)){
            if(e.target.style.backgroundColor === "rgb(253, 186, 0)"){
                setcount(x => x - 1);
                setseatCH(seatCH.filter(x=>x!==e.target.value));
                e.target.style.backgroundColor = "rgb(161, 159, 159)";
            }else if(count < props.number && e.target.style.backgroundColor === "rgb(161, 159, 159)"){
                setcount(x => x + 1);
                setseatCH(x=>[...x,e.target.value]);
                e.target.style.backgroundColor="rgb(253, 186, 0)";
            }
        }
    }
    // console.log(count,props.number);
    // console.log(seatCH);
    return(
        <div style={{height:"600px"}}>
            <div style={{width:"65%"}}>
            <div className="powerwidget cold-grey">
              <header>
                <h1>進行劃位</h1>
              </header>
              
            </div>
                <p style={{margin:"0 auto 50px 45%",width:"100px",fontSize:"24px"}}>電影屏幕</p>
                <div style={{margin:"0 0 0 10px",width:"100%"}}>
                    {seat?seat:""}
                </div>
                
                <p style={{fontSize:"24px"}}>已選擇{count}張/剩餘{props.number-count}張</p>
                <footer>
                    <Link to={`../booking/page1`} style={{color:"black"}} className="btn btn-default">改選場次</Link>
                    <Link to={`../booking/page2`} style={{color:"black"}} className="btn btn-default">改選票種、張數</Link>
                    {`${count}` ===  props.number?<Link className="btn btn-info" style={{color:"black"}} to={`../booking/page4?seatName=${seatCH}`}>加點食物</Link>:<Link className="btn btn-default" style={{color:"black"}} to={`../booking/page3`}>加點食物</Link>}
                    
                </footer>
            </div>
            
            <List cinema={props.cinema} theater={props.theater} price={props.price} number={props.number} categorysName={props.categorysName} movieName={props.movieName} movieinfo={props.movieinfo} date={props.date} time={props.time} seat={seatCH} />
            
        </div>
    )
}