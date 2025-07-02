import { Server } from 'socket.io';

export function setupSocket(io: Server) {
  io.on('connection', (socket) => {
    console.log('🟢 Client connected:', socket.id);

    socket.on('punch', (data) => {
      console.log('🕒 Punch event received:', data);
      io.emit('attendanceUpdate', data); // broadcast to all dashboards
    });

    socket.on('disconnect', () => {
      console.log('🔴 Client disconnected:', socket.id);
    });
  });
}
