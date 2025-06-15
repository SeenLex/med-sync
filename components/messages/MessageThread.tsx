"use client";

import { useEffect, useState, useRef } from "react";
import { Send, Paperclip } from "lucide-react";
import Button from "@/components/ui/Button";
import { sendMessage, type ChatSession } from "@/actions/chat";
import { getUserInfo } from "@/actions/user";
import { Message } from "@/prisma/generated/prisma";

export default function MessageThread({ chatSession, chatSessions, userInfo }: { chatSession: ChatSession, chatSessions: ChatSession[], userInfo: Awaited<ReturnType<typeof getUserInfo>> }) {
    const [messages, setMessages] = useState<Message[]>(chatSession?.messages || []);
    const [isLoading, setIsLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const updatedSession = chatSessions.find(session => session.id === chatSession.id);
        if (updatedSession) {
            setMessages(updatedSession.messages || []);
        }
    }, [chatSession, chatSessions]);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;
        setIsLoading(true);
        const message = await sendMessage(chatSession.id, newMessage, userInfo, { path: "/messages" });
        if (message) {
            setMessages([...messages, message]);
        }
        setNewMessage("");
        setIsLoading(false);
    };

    return (
        <div className="h-full flex flex-col">
            {/* Contact Header */}
            <div className="px-4 py-3 border-b border-gray-200 flex items-center">
                {chatSession ? (
                    <>
                        <div>
                            <h2 className="text-base font-semibold text-gray-900 mb-1">
                                {userInfo.role === "DOCTOR" ? chatSession.patient.user.fullName : chatSession.doctor.user.fullName}
                            </h2>
                            {/* if doctor more info about patient if patient more info about doctor */}
                            {userInfo.role === "DOCTOR" ? (
                                <p className="text-xs text-gray-500 flex flex-col space-y-1">
                                    <span> <span className="font-bold">Email:</span> {chatSession.patient.user.email}</span>
                                    <span> <span className="font-bold">Phone:</span> {chatSession.patient.user.phone}</span>

                                </p>
                            ) : (
                                <p className="text-xs text-gray-500 flex flex-col space-y-1">
                                    <span> <span className="font-bold">Email:</span> {chatSession.doctor.user.email}</span>
                                    <span> <span className="font-bold">Phone:</span> {chatSession.doctor.user.phone}</span>
                                </p>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="text-gray-500">
                        Select a conversation to start messaging
                    </div>
                )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col space-y-4">
                <div className="flex-1" /> {/* Spacer to push messages to bottom */}
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.senderRole === userInfo.role ? "justify-end" : "justify-start"
                            }`}
                    >
                        <div
                            className={`max-w-[70%] rounded-lg px-4 py-2 ${message.senderRole === userInfo.role
                                    ? "bg-emerald-500 text-white"
                                    : "bg-gray-100 text-gray-900"
                                }`}
                        >
                            <p>{message.content}</p>
                            <p className="text-xs mt-1 opacity-70">
                                {new Date(message.createdAt).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} /> {/* Scroll anchor */}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        onKeyPress={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                            }
                        }}
                    />
                    <Button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim() || isLoading}
                        className="flex items-center space-x-1"
                    >
                        <Send className="h-4 w-4" />
                        <span>Send</span>
                    </Button>
                </div>
            </div>
        </div>
    );
} 