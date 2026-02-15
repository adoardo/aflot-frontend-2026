import { useGuestsStore } from "~/store/useGuestsStore";
import { useUsersStore } from "~/store/useUserStore";

class WebSocketService {
  static instance = null;

  socket = null;
  url = "";
  isConnected = false;
  reconnectDelay = 1000;
  maxReconnectDelay = 15000;
  heartbeatTimer = null;
  reconnecting = false;
  eventListeners = new Map();
  messageQueue = [];
  flushing = false;

  constructor(url) {
    if (WebSocketService.instance) return WebSocketService.instance;
    this.url = url;
    this.connect();
    this.setupVisibilityHandler();
    WebSocketService.instance = this;
  }

  get fullUrl() {
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    return this.url.startsWith("ws")
      ? this.url
      : `${protocol}://${window.location.host}${this.url}`;
  }

  connect() {
    if (this.socket && this.isConnected) return;
    if (this.reconnecting) return;
    this.reconnecting = true;

    this.socket = new WebSocket(this.fullUrl);
    this.isConnected = false;

    this.socket.onopen = () => {
      console.log("🟢 WebSocket connected");

      this.isConnected = true;
      this.reconnecting = false;
      this.reconnectDelay = 1000;

      // 1️⃣ регистрируем пользователя
      try {
        const userStore = useUsersStore();
        const userInfo = userStore.user?.info;

        if (userInfo?.id && userInfo?.role) {
          this.socket.send(
            JSON.stringify({
              type: "register",
              user_id: userInfo.id,
              role: userInfo.role,
            })
          );
        } else {
          // fallback через localStorage
          const localUser = JSON.parse(
            localStorage.getItem("global/user") || "{}"
          );
          const id =
            localUser?.user?.info?.id || localUser?.userInfo?.info?.id;
          const role =
            localUser?.user?.info?.role || localUser?.userInfo?.info?.role;

          if (id && role) {
            this.socket.send(
              JSON.stringify({ type: "register", user_id: id, role })
            );
          }
        }
      } catch (e) {
        console.warn("⚠️ Failed to send WS register:", e);
      }

      this.startHeartbeat();
      this.flushQueue();
    };

    this.socket.onmessage = (event) => {
      let payload = null;
      try {
        payload = JSON.parse(event.data);
      } catch {
        payload = null;
      }

      const guests = useGuestsStore();

      // если это notification-триггер — обновляем уведомления
      if (payload && payload.type === "notification") {
        guests.getNotifications();
      }

      // бросаем сырой payload слушателям
      this.notifyListeners(payload ?? event.data);
    };

    this.socket.onclose = () => {
      console.warn("🔴 WebSocket closed");
      this.cleanup();
      this.scheduleReconnect();
    };

    this.socket.onerror = (error) => {
      console.error("❌ WebSocket error:", error);
      this.socket.close();
    };
  }

  cleanup() {
    this.isConnected = false;
    if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);
    this.heartbeatTimer = null;
  }

  startHeartbeat() {
    if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);
    this.heartbeatTimer = setInterval(() => {
      if (this.socket?.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify({ type: "ping" }));
      } else {
        this.scheduleReconnect();
      }
    }, 30000);
  }

  scheduleReconnect() {
    if (this.reconnecting) return;
    this.reconnecting = true;
    this.cleanup();

    const delay = this.reconnectDelay;
    setTimeout(() => {
      this.reconnecting = false;
      this.connect();
    }, delay);

    this.reconnectDelay = Math.min(
      this.reconnectDelay * 2,
      this.maxReconnectDelay
    );
  }

  setupVisibilityHandler() {
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden && !this.isConnected) {
        this.connect();
      }
    });
  }

  async waitUntilOpen(timeout = 5000) {
    const start = Date.now();
    while (
      (!this.socket || this.socket.readyState !== WebSocket.OPEN) &&
      Date.now() - start < timeout
    ) {
      await new Promise((r) => setTimeout(r, 25));
    }
    return this.socket?.readyState === WebSocket.OPEN;
  }

  async flushQueue() {
    if (this.flushing || !this.isConnected) return;
    this.flushing = true;

    try {
      await this.waitUntilOpen();

      while (
        this.messageQueue.length &&
        this.socket?.readyState === WebSocket.OPEN
      ) {
        const msg = this.messageQueue.shift();
        try {
          this.socket.send(JSON.stringify(msg));
        } catch (e) {
          console.error("❌ Send failed:", e);
          this.messageQueue.unshift(msg);
          break;
        }

        await new Promise((r) => setTimeout(r, 80));
      }
    } finally {
      this.flushing = false;
    }
  }

  async sendMessage(message) {
    const json = JSON.stringify(message);

    if (this.isConnected && this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(json);
    } else {
      this.messageQueue.push(message);
      await this.flushQueue();
    }
  }

  addListener(eventName, callback) {
    this.eventListeners.set(eventName, callback);
  }

  removeListener(eventName) {
    this.eventListeners.delete(eventName);
  }

  notifyListeners(message) {
    this.eventListeners.forEach((cb) => cb(message));
  }
}

export default WebSocketService;
