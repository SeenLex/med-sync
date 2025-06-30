"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import type { ChatSession } from "@/actions/chat";
import { getUserInfo } from "@/actions/user";
import { formatChatTimestamp } from "@/lib/utils";

export default function ConversationList({ chatSessions, userInfo, onSelectChatSession, selectedChatSessionId }: { chatSessions?: ChatSession[], userInfo: Awaited<ReturnType<typeof getUserInfo>>, onSelectChatSession: (chatSession: ChatSession) => void, selectedChatSessionId?: number }) {
    const [searchQuery, setSearchQuery] = useState("");
    const userType = userInfo.role;
    const otherUserType = userType === "DOCTOR" ? "patient" : "doctor";
    const searchResults = chatSessions?.filter(session => session[otherUserType].user.fullName.toLowerCase().includes(searchQuery.toLowerCase()));
    console.log("searchResults", searchResults);
    return (
        <div className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-200">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {searchResults && searchResults.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                        {searchResults.map((conversation) => {
                            const isActive = conversation.id === selectedChatSessionId;
                            return (
                                <button
                                    key={conversation.id}
                                    className={`w-full p-4 flex items-start space-x-3 text-left hover:bg-gray-50 focus:outline-none transition-colors duration-150 ${isActive ? 'bg-emerald-50 border-l-4 border-emerald-500 font-semibold' : ''}`}
                                    onClick={() => onSelectChatSession(conversation)}
                                    aria-current={isActive ? 'true' : undefined}
                                >
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {userType === "DOCTOR" ? conversation.patient.user.fullName : conversation.doctor.user.fullName}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate">
                                            {conversation.messages[conversation.messages.length - 1]?.content}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <p className="text-xs text-gray-500">
                                            {conversation.messages[conversation.messages.length - 1]?.createdAt &&
                                                formatChatTimestamp(conversation.messages[conversation.messages.length - 1].createdAt)}
                                        </p>
                                        <div className="mt-1 h-2 w-2 bg-emerald-500 rounded-full hidden"></div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                ) : (
                    <div className="p-4 text-center text-gray-500">
                        No conversations yet
                    </div>
                )}
            </div>
        </div>
    );
} 