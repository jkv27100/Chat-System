
const socket = io();
const msg = document.getElementById('typedMsg');



const send = document.getElementById('send');

const username = prompt('Enter Your Name');



socket.emit('user', username);

//message from server
socket.on('msg', data =>{
    

    outputMessage(data);

});

send.addEventListener('click', (e) => {
    e.preventDefault();
   
   socket.emit('chatMessage', msg.value);

   msg.value='';

   document.getElementById("typedMsg").focus();
  
    
});
 
//output message
function outputMessage(data){

    const div = document.createElement('div');
    div.classList.add('chatmsg','shadow','rounded');
    div.innerHTML = `${data}`;
    document.getElementById('messages').appendChild(div);
    setInterval(updateScroll(),1000);

}

//scroll
function updateScroll(){
    var element = document.getElementById("messages");
    element.scrollTop = element.scrollHeight;
}





