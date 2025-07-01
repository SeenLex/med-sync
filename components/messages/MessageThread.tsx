"use client";

import { useEffect, useState, useRef } from "react";
import { Send, Paperclip } from "lucide-react";
import Button from "@/components/ui/Button";
import { sendMessage, type ChatSession } from "@/actions/chat";
import { getUserInfo } from "@/actions/user";
import { Message as PrismaMessage } from "@/prisma/generated/prisma";

type Message = PrismaMessage & {
    type?: string;
};
import { formatTimeHHMM } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

export default function MessageThread({ chatSession, chatSessions, userInfo, showMobileHeader = false, onBackMobile }: { chatSession: ChatSession, chatSessions: ChatSession[], userInfo: Awaited<ReturnType<typeof getUserInfo>>, showMobileHeader?: boolean, onBackMobile?: () => void }) {
    const [messages, setMessages] = useState<Message[]>(chatSession?.messages || []);
    const [isLoading, setIsLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

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

    const handleFileUpload = async (file: File) => {
        setIsLoading(true);
        try {
            const supabase = createClient();
            const fileName = `chat-files/${chatSession.id}/${Date.now()}-${file.name}`;
            await supabase.storage.from("chat-files").upload(fileName, file);
            const { data: urlData } = supabase.storage.from("chat-files").getPublicUrl(fileName);
            const fileUrl = urlData.publicUrl;
            const message = await sendMessage(chatSession.id, fileUrl, userInfo, { path: "/messages", fileName: file.name, type: "file" });
            if (message) {
                setMessages([...messages, message]);
            }
        } catch {
            alert("File upload failed");
        }
        setIsLoading(false);
    };

    return (
        <div className="h-full flex flex-col">
            {showMobileHeader && (
                <div className="sticky top-0 z-30 bg-white border-b border-gray-200 flex items-center px-4 py-3 shadow-sm">
                    {onBackMobile && (
                        <button onClick={onBackMobile} className="mr-2 text-emerald-600 font-bold text-lg">&#8592;</button>
                    )}
                    <div className="flex-1 min-w-0">
                        <h2 className="text-base font-semibold text-gray-900 truncate">
                            {userInfo.role === "DOCTOR" ? chatSession.patient.user.fullName : chatSession.doctor.user.fullName}
                        </h2>
                    </div>
                </div>
            )}
            {!showMobileHeader && (
                <div className="px-4 py-3 border-b border-gray-200 flex items-center">
                    {chatSession ? (
                        <>
                            <div>
                                <h2 className="text-base font-semibold text-gray-900 mb-1">
                                    {userInfo.role === "DOCTOR" ? chatSession.patient.user.fullName : chatSession.doctor.user.fullName}
                                </h2>
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
            )}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col space-y-4 bg-gray-50">
                <div className="flex-1" />
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.senderRole === userInfo.role ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-[80vw] md:max-w-[70%] rounded-2xl px-4 py-2 shadow-sm
                                ${message.senderRole === userInfo.role ? "bg-emerald-500 text-white" : "bg-white text-gray-900 border border-gray-200"}`}
                        >
                            {message.type === "file" || (message.content && (message.content.endsWith('.jpg') || message.content.endsWith('.jpeg') || message.content.endsWith('.png') || message.content.endsWith('.gif') || message.content.endsWith('.webp') || message.content.endsWith('.bmp') || message.content.endsWith('.pdf'))) ? (
                                (() => {
                                    const ext = ((message.fileName || message.content).split('.').pop() || '').toLowerCase();
                                    const fileName = message.fileName || message.content.split('/').pop();
                                    if (["jpg", "jpeg", "png", "gif", "webp", "bmp"].includes(ext)) {
                                        return (
                                            <a href={message.content} target="_blank" rel="noopener noreferrer">
                                                <Image
                                                    src={message.content}
                                                    alt={fileName || "Image"}
                                                    width={200}
                                                    height={200}
                                                    className="max-w-[200px] max-h-[200px] mb-1"
                                                />
                                            </a>
                                        );
                                    } else if (ext === "pdf") {
                                        return (
                                            <a href={message.content} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 underline">
                                                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.828A2 2 0 0 0 19.414 7.414l-5.828-5.828A2 2 0 0 0 12.172 1H6zm7 1.414L18.586 7H15a2 2 0 0 1-2-2V3.414z"/></svg>
                                                {fileName}
                                            </a>
                                        );
                                    } else {
                                        return (
                                            <a href={message.content} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                                {fileName || "Download file"}
                                            </a>
                                        );
                                    }
                                })()
                            ) : (
                                <p className="text-sm break-words">{message.content}</p>
                            )}
                            <p className="text-xs mt-1 opacity-70 text-right">
                                {formatTimeHHMM(message.createdAt)}
                            </p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-gray-200 bg-white sticky bottom-0 z-20">
                <div className="flex items-center space-x-2">
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 rounded hover:bg-gray-100 flex-shrink-0"
                        title="Attach file"
                        disabled={isLoading}
                        style={{ minWidth: 40, minHeight: 40 }}
                    >
                        <Paperclip className="h-5 w-5" />
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                await handleFileUpload(file);
                                e.target.value = "";
                            }
                        }}
                    />
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm min-w-0"
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
                        className="flex items-center space-x-1 px-4 py-2 rounded-full text-sm flex-shrink-0"
                        style={{ minWidth: 40, minHeight: 40 }}
                    >
                        <Send className="h-4 w-4" />
                        <span>Send</span>
                    </Button>
                </div>
            </div>
        </div>
    );
} 