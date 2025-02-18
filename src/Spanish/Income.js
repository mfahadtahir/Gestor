import React, { Component } from 'react';
import M from 'materialize-css';
import '../App.css'
import { Link } from 'react-router-dom';

import history from '../images/drawable/history.png';
import AddIncome from './Popup/AddIncome'
import AddDocIncome from './Popup/AddDocIncome'
import { PopupCard } from './Popup/configureCards';

class Income extends Component {
  constructor(props){
    super(props);
    let now = new Date().getMonth(), toShow;
    if(now < 3) toShow = '1T'
    else if(now < 6) toShow = '2T'
    else if(now < 9) toShow = '3T'
    else if(now < 12) toShow = '4T'
    this.state = {qtr: toShow , reupdate: 0}
  }
  componentDidMount(){
    var elems = document.querySelectorAll('.collapsible'),
      fixdbtn = document.querySelectorAll('.fixed-action-btn'),
      select = document.querySelectorAll('select');

      M.Collapsible.init(elems);
      M.FloatingActionButton.init(fixdbtn, {direction:"bottom"});
      M.FormSelect.init(select);

      document.getElementById('addIncome').style.display = 'none';      
      document.getElementById('addDocIncome').style.display = 'none';      
      // this.updateState();
    }
    // updateState(){
    //   setTimeout(() => {
    //     this.setState({reupdate: 1});
    //   }, 2000);
    // }
  
  handleClick(e,select){
    this.setState({qtr: select.value});
  }
  handleDate(){
    console.log(document.getElementById('datePicker').value);
  }
render() {
    var { userInfo, contacts} = this.props;
    var incomeData = this.props.incData;
    var d = new Date();
    var months = ["JANUARy", "FEBURARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTUBER", "NOVEMBER", "DECEMBER"];
    let result = Object.values(incomeData? incomeData : {a : []}).every(data =>{
      if(typeof(data) =="number"){
        return true
      }
      if(data.length === 0 || data === undefined ){
        return true;
      }else{
        return false;
      }
    })

  return (
    <>
    <div className="container-fluid card z-depth-1" style={styleBox.main}>
    <center>
    <AddDocIncome userInfo={userInfo} contacts={contacts} />
    <AddIncome userInfo={userInfo} contacts={contacts}/>
    </center>
      <div className="row" style={{marginBottom: 0}}>
      <h5 className="col s12 m8 l4 " style={styleBox.mainHeading}>INGRESOS NETOS <br /><span style={{color: "grey", fontSize: 20}}>{this.state.qtr} {new Date().getFullYear()}</span></h5>
      <div className="col s6 m5 l3 right" style={{textAlign: "right" ,padding: 30, paddingBottom: 0,paddingLeft: 0}}>
      <Link to='income/history'><img alt="" src={history} style={styleBox.HeaderIcons}/></Link>
          {/* <img alt="" src={mail} style={styleBox.HeaderIcons}/> */}
      </div>
      </div>
      <div className="row">
        <div className="col s12 m12 l12" style={styleBox.content}>
          {
            this.state.qtr === "1T" ?
            <QTR1 incomeData={incomeData} />:
            this.state.qtr === "2T" ?
            <QTR2 incomeData={incomeData} />:
            this.state.qtr === "3T" ?
            <QTR3 incomeData={incomeData} />:
            this.state.qtr === "4T" ?
            <QTR4 incomeData={incomeData} />:
            null

          }
          {
            !result ?  "" : 
            <div className="row" style ={{ textAlign : "center", margin : 0 }}>
            <div style={{background: "#e0e0e0", textAlign: "center", marginTop: 0, color: "grey"}}> {months[d.getMonth()]} {new Date().getFullYear()}</div>
            <h5>No se encontraron ingresos</h5>
            </div>
          }
        </div>
      </div>
    </div>
    <a onClick={()=>M.toast({html: "Sorry! This functionality is not enabled right now"})} style={{float: "right", marginRight: 30}} className="container-fluid btn-floating btn-large waves-effect waves-light white modal-trigger">
        <i style={{ color: "#1e88e5"}} className="material-icons">add</i></a>
      <a onClick={()=>PopupCard('addDocIncome', false)} style={{float: "right", marginRight: 30}} href="#addDocIncome" className="container-fluid btn-floating btn-large waves-effect waves-light white modal-trigger">
        <i style={{ color: "#1e88e5"}} className="material-icons">file_upload</i></a>
    </>
);
}
}


