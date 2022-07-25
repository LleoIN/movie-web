export default function Cardcontent(props) {
    return (
        <div style={{fontSize:"20px"}}>
            <div id="credit_card" className="list-group" style={{width:"90%",margin:"0 auto",marginTop:"10px",border:"1px solid #2b0b3d"}}>
                <p id="credit_card_name" className="record-list-group-item-heading">
                    {props.card.bankName}
                </p>
                <div id="credit_card_content">
                    <div id="content_card">
                        <p>卡號 <span>{props.card.account}</span> </p>
                        <p>有效日期 <span>{props.card.year}/{props.card.month}</span></p>
                    </div>
                </div>
            </div>
        </div>

    )
}