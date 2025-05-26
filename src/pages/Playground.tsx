
import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const Playground = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      const encodedQuery = encodeURIComponent(currentInput);
      const url = `http://localhost:10000/chat?query=${encodedQuery}`;

      console.log('Sending request to:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: data.answer,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Detailed error:', error);

      let errorMessage = "Failed to send message.";

      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        errorMessage = "Cannot connect to localhost from HTTPS. Try running the app locally or use a tunnel service like ngrok.";
      } else if (error instanceof Error) {
        errorMessage = `Error: ${error.message}`;
      }

      toast({
        title: "Connection Error",
        description: errorMessage,
        variant: "destructive",
      });

      const errorBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: "Sorry, I'm having trouble connecting to the backend. Please check the console for details.",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorBotMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-950 via-amber-900 to-orange-900 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-700 to-orange-800 p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-orange-100 hover:text-white font-medium transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">North Light AI Playground</h1>
            <p className="text-orange-100 text-sm">Intelligent RAG-powered assistant</p>
          </div>
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 max-w-4xl mx-auto w-full p-4 flex flex-col">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-[calc(100vh-200px)]">
          {messages.length === 0 && (
            <div className="text-center text-orange-100 mt-20">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <p className="text-xl font-medium mb-2">Welcome to North Light AI Playground</p>
              <p className="text-sm text-orange-200">Ask me anything about your website content and get intelligent responses powered by RAG technology.</p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
            >
              <div
                className={`max-w-[75%] p-4 rounded-2xl shadow-lg ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                    : 'bg-gradient-to-r from-amber-800 to-orange-800 text-orange-50 border border-orange-700'
                }`}
              >
                <p className="whitespace-pre-wrap break-words">{message.content}</p>
                <p className={`text-xs mt-2 ${
                  message.type === 'user' ? 'text-orange-100' : 'text-orange-200'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start animate-in slide-in-from-bottom-2 duration-300">
              <div className="bg-gradient-to-r from-amber-800 to-orange-800 text-orange-50 border border-orange-700 p-4 rounded-2xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-orange-200">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-orange-900/50 backdrop-blur-lg rounded-2xl p-4 border border-orange-700">
          <div className="flex gap-3">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your website..."
              className="flex-1 px-4 py-3 text-lg bg-orange-800/50 border-orange-600 text-orange-50 placeholder-orange-300 rounded-xl focus:border-orange-500 focus:ring-orange-500/20"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              <Send size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;
