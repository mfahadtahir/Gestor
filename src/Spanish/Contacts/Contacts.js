import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import M from 'materialize-css';

class Contacts extends Component {
componentDidMount(){
    var elems = document.querySelectorAll('.collapsible');
    var fixdbtn = document.querySelectorAll('.fixed-action-btn');
    
    M.Collapsible.init(elems);
    M.FloatingActionButton.init(fixdbtn, {direction:"bottom"});
}
render() {
    var {contacts} = this.props;
  return (
    <>
    <div className="container-fluid card z-depth-1" style={styleBox.main}>
    <h4 className="col s12 m12 l12 " style={styleBox.mainHeading}>Clientes</h4>
      <div className="row">
        <div className="col s12 m12 l12" style={styleBox.content}>
          <ul className="collapsible" style={styleBox.Ul}>
            {
              contacts?
              contacts.map((contact,key) => <Contact data={contact} key={key}/>): null
            }
            {
              (this.props.contacts && this.props.contacts.length) ?  "" : 
              <div className="row" style ={{ textAlign : "center", margin : 0 }}>
                <h5>NO HAY CLIENTES ENCONTRADOS</h5>
              </div>
            }
          </ul>
        </div>
      </div>
    </div>
    <div className="container-fluid" style={{margin:30  }}>
      <Link to="/es/home/contacts/newContact">
        <a style={{float: "right"}} href="#!" className="btn-floating btn-large waves-effect waves-light blue">
          <i className="material-icons">add</i></a>
      </Link>
    </div>
      </>
    )
  }
}


const Contact = (props) => {
  var contact = props.data;
    return (
        <li>
          <div className="collapsible-header" style={{ width:"100%" }}>
              <div style={{ width : "90%" }}>
              {props.data.name}
              </div>
              <i className="material-icons" style={{alignContent : "center"}}>chevron_right</i>
          </div>
          <div className="container-fluid collapsible-body">
            <div className='row'>
              <div className='col s6 m6 l3' style={{color: "dimgrey"}}>
                <p style={{ fontWeight : "bold" }}>Name : </p>
                <p style={{ fontWeight : "bold" }}>NIF : </p>
                <p style={{ fontWeight : "bold" }}>Email : </p>
                <p style={{ fontWeight : "bold" }}>Address : </p>
              </div>
              <div className='col s6 m6 l3' >
                <p>{contact.name}</p>
                <p>{contact.nif}</p>
                <p>{contact.email}</p>
                <p>{contact.address}</p>
              </div>
              <div className='col s6 m6 l3' style={{color: "dimgrey"}}>
                <p style={{ fontWeight : "bold" }}>City : </p>
                <p style={{ fontWeight : "bold" }}>Province : </p>
                <p style={{ fontWeight : "bold" }}>Country : </p>
                <p style={{ fontWeight : "bold" }}>Postal Code :</p>
              </div>
              <div className='col s6 m6 l3' >
                <p>{contact.city}</p>
                <p>{contact.province}</p>
                <p>{contact.country}</p>
                <p>{contact.pcode}</p>
              </div>
            </div>
          </div>
        </li>
    )
}

const styleBox = {
  main: {
    margin: 30,
    borderRadius: 10,
    minHeight: 500,
    padding: 30,
    color: "#1e88e5",
    boxShadow:"0px 1px 2px 2px #ceeef2"
  },
  mainHeading: {
    marginBottom: 0,
    fontWeight: "bold"
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
export default Contacts;
