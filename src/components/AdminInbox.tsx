import React, { useState, useEffect } from 'react';
import { X, Lock, Unlock, Database, RotateCw, Trash2, ExternalLink, Inbox, CheckCircle, Mail, Globe, MessageSquare, Key } from 'lucide-react';

interface Message {
  id: string;
  type: 'contact' | 'audit';
  name: string;
  email: string;
  message: string;
  website?: string;
  date: string;
  status: 'new' | 'read';
}

interface AdminInboxProps {
  isDark: boolean;
}

export default function AdminInbox({ isDark }: AdminInboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [authToken, setAuthToken] = useState<string>(() => sessionStorage.getItem('lumora_vault_token') || '');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!sessionStorage.getItem('lumora_vault_token'));
  const [pinCode, setPinCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'contact' | 'audit'>('all');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState({ success: false, message: '' });
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus({ success: false, message: '' });
    
    if (newPassword.trim().length === 0) {
      setPasswordStatus({ success: false, message: 'Password cannot be empty.' });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordStatus({ success: false, message: 'Passwords do not match.' });
      return;
    }
    
    setIsUpdatingPassword(true);
    try {
      const response = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken || sessionStorage.getItem('lumora_vault_token')}`
        },
        body: JSON.stringify({ newPassword: newPassword.trim() })
      });
      
      const data = await response.json();
      if (response.ok && data.success) {
        sessionStorage.setItem('lumora_vault_token', data.token);
        setAuthToken(data.token);
        setPasswordStatus({ success: true, message: 'Vault passcode updated successfully!' });
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          setIsChangingPassword(false);
          setPasswordStatus({ success: false, message: '' });
        }, 2500);
      } else {
        setPasswordStatus({ success: false, message: data.error || 'Failed to update credentials.' });
      }
    } catch (err) {
      setPasswordStatus({ success: false, message: 'Unreachable secure link. Check network.' });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  // Listen for the custom toggle event
  useEffect(() => {
    const handleToggle = () => {
      setIsOpen(prev => !prev);
    };
    window.addEventListener('toggle-admin-inbox', handleToggle);
    return () => {
      window.removeEventListener('toggle-admin-inbox', handleToggle);
    };
  }, []);

  // Fetch live logs from server using secure authorization token
  const fetchMessages = async () => {
    if (!authToken && !sessionStorage.getItem('lumora_vault_token')) return;
    setIsLoading(true);
    let serverMessages: Message[] = [];
    const activeToken = authToken || sessionStorage.getItem('lumora_vault_token') || '';
    
    try {
      const response = await fetch('/api/admin/messages', {
        headers: {
          'Authorization': `Bearer ${activeToken}`,
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && Array.isArray(data.messages)) {
          serverMessages = data.messages;
        }
      } else if (response.status === 401) {
        // Token stale or invalid
        handleLogout();
        setErrorMsg('Security session expired. Please authenticate again.');
        return;
      }
    } catch (err) {
      console.warn('Could not load messages from server, relying on local redundancy:', err);
    }

    // Merge with key local storage items to ensure redundancy
    const localContact = JSON.parse(localStorage.getItem('arbina_messages') || '[]');
    const localAudit = JSON.parse(localStorage.getItem('arbina_inquiries') || '[]');
    
    const formattedLocalContact: Message[] = localContact.map((m: any, i: number) => ({
      id: `local-c-${i}-${m.date}`,
      type: 'contact',
      name: m.name,
      email: m.email,
      message: m.message,
      date: m.date || new Date().toISOString(),
      status: 'new' as const
    }));

    const formattedLocalAudit: Message[] = localAudit.map((m: any, i: number) => ({
      id: `local-a-${i}-${m.date}`,
      type: 'audit',
      name: m.name,
      email: m.email,
      website: m.website,
      message: m.message,
      date: m.date || new Date().toISOString(),
      status: 'new' as const
    }));

    // Combine and sort by date descending
    const combined = [...serverMessages];
    
    // Check for duplicates before adding local backups
    const serverEmailsAndDates = new Set(serverMessages.map(m => `${m.email}-${m.message.slice(0, 10)}`));
    
    [...formattedLocalContact, ...formattedLocalAudit].forEach(loc => {
      const uniqueKey = `${loc.email}-${loc.message.slice(0, 10)}`;
      if (!serverEmailsAndDates.has(uniqueKey)) {
        combined.push(loc);
      }
    });

    combined.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setMessages(combined);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchMessages();
    }
  }, [isOpen, isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: pinCode.trim() })
      });
      
      const data = await response.json();
      if (response.ok && data.success) {
        sessionStorage.setItem('lumora_vault_token', data.token);
        setAuthToken(data.token);
        setIsAuthenticated(true);
        setErrorMsg('');
        setPinCode('');
      } else {
        setErrorMsg(data.error || 'Access denied. Unauthorized credential block.');
      }
    } catch (err) {
      setErrorMsg('Endpoint unreachable. Ensure server is initialized.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('lumora_vault_token');
    setAuthToken('');
    setIsAuthenticated(false);
    setPinCode('');
    setMessages([]);
  };

  const handleMarkAsRead = async (id: string) => {
    // If it's a server message, call API with authentication headers
    if (!id.startsWith('local-')) {
      try {
        await fetch('/api/admin/read', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({ id })
        });
      } catch (e) {
        console.error('Failed to mark as read', e);
      }
    }
    
    // Optimistic update
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status: 'read' as const } : m));
  };

  const handleClearLogs = async () => {
    if (!window.confirm('Are you absolute certain you want to clear client message records on the server? This action is irreversible.')) {
      return;
    }
    
    try {
      await fetch('/api/admin/clear', { 
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
    } catch (e) {
      console.error('Failed to clear records', e);
    }

    localStorage.removeItem('arbina_messages');
    localStorage.removeItem('arbina_inquiries');
    setMessages([]);
  };

  if (!isOpen) return null;

  const filteredMessages = messages.filter(m => {
    if (activeTab === 'all') return true;
    return m.type === activeTab;
  });

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-end font-sans overflow-hidden">
      {/* Absolute Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
        onClick={() => setIsOpen(false)}
      />

      {/* Slide Drawer Content container */}
      <div className={`relative w-full max-w-2xl h-full flex flex-col shadow-2xl border-l transition-all duration-300 ${
        isDark ? 'bg-zinc-950 border-white/5 text-gray-100' : 'bg-white border-zinc-200 text-zinc-900'
      }`}>
        
        {/* Header line */}
        <div className={`p-6 border-b flex items-center justify-between ${
          isDark ? 'border-white/10' : 'border-zinc-100'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-brand-500/10 flex items-center justify-center text-brand-500">
              <Database className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <h2 className="text-sm font-mono tracking-widest font-bold uppercase">LUMORA INQUIRY VAULT</h2>
              <p className="text-[10px] text-gray-500 font-light pr-2">Secure studio dispatch and real-time records database</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className={`p-1.5 rounded-lg border hover:scale-105 transition-all cursor-pointer ${
              isDark ? 'border-white/10 bg-white/5 text-gray-400 hover:text-white' : 'border-zinc-200 bg-zinc-50 text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Auth Screening Layer */}
        {!isAuthenticated ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6 max-w-sm mx-auto">
            <div className="w-12 h-12 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-500 border border-brand-500/20">
              <Lock className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display text-lg font-semibold tracking-tight text-white">Partner Security Clearance</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                This area contains restricted corporate assets and client inquiries. Please provide your secure admin password.
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-3">
              <input
                type="password"
                value={pinCode}
                required
                onChange={(e) => setPinCode(e.target.value)}
                placeholder="••••••••••••"
                className={`w-full p-3 rounded-lg border text-center text-sm font-mono focus:outline-none focus:ring-1 focus:ring-brand-500/50 ${
                  isDark ? 'bg-black border-white/10 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-950'
                }`}
                autoFocus
              />
              {errorMsg && (
                <p className="text-xs text-red-500 font-mono tracking-wide">{errorMsg}</p>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-lg bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer"
              >
                {isLoading ? 'Decrypting...' : 'Decrypt Database'}
              </button>
            </form>
          </div>
        ) : (
          /* Main Inbox Interface */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Filters and Actions Bar */}
            <div className={`p-4 border-b flex flex-wrap items-center justify-between gap-4 ${
              isDark ? 'bg-zinc-900/40 border-white/10' : 'bg-zinc-50 border-zinc-100'
            }`}>
              {/* Left filter tabs */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 rounded-lg font-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'all'
                      ? 'bg-brand-500 text-white'
                      : isDark ? 'text-gray-400 hover:text-white bg-white/5' : 'text-gray-600 hover:text-zinc-900 bg-white shadow-sm border border-zinc-200'
                  }`}
                >
                  All Inquiries ({messages.length})
                </button>
                <button
                  onClick={() => setActiveTab('contact')}
                  className={`px-3 py-1.5 rounded-lg font-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'contact'
                      ? 'bg-brand-500 text-white'
                      : isDark ? 'text-gray-400 hover:text-white bg-white/5' : 'text-gray-600 hover:text-zinc-900 bg-white shadow-sm border border-zinc-200'
                  }`}
                >
                  Direct Msg ({messages.filter(m => m.type === 'contact').length})
                </button>
                <button
                  onClick={() => setActiveTab('audit')}
                  className={`px-3 py-1.5 rounded-lg font-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'audit'
                      ? 'bg-brand-500 text-white'
                      : isDark ? 'text-gray-400 hover:text-white bg-white/5' : 'text-gray-600 hover:text-zinc-900 bg-white shadow-sm border border-zinc-200'
                  }`}
                >
                  Projects ({messages.filter(m => m.type === 'audit').length})
                </button>
              </div>

              {/* Right side global actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsChangingPassword(prev => !prev)}
                  title="Change Admin Password"
                  className={`p-2 rounded-lg border hover:scale-105 transition-all text-xs cursor-pointer ${
                    isChangingPassword
                      ? 'bg-brand-500 border-brand-500 text-white'
                      : isDark ? 'border-white/10 hover:bg-white/5 text-gray-400 hover:text-white' : 'border-zinc-200 hover:bg-zinc-100 text-zinc-650 hover:text-zinc-950 bg-white shadow-sm'
                  }`}
                >
                  <Key className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={fetchMessages}
                  disabled={isLoading}
                  title="Reload Messages"
                  className={`p-2 rounded-lg border hover:scale-105 transition-all text-xs cursor-pointer ${
                    isDark ? 'border-white/10 hover:bg-white/5 text-gray-400 hover:text-white' : 'border-zinc-200 hover:bg-zinc-100 text-zinc-650 hover:text-zinc-950 bg-white shadow-sm'
                  }`}
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-brand-500' : ''}`} />
                </button>
                <button
                  onClick={handleClearLogs}
                  title="Wipe record registers"
                  className={`p-2 rounded-lg border border-red-500/20 hover:scale-105 transition-all text-red-500 hover:bg-red-500/10 text-xs cursor-pointer ${
                    isDark ? 'bg-red-500/5' : 'bg-white shadow-sm'
                  }`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleLogout}
                  title="Lock Console / Sign Out"
                  className={`p-2 rounded-lg border hover:scale-105 transition-all text-xs cursor-pointer ${
                    isDark ? 'border-white/10 bg-white/5 text-gray-400 hover:text-white' : 'border-zinc-200 bg-zinc-50 text-zinc-600 hover:text-zinc-900 shadow-sm'
                  }`}
                >
                  <Unlock className="w-3.5 h-3.5 text-amber-500" />
                </button>
              </div>
            </div>

            {/* Inquiries List Viewport */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {isChangingPassword ? (
                <div className="max-w-md mx-auto py-8 space-y-6 text-left">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-500 border border-brand-500/20">
                      <Key className="w-5 h-5" />
                    </div>
                    <h3 className={`font-display text-lg font-semibold tracking-tight ${isDark ? 'text-white' : 'text-zinc-950'}`}>Modify Vault Passcode</h3>
                    <p className={`text-xs font-light leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-650'}`}>
                      Update the AES-256 decrypted lock screen key. Ensure you keep this code written in a password manager to retain access to future sessions.
                    </p>
                  </div>

                  <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className={`block text-[10px] font-mono uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        New Security password
                      </label>
                      <input
                        type="password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className={`w-full p-2.5 rounded-lg border text-xs focus:ring-1 focus:ring-brand-500/50 focus:outline-none ${
                          isDark ? 'bg-black/40 border-white/10 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-950'
                        }`}
                        autoFocus
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className={`block text-[10px] font-mono uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Confirm password
                      </label>
                      <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className={`w-full p-2.5 rounded-lg border text-xs focus:ring-1 focus:ring-brand-500/50 focus:outline-none ${
                          isDark ? 'bg-black/40 border-white/10 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-950'
                        }`}
                      />
                    </div>

                    {passwordStatus.message && (
                      <div className={`p-3 rounded-lg text-xs font-mono border ${
                        passwordStatus.success 
                          ? 'bg-green-500/5 border-green-500/20 text-green-500' 
                          : 'bg-red-500/5 border-red-500/20 text-red-500'
                      }`}>
                        {passwordStatus.message}
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <button
                        type="submit"
                        disabled={isUpdatingPassword}
                        className="flex-1 py-2 rounded-lg bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer text-center"
                      >
                        {isUpdatingPassword ? 'Updating...' : 'Commit Code Change'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsChangingPassword(false);
                          setPasswordStatus({ success: false, message: '' });
                        }}
                        className={`px-4 py-2 rounded-lg border text-xs transition-all cursor-pointer ${
                          isDark ? 'border-white/10 text-gray-400 hover:text-white hover:bg-white/5' : 'border-zinc-200 text-zinc-650 hover:text-zinc-950 bg-white shadow-sm'
                        }`}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              ) : isLoading ? (
                <div className="py-24 text-center space-y-4">
                  <div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-xs text-gray-500 font-mono">Decrypting server-side memory blocks...</p>
                </div>
              ) : filteredMessages.length === 0 ? (
                <div className="py-24 text-center space-y-4 max-w-sm mx-auto">
                  <div className="w-10 h-10 rounded-full bg-zinc-500/10 flex items-center justify-center mx-auto text-gray-450">
                    <Inbox className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-medium text-sm">Inbox is client-free</h4>
                    <p className="text-xs text-gray-500 font-light mt-1">
                      There are currently no received inquiries registered under the selected filter. Try sending one from the site!
                    </p>
                  </div>
                </div>
              ) : (
                filteredMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-5 rounded-xl border text-left relative transition-all duration-200 group ${
                      msg.status === 'new' 
                        ? isDark ? 'bg-brand-500/5 border-brand-500/20' : 'bg-brand-50/20 border-brand-200' 
                        : isDark ? 'bg-black/30 border-white/5' : 'bg-zinc-50/50 border-zinc-150'
                    }`}
                  >
                    {/* Status Dot */}
                    {msg.status === 'new' && (
                      <span className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                    )}

                    {/* Meta coordinates info */}
                    <div className="flex items-center gap-2 mb-3.5 flex-wrap">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold tracking-wider uppercase ${
                        msg.type === 'audit' 
                          ? 'bg-amber-500/10 text-amber-500 border border-amber-550/20' 
                          : 'bg-green-500/10 text-green-500 border border-green-550/20'
                      }`}>
                        {msg.type === 'audit' ? 'Project Consultation' : 'Direct Message'}
                      </span>
                      {msg.id.startsWith('local-') && (
                        <span className="px-2 py-0.5 rounded text-[8px] font-mono bg-blue-500/10 text-blue-400 border border-blue-550/20">
                          Secure Local Backup
                        </span>
                      )}
                      <span className="text-[10px] text-gray-500 font-mono">
                        {new Date(msg.date).toLocaleString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>

                    {/* Client Credentials Card */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3.5">
                      <div className="flex items-center gap-1.5 font-sans">
                        <span className="text-gray-400 font-mono text-[10px]">CLIENT:</span> 
                        <strong className="font-semibold">{msg.name}</strong>
                      </div>
                      <div className="flex items-center gap-1.5 overflow-hidden">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <a 
                          href={`mailto:${msg.email}`} 
                          className="text-brand-500 hover:underline truncate"
                        >
                          {msg.email}
                        </a>
                      </div>
                      {msg.website && (
                        <div className="flex items-center gap-1.5 col-span-1 sm:col-span-2 overflow-hidden">
                          <Globe className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-400 font-mono text-[10px]">WEBSITE:</span>
                          <a 
                            href={msg.website} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="hover:underline flex items-center gap-0.5 text-amber-500"
                          >
                            <span className="truncate">{msg.website}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Message detail body */}
                    <div className={`p-3 rounded-lg text-xs leading-relaxed font-light ${
                      isDark ? 'bg-black/50 text-gray-300' : 'bg-white text-zinc-700'
                    }`}>
                      {msg.message || <em className="text-gray-400">No description provided.</em>}
                    </div>

                    {/* Client specific actions inside each card */}
                    {msg.status === 'new' && (
                      <div className="mt-3.5 flex justify-end">
                        <button
                          onClick={() => handleMarkAsRead(msg.id)}
                          className="px-2.5 py-1 rounded border border-brand-500/20 hover:border-brand-500/50 bg-brand-500/5 text-brand-500 font-mono text-[9px] hover:bg-brand-500/15 uppercase tracking-wide transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <CheckCircle className="w-3 h-3" />
                          <span>Acknowledge Read</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Bottom Status panel */}
            <div className={`p-4 border-t text-center text-[10px] font-mono text-gray-500 uppercase tracking-widest ${
              isDark ? 'border-white/10 bg-zinc-950' : 'border-zinc-100 bg-zinc-50'
            }`}>
              🔒 AES-256 Memory Decryption Layer Verified
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
