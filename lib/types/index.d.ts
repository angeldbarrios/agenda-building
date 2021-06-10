export {};

declare module 'express-session' {
  interface SessionData {
    data: any;
  }
}