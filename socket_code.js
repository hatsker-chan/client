const socket = new WebSocket('ws://localhost:8000/ws/chat');

socket.onmessage = function(event) {
    const message = JSON.parse(event.data);
    if (message.update){
      getMessages()
    }
    console.log('New message:', message);
};

socket.onopen = function() {
    console.log('WebSocket connection established');
};

socket.onclose = function() {
    console.log('WebSocket connection closed');
};