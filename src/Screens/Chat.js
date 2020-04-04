import React, { Component } from 'react'
import M from 'materialize-css'
import "../css/chatstyle.css"
import {writeUserData, putAWatchForNewMessage} from '../Firebase/database'
import {database} from '../Firebase/database'

export default class Chat extends Component {
    constructor(props){
        super(props);
        this.state = {uid : this.props.uid, msgs: []}
    }
    componentWillMount() {
        let msgs;
        database.ref('Users/' + this.props.uid).on("value", function(dataSnapshot) {
            msgs = [];
            console.log(dataSnapshot.val());
            let data = dataSnapshot.val();
          if(data){
            Object.keys(data).forEach((msg, value) => {
                console.log('Message ID',data[msg].uid,'Own id',this.state.uid)
              if(data[msg].uid === this.state.uid)  data[msg].self = true;
              else data[msg].self = false;
              msgs.push(data[msg]);  
            })
          }
          this.setState({msgs});
        }.bind(this));
      }
    componentDidMount(){
    var elems = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(elems);

    // while(element.height > )
    setTimeout(() => {
        var ul = document.getElementById("ul-msgs");
        var element = document.getElementById("chat-history");
        element.scrollTo(0, ul.childElementCount * 128 );

    }, 1000);
    // }, 100);
    }
render() {
        let { uid , name } = this.props;

       console.log("From Render ",this.state.msgs)
        return (
            <div>
                <p></p>
                  <div className="mycontainerbox clearfix">
                    <div className="chat">
                    <div className="chat-header clearfix">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />
                        
                        <div className="chat-about">
                        <div className="chat-with">Costumer Support</div>
                        </div>
                        <i className="fa fa-star"></i>
                    </div> 
                    
                    <div id='chat-history' className="chat-history" style={{height: 320}}>
                        <ul id='ul-msgs'>
                            {this.state.msgs ? 
                                this.state.msgs.map((msg, key) => 
                                    <li key={key} className={msg.self ? 'clearfix' : null}>
                                        <div className={msg.self ? "message-data align-right" : 'message-data'}>
                                        <span className="message-data-time" >{msg.time}</span> &nbsp; &nbsp;
                                        <span className="message-data-name" >{name}</span> <i className="fa fa-circle me"></i>

                                        </div>
                                        <div className={msg.self ? "message other-message float-right" : 'message  my-message'}>
                                            {msg.message}
                                        {/* Hi Vincent, how are you? How is the project coming along? */}
                                        </div>
                                    </li>
                                ): null
                            }
                        
                        </ul>
                        
                    </div>
                    
                    <div className="chat-message clearfix row" style={{marginBottom: 0}}>
                        <textarea className='col s11 m11 l11' name="message-to-send" id="message-to-send" placeholder ="Type your message" rows="3"></textarea>
                                
                        {/* <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                        <i className="fa fa-file-image-o"></i> */}
                        
                        <button className='col s1 m1 l1' onClick={() => writeUserData(uid, name ,document.getElementById('message-to-send').value)} ><i className='material-icons small'>send </i></button>

                    </div> 
                    
                    </div> 
                    
                </div> 

                <script id="message-template" type="text/x-handlebars-template">
                <li className="clearfix">
                    <div className="message-data align-right">
                    <span className="message-data-time" >time, Today</span> &nbsp; &nbsp;
                    <span className="message-data-name" >Olia</span> <i className="fa fa-circle me"></i>
                    </div>
                    <div className="message other-message float-right">
                    messageOutput
                    </div>
                </li>
                </script>

                <script id="message-response-template" type="text/x-handlebars-template">
                <li>
                    <div className="message-data">
                    <span className="message-data-name">Vincent</span>
                    <span className="message-data-time">time, Today</span>
                    </div>
                    <div className="message my-message">
                    response
                    </div>
                </li>
                </script>

            </div>
        )
    }
}


const messages = [
    {
        self: true,
        content: "Hey How Are You?"
    },
    {
        self: false,
        content: "I'm great! How Are You?"
    },
    {
        self: true,
        content: "I'am good too"
    },
    {
        self: false,
        content: "Whats the plan"
    },
    {
        self: false,
        content: "Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?"
    }

]