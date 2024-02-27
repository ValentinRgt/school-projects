import { Server, Socket } from "socket.io";
import PrivateMessage from "../entity/PrivateMessage.entity";
import Room from "../entity/Room.entity";
import User from "../entity/User.entity";

export const nickname = async (io: Server, socket: Socket, arg: any) => {
  const user: any = socket.handshake.query.user;
  if (!(arg instanceof Object)) {
    return socket.emit("command:nickname", {
      success: false,
      message: "ws.argument.invalid",
    });
  }
  if (!arg.hasOwnProperty("nickname")) {
    return socket.emit("command:nickname", {
      success: false,
      message: "ws.argument.property_not_found",
    });
  }
  if (arg.nickname === null || arg.nickname === undefined) {
    await User.findOneAndUpdate({ _id: user._id }, { nickname: null });
    user.nickname = null;
    return socket.emit("command:nickname", {
      success: true,
      message: "user.nickname.updated",
    });
  }
  if (arg.nickname.length === 0) {
    return socket.emit("command:nickname", {
      success: false,
      message: "ws.argument.is_empty",
    });
  }
  if (
    !arg.nickname.match(
      /^[a-zA-Z0-9ÀÁÂÆÇÈÉÊËÌÍÎÏÑÒÓÔŒÙÚÛÜÝŸàáâæçèéêëìíîïñòóôœùúûüýÿ]+$/
    )
  ) {
    return socket.emit("command:nickname", {
      success: false,
      message: "ws.argument.is_not_alphanumeric",
    });
  }

  if (arg.nickname === user.nickname) {
    return socket.emit("command:nickname", {
      success: false,
      message: "user.nickname.not_updated",
    });
  }

  const query = User.where({
    $or: [{ username: arg.nickname }, { nickname: arg.nickname }],
    _id: { $ne: user._id },
  });
  const searchUser = await query.findOne();

  if (searchUser) {
    return socket.emit("command:nickname", {
      success: false,
      message: "user.nickname.already_in_use",
    });
  }

  await User.findOneAndUpdate({ _id: user._id }, { nickname: arg.nickname });
  user.nickname = arg.nickname;

  return socket.emit("command:nickname", {
    success: true,
    message: "user.nickname.updated",
  });
};

export const list = async (io: Server, socket: Socket, arg: any) => {
  if (!(arg instanceof Object)) {
    return socket.emit("command:list", {
      success: false,
      message: "ws.argument.invalid",
    });
  }
  if (!arg.hasOwnProperty("query")) {
    return socket.emit("command:list", {
      success: false,
      message: "ws.argument.property_not_found",
    });
  }
  if (arg.query.length === 0) {
    return socket.emit("command:list", {
      success: false,
      message: "ws.argument.is_empty",
    });
  }

  const rooms = await Room.find({ name: { $regex: arg.query, $options: "i" } });

  return socket.emit("command:list", { success: true, data: rooms });
};

export const createRoom = async (io: Server, socket: Socket, arg: any) => {
  const user: any = socket.handshake.query.user;
  if (!(arg instanceof Object)) {
    return socket.emit("command:create", {
      success: false,
      message: "ws.argument.invalid",
    });
  }
  if (!arg.hasOwnProperty("name")) {
    return socket.emit("command:create", {
      success: false,
      message: "ws.argument.property_not_found",
    });
  }
  if (arg.name === null || arg.name === undefined || arg.name.length === 0) {
    return socket.emit("command:create", {
      success: false,
      message: "ws.argument.is_empty",
    });
  }
  if (
    !arg.name.match(
      /^[a-zA-Z0-9ÀÁÂÆÇÈÉÊËÌÍÎÏÑÒÓÔŒÙÚÛÜÝŸàáâæçèéêëìíîïñòóôœùúûüýÿ]+$/
    )
  ) {
    return socket.emit("command:create", {
      success: false,
      message: "ws.argument.is_not_alphanumeric",
    });
  }

  const query = Room.where({ name: arg.name });
  const searchRoom = await query.findOne();

  if (searchRoom) {
    return socket.emit("command:create", {
      success: false,
      message: "room.create.already_in_use",
    });
  }

  const room = new Room();
  room.name = arg.name;
  room.createdBy = user._id;
  room.createdAt = new Date().toISOString();
  const lastRoom = await room.save();
  io.emit("notification", {
    event: "room_create",
    room: lastRoom,
  });

  return socket.emit("command:create", {
    success: true,
    message: "room.create.created",
  });
};

