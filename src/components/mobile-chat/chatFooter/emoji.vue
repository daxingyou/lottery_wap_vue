<template>
    <div id="emoji">
        <div id="emoji-btn" v-on:click="showEmojiContainer"></div>
        <div id="emoji-container" v-bind:class="{'emojiShow': !emojiContainerHidden, 'emojiHide': emojiContainerHidden}">
          <span v-for ="(emoji, index) in emojiList" v-bind:key="index" 
                v-bind:class ="{ 'emoji twa twa-lg': true, [`twa-${emoji}`]: true }" 
                v-on:click ="addEmojiToMessageBox">
          </span>
        </div>
    </div>
</template>

<script>
    import eventBus from '@/assets/js/event-bus';

    export default {
        name: 'emojiList',
        props: [
            'disableTools',
            'emojiList'
        ],
        data() {
            return {
                emojiContainerHidden: true
            }
        },
        methods: {
            initiate() {
                this.events();
            },
            events() {
                eventBus.$on('emoji:hide', this.hideEmojiContainer);
            },
            addEmojiToMessageBox(evt) {
                let emojiCode       = evt.target.classList[3],
                    emojiContainer  = document.createElement('span');

                emojiContainer.className = 'emoji-msg twa twa-lg ' + emojiCode;
                emojiContainer.setAttribute('contenteditable', false);
                
                eventBus.$emit('messageContent:add', emojiContainer);
            },
            placeCaratAtEndOfMessageBox(element) {
                element.focus();

                if (typeof window.getSelection  != "undefined" &&
                    typeof document.createRange != "undefined") {

                let range = document.createRange();
                    range.selectNodeContents(element);
                    range.collapse(false);

                let sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                    
                } else if (typeof document.body.createTextRange != "undefined") {

                let textRange = document.body.createTextRange();
                    textRange.moveToElementText(element);
                    textRange.collapse(false);
                    textRange.select();
                }
            },
            showEmojiContainer() {
                this.emojiContainerHidden = (!this.disableTools) ? !this.emojiContainerHidden : true

                eventBus.$emit('otherTools:hide');
            },
            hideEmojiContainer() {
                this.emojiContainerHidden = true;
            }
        },
        mounted() {
            this.initiate();
        },
        beforeDestroy() {
            eventBus.$off('emoji:hide');
        }
    }
</script>

<style lang="scss" scoped>
#emoji {
    #emoji-btn {
        width: 30px;
        height: 30px;
        background-image: url("../assets/images/emoji.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        margin: 0 1%;
        cursor: pointer;
    }

    div#emoji-container {
        width: 12.3rem;
        height: 6.5rem;
        position: absolute;
        background-color: #fff;
        border-radius: 1%;
        top: -7.8rem;
        left: 0.3rem;
        padding: 0.5rem;
        transition: clip 0.5s;

        span.emoji {
            margin: 0.16rem;
            font-size: 16px;
        }
    }

    div#emoji-container.emojiShow {
        clip: rect(0, 18.3rem, 10rem, 0)
        
    }

    div#emoji-container.emojiHide {
        clip: rect(10rem, 18.3rem, 10rem ,0)
    }
}
</style>