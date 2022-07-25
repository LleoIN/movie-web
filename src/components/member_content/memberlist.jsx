import { Link } from "react-router-dom";



export default function Memberlist(props) {
  console.log(props.param);
  function list(props) {
    if (props !== "") {
      let active = props;
      return (
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav_item" style={{fontSize:"24px", letterSpacing:"3px",backgroundColor:active === "account"?"rgba(255,255,255,0.295)":"",boxShadow:active === "account"?"0 0 5px white":"",borderTop:active === "account"?"2px solid white":"",borderBottom:active === "account"?"2px solid white":""}} role="presentation">
            <Link className="" to="/user/account/home">個人資訊</Link>
          </li>
          <li className="nav_item" style={{margin:"0 0 10px 0",backgroundColor:active === "profile"?"rgba(255,255,255,0.295)":"",boxShadow:active === "profile"?"0 0 5px white":"",borderTop:active === "profile"?"2px solid white":"",borderBottom:active === "profile"?"2px solid white":""}} role="presentation">
            <Link className="nav_link" to="/user/profile/ticket">我的票夾</Link>
          </li>
          {/* <li className="nav_item" role="presentation">
            {active === "messages" ? <Link className="nav_link active" to={"/user/messages/record"}>消費紀錄</Link> : <Link className="nav_link" to={"/user/messages/record"}>消費紀錄</Link>}
          </li> */}
          <li className="nav_item" role="presentation" style={{backgroundColor:active === "settings"?"rgba(255,255,255,0.295)":"",boxShadow:active === "settings"?"0 0 5px white":"",borderTop:active === "settings"?"2px solid white":"",borderBottom:active === "settings"?"2px solid white":""}}>
            <Link className="nav_link" to="/user/settings/cards">信用卡夾</Link>
          </li>
        </ul>
      )
    }
  }
  return (
    <div> {props !== "" ? list(props.param) : ""} </div>
  )
}
