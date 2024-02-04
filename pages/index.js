import React, { useEffect, useState, useContext} from 'react';

//Internal Import
import { ChatAppContext } from '@/Context/ChatAppContext'

const ChatApp = () => {
  const { title } = useContext(ChatAppContext);
  return (
    <div>{title}</div>
  )
}

export default ChatApp