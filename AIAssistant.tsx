import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI mission assistant. I can help you analyze debris patterns, predict collisions, and optimize shepherd operations. Try asking me something!'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sampleQueries = [
    'Show high-risk debris in LEO',
    'Predict collisions for next 24h',
    'Shepherd fleet status report',
    'Optimize debris collection routes',
  ];

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('high-risk') || lowerMessage.includes('leo')) {
      return 'Analysis complete: Currently tracking 847 debris objects in LEO. High-risk objects:\n\n• DEBRIS-A2847: 401km altitude, 7.8 km/s velocity, collision probability 34%\n• DEBRIS-C1923: 395km altitude, 8.1 km/s velocity, collision probability 28%\n• DEBRIS-F4521: 412km altitude, 7.5 km/s velocity, collision probability 19%\n\nRecommendation: Deploy Shepherds SHEP-003 and SHEP-007 for immediate intercept.';
    }
    
    if (lowerMessage.includes('predict') || lowerMessage.includes('collision')) {
      return 'Collision forecast for next 24 hours:\n\n🟡 3 medium-risk events detected\n🔴 1 high-risk event at 14:30 UTC\n\nPredicted impact zones:\n• Sector 7-Alpha (LEO, 405km)\n• Sector 12-Beta (MEO, 1,200km)\n\nML Model confidence: 94%\nRecommended actions queued for shepherd units.';
    }
    
    if (lowerMessage.includes('shepherd') || lowerMessage.includes('fleet')) {
      return 'Shepherd Fleet Status Report:\n\n✅ Active: 16 units (100%)\n⚡ Average energy: 78%\n💚 Average health: 91%\n\nTop performers:\n• SHEP-003: 247 debris collected\n• SHEP-007: 198 debris collected\n• SHEP-012: 176 debris collected\n\nAll units operating within nominal parameters.';
    }
    
    if (lowerMessage.includes('optimize') || lowerMessage.includes('route')) {
      return 'Route optimization analysis:\n\nCurrent efficiency: 87.3%\nOptimized efficiency: 94.8% (+7.5%)\n\nSuggested route adjustments:\n• SHEP-001: Shift to Sector 9-Delta\n• SHEP-005: Extend patrol range by 50km\n• SHEP-011: Return to base for refuel\n\nEstimated fuel savings: 12.4 liters/day\nApply optimizations?';
    }
    
    return 'I understand your query. Based on current mission parameters:\n\n• Total debris tracked: 36,542 objects\n• Active collection rate: 847 objects/day\n• Bio-fuel generation: 3,421 liters\n• System efficiency: 97.3%\n\nAll systems nominal. What specific data would you like to analyze?';
  };

  const handleSend = async () => {
    if (!message.trim()) return;
    
    const userMessage: Message = { role: 'user', content: message };
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const response = getAIResponse(message);
    const assistantMessage: Message = { role: 'assistant', content: response };
    
    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  return (
    <>
      {/* Collapsed Orb */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-green-bio to-cyan-electric flex items-center justify-center cursor-pointer shadow-lg pulse-green"
          >
            <Bot className="w-8 h-8 text-white" />
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Expanded Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50 w-96 h-[500px] glass-strong rounded-xl border border-green-bio/30 flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-green-bio/20 to-cyan-electric/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-bio to-cyan-electric flex items-center justify-center pulse-green">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold text-green-bio font-mono">AI ASSISTANT</div>
                  <div className="text-xs text-muted-foreground font-mono">Neural Core v2.1</div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`glass rounded-lg p-3 ${
                    msg.role === 'user' ? 'ml-8 border border-cyan-electric/30' : 'mr-8'
                  }`}
                >
                  <div className="text-xs mb-1 font-mono">
                    <span className={msg.role === 'user' ? 'text-cyan-electric' : 'text-green-bio'}>
                      {msg.role === 'user' ? 'You' : 'AI Assistant'}
                    </span>
                  </div>
                  <div className="text-sm whitespace-pre-line">{msg.content}</div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass rounded-lg p-3 mr-8"
                >
                  <div className="text-xs text-green-bio mb-1 font-mono">AI Assistant</div>
                  <div className="flex gap-1">
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-green-bio"
                    />
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 rounded-full bg-green-bio"
                    />
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 rounded-full bg-green-bio"
                    />
                  </div>
                </motion.div>
              )}

              {messages.length === 1 && (
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground font-mono">QUICK QUERIES:</div>
                  {sampleQueries.map((query, i) => (
                    <motion.button
                      key={query}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => setMessage(query)}
                      className="w-full glass rounded-lg p-2 text-left text-sm hover:glass-strong transition-all text-cyan-electric font-mono"
                    >
                      → {query}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-green-bio transition-colors font-mono"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && message.trim()) {
                      handleSend();
                    }
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={!message.trim() || isTyping}
                  className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-bio to-cyan-electric flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5 text-white" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
