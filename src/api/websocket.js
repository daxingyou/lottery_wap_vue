export function initWebsocket({ state, commit }) {
  let { sessionId, id } = state.userData;
  if (sessionId) {
    // 每一次新建websocket连接之前，需要关闭原来的socket连接
    closeWebsocket()
    window.ws = new WebSocket(
      `ws://216.118.231.114:8868/websocket?token=${sessionId}&userid=${id}`
    );
    window.ws.onmessage = data => {
      if (data.data) {
        const result = JSON.parse(data.data);
        if (result.status === 200 && result.payload) {
          let userData = {
            ...state.userData,
            balance: result.payload
          };
          commit("setUserData", userData);
          sessionStorage.setItem("userData", JSON.stringify(userData));
        }
      }
    };
  }
}

export function closeWebsocket() {
  window.ws && window.ws.close();
}
