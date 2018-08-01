<template>
  <div id="mainContent" ref="mainContent" v-bind:class="{chatToolsActive: imageViewerActive}">
    <div id="chatContent" ref="chatContent" v-bind:class="{stopScroll: imageViewerActive}">
      <div id="messagesContents" ref="messagesContents"></div>
    </div>

    <div class="loading" v-bind:class="{disable: disableLoading}">
      <div class="loadingComponents">
        <div class="loadingBackground">
          <div class="loadingBar"></div>
        </div>

        <p class="loadingText">载入中...</p>
      </div>
    </div>

    <imageViewer v-show="imageViewerActive" v-bind:imageList="imageList" v-bind:imageViewerActive="imageViewerActive" />
  </div>
</template>

<script>
  import eventBus from '@/assets/js/event-bus';
  import imageViewer from '../chatTools/imageViewer';

  export default {
    name: 'mainContent',
    props: [
      'data'
    ],
    components: {
      imageViewer
    },
    data() {
      return {
        historyPage: -1,
        firstLoad: true,
        loadedImageCount: 0,
        messageBody: {},
        adminUserList: {},
        enableDelete: {},
        imageList: [],
        touchTimeoutDuration: 500,
        firstTouchClientX: 0,
        firstTouchClientY: 0,
        historyMessageLength: 1,
        disableLoading: false,
        imageViewerActive: false,
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      }
    },
    methods: {
      initiate() {
        this.currentDate = new Date();
        this.yesterday = new Date();
        this.yesterday.setDate(this.yesterday.getDate() - 1);
        this.last7Days = new Date(new Date(this.currentDate).getTime() - (7 * 24 * 60 * 60 * 1000));
        
        this.requestData();
        this.webSocketOnMessage();
        this.events();
      },
      events() {
        this.$refs.mainContent.onclick = (event) => {
          eventBus.$emit('emoji:hide');
          eventBus.$emit('otherTools:hide');
        };

        this.$refs.mainContent.ontouchstart = (event) => {
          eventBus.$emit('emoji:hide');
          eventBus.$emit('otherTools:hide');
        };

        eventBus.$on('messageScroll:down', () => {
          setTimeout(() => {
            this.$refs.chatContent.scrollTo(0, this.$refs.chatContent.scrollHeight);
          }, 0);
        });
      },
      webSocketOnMessage() {
        // Websocket On Message

        eventBus.$on('websocket:success', (messageDetails) => {
          this.historyPage = -1;
          this.requestHistory();
        });
        
        eventBus.$on('websocket:requestHistory', (messageDetails) => {
          this.historyPage = -1;
          this.requestHistory();
        });

        eventBus.$on('websocket:history', (messageDetails) => {
          var checkStatus = setInterval(() => {
            if (this.adminUserList.status == 'ok') {
              clearInterval(checkStatus);
              this.prependMessage(messageDetails);
              this.historyMessageLength = messageDetails.message_body.length;
            }
          }, 0);
        });

        eventBus.$on('websocket:(msg,img)', (messageDetails) => {
          var checkStatus = setInterval(() => {
            if (this.adminUserList.status == 'ok') {
              clearInterval(checkStatus);
              this.appendMessage(messageDetails);
            }
          }, 0);
        });

        eventBus.$on('websocket:(msg_status,img_status)', (messageDetails) => {
          if (messageDetails.is_sent == 1) {
            var checkStatus = setInterval(() => {
              if (this.adminUserList.status == 'ok') {
                clearInterval(checkStatus);
                this.appendMessage(messageDetails);
              }
            }, 0);
          } else {
            alert(messageDetails.error_message);
          }
        });

        eventBus.$on('websocket:(delete_messages,delete_messages_status)', (messageDetails) => {
          this.deleteMessage(messageDetails);
        });
      },
      webSocketSend(messageDataDetails) {
        eventBus.$emit('websocket:send', messageDataDetails);
      },
      requestHistory() {
        if (this.historyMessageLength > 0) {
          this.historyPage++;

          var dataDetails = {
                type: 'history',
                website_code: this.data.logInDetails.chat_websiteCode,
                o_id: this.data.logInDetails.chat_oID,
                group_id: this.data.activeContactID,
                // username: '',
                page: this.historyPage
              },
              messageDataDetails = JSON.stringify(dataDetails);

            this.webSocketSend(messageDataDetails);
        }
      },
      requestData() {
        this.$http.get(`${this.data.chat_server_url}/API/user/get-admin-users`, {
          params: {
            website_code: this.data.logInDetails.chat_websiteCode
          }
        }).then(
          success => {
            // console.log(success);
            this.adminUserList = {
              userList: success.data.data,
              status: success.data.status
            };
          },
          error => {
            console.log(error);
          }
        );
      },
      appendMessage(messageData) {
        // Date When The Message Is Been Sended
        this.lastHistoryDate = new Date(messageData.date);

        // Append Message
        var messageContainer = this.renderMessage(messageData, 'appendMessage');
        this.$refs.messagesContents.appendChild(messageContainer);

        this.$refs.chatContent.scrollTo(0, this.$refs.chatContent.scrollHeight);

        // If There Is A Conversation
        if (this.$refs.messagesContents.childNodes.length > 0) {
          var noConversation = document.querySelector('.statusContainer.none');

          if (noConversation) {
            noConversation.outerHTML = '';
          }
        }
      },
      prependMessage(messageData) {
        // If No Conversation
        if (messageData.message_body.length == 0 && this.historyPage == 0) {
          // Append Log
          var messageContainer = this.renderStatus('No Conversation');
          this.$refs.messagesContents.appendChild(messageContainer);

          this.messageEvents();
          this.disableLoading = true;
          this.$refs.messagesContents.style.display = 'block';
        }
        
        if (messageData.message_body.length > 0) {
          // Date When The Message Is Been Sended
          this.lastHistoryDate = new Date(messageData.message_body[0].date);
          
          for (var i = 0; i < messageData.message_body.length; i++) {
            // Prepend Message
            var messageContainer = this.renderMessage(messageData.message_body[i], 'prependMessage');
            this.$refs.messagesContents.insertBefore(messageContainer, this.$refs.messagesContents.childNodes[0]);

            // If everything is fully loaded
            if (this.firstLoad && i == (messageData.message_body.length - 1)) {
              this.messageEvents();
              this.disableLoading = true;
              this.$refs.messagesContents.style.display = 'block';
              this.$refs.chatContent.scrollTo(0, this.$refs.chatContent.scrollHeight);
            }
          }
        }
      },
      renderMessage(messageData, type) {
        // console.log(messageData);

        // Message
        if (messageData.message_type == 'img' || messageData.message_type == 'msg' || messageData.type == 'img' ||
            messageData.type == 'msg' || messageData.type == 'msg_status' || messageData.type == 'img_status') {

          var avatarOverlay = document.createElement('div');
              avatarOverlay.classList.add('avatarOverlay');
          
          var avatar = document.createElement('div');
              avatar.classList.add('avatar');
              avatar.appendChild(avatarOverlay);

              if (this.checkIfAdmin(messageData.from)) {
                avatar.classList.add('admin');
              } else {
                avatar.classList.add('user');
              }

          var usernameTime = document.createElement('span');
              usernameTime.classList.add('usernameTime');
              usernameTime.innerHTML = `<b>VIP</b> ${((this.data.chat_websocketDetails.is_admin == 'yes') ? messageData.from : this.hideUsername(messageData.from))} ${messageData.time.substr(0, 5)}`;
          
          var arrowOverlay = document.createElement('span');
              arrowOverlay.classList.add('arrowOverlay');

          var arrow = document.createElement('span');
              arrow.classList.add('arrow');
              arrow.appendChild(arrowOverlay);

          if (messageData.message_type == 'img' || messageData.type == 'img' || messageData.type == 'img_status') {
            var loadingBar = document.createElement('div');
                loadingBar.classList.add('loadingBar');

            var loadingBackground = document.createElement('div');
                loadingBackground.classList.add('loadingBackground');
                loadingBackground.appendChild(loadingBar);

            var loadingComponents = document.createElement('div');
                loadingComponents.classList.add('loadingComponents');
                loadingComponents.appendChild(loadingBackground);

            var loading = document.createElement('div');
                loading.classList.add('loading');
                loading.appendChild(loadingComponents);

            if (messageData.caption != '') {
              var imageCaption = document.createElement('div');
                  imageCaption.classList.add('imageCaption');
                  imageCaption.innerText = messageData.caption;
            }

            // var messageContent = document.createElement('img');
            //     messageContent.classList.add('imageContent');
            //     messageContent.src = `${this.data.chat_server_url}/FILE/file-manager/view-image/?website_code=${this.data.logInDetails.chat_websiteCode}&image_code=${messageData.message_body}`;

            var renderImage = new Image();
                renderImage.classList.add('renderImage');
                renderImage.setAttribute('image_src', `${this.data.chat_server_url}/FILE/file-manager/view-image/?website_code=${this.data.logInDetails.chat_websiteCode}&image_code=${messageData.message_body}`);
                renderImage.onload = () => {
                  loading.style.visibility = 'hidden';

                  renderImage.style.display = "block";

                  if (imageCaption != undefined) imageCaption.style.display = "block";

                  messageContent.style.cssText = 'min-width: unset;' +
                                                 'min-height: unset;';

                  if (this.loadedImageCount > 0 || messageData.type == 'img_status' || type == 'appendMessage') {
                    this.loadedImageCount--;
                    this.$refs.chatContent.scrollTo(0, this.$refs.chatContent.scrollHeight);
                  }
                };

            var messageContent = document.createElement('div');
                messageContent.classList.add('imageContent');
                messageContent.appendChild(renderImage);
                if (messageData.caption != '') messageContent.appendChild(imageCaption);
                messageContent.appendChild(loading);
                
                // Add Image To The List
                this.imageList.push({
                  id: messageData.message_id,
                  url: `${this.data.chat_server_url}/FILE/file-manager/view-image/?website_code=${this.data.logInDetails.chat_websiteCode}&image_code=${messageData.message_body}`
                });
          }

          if (messageData.message_type == 'msg' || messageData.type == 'msg' || messageData.type == 'msg_status') {
            var messageContent = document.createElement('span');
                messageContent.classList.add('messageContent');
                messageContent.innerHTML = this.convertMessage(messageData.message_body);
          }

          var messageOverlay = document.createElement('div');
              messageOverlay.classList.add('messageOverlay');

          var message = document.createElement('div');
              message.classList.add('message');
              message.appendChild(messageContent);
              message.appendChild(arrow);
              message.appendChild(messageOverlay);

          var messageHotspot = document.createElement('div');
              messageHotspot.classList.add('messageHotspot');
              messageHotspot.setAttribute('message_id', messageData.message_id);
              // messageHotspot.onmousedown = this.selectMessage;
              // messageHotspot.onmouseup = this.selectMessage;
              messageHotspot.ontouchstart = this.selectMessage;
              messageHotspot.ontouchmove = this.selectMessage;
              messageHotspot.ontouchend = this.selectMessage;

          var messageContainer = document.createElement('div');
              messageContainer.classList.add('messageContainer');
              messageContainer.classList.add((
                (messageData.from == this.data.logInDetails.chat_username)
                  ? 'myMessage'
                    : 'othersMessage'
              ));
              messageContainer.setAttribute('message_id', messageData.message_id);
              messageContainer.setAttribute('selected', false);
              messageContainer.appendChild(avatar);
              messageContainer.appendChild(usernameTime);
              messageContainer.appendChild(message);
              messageContainer.appendChild(messageHotspot);
        }

        // Log
        if (messageData.message_type == 'log') {
          var messageContainer = this.renderStatus(messageData.message_body, 'log');
        }
        
        // Display Date
        var messageDataDate = new Date(messageData.date);

        if (this.lastHistoryDate.toLocaleDateString() != messageDataDate.toLocaleDateString()) {
          var date = new Date(this.lastHistoryDate),
              displayDate = '';

          if (this.currentDate.toLocaleDateString() == this.lastHistoryDate.toLocaleDateString()) {
            displayDate = 'Today';
          } else if (this.yesterday == this.lastHistoryDate.toLocaleDateString()) {
            displayDate = 'Yesterday';
          } else if (this.last7Days.getTime() < date.getTime()) {
            displayDate = this.days[date.getDay()];
          } else {
            displayDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
          }

          this.lastHistoryDate = new Date(messageData.date);
          
          // Prepend Date
          var statusContainer = this.renderStatus(displayDate, 'date');
          if (type == 'appendMessage') {
            this.$refs.messagesContents.appendChild(statusContainer);
          } else {
            this.$refs.messagesContents.insertBefore(statusContainer, this.$refs.messagesContents.childNodes[0]);
          }
        }
        
        return messageContainer;
      },
      hideUsername(username) {
        var text = username.split(''),
          positionToReplaceText = Math.round(text.length / 2);

        for (var i = 0; i < text.length; i++) {
          if (i == positionToReplaceText) {
            text[i - 1] = '*';
            text[i] = '*';
          }
        }

        return text.join('');
      },
      convertMessage(messageContent) {
        var messageContentResult = messageContent.match(/\[:.*?:\]|&NewLine;/gi);
        
        // console.log(messageContent);
        // console.log(messageContentResult);

        if (messageContentResult) {
          for (var i = 0; i < messageContentResult.length; i++) {
            var stringFound = messageContentResult[i],
                name = stringFound.substr(2, (stringFound.length - 4)),
                type = name.substr(0, 2);

            // console.log(stringFound, name, type);

            var regEx = new RegExp(name, 'gi');
            
            // For New Line
            if (stringFound == '&NewLine;') {
              messageContent = messageContent.replace('&NewLine;', '<br>');
            }
            
            // For Emoji
            if (regEx.test(this.data.emoji)) {
              var emoji = document.createElement('span');
                  emoji.classList.add('displayEmoji', 'twa', `twa-${name}`, 'twa-lg');

              messageContent = messageContent.replace(stringFound, emoji.outerHTML);
            }

            // For Sticker
            if (type == 'st') {
              name = name.replace('st', 's');

              var sticker = document.createElement('span');
                  sticker.classList.add('displaySticker', name.slice(0, 1) + this.toRomanAndToNumber(name.slice(1)));

              messageContent = messageContent.replace(stringFound, sticker.outerHTML);
            } 
          }
        }

        return messageContent;
      },
      toRomanAndToNumber(value) {
        var decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
        var roman = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];

        if (typeof value == 'number') {
          var result = '';

          for (var i = 0; i <= decimal.length; i++) {
            // looping over every element of our arrays
            while (value % decimal[i] < value) {
              // keep trying the same number until it won't fit anymore      
              result += roman[i];
              // add the matching roman number to our result string
              value -= decimal[i];
              // remove the decimal value of the roman number from our number
            }
          }
        } else if (typeof value == 'string') {
          var result = 0;

          for (var i = 0; i <= decimal.length; i++) {
            while (value.indexOf(roman[i]) === 0){
              //checking for the first characters in the string
              result += decimal[i];
              //adding the decimal value to our result counter
              value = value.replace(roman[i],'');
              //remove the matched Roman letter from the beginning
            }
          }
        }

        return result;
      },
      renderStatus(data, type) {
        var statusContainer = document.createElement('p');
            statusContainer.classList.add('statusContainer', (
              (type == 'date' || type == 'log')
                ? type
                  : 'none'
            ));
            statusContainer.innerText = data;

        return statusContainer;
      },
      checkIfAdmin(username) {
        var isAdmin = false;

        this.adminUserList.userList.forEach((value, index) => {
          if (value.username == username) {
            isAdmin = true;
          }
        });

        return isAdmin;
      },
      selectMessage(event) {
        // console.log(event);

        var message_id = event.target.getAttribute('message_id'),
            touchClientX = event.changedTouches[0].clientX,
            touchClientY = event.changedTouches[0].clientY;

        // Record The First X & Y Coordinate
        if (event.type == 'touchstart') {
          this.firstTouchClientX = touchClientX;
          this.firstTouchClientY = touchClientY;
        }
        
        // console.log(this.touchTimeoutDuration);
        // console.log('First Touch Client X:', this.firstTouchClientX, 'First Touch Client Y:', this.firstTouchClientY);
        // console.log('Touch Client X:', touchClientX, 'Touch Client Y:', touchClientY);

        if (event.type == 'touchstart' || event.type == 'touchmove' || event.type == 'mousedown') {
          if (this.firstTouchClientX == touchClientX && this.firstTouchClientY == touchClientY) {
            // Select Of Message
            if (this.data.chat_websocketDetails.is_admin == 'yes') {
              this.enableDelete = setTimeout(() => {
                  eventBus.$emit('message:select', message_id);

                  var indexOfMessage = this.data.chat_selectedMessageList.indexOf(message_id);

                  if (indexOfMessage == -1) {
                    event.target.parentElement.setAttribute('selected', (!JSON.parse(event.target.parentElement.getAttribute('selected'))));
                  } else {
                    event.target.parentElement.setAttribute('selected', (!JSON.parse(event.target.parentElement.getAttribute('selected'))));
                  }

                  this.touchTimeoutDuration = 100;
              }, this.touchTimeoutDuration);
            }
          } else {
            clearTimeout(this.enableDelete);
          }
        }

        if (event.type == 'touchend' || event.type == 'mouseup') {
          clearTimeout(this.enableDelete);

          // Activate View Image
          if (this.touchTimeoutDuration >= 500 && this.firstTouchClientX == touchClientX && this.firstTouchClientY == touchClientY) {
            this.imageList.forEach((value, index) => {
              // console.log(value, index);

              if (value.id == message_id) {
                this.imageViewerActive = true;
                eventBus.$emit('imageViewer:activate', index);
              }
            });
          }

          this.touchTimeoutDuration = (this.data.chat_selectedMessageList.length <= 0) ? 500 : 100;
        }
      },
      deleteMessage(messageData) {
        messageData.message_id.forEach((message_id, index, array) => {
          document.querySelectorAll(`[message_id='${message_id}']`).forEach((element, index, array) => {
            element.outerHTML = '';
          });

          // If No Conversation
          if (this.$refs.messagesContents.childNodes.length == 0) {
            var messageContainer = this.renderStatus('No Conversation');
            this.$refs.messagesContents.appendChild(messageContainer);
          }
        });
      },
      imageViewerDeactivate() {
        this.imageViewerActive = false;
      },
      messageEvents() {
        this.$refs.chatContent.onscroll = (event) => {
          // console.log(event);

          // If At The Top
          if (event.target.scrollTop <= 500) {
            this.requestHistory();
          }

          // If Image Is Visible
          var imageList = document.querySelectorAll('.imageContent');
              imageList.forEach((element, index, array) => {
                var scrollOffset = 150,
                    selectedElementTop = element.getBoundingClientRect().top,
                    selectedElementBottom = element.getBoundingClientRect().bottom,
                    chatContentOffsetHeight = this.$refs.chatContent.offsetHeight + scrollOffset;

                // console.log(selectedElementTop, chatContentOffsetHeight, selectedElementBottom, scrollOffset);

                if (selectedElementTop <= chatContentOffsetHeight && selectedElementBottom >= scrollOffset) {
                  if (element.childNodes.item('img').src == '') {
                    this.loadedImageCount += (this.firstLoad) ? 1 : 0;

                    element.childNodes.item('img').src = element.childNodes.item('img').getAttribute('image_src');
                  }
                }
              });

          if (this.firstLoad && this.loadedImageCount == 0) {
            this.firstLoad = false;
          }
        };

        // Deactivate Image Viewer
        eventBus.$on('imageViewer:deactivate', () => {
          this.imageViewerActive = false;
        });

        // Reset Touch Timeout Duration
        eventBus.$on('message:reset', () => {
          this.touchTimeoutDuration = 500;
        });
      }
    },
    mounted() {
      this.initiate();
    },
    beforeDestroy() {
      eventBus.$off('messageScroll:down');
      eventBus.$off('websocket:success');
      eventBus.$off('websocket:history');
      eventBus.$off('websocket:(msg,img)');
      eventBus.$off('websocket:(msg_status,img_status)');
      eventBus.$off('websocket:(delete_messages,delete_messages_status)');
      eventBus.$off('imageViewer:deactivate');
      eventBus.$off('message:reset');
    }
  }
