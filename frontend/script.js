const API_URL = 'http://localhost:3000/messages';

const form = document.getElementById('messageForm');
const nameInput = document.getElementById('name');
const messageInput = document.getElementById('message');
const statusDiv = document.getElementById('status');
const messagesDiv = document.getElementById('messages');

// Load messages on page load
window.onload = fetchMessages;

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    statusDiv.textContent = 'Sending...';

    const data = {
        name: nameInput.value,
        message: messageInput.value
    };

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!res.ok) throw new Error('Failed to submit message.');

        nameInput.value = '';
        messageInput.value = '';
        statusDiv.textContent = 'Message sent!';
        fetchMessages();
    } catch (err) {
        statusDiv.textContent = 'Error submitting message.';
        console.error(err);
    }
});

async function fetchMessages() {
    try {
        const res = await fetch(API_URL);
        const messages = await res.json();
        renderMessages(messages);
    } catch (err) {
        messagesDiv.innerHTML = '<p>Error loading messages.</p>';
    }
}

function renderMessages(messages) {
    messagesDiv.innerHTML = messages.map(msg => `
        <div class="message-card">
            <div class="meta">${msg.name} – ${new Date(msg.timestamp).toLocaleString()}</div>
            <div class="content">${msg.message}</div>
        </div>
    `).join('');
}