export const deleteRoom = async (io: Server, socket: Socket, arg: any) => {
  const user: any = socket.handshake.query.user;
  if (!(arg instanceof Object)) {
    return socket.emit("command:delete", {
      success: false,
      message: "ws.argument.invalid",
    });
  }
  if (!arg.hasOwnProperty("name")) {
    return socket.emit("command:delete", {
      success: false,
      message: "ws.argument.property_not_found",
    });
  }
  if (arg.name === null || arg.name === undefined || arg.name.length === 0) {
    return socket.emit("command:delete", {
      success: false,
      message: "ws.argument.is_empty",
    });
  }
  if (
    !arg.name.match(
      /^[a-zA-Z0-9ÀÁÂÆÇÈÉÊËÌÍÎÏÑÒÓÔŒÙÚÛÜÝŸàáâæçèéêëìíîïñòóôœùúûüýÿ]+$/
    )
  ) {
    return socket.emit("command:delete", {
      success: false,
      message: "ws.argument.is_not_alphanumeric",
    });
  }

  const query = Room.where({ name: arg.name, createdBy: user._id });
  const searchRoom = await query.findOne();

  if (!searchRoom) {
    return socket.emit("command:delete", {
      success: false,
      message: "room.delete.not_found",
    });
  }

  await Room.deleteOne({ _id: searchRoom._id });

  io.emit("notification", {
    event: "room_delete",
    room: searchRoom,
  });
  return socket.emit("command:delete", {
    success: true,
    message: "room.delete.deleted",
  });
};

export const joinRoom = async (io: Server, socket: Socket, arg: any) => {
  const user: any = socket.handshake.query.user;
  if (!(arg instanceof Object)) {
    return socket.emit("command:join", {
      success: false,
      message: "ws.argument.invalid",
    });
  }
  if (!arg.hasOwnProperty("name")) {
    return socket.emit("command:join", {
      success: false,
      message: "ws.argument.property_not_found",
    });
  }
  if (arg.name === null || arg.name === undefined || arg.name.length === 0) {
    return socket.emit("command:join", {
      success: false,
      message: "ws.argument.is_empty",
    });
  }
  if (
    !arg.name.match(
      /^[a-zA-Z0-9ÀÁÂÆÇÈÉÊËÌÍÎÏÑÒÓÔŒÙÚÛÜÝŸàáâæçèéêëìíîïñòóôœùúûüýÿ]+$/
    )
  ) {
    return socket.emit("command:join", {
      success: false,
      message: "ws.argument.is_not_alphanumeric",
    });
  }

  const query = Room.where({ name: arg.name });
  const searchRoom = await query.findOne();

  if (!searchRoom) {
    return socket.emit("command:join", {
      success: false,
      message: "room.join.not_found",
    });
  }

  if (!socket.rooms.has(searchRoom._id.toString())) {
    socket.join(searchRoom._id.toString());
    const username = user.nickname ? user.nickname : user.username;
    socket.broadcast.to(searchRoom._id.toString()).emit("notification", {
      event: "room_join",
      username: username,
      message: "room.user.joined",
      room: searchRoom._id,
    });

    return socket.emit("command:join", {
      success: true,
      message: "room.join.joined",
      room: searchRoom._id,
    });
  }

  return socket.emit("command:join", {
    success: false,
    message: "room.join.already_joined",
  });
};

