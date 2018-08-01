<template>
  <div id="mobileChat">
    <div id="login" v-if="chat_isTest && !chat_isLogIn" v-bind:class="{'vh100': deactivateHeader}">
      <fieldset>
        <legend>Log-In</legend>
        <input id="username" type="text" name="username" placeholder="Username" autofocus v-on:keyup.enter="logIn" ref="username" />
        <p id="submit" v-on:click="logIn">Log-In</p>
      </fieldset>
    </div>

    <div id="chatMainContent" v-if="chat_isLogIn" v-bind:class="{'vh100': deactivateHeader}">
      <chatHeader v-bind:data="{chat_websocketDetails, chat_server_url, chat_isLogIn, logInDetails, activeContactID, linkInfo, chat_selectedMessageList, theme, emoji, stickers, chat_isTest}" v-if="deactivateHeader"/>
      <mainContent v-bind:data="{chat_websocketDetails, chat_server_url, chat_isLogIn, logInDetails, activeContactID, linkInfo, chat_selectedMessageList, theme, emoji, stickers, chat_isTest}"/>
      <chatFooter v-bind:data="{chat_websocketDetails, chat_server_url, chat_isLogIn, logInDetails, activeContactID, linkInfo, chat_selectedMessageList, theme, emoji, stickers, chat_isTest}"/>
    </div>
  </div>
</template>

