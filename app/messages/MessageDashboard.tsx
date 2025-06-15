"use client";

import { ChatSession, existsOrCreateAllChatSessions } from "@/actions/chat";
import ConversationList from "@/components/messages/ConversationList";
import MessageThread from "@/components/messages/MessageThread";
import { getUserInfo } from "@/actions/user";
import { useEffect, useState } from "react";

export default function MessageDashboard({ userInfo }: { userInfo: Awaited<ReturnType<typeof getUserInfo>> }) {
    const [selectedChatSession, setSelectedChatSession] = useState<ChatSession | null>(null);
    const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);

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

        // Initial fetch
        fetchChatSessions();

        // Set up polling interval
        const intervalId = setInterval(fetchChatSessions, 2000);

        // Cleanup function to clear interval when component unmounts
        return () => clearInterval(intervalId);
    }, [userInfo]); // Remove selectedChatSession from dependencies
    
    return <div className="flex h-[calc(100vh-4rem)] bg-white">
        <div className="w-80 border-r border-gray-200 flex-shrink-0">
            <ConversationList chatSessions={chatSessions} userInfo={userInfo} onSelectChatSession={setSelectedChatSession} />
        </div>

        <div className="flex-1">
            {selectedChatSession && <MessageThread chatSession={selectedChatSession} chatSessions={chatSessions} userInfo={userInfo} />}
        </div>
    </div>
}