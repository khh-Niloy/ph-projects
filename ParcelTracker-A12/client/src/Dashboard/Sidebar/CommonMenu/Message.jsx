import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
const Message = () => {
  const socket = useMemo(() => io("http://localhost:3000"), []);
  const [roomNumber, setroomNumber] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
      setroomNumber(socket.id);
    });

    socket.on("message", (data) => {
      console.log(data);
    });

    // socket.emit("message", "hi");

    return () => {
      socket.disconnect();
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const message = e.target.message.value;
    const room = e.target.room.value;
    // console.log(message);

    const obj = {
      roomID: room,
      message: message,
    };

    socket.emit("message", obj);
  }

  return (
    <div>
      <h1>{roomNumber}</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="room"
          placeholder="roomID"
          type="text"
          className="border"
        />
        <input name="message" type="text" className="border" />
        <button>submit</button>
      </form>
    </div>
  );
};

export default Message;
