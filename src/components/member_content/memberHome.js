import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "../../member/members.css";
import Memberlist from "./memberlist";
import MemberHome from "./memberhome/home";
import Password from "./memberhome/password";
export default function Home(props) {
    if (!sessionStorage.getItem('userInfo')) {
        document.location.href = "http://localhost:3000/login/home";
    }
    let useParam = useParams();
    // console.log(useParam);
    // console.log(props.users.user_id);
    const [usersImage, setusersImage] = useState([]);
    const [load, setload] = useState(false);
    useEffect(() => {
        if (props.users.user_id !== '') {
            getUsers();
        }
    }, [props.users.user_id]);
    console.log(sessionStorage.getItem('userInfo'));
    function getUsers() {
        axios.get(`http://localhost/icedog/ajax/Controller.php?q=${props.users.user_id}&id=userImage`, { responseType: "blob" }).then((response) => {
            if (response.data) {
                console.log(response.data.size);
                if(response.data.size !== 0){
                    setusersImage(URL.createObjectURL(response.data));
                }else{
                    setusersImage(false);
                }
                
                setload(true);
            } else {
                console.log("沒圖");
            }

        });
    }
    const Loading =
        <div className="spinner-border text-light">
            <span className="visually-hidden">Loading...</span>
        </div>;
    const member =
    <div id="all_content_Fr">
        <div id="all_content">
            <Memberlist param={"account"}/>
            <div id="content" className="tab-content">
                {load ? "" : Loading}
                {useParam.id === "home" && props.users ? <MemberHome users={props.users} image={usersImage} /> : ""}
                {useParam.id === "name" || useParam.id === "email" || useParam.id === "phone" || useParam.id === "password" ? <Password id={useParam.id} users={props.users} /> : ""}
            </div>
        </div>
    </div>;

    return (
        <div id="all">
            {sessionStorage.getItem('userInfo')?member:""}
        </div>

    )
}