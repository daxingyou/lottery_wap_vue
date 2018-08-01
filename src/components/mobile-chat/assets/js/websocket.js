import eventBus from '@/assets/js/event-bus';

export default (data) => {
    // console.log(data);

    var websocket,
        initiateWebsocket = () => {
            webSocketConnect();
            websocketEvets();
        },
        websocketEvets = () => {
            eventBus.$on('websocket:send', websocketSend);
            eventBus.$on('websocket:close', websocketClose);
            eventBus.$on('websocket:reconnect', () => {
                setTimeout(webSocketConnect, 500);
            });
        },
        webSocketConnect = () => {
            websocket = new WebSocket((
                (!data.chat_isTest)
                    ? `wss://${data.chat_domain}/wss`
                        : `ws://${data.chat_domain}:999`
            ));

            websocket.onopen = () => {
                var dataDetails = {
                        type: 'login',
                        username: data.logInDetails.chat_username,
                        o_id: data.logInDetails.chat_oID,
                        website_code: data.logInDetails.chat_websiteCode,
                        website_url: (window.location.origin) ? window.location.origin : data.website_origin
                    },
                    messageDataDetails = JSON.stringify(dataDetails);

                // console.log('WebSocket Log-in Details:', dataDetails);

                websocketSend(messageDataDetails);
            };

            websocket.onmessage = (message) => {
                var messageDetails = JSON.parse(message.data);
                console.log(messageDetails);

                switch(messageDetails.type) {
                    case 'success':
                        eventBus.$emit('websocket:success', messageDetails);
                        break;

                    case 'active_users':
                        break;

                    case 'transaction':
                        break;
                    
                    case 'history':
                        eventBus.$emit('websocket:history', messageDetails);
                        break;

                    case 'msg':
                    case 'img':
                        eventBus.$emit('websocket:(msg,img)', messageDetails);
                        break;
                        
                    case 'msg_status':
                    case 'img_status':
                        eventBus.$emit('websocket:(msg_status,img_status)', messageDetails);
                        break;
                        
                    case 'delete_messages':
                    case 'delete_messages_status':
                        eventBus.$emit('websocket:(delete_messages,delete_messages_status)', messageDetails);
                        break;
                }
            };

            websocket.onclose = () => {
                console.log("WebSocket Close!");
            };

            websocket.onerror = function() {
                console.log('WebSocket Error!');

                // Reconnect
                eventBus.$emit('websocket:reconnect');
            }
        },
        websocketSend = (messageDataDetails) => {
            try {
                websocket.send(messageDataDetails);
            } catch(error) {
                throw error;
            }
        },
        websocketClose = () => {
            try {
                websocket.close(1000);
            } catch(error) {
                throw error;
            }
        };

    initiateWebsocket();

    return websocket;
};