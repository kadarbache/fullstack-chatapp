import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader"
import MessageInput from "./MessageInput"
import Messages from "./Messages"
import MessageSkeleton from "./skeletons/MessageSkeleton";

function ChatContainer() {
    const {
        messages,
        getMessages,
        isMessagesLoading,
        selectedUser,
        subscribeToMessages,
        unsubscribeFromMessages,
      } = useChatStore();

    if (isMessagesLoading) {
        return (
          <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />
            <MessageSkeleton />
            <MessageInput />
          </div>
        );
      }

    return (
        <div className="flex flex-col overflow-auto flex-1">
            <ChatHeader/>
            <Messages/>
            <MessageInput/>         
        </div>
    )
}

export default ChatContainer
