import axios from "axios";
import "../../register.css";

export default function Register(){

    
    function registerOk(e){
        e.preventDefault();
        let all = document.querySelectorAll("#loginSection input");
        let arr = [];
        all.forEach((elm)=>{
            // console.log(elm.value);
            arr.push(elm.value);
        })
        axios.get(`http://localhost/icedog/ajax/Controller.php?q=${arr}&id=register`).then((response) => {
            if(response.data){
            //   console.log(response.data);
              document.location.href = "http://localhost:3000/login/home";
            }
        });
    }
    function formReset(e){
        e.preventDefault();
        document.getElementById("registerBlock").reset();
    }
    if(sessionStorage.getItem('userInfo')){
        document.location.href = "http://localhost:3000/";
    }
    return(
        <div id="loginSection" style={{background:"black"}}>
        {/* <img src="../../image/movie_image/movie18.jpg" alt=""> */}
        {/* {!sessionStorage.getItem('userInfo')?register:""} */}
        <div className="color"></div>
        <div className="color"></div>
        <div className="color"></div>
        <div className="box">
            <div className="conta"  style={{top:"0"}}>
                <div className="form">
                    <h2 style={{margin:"0 0 60px 0"}}>註冊</h2>
                    <form>
                        <div className="inputBox">
                            <input type="text" placeholder="帳號" value="asd123"/>
                        </div>
                        <div className="inputBox">
                            <input type="password" placeholder="密碼" value="asd456"/>
                        </div>
                        <div className="inputBox">
                            <input type="text" placeholder="姓" value="離"/>
                        </div>
                        <div className="inputBox">
                            <input type="text" placeholder="名"value="輝成" />
                        </div>
                        <div className="inputBox">
                            <input type="text" placeholder="信箱" value="asd123@gmail.com"/>
                        </div>
                        <div className="inputBox">
                            <input type="text" placeholder="電話" value="0912548723"/>
                        </div>
                        <div className="inputBox">
                            <button type="submit" onClick={(e)=>{registerOk(e)}}>註冊</button>
                            <button style={{margin:"0 0 0 75px"}} onClick={(e)=>{formReset(e)}}>重設</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}