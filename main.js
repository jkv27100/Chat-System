const msg_typed = document.querySelector(".type-area");
const chat_area = document.querySelector(".chat-area");


function send() {
    console.log(msg_typed.value);


chat_area.value = msg_typed.value;

}