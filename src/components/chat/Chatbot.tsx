
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send, X, ExternalLink } from 'lucide-react';
import { findRelevantResponse, getDefaultResponse } from './ChatbotKnowledgeBase';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  links?: { text: string; url: string }[];
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m here to help you navigate our website and answer questions about our institution. How can I assist you today?',
      isBot: true,
      timestamp: new Date(),
      links: [
        { text: 'Admissions', url: '/admission-process' },
        { text: 'Programs', url: '/programs' },
        { text: 'Scholarships', url: '/scholarships' }
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      // Find relevant response
      const relevantResponse = findRelevantResponse(inputMessage) || getDefaultResponse();
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: relevantResponse.response,
        isBot: true,
        timestamp: new Date(),
        links: relevantResponse.links
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg z-50 transition-all duration-300 ${
          isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 h-96 shadow-2xl z-40 flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-center">Campus Assistant</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isBot
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-blue-500 text-white'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    {message.links && message.links.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {message.links.map((link, index) => (
                          <button
                            key={index}
                            onClick={() => handleLinkClick(link.url)}
                            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 underline"
                          >
                            <ExternalLink className="h-3 w-3" />
                            {link.text}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="sm">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Chatbot;
