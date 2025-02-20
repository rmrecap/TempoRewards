import { io, Socket } from 'socket.io-client';
import { useNotificationStore } from '@/store/notificationStore';

class WebSocketService {
  private socket: Socket | null = null;
  private static instance: WebSocketService;

  private constructor() {}

  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  public connect() {
    if (this.socket) return;

    this.socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'http://localhost:3001', {
      transports: ['websocket'],
      autoConnect: true,
    });

    this.setupEventListeners();
  }

  private setupEventListeners() {
    if (!this.socket) return;

    const { addNotification } = useNotificationStore.getState();

    this.socket.on('taskCompleted', (data) => {
      addNotification({
        title: 'Task Completed',
        message: `Task "${data.taskName}" has been completed successfully!`,
        type: 'success',
      });
    });

    this.socket.on('rewardEarned', (data) => {
      addNotification({
        title: 'Reward Earned',
        message: `You earned ${data.amount} points for completing ${data.taskName}!`,
        type: 'success',
      });
    });

    this.socket.on('adminUpdate', (data) => {
      addNotification({
        title: 'Admin Update',
        message: data.message,
        type: 'info',
      });
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      addNotification({
        title: 'Connection Error',
        message: 'Failed to connect to notification service',
        type: 'error',
      });
    });
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const websocketService = WebSocketService.getInstance();