<script>
  import websocket from './assets/js/websocket';
  import eventBus from '@/assets/js/event-bus';
  import chatHeader from './chatHeader/index';
  import mainContent from './mainContent/index';
  import chatFooter from './chatFooter/index';

  export default {
    name: 'mobileChat',
    components: {
      chatHeader,
      mainContent,
      chatFooter
    },
    data() {
      return {
        chat_domain: 'chatroomtech.com',
        chat_server_url: '',
        chat_websocketDetails: {},
        chat_isLogIn: false,
        chat_selectedMessageList: [],
        logInDetails: {
          chat_websiteType: '',
          chat_websiteCode: '',
          chat_username: '',
          chat_oID: '',
          chat_random: '',
          chat_requestKey: ''
        },
        activeContactID: 0,
        deactivateHeader: (/mobile-chat/gi.test(this.$route.fullPath)) || (/mobile-chat/gi.test(this.$route.name)),
        linkInfo: {
          'al': {
            name: 'al',
            webcode: '45f46fa5a0371dc655d17e99fcfe5c68',
            url: 'https://www.alcp66.com'
          },
          'gd': {
            name: 'gd',
            webcode: '31a58a7e31f80a28aaee1c556e32984d',
            url: 'https://www.gdcp188.com'
          },
          'fh': {
            name: 'fh',
            webcode: '55a229ffe462432705fbc368a5522ee8',
            url: 'https://www.app.97bei.com'
          },
          'ly': {
            name: 'ly',
            webcode: 'ffd7283fc377d3a594267e1886990a5e',
            url: 'https://www.le079.com'
          },
          'uc': {
            name: 'uc',
            webcode: 'c265d8b50355960bf8b8d2748cb820bc',
            url: 'https://www.uc22.com'
          },
          'ct': {
            name: 'ct',
            webcode: '50516e074d428f45b482f31f7b0d23f7',
            url: 'https://www.caitou999.com'
          },
          '618cp': {
            name: '618cp',
            webcode: 'db5bc06fea53b0f352445c1c708defdf',
            url: 'https://618cpcp.com/'
          },
          'sample': {
            name: 'sample',
            webcode: 'c2d916a9b35aea3dd70b401e66c8f728',
            url: 'https://www.uc22.com'
          },
        },
        theme: 'blue',
        emoji: ["smile", "laughing", "blush", "smiley", "relaxed", "smirk", "flushed", "relieved", "satisfied", "grin", "wink", "grinning", "kissing", "sleeping", "worried", "frowning", "anguished", "grimacing", "confused", "hushed", "expressionless", "unamused", "sweat", "weary", "pensive", "disappointed", "confounded", "fearful", "persevere", "cry", "sob", "joy", "astonished", "scream", "angry", "rage", "triumph", "sleepy", "yum", "mask", "imp", "innocent"],
        stickers: ["st1", "st2", "st3", "st4", "st5", "st6", "st7", "st8", "st9", "st10", "st11", "st12", "st13", "st14", "st15", "st16", "st17", "st18", "st19", "st20", "st21", "st22", "st23", "st24", "st25", "st26", "st27", "st28", "st29", "st30",  "st31", "st32", "st33", "st34", "st35", "st36", "st37", "st38", "st39", "st40", "st41", "st42", "st43", "st44", "st45", "st46", "st47", "st48", "st49", "st50", "st51", "st52", "st53", "st54", "st55", "st56", "st57", "st58", "st59", "st60", "st61", "st62", "st63", "st64", "st65", "st66", "st67", "st68", "st69", "st70", "st71", "st72", "st73", "st74", "st76", "st77", "st78", "st79", "st80", "st81", "st82", "st83", "st84", "st85", "st86", "st87", "st88", "st89", "st90", "st91", "st92", "st93", "st94", "st95", "st96", "st97", "st98", "st99", "st100", "st102", "st103", "st104", "st105", "st106", "st107", "st108", "st109", "st110", "st111", "st112", "st113", "st114", "st115", "st116" ],
        chat_isTest: false
      }
    },
    methods: {
      initiate() {
        // chat_isTest
        // this.chat_isTest = (/file|localhost|10.10.10.90/ig.test(window.location.origin)) ? true : false;

        // chat_isLogIn
        this.chat_isLogIn = JSON.parse(sessionStorage.getItem('chat_isLogIn'));

        // Test
        this.chat_domain = (!this.chat_isTest) ? this.chat_domain : '10.10.10.146';

        this.chat_server_url = (!this.chat_isTest) ? `https://www.${this.chat_domain}` : `http://${this.chat_domain}/chatserver`;

        if (!this.chat_isTest || this.chat_isLogIn) {
          this.logIn();
        }

        setTimeout(() => {
          window.scrollTo(0, window.outerHeight);
        }, 100);
      },
      event() {
        eventBus.$on('logout', this.logOut);

        eventBus.$on('websocket:success', (messageDetails) => {
          this.chat_websocketDetails = messageDetails;
        });

        eventBus.$on('message:select', (message_id) => {
          var indexOfMessage = this.chat_selectedMessageList.indexOf(message_id);

          // console.log(message, indexOfMessage);

          if (indexOfMessage == -1) {
            this.chat_selectedMessageList.push(message_id);
          } else {
            this.chat_selectedMessageList.splice(indexOfMessage, 1);
          }
        });

        eventBus.$on('message:reset', () => {
          this.chat_selectedMessageList = [];
        });
      },
      logIn() {
        let md5 = require("md5");

        if (this.chat_isLogIn == null || !this.chat_isLogIn) {
          if (this.chat_isTest) {
            if (this.$refs.username.value != '') {
              this.logInDetails = {
                chat_websiteType: 'sample',
                chat_websiteCode: this.linkInfo['sample'].webcode,
                chat_username: this.$refs.username.value,
                chat_oID: md5(this.$refs.username.value + new Date().getTime()),
                chat_random: this.generateSerial(13),
                chat_requestKey: md5(
                  this.logInDetails.chat_username.substr(1, 5) +
                  this.logInDetails.chat_random.substr(0, 3) +
                  this.logInDetails.chat_websiteCode.substr(8, 30) +
                  this.logInDetails.chat_random.substr(4) +
                  this.logInDetails.chat_random.substr(-1) +
                  this.logInDetails.chat_oID.substr(12, 18)
                )
              };

              this.$refs.username.value = '';

              for (var key in this.logInDetails) {
                sessionStorage.setItem(key, this.logInDetails[key]);
              }

              this.chat_isLogIn = true;

              sessionStorage.setItem('chat_isLogIn', this.chat_isLogIn);

              console.log('Log-In Details:', sessionStorage);
            } else {
              alert('Please enter a valid username.');
            }
          } else {
            var website_type = (window.is_gd_ali != undefined)
              ? window.is_gd_ali()
                : (this.$route.query.website_type != undefined || this.$route.query.website_type != '' || this.$route.query.website_type != null)
                    ? this.$route.query.website_type
                      : null;

            var user_oid = (sessionStorage.getItem("im_token") != null)
              ? sessionStorage.getItem("im_token")
                : (this.$route.query.user_oid != undefined || this.$route.query.user_oid != '' || this.$route.query.user_oid != null)
                    ? this.$route.query.user_oid
                      : null;

            var username = (sessionStorage.getItem("im_username") != null)
              ? sessionStorage.getItem("im_username")
                : (this.$route.query.username != undefined || this.$route.query.username != '' || this.$route.query.username != null)
                    ? this.$route.query.username
                      : null;

            // console.log(website_type, user_oid, username);

            if (website_type != undefined && website_type != '' && website_type != null && user_oid != undefined && user_oid != '' && user_oid != null && username != undefined && username != '' && username != null) {
              this.logInDetails = {
                chat_websiteType: website_type,
                chat_websiteCode: this.linkInfo[website_type].webcode,
                chat_username: (username != "游客") ? username : "demo" + this.generateSerial(20),
                chat_oID: user_oid,
                chat_random: this.generateSerial(13),
                chat_requestKey: md5(
                  this.logInDetails.chat_username.substr(1, 5) +
                  this.logInDetails.chat_random.substr(0, 3) +
                  this.logInDetails.chat_websiteCode.substr(8, 30) +
                  this.logInDetails.chat_random.substr(4) +
                  this.logInDetails.chat_random.substr(-1) +
                  this.logInDetails.chat_oID.substr(12, 18)
                )
              };

              for (var key in this.logInDetails) {
                sessionStorage.setItem(key, this.logInDetails[key]);
              }

              this.chat_isLogIn = true;

              sessionStorage.setItem('chat_isLogIn', this.chat_isLogIn);

              console.log('Log-In Details:', sessionStorage);
            }
          }
        } else {
          this.logInDetails = {
            chat_websiteType: sessionStorage.getItem('chat_websiteType'),
            chat_websiteCode: sessionStorage.getItem('chat_websiteCode'),
            chat_username: sessionStorage.getItem('chat_username'),
            chat_oID: sessionStorage.getItem('chat_oID'),
            chat_random: sessionStorage.getItem('chat_random'),
            chat_requestKey: sessionStorage.getItem('chat_requestKey')
          };

          console.log('Log-In Details:', sessionStorage);
        }
        
        if (this.chat_isLogIn) {
          // Websocket
          websocket({
            logInDetails: this.logInDetails,
            chat_domain: this.chat_domain,
            chat_isTest: this.chat_isTest,
            website_origin: (this.$route.query.website_url != undefined && this.$route.query.website_url != '' && this.$route.query.website_url != null) ? this.$route.query.website_url : window.location.origin
          });

          this.event();
        }
      },
      logOut() {
        sessionStorage.removeItem('chat_websiteType');
        sessionStorage.removeItem('chat_websiteCode');
        sessionStorage.removeItem('chat_username');
        sessionStorage.removeItem('chat_oID');
        sessionStorage.removeItem('chat_random');
        sessionStorage.removeItem('chat_requestKey');
        sessionStorage.removeItem('chat_isLogIn');

        this.chat_isLogIn = false;

        this.logInDetails = {
          chat_websiteType: '',
          chat_websiteCode: '',
          chat_username: '',
          chat_oID: '',
          chat_random: '',
          chat_requestKey: ''
        }

        setTimeout(() => {
          this.$refs.username.focus();
        }, 0);

        eventBus.$emit('viewSelector', 'chat');

        eventBus.$emit('websocket:close');
      },
      generateSerial(length) {
        var chars =
          "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        var string_length = length;
        var randomstring = "";

        for (var x = 0; x < string_length; x++) {
          var letterOrNumber = Math.floor(Math.random() * 2);
          if (letterOrNumber == 0) {
            var newNum = Math.floor(Math.random() * 9);
            randomstring += newNum;
          } else {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
          }
        }

        return randomstring;
      },
      fullScreen(event) {
        console.log(event);
        
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        }
          
        if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        }
          
        if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen();
        }

        if (document.documentElement.msRequestFullscreen) {
          document.documentElement.msRequestFullscreen();
        }
      }
    },
    mounted() {
      this.initiate();
    },
    beforeDestroy() {
      eventBus.$emit('websocket:close');

      eventBus.$off('websocket:send');
      eventBus.$off('websocket:close');
      eventBus.$off('websocket:reconnect');

      eventBus.$off('logout');
      eventBus.$off('websocket:success');
      eventBus.$off('message:select');
      eventBus.$off('message:reset');
      eventBus.$off('chat:reset');
    }
  }
