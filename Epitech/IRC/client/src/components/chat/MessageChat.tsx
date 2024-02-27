import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { Message } from "@/types/Message";
import { ISOToDateTime } from "@/utils/ISOToDateTime";
import { ISOToRelativeTime } from "@/utils/ISOToRelativeTime";

export type MessageChatProps = {
  message: Message | null;
  isPrivate?: boolean;
};

export const MessageChat = (props: MessageChatProps) => {
  const { user } = useAuth();

  if (props.isPrivate) {
    const isSender = props.message?.fromUser._id === String(user?._id);
    return isSender ? (
      <div className="flex items-start justify-end">
        <div className="flex flex-col items-end gap-1">
          <div className="text-sm font-semibold text-right dark:text-gray-200">
            {props.message?.fromUser.nickname ||
              props.message?.fromUser.username}
          </div>
          <div className="max-w-xs px-4 py-2 text-sm text-white bg-green-500 rounded-t-lg rounded-l-lg">
            {props.message?.message}
          </div>
          <div className="text-xs text-gray-500">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {ISOToRelativeTime(props.message?.createdAt)}
                </TooltipTrigger>
                <TooltipContent>
                  {ISOToDateTime(props.message?.createdAt)}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <Avatar className="ml-4">
          <AvatarImage
            alt={props.message?.fromUser.username}
            src="/placeholder-avatar.jpg"
          />
          <AvatarFallback className="dark:bg-gray-200">
            {props.message?.fromUser.username.substring(0, 2)}
          </AvatarFallback>
        </Avatar>
      </div>
    ) : (
      <div className="flex items-start">
        <Avatar className="mr-4">
          <AvatarImage alt="Recipient" src="/placeholder-avatar.jpg" />
          <AvatarFallback className="dark:bg-gray-200">
            {props.message?.fromUser.username.substring(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start gap-1">
          <div className="text-sm font-semibold dark:text-gray-200">
            {props.message?.fromUser.nickname ||
              props.message?.fromUser.username}
          </div>
          <div className="max-w-xs px-4 py-2 text-sm text-black bg-blue-200 rounded-t-lg rounded-r-lg">
            {props.message?.message}
          </div>
          <div className="text-xs text-gray-500">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {ISOToRelativeTime(props.message?.createdAt)}
                </TooltipTrigger>
                <TooltipContent>
                  {ISOToDateTime(props.message?.createdAt)}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    );
  } else {
    const isSender = props.message?.user._id === String(user?._id);

    return (
      <div className="flex flex-col gap-4">
        {props.message != null &&
          (isSender ? (
            <div className="flex items-start justify-end">
              <div className="flex flex-col items-end gap-1">
                <div className="text-sm font-semibold text-right dark:text-gray-200">
                  {props.message?.user.nickname || props.message?.user.username}
                </div>
                <div className="max-w-xs px-4 py-2 text-sm text-white bg-blue-500 rounded-t-lg rounded-l-lg">
                  {props.message?.message}
                </div>
                <div className="text-xs text-gray-500">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        {ISOToRelativeTime(props.message?.createdAt)}
                      </TooltipTrigger>
                      <TooltipContent>
                        {ISOToDateTime(props.message?.createdAt)}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <Avatar className="ml-4">
                <AvatarImage
                  alt={
                    props.message?.user.nickname || props.message?.user.username
                  }
                  src="/placeholder-avatar.jpg"
                />
                <AvatarFallback className="dark:bg-gray-200">
                  {props.message?.user.username.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <div className="flex items-start">
              <Avatar className="mr-4">
                <AvatarImage alt="Recipient" src="/placeholder-avatar.jpg" />
                <AvatarFallback className="dark:bg-gray-200">
                  {props.message?.user.username.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start gap-1">
                <div className="text-sm font-semibold dark:text-gray-200">
                  {props.message?.user.nickname || props.message?.user.username}
                </div>
                <div className="max-w-xs px-4 py-2 text-sm text-black bg-gray-200 rounded-t-lg rounded-r-lg">
                  {props.message?.message}
                </div>
                <div className="text-xs text-gray-500">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        {ISOToRelativeTime(props.message?.createdAt)}
                      </TooltipTrigger>
                      <TooltipContent>
                        {ISOToDateTime(props.message?.createdAt)}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
};
