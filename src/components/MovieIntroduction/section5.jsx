import { useState, useEffect, useCallback } from "react";
import { parsePath, useParams } from "react-router-dom";
// import MovieSeat from "./movieSeat.jsx";
import "./moviecss/movieSeat.css"
import PhotoSphere from "./photosphere";
import { Link } from 'react-router-dom';
import { IoChevronForward } from "react-icons/io5";
export default function Section5(props) {
    let tempSele = "";
    let arrE = ["A", "B", "C", "D", "E", "F"];
    let count = 0;
    let date = [];
    let time = [];

    let [srceen, setsrceen] = useState("");
    let [src, setsrc] = useState("");
    let [seatdate, setseatdate] = useState("");
    let [seleMovieType, setseleMovieType] = useState("");
    let [seleTheater, setseleTheater] = useState("");
    let [seleTime, setseleTime] = useState("");
    let [seleSeat, setseleSeat] = useState("");

    const [firstdate, setfirstdate] = useState('');
    useEffect(() => {

        if (window.location.href.indexOf('?') !== -1) {
            let get = parsePath(window.location.href.split('?')[1]);
            // console.log(get);
            let arr = get.pathname.split('&');
            // console.log(arr);
            let list = arr.reduce((tar, key) => {
                // console.log(tar);
                let dec = key.split('=');
                tar[dec[0]] = decodeURI(dec[1]);
                return tar;
            }, {});
            // console.log(list);
            if (list.date !== "" && list.date !== undefined) {
                // console.log(list.date);
                setfirstdate(list.date);
            }
        }
        changeDate(srceen, seatdate);


    }, [srceen, , props.movie, seatdate]);

    useEffect(()=>{ 
        let movieCollapseAll = document.querySelectorAll(`.movieTimeSection .movieCollapse`);
        movieCollapseAll.forEach((elm) => {
            elm.style.display = "none";
        })
    },[props.movie]);

    // console.log(props);
    let option = props.screen.map((elm, key) => {
        if (props.movie.name_CN === elm.movieName_CN) {
            if (!date.includes(elm.show_date)) {
                count = 1;
                date.push(elm.show_date);
                if (srceen === "" && firstdate === "") {
                    setsrceen(date[0]);
                } else if (srceen === "") {
                    setsrceen(firstdate);
                }
            } else {
                count = 2;
            };
            props.ticketall.map((elm1) => {
                if (elm1.screen_id === elm.screen_id) {
                    time.push([elm.cinemasName, elm.categorysName, elm.show_time, elm.show_date, elm1.seat_name]);

                }
            })
        }
        return props.movie.name_CN === elm.movieName_CN && count === 1 ?
            firstdate !== elm.show_date ? <option key={key} value={elm.show_date}>{elm.show_date}</option> : <option key={key} selected value={elm.show_date}>{elm.show_date}</option>
            : "";

    })


    // console.log(props.ticketall)



    function changeDate(date, selectBtn = "") {
        let temp = [];
        let cinemasName = "";
        let categorys = "";
        let movieData = [];

        time.map((elm) => {
            if (elm[3] === date) {
                temp.push(elm);
            }
        })
        temp.map((elm1) => {
            if (!movieData.includes(elm1[0] + elm1[1])) {
                movieData.push(elm1[0] + elm1[1]);
            }

        })
        // console.log(movieData);

        let src = movieData.map((elm1, key1) => {
            // console.log(elm1, elm2);
            cinemasName = elm1.slice(0, elm1.indexOf("店") + 1);
            categorys = elm1.slice(elm1.indexOf("店") + 1, 99);
            return (
                <div key={key1} className="movieTimeSection" style={{ color: "black" }}>
                    <div className="movieTimeLabel">
                        {cinemasName}
                    </div>
                    <div className="movieTimeBlock">
                        <div style={{ width: "300px" }}>
                            <p className="movieTimeText">({categorys}) {props.movie.name_CN}</p>
                        </div>

                        <div className="movieTimeBtnGroup">
                            {temp.map((elm3, key3) => {
                                if (elm3[0] === cinemasName && elm3[1] === categorys) {
                                    return (
                                        <button key={key3} className={`movieTimeBtn btn btn-primary `} name={`${key3}`} type="button"
                                            onClick={(e) => { collapseBtn(e, elm3) }}>
                                            {elm3[2]}
                                        </button>
                                    );
                                }
                            })}
                        </div>
                    </div>
                    <hr className="movieTimeHr" />
                    {
                        temp.map((collapseElm, collapseInx) => {
                            if (collapseElm[0] === cinemasName && collapseElm[1] === categorys) {
                                return (
                                    <div key={collapseInx} className={`card card-body movieCollapse movieCollapse${collapseInx}`} >
                                        <MovieSeatSection data={temp[collapseInx][4]} selectBtn={selectBtn}></MovieSeatSection>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            )
        })
        setsrc(src);
    }

    function getDate(e) {
        let movieCollapseAll = document.querySelectorAll(`.movieTimeSection .movieCollapse`);
        movieCollapseAll.forEach((elm) => {
            elm.style.display = "none";
        })
        setsrceen(e.target.value);
    }
    // console.log(time);


    function collapseBtn(e, data) {
        setseleTheater(data[0]);
        setseleMovieType(data[1]);
        setseleTime(data[2]);
        console.log(data);
        let flag = false;
        setseatdate("");
        setseleSeat("");
        let collapseAll = document.querySelectorAll(`.movieTimeSection .movieCollapse`);

        collapseAll.forEach((elm) => {
            if (elm.style.display === "unset" && tempSele === e.target.name) {
                elm.style.display = "none";
                flag = true;
            }
        })
        if (flag === false) {
            tempSele = e.target.name;

            collapseAll.forEach((elm) => {
                if (elm.className.split(" ")[3] === "movieCollapse" + e.target.name) {
                    elm.style.display = "unset";
                } else {
                    elm.style.display = "none";
                }
            })
        }
    }

    // |||||||||||||||

    function MovieSeatSection(data) {
        return (
            <div id="movieSeatSection">
                <div id="movieSeatScreen">銀幕</div>
                <div>
                    <PhotoSphere></PhotoSphere>
                    <p style={{ textAlign: "center", height: "30px", marginTop: "10px", fontSize: "23px", fontWeight: "bold",color:"white" }}>{seleSeat}</p>
                </div>

                <div className="movieSeatBlock">
                    <SeatBlock data={data}></SeatBlock>
                </div>
                <div className="movieSeatBlock">
                    <SeatBlockBottom data={data} ></SeatBlockBottom>
                </div>
                {/* <div id="movieSeatBuy"  >
                    <Link className="movieSeatBuyLink" to={`/booking/page1?seatdata=${seatdate}&movie=${props.movie.name_CN}&type=${seleMovieType}&theater=${seleTheater}&time=${seleTime}&date=${srceen}`}  >
                        訂票
                    </Link>
                    
                </div>
                <div className="movieSeatBuyShadow"></div> */}
            </div>
        )
    }
    // function movieSeatBuyOver(){
    //     let temp=document.querySelectorAll(".movieSeatBuyShadow");
    //     temp.forEach((elm)=>{
    //         elm.style.display="none";
    //         // elm.style.backgroundColor="rgb(155, 151, 151)";
    //         // elm.style.height="30px";
    //         // elm.style.width="30px";
    //         // elm.style.position="relative";
    //         // elm.style.zIndex="5"
    //         // console.log(elm.style.display)
    //     })      
    // }
    // function movieSeatBuyLeave(){
    //     let temp=document.querySelectorAll(".movieSeatBuyShadow");
    //     temp.forEach((elm)=>{
    //         elm.style.display="unset";
    //     })   
    // }
    function SeatBlock(data) {
        let temp = arrE.slice(0, 3);
        return (
            <div className="btnGroup">
                {temp.map((elm, index) => {
                    return (
                        <BtnGroup key={index} seatNumber={elm} data={data}></BtnGroup>
                    )
                })}
            </div>
        )
    }
    function SeatBlockBottom(data) {
        let temp = arrE.slice(3, 6);
        return (
            <div className="btnGroup">
                {temp.map((elm, index) => {
                    return (
                        <BtnGroup key={index} seatNumber={elm} data={data}></BtnGroup>
                    )
                })}
            </div>
        )
    }
    function BtnGroup(props) {
        let arrN = [];
        for (var x = 1; x <= 20; x++) {
            arrN.push(x);
        }
        let dataTemp = props.data.data.data + ",";
        return (
            <div className='movieSeatBtnDiv'>
                {arrN.map((elm, index) => {
                    var temp = props.seatNumber + elm;

                    if (dataTemp.search(temp + ",") !== -1) {
                        return (
                            <button style={{ backgroundColor: "rgb(216, 91, 91)", pointerEvents: "none" }} key={index} className="movieSeatBtn" name={temp} >{temp}</button>
                        )
                    }
                    if (props.data.data.selectBtn.search(temp + ",") !== -1) {
                        return (
                            <button style={{ backgroundColor: "rgb(253, 186, 0)" }} key={index} className="movieSeatBtn" name={temp} onClick={(e) => { btnClick(e) }} >{temp}</button>
                        )
                    } else {
                        return (
                            <button key={index} className="movieSeatBtn" name={temp} onClick={(e) => { btnClick(e) }} >{temp}</button>
                        )
                    }
                })}
            </div>
        )
    }


    function btnClick(e) {
        if (!e.target.style.backgroundColor) {
            e.target.style.backgroundColor = "rgb(161, 159, 159)";
        }
        if (e.target.style.backgroundColor === "rgb(161, 159, 159)") {
            e.target.style.backgroundColor = "rgb(253, 186, 0)";
            if (!seatdate.includes(e.target.innerText + ",")) {
                setseatdate(seatdate += e.target.innerText + ",");
                setseleSeat(e.target.innerText);
                console.log(seatdate);
            }
        }
        else if (e.target.style.backgroundColor === "rgb(253, 186, 0)") {
            e.target.style.backgroundColor = "rgb(161, 159, 159)";
            if (seatdate.includes(e.target.innerText)) {
                setseatdate(seatdate.replace(e.target.innerText + ",", ""));
                console.log(seatdate);
                console.log(e.target.innerText);
            }
        }
    }



    return (
        <div id="moviebackground">
            <div id="section5">
                <div id="movieTimeTop">
                    <div id="movieTimeTitleBlock">
                        {/* <IoChevronForward style={{ fontSize: "40px", position:"relative",top:"9px",color:"black" }}></IoChevronForward> */}
                        <IoChevronForward style={{ fontSize: "40px", position: "relative", top: "9px", color: "white" }}></IoChevronForward>
                        <p className="titleMovie" id="movieTimeTitle">電影時刻表</p>
                    </div>
                    <p id="movieSelectTitle">日期選擇:</p>
                    <select name="" id="movieSelect" onChange={(e) => { getDate(e) }}>
                        {option ? option : ""}
                    </select>
                </div>
            </div>   
                {src ? src : ""}
        </div>
    )

}