</script>

<style lang="scss">
  @import './assets/css/twemoji-awesome.css';

  #mobileChat {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;

    * {
      margin: 0;
      padding: 0;
      box-sizing: initial;
      line-height: normal;
      font-size: initial;
      font-weight: normal;
      font-family: "Microsoft YaHei";
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      outline: none;
      -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
      -moz-tap-highlight-color: rgba(255, 255, 255, 0);
      -ms-tap-highlight-color: rgba(255, 255, 255, 0);
      tap-highlight-color: rgba(255, 255, 255, 0);
    }

    #login {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;

      &.vh100 {
        height: 100vh;
      }

      fieldset {
        margin: 0 auto;
        width: auto;
        height: auto;
        border-radius: 10px;
        border: 2px solid #FFF;

        * {
          display: block;
          margin: 0 auto 2em auto;
        }

        legend {
          color: #FFF;
          margin: 0 0 0 1em;
        }

        #username {
          width: 15em;
          font-size: 13px;
          padding: 10px 15px;
          margin: 2em 2.5em 1.5em 2.5em;
          border: none;
          border-radius: 5px;
          color: #75758b;
          -webkit-touch-callout: initial;
          -webkit-user-select: initial;
          -khtml-user-select: initial;
          -moz-user-select: initial;
          -ms-user-select: initial;
          user-select: initial;
          outline: initial;
        }

        #submit {
          width: 4em;
          padding: 0.3em 1em;
          border-radius: 10px;
          background-color: #FFF;
          text-align: center;
          color: #75758b;
        }
      }
    }

    #chatMainContent {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &.vh100 {
        height: 100vh;
      }
    }

    .loading {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      margin: 0;
      padding: 0;

      &.disable {
        display: none;
      }

      .loadingComponents {
        margin: 0 auto;

        .loadingBackground {
          width: 2.75em;
          height: 2.75em;
          border-radius: 100%;
          border: 8px solid #ccc;
          margin: 10px auto;

          .loadingBar {
            width: 2.75em;
            height: 2.75em;
            border-radius: 100%;
            border-top: 8px solid #1c4fa8;
            border-left: 8px solid transparent;
            border-bottom: 8px solid transparent;
            border-right: 8px solid transparent;
            margin: -8px -8px;
            animation: rotateLoadingBar 0.6s linear infinite;

            @keyframes rotateLoadingBar {
              from {
                transform: rotate(0deg);
              }

              to {
                transform: rotate(360deg);
              }
            }
          }
        }

        .loadingText {
          font-size: 22px !important;
          color: #FFF;
        }
      }
    }
  }
</style>