import { useState } from 'react';
import { Send, X, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

interface ChatbotProduct {
  id: number;
  name: string;
  price: number;
}

interface ChatbotResponse {
  products: ChatbotProduct[];
  message: string;
}

interface Message {
  type: 'user' | 'bot';
  text: string;
  products?: ChatbotProduct[];
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { type: 'bot', text: 'Hello! I am Indo Artiest. How can I help you find products today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await axios.post<ChatbotResponse>(
        'http://localhost:8083/api/chatbot/ask',
        { message: userMessage },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      setMessages(prev => [...prev, {
        type: 'bot',
        text: response.data.message,
        products: response.data.products
      }]);
    } catch (error) {
      console.error('Chatbot error:', error);
      toast({
        title: 'Error',
        description: 'Failed to get response from chatbot',
        variant: 'destructive',
      });
      setMessages(prev => [...prev, {
        type: 'bot',
        text: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col">
          <div className="bg-primary text-primary-foreground p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <h3 className="font-semibold">Indo Artiest</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] ${msg.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'} rounded-lg p-3 space-y-3`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  
                  {msg.products && msg.products.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-border/30">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Products Found</p>
                      <div className="grid gap-2">
                        {msg.products.map((product) => (
                          <div key={product.id} className="bg-card rounded-lg p-3 shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm text-card-foreground truncate">{product.name}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">ID: {product.id}</p>
                              </div>
                              <div className="text-right shrink-0">
                                <p className="font-bold text-primary text-sm">₹{product.price.toFixed(2)}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className="animate-pulse">💭</div>
                    <p className="text-sm">Thinking...</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button onClick={handleSend} disabled={isLoading || !inputValue.trim()} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      )}
    </>
  );
};

export default Chatbot;
