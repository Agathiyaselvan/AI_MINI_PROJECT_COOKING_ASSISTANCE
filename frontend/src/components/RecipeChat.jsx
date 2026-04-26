import React, { useState, useRef, useEffect } from 'react'
import apiClient from '../api/apiClient'
import './RecipeChat.css'

const RecipeChat = () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const suggestedQueries = [
    'I have eggs, tomatoes, cheese',
    'Chicken + garlic + lemon, low calorie',
    'Quick vegan breakfast with oats'
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (query) => {
    if (!query.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: query,
      sender: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await apiClient.post('/chat', { query })
      
      const botMessage = {
        id: Date.now() + 1,
        text: response.data.answer,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Error: Unable to reach the server. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
        isError: true
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleSuggestedQuery = (query) => {
    handleSendMessage(query)
  }

  return (
    <div className="recipe-chat-container">
      <div className="chat-content">
        {messages.length === 0 ? (
          <div className="welcome-section">
            <div className="chef-icon">👨‍🍳</div>
            <h1 className="welcome-title">Hello! What ingredients do you have?</h1>
            <p className="welcome-subtitle">
              Tell me what's in your kitchen and I'll suggest the perfect recipe 
              with nutrition info, substitutions, and step-by-step instructions.
            </p>
            <div className="suggested-queries">
              {suggestedQueries.map((query, index) => (
                <button
                  key={index}
                  className="suggestion-chip"
                  onClick={() => handleSuggestedQuery(query)}
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="messages-list">
            {messages.map(message => (
              <div
                key={message.id}
                className={`message ${message.sender} ${message.isError ? 'error' : ''}`}
              >
                <div className="message-avatar">
                  {message.sender === 'user' ? '👤' : '👨‍🍳'}
                </div>
                <div className="message-content">
                  <div className="message-text">
                    {message.sender === 'bot' ? (
                      <div className="bot-response" dangerouslySetInnerHTML={{ __html: formatBotResponse(message.text) }} />
                    ) : (
                      message.text
                    )}
                  </div>
                  <div className="message-time">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="message bot">
                <div className="message-avatar">👨‍🍳</div>
                <div className="message-content">
                  <div className="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="input-section">
        <div className="input-wrapper">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && !loading && handleSendMessage(input)}
            placeholder="e.g. 'I have eggs, tomatoes, cheese — quick meal in 15 mins'"
            className="input-field"
            disabled={loading}
          />
          <button
            onClick={() => handleSendMessage(input)}
            disabled={loading || !input.trim()}
            className="send-button"
          >
            {loading ? '⏳' : '➤'}
          </button>
        </div>
      </div>
    </div>
  )
}

function formatBotResponse(text) {
  // Format recipe response with better styling
  let formatted = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.*?)__/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>')
    .replace(/- /g, '<li>')
    .replace(/<li>.*?<br\/>/g, match => `<li>${match.slice(4, -5)}</li>`)

  // Wrap li tags in ul
  if (formatted.includes('<li>')) {
    formatted = formatted.replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>')
    formatted = formatted.replace(/<\/li><li>/g, '</li>\n<li>')
  }

  return formatted
}

export default RecipeChat
