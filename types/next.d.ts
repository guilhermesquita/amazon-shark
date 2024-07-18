import { Server as HTTPServer } from 'http';
import { Socket } from 'net';
import { Server as IOServer } from 'socket.io';

declare module 'next' {
  interface NextApiResponse<T = any> {
    writeHead(arg0: number): unknown;
    socket: Socket & {
      server: HTTPServer & {
        io?: IOServer;
      };
    };
  }
}
