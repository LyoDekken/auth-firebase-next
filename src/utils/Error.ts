// utils/errors.ts

export class EnterRoomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EnterRoomError';
  }
}
