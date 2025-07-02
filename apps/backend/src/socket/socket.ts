import { Server } from 'socket.io';

export function setupSocket(io: Server) {
  io.on('connection', (socket) => {
    console.log('🟢 Client connected:', socket.id);

    socket.on('punch', (data) => {
      console.log('🕒 Punch event received:', data);
      io.emit('attendanceUpdate', data); 
    });

    socket.on('disconnect', () => {
      console.log('🔴 Client disconnected:', socket.id);
    });
  });
}