</script>

<style lang="scss">
  #mainContent {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;

    * {
      font-size: 16px;
    }

    &.chatToolsActive {
      position: initial;
    }

    #chatContent {
      width: 100%;
      height: 100%;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      background-image: url("../assets/images/default-background.png");
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      color: #666;

      &.stopScroll {
        overflow-y: hidden;
      }

      #messagesContents {
        position: relative;
        padding: 1em;
        text-align: center;
        display: none;

        .messageContainer {
          position: relative;
          display: table;

          &.othersMessage {
            margin: 0 auto 2em 0;
            text-align: left;

            .avatar {
              left: 0;
            }

            .usernameTime {
              text-align: left;
              margin: 0.5em 0 0.5em 3.5em;
            }

            .message {
              background-color: #FFF;
              margin: 5px 0 0 50px;
              border-top-left-radius: 0;
              text-align: left;
              box-shadow: 2px 2px 10px 0px rgba(0,0,0,0.12);
              color: #000;

              .arrow {
                top: 0;
                left: -10px;
                border: 5px solid #fff;
                border-left-color: transparent;
                border-bottom-color: transparent;

                .arrowOverlay {
                  border: 5px solid rgba(0,0,0,0.5);
                  border-left-color: transparent;
                  border-bottom-color: transparent;
                }
              }

              .messageOverlay {
                border-top-left-radius: 0;
              }
            }

            &:last-child {
              margin: 0 auto 0 0;
            }
          }

          &.myMessage {
            margin: 0 0 2em auto;
            text-align: right;

            .avatar {
              right: 0;
            }

            .usernameTime {
              text-align: right;
              margin: 0.5em 3.5em 0.5em 0;
            }

            .message {
              background-color: #0086e1;
              margin: 5px 50px 0 0;
              border-top-right-radius: 0;
              text-align: left;
              box-shadow: 2px 2px 10px 0px #0086e180;
              color: #FFF;

              .arrow {
                top: 0;
                right: -10px;
                border: 5px solid #0086e1;
                border-right-color: transparent;
                border-bottom-color: transparent;

                .arrowOverlay {
                  border: 5px solid rgba(0,0,0,0.5);
                  border-right-color: transparent;
                  border-bottom-color: transparent;
                }
              }

              .messageOverlay {
                border-top-right-radius: 0;
              }
            }

            &:last-child {
              margin: 0 0 0 auto;
            }
          }

          .avatar {
            position: absolute;
            top: 0;
            width: 50px;
            height: 50px;
            background-color: #ccc;
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            border-radius: 100%;
            overflow: hidden;

            &.user {
              background-image: url("../assets/images/user.png");
            }

            &.admin {
              background-image: url("../assets/images/admin.png");
            }

            .avatarOverlay {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0,0,0,0.5);
              background-image: url("../assets/images/check.png");
              background-repeat: no-repeat;
              background-position: center;
              background-size: 70%;
              display: none;
            }
          }

          .usernameTime {
            display: block;
          }

          .message {
            max-width: 15em;
            position: relative;
            bottom: 0;
            left: 0;
            display: inline-block;
            padding: 10px;
            word-break: break-word;
            border-radius: 4px;

            .arrow {
              position: absolute;

              .arrowOverlay {
                position: absolute;
                top: -5px;
                left: -5px;
                display: none;
              }
            }

            .imageContent {
              position: relative;
              width: 100%;
              min-width: 5em;
              max-width: 12em;
              min-height: 5em;
              background-repeat: no-repeat;
              background-position: center;
              background-size: cover;
              // filter: blur(1px);

              .renderImage {
                width: 100%;
                max-width: 12em;
                vertical-align: middle;
                display: none;
              }

              .imageCaption {
                display: none;
                margin: 0.5em 0 0 0;
              }

              .loadingBackground {
                width: 1.5em;
                height: 1.5em;
                border-width: 5px;

                .loadingBar {
                  width: 1.5em;
                  height: 1.5em;
                  border-width: 5px;
                  margin: -5px -5px;
                }
              }
            }

            .messageContent {
              font-size: 18px;
              vertical-align: bottom;

              .twa-lg {
                font-size: 14px;
                vertical-align: bottom;
                margin: 0.133em 0.0665em 0.133em 0.133em;
              }
            }

            .messageOverlay {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0,0,0,0.5);
              border-radius: 4px;
              display: none;
            }
          }

          .messageHotspot {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }

          &[selected=true] {
            .avatarOverlay {
              display: block;
            }

            .messageOverlay {
              display: block;
            }
            
            &.othersMessage {
              .arrowOverlay {
                display: block;
              }
            }

            &.myMessage {
              .arrowOverlay {
                display: block;
              }
            }
          }
        }

        .statusContainer {
          display: table;
          margin: 0 auto 2em auto;
          padding: 5px 20px;
          background-color: #FFF;
          border-radius: 5px;

          &.date {
            background-color: #DDD;
          }

          &.log {
            background-color: #FFF;
          }
        }
      }
    }
  }
</style>