export const quitRoom = async (io: Server, socket: Socket, arg: any) => {
  const user: any = socket.handshake.query.user;
  if (!(arg instanceof Object)) {
    return socket.emit("command:quit", {
      success: false,
      message: "ws.argument.invalid",
    });
  }
  if (!arg.hasOwnProperty("name")) {
    return socket.emit("command:quit", {
      success: false,
      message: "ws.argument.property_not_found",
    });
  }
  if (arg.name === null || arg.name === undefined || arg.name.length === 0) {
    return socket.emit("command:quit", {
      success: false,
      message: "ws.argument.is_empty",
    });
  }
  if (
    !arg.name.match(
      /^[a-zA-Z0-9ÀÁÂÆÇÈÉÊËÌÍÎÏÑÒÓÔŒÙÚÛÜÝŸàáâæçèéêëìíîïñòóôœùúûüýÿ]+$/
    )
  ) {
    return socket.emit("command:quit", {
      success: false,
      message: "ws.argument.is_not_alphanumeric",
    });
  }

  const query = Room.where({ name: arg.name });
  const searchRoom = await query.findOne();

  if (!searchRoom) {
    return socket.emit("command:quit", {
      success: false,
      message: "room.quit.not_found",
    });
  }

  if (socket.rooms.has(searchRoom._id.toString())) {
    socket.leave(searchRoom._id.toString());
    const username = user.nickname ? user.nickname : user.username;
    socket.broadcast.to(searchRoom._id.toString()).emit("notification", {
      event: "room_quit",
      username: username,
      message: "room.user.exited",
      room: searchRoom._id,
    });
  }

  return socket.emit("command:quit", {
    success: true,
    message: "room.quit.exited",
    room: searchRoom._id,
  });
};

export const users = async (io: Server, socket: Socket, arg: any) => {
  const users = await User.find({ socketId: { $ne: null } }).select([
    "-password",
    "-email",
  ]);
  return socket.emit("command:users", { success: true, users: users });
};

export const privateMessage = async (io: Server, socket: Socket, arg: any) => {
  const user: any = socket.handshake.query.user;
  if (!(arg instanceof Object)) {
    return socket.emit("command:msg", {
      success: false,
      message: "ws.argument.invalid",
    });
  }
  if (!arg.hasOwnProperty("user") && !arg.hasOwnProperty("message")) {
    return socket.emit("command:msg", {
      success: false,
      message: "ws.argument.property_not_found",
    });
  }
  if (
    arg.user === null ||
    arg.user === undefined ||
    (arg.user.length === 0 && arg.message === null) ||
    arg.message === undefined ||
    arg.message.length === 0
  ) {
    return socket.emit("command:msg", {
      success: false,
      message: "ws.argument.is_empty",
    });
  }
  if (!arg.user.match(/^[a-zA-Z0-9]+$/)) {
    return socket.emit("command:msg", {
      success: false,
      message: "ws.argument.is_not_alphanumeric",
    });
  }

  const query = User.where({
    $or: [{ username: arg.user }, { nickname: arg.user }],
  });
  const searchUser = await query.findOne();

  if (!searchUser) {
    return socket.emit("command:msg", {
      success: false,
      message: "msg.user.not_found",
    });
  }

  const privateMessage = new PrivateMessage();
  privateMessage.fromUser = user._id;
  privateMessage.toUser = searchUser._id;
  privateMessage.message = arg.message;
  privateMessage.createdAt = new Date().toISOString();
  const lastPrivateMessageSent = await privateMessage.save();

  const toUsername = searchUser.nickname
    ? searchUser.nickname
    : searchUser.username;
  socket.to(user.socketId).emit("notification", {
    event: "private_message",
    username: toUsername,
    message: "msg.message.send",
  });
  if (searchUser.socketId) {
    const fromUsername = user.nickname ? user.nickname : user.username;
    socket.to(searchUser.socketId).emit("notification", {
      event: "private_message",
      username: fromUsername,
      message: "msg.message.received",
    });
    socket
      .to(searchUser.socketId)
      .emit("private_message", {
        from: fromUsername,
        message: arg.message,
        userId: user._id,
      });
  }

  return socket.emit("command:msg", {
    success: true,
    message: "msg.message.send",
    userId: searchUser._id,
    privateMessage: lastPrivateMessageSent,
  });
};
