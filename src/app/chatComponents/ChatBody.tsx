"use client";
import React from "react";
import ReceiverBubble from "./ReceiverBubble";
import SenderBubble from "./SenderBubble";

function ChatBody() {
  return (
    <div className="flex grow relative flex-col p-4 gap-2">
      <SenderBubble /> <ReceiverBubble />
    </div>
  );
}

export default ChatBody;
