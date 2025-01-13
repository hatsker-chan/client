// Initial messages
const sender_name = "alex"
const class_message_sent = "message sent"
const class_message_received = "message received"

const messageList = document.getElementById('message-list');
const messageInputField = document.getElementById('messageInput');
class Message {
  constructor(sender_name, message_text, chat_id) {
      this.sender_name = sender_name
      this.message_text = message_text
      this.chat_id = chat_id
  }
}

function renderMessages(messages) {
  messageList.innerHTML = '';

  messages.forEach((message, index) => {
    const li = document.createElement('li');

    if (message.sender_name == sender_name) {
      li.className = class_message_sent
    } else {
      li.className = class_message_received
    }
    li.textContent = message.message_text
    messageList.appendChild(li);
  });
  scrollToBottom()
}

function getMessages() {
  console.log("Начало работы GET:")
  console.log("Отправка запроса")
  let messages = []
  fetch("http://localhost:8000/api/messages").then(response => {
    // Check if the response is OK
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }).then(json => {
    console.log(JSON.stringify(json));
    json.messages.forEach(item => {
      // console.log(item)
      messages.push(
        new Message(
          item.user.nickname,
          item.messageText,
          1
        )
      )
    })
    
  })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    }).finally(() => {
      console.log("Конец работы GET:")
      renderMessages(messages)
    })
}

function sendMessage() {

  
  const message_text = messageInputField.value;

  if (message_text.trim() === "") {
    alert("Please enter a message.");
    return;
}


  console.log("Начало работы POST:")
  console.log("Отправка запроса")
  fetch("http://localhost:8000/api/messages", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      user: {
        id: 1,
        nickname: sender_name
      },
      text: message_text,
      chat_id: 1
    })
  })
  .then((response) => {
    if (response.ok){
      messageInputField.value = ""
    }
    console.log(response)
  })
}

function scrollToBottom() {
  messageList.scrollTop = messageList.scrollHeight;
}

messageInputField.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the default action (new line)
      sendButton.click(); // Trigger the send button click
  }
});

getMessages()

document.getElementById('sendButton').addEventListener('click', sendMessage)


