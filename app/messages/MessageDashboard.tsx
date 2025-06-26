"use client";

import { ChatSession, existsOrCreateAllChatSessions } from "@/actions/chat";
import ConversationList from "@/components/messages/ConversationList";
import MessageThread from "@/components/messages/MessageThread";
import { getUserInfo } from "@/actions/user";
import { useEffect, useState } from "react";

export default function MessageDashboard({ userInfo }: { userInfo: Awaited<ReturnType<typeof getUserInfo>> }) {
    const [selectedChatSession, setSelectedChatSession] = useState<ChatSession | null>(null);
    const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
    const [showListMobile, setShowListMobile] = useState(true);

    useEffect(() => {
        const fetchChatSessions = async () => {
            const chatSessions = await existsOrCreateAllChatSessions({
                doctorId: userInfo.role === "DOCTOR" ? userInfo.doctor?.id : null,
                patientId: userInfo.role === "PATIENT" ? userInfo.patient?.id : null,
            });
            if (chatSessions) {
                setChatSessions([...chatSessions]);
            }
        }

        fetchChatSessions();
        const intervalId = setInterval(fetchChatSessions, 2000);
        return () => clearInterval(intervalId);
    }, [userInfo]);

    // Responsive logic
    // Use a media query to determine if we're on mobile
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
    const showList = isMobile ? showListMobile : true;
    const showThread = isMobile ? !showListMobile : true;

    return (
        <div className="flex h-[calc(100vh-4rem)] w-full max-w-full bg-white">
            {/* Conversation List */}
            <div
                className={`transition-all duration-300 h-full w-full md:w-80 border-r border-gray-200 flex-shrink-0 z-20 bg-white
                ${showList ? 'block' : 'hidden'} md:block`}
            >
                <ConversationList
                    chatSessions={chatSessions}
                    userInfo={userInfo}
                    onSelectChatSession={(session) => {
                        setSelectedChatSession(session);
                        setShowListMobile(false);
                    }}
                    selectedChatSessionId={selectedChatSession ? selectedChatSession.id : undefined}
                />
            </div>
            {/* Message Thread */}
            <div
                className={`flex-1 h-full w-full transition-all duration-300 bg-gray-50
                ${showThread && selectedChatSession ? 'block' : 'hidden'} md:block`}
            >
                {selectedChatSession && (
                    <MessageThread
                        chatSession={selectedChatSession}
                        chatSessions={chatSessions}
                        userInfo={userInfo}
                        onBackMobile={() => setShowListMobile(true)}
                    />
                )}
                {!selectedChatSession && !isMobile && (
                    <div className="flex items-center justify-center h-full text-gray-400 text-lg">Select a conversation</div>
                )}
            </div>
        </div>
    );
}