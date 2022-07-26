import Chart from 'chart.js/auto';
import { Link } from 'react-router-dom';
import './style/back_End.css';
import './style/back_End2.css';
import './style/back_End4.css';
import { useState } from 'react';
import { Home } from './BarChartHome';
import { Cinema } from './BarChartCinema';
import Salay from './Salay';
import Screen from './screening';
import { useParams } from 'react-router';
export default function Charts(props) {
    const param = useParams('');
    const [cinemaName, setcinemaName] = useState("");
    let cinema = props.cinema.map((elm, key) => <option key={key} value={elm.name}>{elm.name}</option>);
    function changeCinema(e) {
        setcinemaName(e.target.value);
    }
    let foodPrice = [24500000, 14500000, 38700000, 50000000 , 45640444];
    return (
        <div className="body" style={{ background: "white", color: "black" ,width:"100%",height:"3000px"}}>
            <div className="sideBar">
                <div>
                    <Link to={"/chart/home"}>影城營業狀況</Link>
                    <Link to={"/chart/cinema"}>影城電影銷售狀況</Link>
                    <Link to={"/chart/screen"}>場次編輯</Link>
                </div>
            </div>
            <div className="right_Side" style={{padding:"100px 0 2000px 0"}}>
               
                <div className="title" >
                    <p style={{ fontSize: '40px',fontWeight: '800',margin:'0px 0px 50px 100px',letterSpacing: '5px',color:"black"}}>{param.id === 'home'?'各電影銷售狀況':param.id === 'cinema'?'影城各電影銷售狀況':param.id === 'screen'?'場次編輯':""}</p>
                </div>
                {param.id === 'home' ?
                    <div className="chart_item1" style={{ margin: "20px auto" , width:"1200px", height:"700px"}}>
                        <Home param={'salayAll'} foodPrice={foodPrice} cinema={props.cinema} movie={props.movie} screen={props.screen} ticket={props.ticket} />
                    </div>
                    : ""}
                {param.id === 'home' ?
                    <div className="chart_item1" style={{ margin: "20px auto" , width:"1200px", height:"700px"}}>
                        <Home param={'ticketNum'} cinema={props.cinema} movie={props.movie} screen={props.screen} ticket={props.ticket} />
                    </div>
                    : ""}
                {param.id === 'home' ?
                    <div className="chart_item1" style={{ margin: "20px auto" , width:"1200px", height:"700px"}}>
                        <Home param={'foodSalay'} foodPrice={foodPrice} cinema={props.cinema} movie={props.movie} screen={props.screen} ticket={props.ticket} />
                    </div>
                    : ""}
                {param.id === 'cinema' ?
                    <div className="chart_Btn">
                        <select style={{width:"120px",height:"30px",margin:"10px 31px",fontSize:"20px"}} onChange={(e) => {changeCinema(e)}}>
                            <option value="">選擇影廳</option>
                            {cinema ? cinema : ""}
                        </select>
                    </div>
                    : ""}

                {param.id === 'cinema' ?
                    <div className="chart_item1" style={{ margin: "0 auto",width:"1500px" , height:"1000px"}}>
                        <Cinema param={param.id} cinemaName={cinemaName} movie={props.movie} screen={props.screen} ticket={props.ticket} />
                    </div>
                    : ""}
                {param.id === 'screen' ? <Screen movie={props.movie} cinema={props.cinema} screen={props.screen} ticket={props.ticket} /> : ""}
            </div>
        </div>
    )
}