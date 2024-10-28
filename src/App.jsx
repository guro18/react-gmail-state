/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import Header from './components/Header'
import initialEmails from './data/emails'
import './styles/App.css'

function App() {
  const [emails, setEmails] = useState(initialEmails);
  const [allEmails, setAllEmails] = useState(initialEmails);
  const [hideReadChecked, setHideReadChecked] = useState(false);
  const [inboxCount, setInboxCount] = useState(0);
  const [starredCount, setStarredCount] = useState(0);
  const [selectedTab, setSelectedTab] = useState("inbox");

  useEffect(() => {
    setInboxCount(allEmails.length);
    setStarredCount(allEmails.filter((email) => email.starred).length);
  }, [allEmails]);

  const toggleRead = (emailId) => {
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === emailId ? { ...email, read: !email.read } : email
      )
    );

    setAllEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === emailId ? { ...email, read: !email.read } : email
      )
    );
  };

  const toggleStarred = (emailId) => {
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === emailId ? {...email, starred: !email.starred } : email 
      )
    );

    setAllEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === emailId ? { ...email, starred: !email.starred } : email
      )
    );
  };

  const handleHideReadChange = () => {
    setHideReadChecked((prevChecked) => {
      const newChecked = !prevChecked;
      setEmails(newChecked ? allEmails.filter((email) => 
        !email.read) : allEmails);
      return newChecked;
    });
  };

  const handleInboxClick = () => {
    setSelectedTab("inbox");
    setEmails(allEmails); // Show all emails when Inbox is selected
  };

  const handleStarredClick = () => {
    setSelectedTab("starred");
    setEmails(allEmails.filter((email) => email.starred)); // Show only starred emails
  };

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={selectedTab === "inbox" ? "item active" : "item"}
            onClick={handleInboxClick}
          >
            <span className="label">Inbox</span>
            <span className="count">{inboxCount}</span>
          </li>
          <li
            className={selectedTab === "starred" ? "item active" : "item"}
            onClick={handleStarredClick}
          >
            <span className="label">Starred</span>
            <span className="count">{starredCount}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide Read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideReadChecked}
              onChange={handleHideReadChange}
            />
          </li>
        </ul>
      </nav>
      <main>
        <ul className="emails">
          {emails.map(email => (
            <li key={email.id} className={`email ${email.read ? 'read' : 'unread'}`}>
              <div className="select">
                <input 
                  className="select-checkbox" 
                  type="checkbox" 
                  checked={email.read}
                  onChange={() => toggleRead(email.id)}
                />
              </div>
              <div className="star">
                <input 
                className="star-checkbox" 
                type="checkbox" 
                defaultChecked={email.starred}
                onChange={() => toggleStarred(email.id)}
                />
              </div>
              <div className="sender">{email.sender}</div>
              <div className="title">{email.title}</div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default App