const Entry = (props) => {
    var {ticketNo, concept, day, date, amount, status, isDoc, docAddr} = props;
    // console.log(props);
    return (
      isDoc ?
      <li className="collection-item avatar" style={{borderRight: "none",borderLeft: "none", borderBottom: "1px solid #e0e0e0", paddingLeft: 30}}>
      <h5 style={{marginTop: 5, marginBottom: 0, padding: 3}} className="title">{concept}
        </h5>
      <p style={{color: "dimgrey", padding: 3, fontSize: 12}}> {day} , {date}</p>
      <div className="secondary-content">
        {/* <i onClick={()=>PopupCard('docPdf', docAddr)} className='material-icons' style={{color: "grey"}}>picture_as_pdf</i> */}
        <a href='#!' target='_blank' to={docAddr}>{amount} € </a>
          <i className="material-icons right" style={{color: "grey"}}>chevron_right</i>
          <br />
          {status ? 
              <span className=
              {status==="PENDING"? "badge blue": status==='REVICE'? "badge red" : "hide"} style={{color: "white", borderRadius: 4, fontSize: 9, width: 70, marginLeft: 0, }} >
                  {status}</span>
          : null}
      </div>
    </li>
      :
      <li className="collection-item avatar" style={{borderRight: "none",borderLeft: "none", borderBottom: "1px solid #e0e0e0", paddingLeft: 30}}>
        <h5 style={{marginTop: 5, marginBottom: 0, padding: 3}} className="title">{concept}</h5>
        <p style={{color: "dimgrey", padding: 3, fontSize: 12}}> {day} , {date}</p>
        <div className="secondary-content">{amount}€
            <i className="material-icons right" style={{color: "grey"}}>chevron_right</i>
            <br />
            {status ? 
                <span className=
                {status==="PENDING"? "badge blue": status==='REVICE'? "badge red" : "hide"} style={{color: "white", borderRadius: 4, fontSize: 9, width: 70, marginLeft: 0, }} >
                    {status}</span>
            : null}
        </div>
      </li>
    )
}
const Month = (props) => {
  if(props.incomeData==null) return null;
  if(props.incomeData[props.mon].length === 0) return null;
  let usrs = props.incomeData[props.mon];
  usrs.sort((i,iPlus) => i.date - iPlus.date);
  return (
    <>
    <div style={{background: "#e0e0e0", textAlign: "center", marginTop: 0, color: "grey"}}> {props.mon} {props.incomeData.year}</div>
      <div>

      <ul className="collection" style={{margin: 0}}>
        {usrs.map((entry, key) => 
          <Link to={"income/recipt/" + entry.ticketNo } key={key}>
            <Entry ticketNo={entry.ticketNo}  concept={entry.concept} day={entry.day} date={entry.date} amount={entry.amount}  status={entry.status} isDoc={entry.isDoc} docAddr={entry.docAddr}/>
          </Link>
        )}
      </ul>
      </div>
      </>
  )
}

const QTR1 = (props) => {

  return (
    <>
    <Month incomeData={props.incomeData} mon="JANUARY"/>
    <Month incomeData={props.incomeData} mon="FEBRUARY"/>
    <Month incomeData={props.incomeData} mon="MARCH"/>
    </>
  )
}
const QTR2 = (props) => {

  return (
    <>
    <Month incomeData={props.incomeData} mon="APRIL"/>
    <Month incomeData={props.incomeData} mon="MAY"/>
    <Month incomeData={props.incomeData} mon="JUNE"/>
    </>
  )
}
const QTR3 = (props) => {

  return (
    <>
    <Month incomeData={props.incomeData} mon="JULY"/>
    <Month incomeData={props.incomeData} mon="AUGUST"/>
    <Month incomeData={props.incomeData} mon="SEPTEMBER"/>
    </>
  )
}
const QTR4 = (props) => {

  return (
    <>
    <Month incomeData={props.incomeData} mon="OCTUBER"/>
    <Month incomeData={props.incomeData} mon="NOVEMBER"/>
    <Month incomeData={props.incomeData} mon="DECEMBER"/>
    </>
  )
}

const styleBox = {
  main: {
    margin: 30,
    borderRadius: 10,
    minHeight: 500,
    color: "#1e88e5",
    boxShadow:"0px 1px 2px 2px #ceeef2",
    zIndex: 0,

  },
  mainHeading: {
    marginBottom: 0,
    marginTop: 0,
    padding: 30,
    paddingBottom: 0,
    color: "#1e88e5",
    fontWeight :"bold"
  },
  HeaderIcons: {
    width: 30,
    height: 30,
    marginRight: 20
},
  inputDiv: {
    background: "#F2F0EC",
    borderRadius: 200,
    paddingLeft: 15,
    marginTop: 30,
  },
  content: {
    padding: 10,
  },
  Ul: {
    borderRight: "none",
    borderLeft: "none",
    boxShadow: "none"
  }
  }

export default Income;
