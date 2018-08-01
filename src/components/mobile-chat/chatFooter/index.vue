<template>
  <div id="chatFooter" v-bind:class="{disable: disableTools}">
    <div id="mainContainer" v-bind:class="{active: activateOtherTools}">
      <div id="mainToolsHolder">
        <emoji v-bind:emojiList="data.emoji" v-bind:disableTools="disableTools"/>
        <div id="messageContent" contenteditable="false" ref="messageContent" placeholder="" v-on:click="messageContentClick" v-on:keydown="messageContentKeyDown" v-on:paste="messageContentPaste"></div>
        <div id="otherTools" v-on:click="(data.chat_selectedMessageList.length <= 0) ? showOtherTools(['sendImage']) : null"></div>
        <div id="sendButton" v-on:click="sendMessageMethod" ref="sendButton" v-bind:class="{active: activateSendButton}">发送</div>
      </div>
      <div id="othersToolsHolder" ref="othersToolsHolder">
        <div class="item sendImage" v-on:click="sendImage" v-if="/sendImage/gi.test(toolsList)">
          <div id="sendImage"></div>
          <p class="text">相片</p>
          <input id="uploadImage" type="file" name="uploadImage" ref="uploadImage" v-on:change="uploadImageChange" />
        </div>
        <div class="item takePicture" v-on:click="takePicture" v-if="/takePicture/gi.test(toolsList)">
          <div id="takePicture"></div>
          <p class="text">拍照</p>
        </div>
        <div class="item redpocket" v-on:click="redpocket" v-if="/redpocket/gi.test(toolsList)">
          <div id="redpocket"></div>
          <p class="text">红包</p>
        </div>
        <div class="item deleteMessage" v-on:click="deleteMessage" v-if="/deleteMessage/gi.test(toolsList)">
          <div id="deleteMessage"></div>
        </div>
      </div>
    </div>

    <div id="disableOverlay" v-bind:class="{disable: disableTools}"></div>
  </div>
</template>

