import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
export default function MovieCity(props) {
    // console.log(props.city);
    const [city, setcity] = useState([]);
    let [isOpen, setIsOpen] = useState(false);
    const toggleIsOpen = () => {
        setIsOpen(isOpen = true);
    };
    const toggleIsClose = () => {
        setIsOpen(isOpen = false);
    };

    useEffect(() => {
        if (props.city !== "") {
            getcity();
        }
    }, [props.city]);
    function getcity() {
        setcity(citylist(1, 2, 3, 4));
    }

    function citylist(key1, key2, key3, key4) {
        return props.city.map((elm, key) => {
            return key === key1 || key === key2 || key === key3 || key === key4 ?
                <div onClick={toggleIsOpen} key={key} className="col-6 col-lg-3" style={{ fontSize: "24px" }} >
                    <Link to={"/"} >
                        <img src={require(`../../cinema_image/cinema${key + 1}.jpg`)} alt="" />
                        <p>{elm.name}</p>
                        <p>影城地址：<br />{elm.address}<br />服務專線：<br />{elm.phone}</p>
                    </Link>
                </div> : "";
        })
    }
    function changeCity(where) {
        console.log(where);
        if (where === "northern") {
            setcity(citylist(1, 2, 3, 4));
        }
        if (where === "central") {
            setcity(citylist(0, 8, 9, 10));
        }
        if (where === "south") {
            setcity(citylist(6, 7, 10, 11));
        }
    }
    return (
        <div>
            <div className="movieCity_Fr">
                <div className="movieCity">
                    <div className="movieCity_title row">
                        <div className="col"></div>
                        <div className="col-3">
                            <p>影城據點</p>
                        </div>
                        <div className="col-2">
                            <p id='movieCity_item_1' onClick={() => { changeCity("northern") }}>北部</p>
                        </div>
                        <div className="col-2">
                            <p id='movieCity_item_2' onClick={() => { changeCity("central") }}>中部</p>
                        </div>
                        <div className="col-2">
                            <p id='movieCity_item_3' onClick={() => { changeCity("south") }}>南部</p>
                        </div>
                        <div className="col"></div>
                    </div>
                    <div className="movieCity_Content row">
                        <div className="col"></div>
                        <div className="a row col-11" id="movieCity_Content_Div">
                            {city}
                        </div>
                        <div className="col"></div>
                    </div>
                </div>
            </div>
            {isOpen ?

                <div style={{
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    right: "0",
                    margin: "auto",
                    height: '100%',
                    width: '100%',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    cursor: 'pointer',
                    zIndex: "100"
                }}>


                    <button className="reactPhotosphereBtn" style={{ position: "absolute", top: "40px", right: "5%" }} onClick={toggleIsClose}>
                        <IoCloseCircleSharp style={{ fontSize: "60px", color: "white" }}></IoCloseCircleSharp>
                    </button>

                    {/* <iframe loading="lazy" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDBYq8bMBrFVpI12j1nBKHKULjSilKmLas&q=%27%27&center=37.4218,-122.0840&zoom=15"></iframe> */}

                </div>
                : null}
        </div>

    )
}