// constants/chatStorage.js

// This holds the shared textual message history in-memory during runtime
export let GLOBAL_CHAT_DATABASE = [
  { id: 'm1', sender: 'Doctor', timestamp: '10:14 AM', text: 'Habari Salome, jinsi gani kikohozi chako kinaendelea leo?' },
  { id: 'm2', sender: 'Patient', timestamp: '10:15 AM', text: 'Habari Dr. Neema. Inaendelea vizuri kiasi baada ya kutumia dawa.' }
];

// Subscriptions management array matrix
let activeSubscribers = [];

export const subscribeToChatUpdates = (callback) => {
  activeSubscribers.push(callback);
  // Give the mounting component its initial state load trace instantly
  callback([...GLOBAL_CHAT_DATABASE]);
  
  // Return cleanup tear-down function parameter
  return () => {
    activeSubscribers = activeSubscribers.filter(sub => sub !== callback);
  };
};

export const pushChatMessage = (sender, text) => {
  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  const newMessage = {
    id: `m_${Date.now()}`,
    sender: sender,
    timestamp: timeStr,
    text: text
  };

  GLOBAL_CHAT_DATABASE.push(newMessage);

  // Broadcast data changes to all open chat UI listeners instantly
  activeSubscribers.forEach(callback => callback([...GLOBAL_CHAT_DATABASE]));
};