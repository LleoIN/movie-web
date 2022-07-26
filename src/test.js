import { useState } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
export default function A() {
    let[url,seturl]=useState("/123");
    let temp="1";
    return (
        <div>
            <BrowserRouter>
                <button onClick={changeUrl}>b</button>
                <Link to={url}>Link</Link>
            </BrowserRouter>

        </div>

    )
    function changeUrl(){
        seturl(url+"2");
    }
}