<script>
  import eventBus from '@/assets/js/event-bus';
  import emoji from './emoji.vue';

  export default {
    name: 'chatFooter',
    props: [
      'data',
    ],
    components: {
      emoji
    },
    data() {
      return {
        disableTools: true,
        activateOtherTools: false,
        activateSendButton: false,
        toolsList: []
      }
    },
    methods: {
      initiate() {
        this.events();
      },
      events() {
        eventBus.$on('messageContent:add', this.addElementToMessageBox);

        eventBus.$on('otherTools:hide', () => {
          if (this.data.chat_selectedMessageList.length <= 0) {
            this.activateOtherTools = false;
          }
        });
      },
      messageContentClick(event) {
        if (this.data.chat_selectedMessageList.length <= 0) {
          // Disable Other Tools
          eventBus.$emit('emoji:hide');
          this.activateOtherTools = false;

          var emojiMsgLength = document.querySelectorAll('#messageContent .emoji-msg').length;

          if (emojiMsgLength >= 1) {
            this.$refs.messageContent.innerHTML += '&nbsp;';
          }

          this.placeCaretAtEnd(this.$refs.messageContent);
        }
      },
      messageContentKeyDown(event) {
        // console.log(event);

        // If Enter
        if (event.keyCode == 13) {
          event.preventDefault();
        }

        setTimeout(() => {
          if (this.data.chat_selectedMessageList.length <= 0) {
            // Disable Other Tools
            this.activateOtherTools = false;
          }

          // Activate Send Button
          if (event.target.innerHTML != '' && event.target.childNodes.length > 0 && this.data.chat_selectedMessageList.length <= 0) {
            this.activateSendButton = true;
          } else {
            this.activateSendButton = false;
          }
        }, 0);
      },
      messageContentPaste(event) {
        console.log(event);

        event.preventDefault();

        var clipboardData = event.clipboardData || window.clipboardData,
            files = clipboardData.files,
            items = clipboardData.items,
            types = clipboardData.types;

          // console.log(event);
          // console.log(clipboardData);
          // console.log('Files:', files);
          // console.log('Items:', items);
          // console.log('Type:', types);

          for (var i = 0; i < items.length; i++) {
            // console.log(items[i]);

            switch (items[i].type) {
              case 'text/plain':
                document.execCommand("insertHTML", false, event.clipboardData.getData('text/plain'));
                break;

              case 'image/png':
                uploadImagePopUp(items[i].getAsFile());
                break;
            }
          }
      },
      sendMessageMethod() {
        // console.log('Send Message.');

        if (!this.disableTools) {
          // Disable Other Tools
          if (this.data.chat_selectedMessageList.length <= 0) {
            this.activateOtherTools = false;
          }

          eventBus.$emit('emoji:hide');

          if (this.$refs.messageContent.innerHTML != '' && this.$refs.messageContent.childNodes.length > 0 && this.activateSendButton) {
            var messageContent = this.$refs.messageContent.innerHTML;
                messageContent = messageContent.replace(/<p>/gi, '');
                messageContent = messageContent.replace(/<br>/gi, '\n');
                messageContent = messageContent.replace(/<\/p>/gi, '');
                messageContent = messageContent.replace(/<span class="emoji-msg twa twa-lg twa-/gi, '[:');
                messageContent = messageContent.replace(/" contenteditable="false"><\/span>/gi, ':]');
                
            console.log(messageContent);
                
            this.websocketSendMessage({
              type: 'msg',
              content: messageContent
            });

            this.activateSendButton = false;
            this.$refs.messageContent.innerHTML = '';
            this.$refs.messageContent.click();
          }
        }
      },
      showOtherTools(toolsList) {
        // console.log('Show Other Tools.');

        eventBus.$emit('emoji:hide');
        
        if (!this.disableTools) {
          this.activateOtherTools = (this.data.chat_selectedMessageList.length > 0) ? true : !this.activateOtherTools;
          this.toolsList = toolsList;
        }
      },
      sendImage() {
        // Disable Other Tools
        this.activateOtherTools = false;

        // console.log('Send Image.');
        this.$refs.uploadImage.click();
      },
      uploadImageChange(event) {
        console.log(event);
        this.uploadImagePopUp(event.target.files[0]);
      },
      takePicture() {
        console.log('Take Picture.');
      },
      redpocket() {
        console.log('Redpocket.');
      },
      deleteMessage() {
        // console.log('Delete Message.');

        if (this.data.chat_selectedMessageList.length > 0) {
          this.websocketSendMessage({
            type: 'delete_messages',
            content: this.data.chat_selectedMessageList
          });

          eventBus.$emit('message:reset');
        }
      },
      placeCaretAtEnd(element) {
          if (typeof window.getSelection != "undefined" &&
            typeof document.createRange != "undefined") {
              var range = document.createRange();
                range.selectNodeContents(element);
                range.collapse(false);

              var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
          } else if (typeof document.body.createTextRange != "undefined") {
              var textRange = document.body.createTextRange();
                textRange.moveToElementText(element);
                textRange.collapse(false);
                textRange.select();
          }

          element.focus();

          setTimeout(() => {
            eventBus.$emit('messageScroll:down');
          }, 300);
      },
      uploadImagePopUp(file) {
        // console.log(file);

        var renderFile = new FileReader();
            renderFile.readAsDataURL(file);
            renderFile.onloadend = () => {
              var uploadImageCloseButton = document.createElement('div');
                  uploadImageCloseButton.id = 'uploadImageCloseButton';
                  uploadImageCloseButton.innerHTML = '&#10005;';
                  uploadImageCloseButton.onclick = () => {
                    this.$refs.uploadImage.value = '';
                    document.getElementById('uploadImageHolder').outerHTML = '';
                  }

              var uploadImageHeader = document.createElement('div');
                  uploadImageHeader.id = 'uploadImageHeader';
                  uploadImageHeader.innerText = '图片预览';
                  uploadImageHeader.appendChild(uploadImageCloseButton);

              var uploadImagePreview = document.createElement('div');
                  uploadImagePreview.id = 'uploadImagePreview';
                  uploadImagePreview.style.cssText = 'background-image: url("' + renderFile.result + '");';

              var uploadImageCaption = document.createElement('input');
                  uploadImageCaption.id = 'uploadImageCaption';
                  uploadImageCaption.setAttribute('placeholder', '请输入您的图片附言');
                  // uploadImageCaption.onkeydown = (event) => {
                  //   setTimeout(() => {
                  //     if (event.keyCode == 13) {
                  //       if (window.FormData) {
                  //         var formData = new FormData();
                  //             formData.append("image", file);
                  //             formData.append("caption", uploadImageCaption.value);
                  //             formData.append("website_code", this.data.logInDetails.chat_websiteCode);
                  //             this.sendImageData(formData);
                  //       }

                  //       this.$refs.uploadImage.value = '';
                  //       document.getElementById('uploadImageHolder').outerHTML = '';
                  //     }
                  //   }, 0);
                  // }

              var uploadImageButton = document.createElement('div');
                  uploadImageButton.id = 'uploadImageButton';
                  uploadImageButton.innerText = '发送';
                  uploadImageButton.onclick = () => {
                    if (window.FormData) {
                      var formData = new FormData();
                          formData.append("image", file);
                          formData.append("caption", uploadImageCaption.value);
                          formData.append("website_code", this.data.logInDetails.chat_websiteCode);
                          this.sendImageData(formData);
                    }

                    this.$refs.uploadImage.value = '';
                    document.getElementById('uploadImageHolder').outerHTML = '';
                  }

              var uploadImageSubHolder = document.createElement('div');
                  uploadImageSubHolder.id = 'uploadImageSubHolder';
                  uploadImageSubHolder.appendChild(uploadImageHeader);
                  uploadImageSubHolder.appendChild(uploadImagePreview);
                  uploadImageSubHolder.appendChild(uploadImageCaption);
                  uploadImageSubHolder.appendChild(uploadImageButton);

              var uploadImageHolder = document.createElement('div');
                  uploadImageHolder.id = 'uploadImageHolder';
                  uploadImageHolder.appendChild(uploadImageSubHolder);

              this.$refs.othersToolsHolder.appendChild(uploadImageHolder);

              uploadImageCaption.focus();
            }
      },
      sendImageData(formData) {
        this.$http.post(`${this.data.chat_server_url}/FILE/file-manager/upload-image/`, formData).then(
          success => {
            console.log(success);
            if (success.data.status == 'ok') {
              this.websocketSendMessage({
                type: 'img',
                content: success.data.data[0]
              });
            }
          },
          error => {
            console.log(error);
          }
        );
      },
      websocketSendMessage(message) {
        var dataDetails = {
              type: message.type,
              website_code: this.data.logInDetails.chat_websiteCode,
              o_id: this.data.logInDetails.chat_oID,
              group_id: this.data.activeContactID
            };

        if (message.type == 'msg') {
          dataDetails['message_body'] = message.content;
        }

        if (message.type == 'img') {
          dataDetails['message_body'] = message.content.image_code;
          dataDetails['caption'] = message.content.caption;
        }

        if (message.type == 'delete_messages') {
          dataDetails['message_id'] = message.content;
        }

        console.log(dataDetails);

        var messageDataDetails = JSON.stringify(dataDetails);

        this.webSocketSend(messageDataDetails);
      },
      webSocketSend(messageDataDetails) {
        eventBus.$emit('websocket:send', messageDataDetails);
      },
      addElementToMessageBox(element) {
        this.$refs.messageContent.appendChild(element);
        
        if (this.$refs.messageContent.innerHTML != '' && this.$refs.messageContent.childNodes.length > 0 && this.data.chat_selectedMessageList.length <= 0) {
          this.activateSendButton = true;
        } else {
          this.activateSendButton = false;
        }
      }
    },
    mounted() {
      this.initiate();
    },
    watch: {
      'data.chat_selectedMessageList'(to, from) {
        // console.log(to, from);

        if (to.length > 0) {
          this.showOtherTools(['deleteMessage']);
        } else {
          this.activateOtherTools = false;
        }

        this.activateSendButton = (this.$refs.messageContent.innerHTML != '' && this.$refs.messageContent.childNodes.length > 0 && to.length <= 0) ? true : false;
      },
      'data.chat_websocketDetails'(to, from) {
        // console.log(to, from);

        if (to.message_details.allowed == 'yes') {
          this.$refs.messageContent.setAttribute('placeholder', '请输入内容，回车键发送');
          this.$refs.messageContent.setAttribute('contenteditable', true);
          this.disableTools = false;
        } else {
          this.$refs.messageContent.setAttribute('placeholder', to.message_details.info);
          this.$refs.messageContent.setAttribute('contenteditable', false);
          this.disableTools = true;
        }
      }
    },
    beforeDestroy() {
      eventBus.$off('messageContent:add');
      eventBus.$off('otherTools:hide');
    }
  }
</script>

<style lang="scss">
  #chatFooter {
    width: 100%;
    height: auto;

    * {
      font-size: 16px;
    }

    &.disable {
      position: relative;
    }

    #mainContainer {
      margin: 0 0 -111px 0;
      transition: margin 0.5s ease-in-out;

      &.active {
        margin: 0 0 0 0;
      }

      #mainToolsHolder {
        padding: 10px 2%;
        border-top: 1px solid #cbd5df;
        border-bottom: 1px solid #cbd5df;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        position: relative;

        #messageContent {
          width: 55%;
          min-height: 1.313em;
          max-height: 10em;
          background-color: #FFF;
          border: 1px solid #cbd5df;
          border-radius: 4px;
          overflow-y: scroll;
          color: #212529;
          padding: 0.219em 0.5em;
          margin: 0 1%;
          font-size: 16px;
          -webkit-touch-callout: initial;
          -webkit-user-select: initial;
          -khtml-user-select: initial;
          -moz-user-select: initial;
          -ms-user-select: initial;
          user-select: initial;
          outline: initial;

          &:empty:before {
            content: attr(placeholder);
            color: #999;
          }
        }

        #sendButton {
          background-color: #999;
          border-radius: 4px;
          padding: 5.5px 6px;
          color: #FFF;
          font-size: 14px;
          margin: 0 1%;
          cursor: pointer;

          &.active {
            background-color: #0086e1;
          }
        }

        #otherTools {
          width: 30px;
          height: 30px;
          background-image: url("../assets/images/other_tools.png");
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          margin: 0 1%;
          cursor: pointer;
        }
      }

      #othersToolsHolder {
        padding: 10px 2%;
        display: flex;
        align-items: center;
        min-height: 91px;
        background-color: #eef2fa;

        .item {
          display: inline-block;
          text-align: center;
          padding: 5px 10px;
          margin: 0 10px;

          &.deleteMessage {
            margin: 0 auto;
          }

          div {
            background-repeat: no-repeat;
            background-position: center;
            background-size: 70%;
            background-color: #FFF;
            border: 1px solid #cbd5df;
            border-radius: 4px;
            margin: 0 auto 10px auto;
            padding: 10px;

            &#sendImage {
              width: 30px;
              height: 30px;
              background-image: url("../assets/images/send_image.png");
            }

            &#takePicture {
              width: 30px;
              height: 30px;
              background-image: url("../assets/images/take_picture.png");
            }

            &#redpocket {
              background-size: 50%;
              width: 30px;
              height: 30px;
              background-image: url("../assets/images/redpocket.png");
            }

            &#deleteMessage {
              background-size: 50%;
              width: 30px;
              height: 30px;
              background-image: url("../assets/images/trash_can.png");
              margin: 0 auto;
            }
          }

          .text {
            font-size: 14px;
            color: #768ba1;
          }

          #uploadImage {
            display: none;
          }
        }

        /* Upload Image */
        #uploadImageHolder {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          margin: auto;
          display: flex;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          font-family: Microsoft YaHei, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
          z-index: 100;
        }

        #uploadImageSubHolder {
          margin: auto;
          width: 85%;
          background-color: #FFF;
          border-radius: 4px;
          text-align: center;
        }

        #uploadImageHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 10px;
          border-bottom: 1px solid #cfdbe3;
          color: #1d334a;
          font-size: 18px;
        }

        #uploadImageCloseButton {
          cursor: pointer;
          font-size: 24px;
          line-height: 0;
        }

        #uploadImagePreview {
          display: block;
          width: 90%;
          height: 140px;
          background-color: #cfdbe3;
          margin: 10px auto;
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
        }

        #uploadImageCaption {
          display: block;
          margin: 0 auto;
          width: 83%;
          padding: 8px 10px 9px 10px;
          color: #1d334a;
          font-size: 14px;
          border: 1px solid #cfdbe3;
          -webkit-touch-callout: initial;
          -webkit-user-select: initial;
          -khtml-user-select: initial;
          -moz-user-select: initial;
          -ms-user-select: initial;
          user-select: initial;
          outline: initial;
        }

        #uploadImageButton {
          display: inline-block;
          margin: 0.8em auto;
          /* width: 21%; */
          background-color: #1e4fa8;
          font-size: 16px;
          color: #FFF;
          text-align: center;
          border-radius: 100px;
          padding: 8px 50px;
          cursor: pointer;
          box-shadow: 3px 3px 15px -3px #1e4fa8;
        }
      }
    }

    #disableOverlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: none;

      &.disable {
        display: block;
      }
    }
  }
</style>