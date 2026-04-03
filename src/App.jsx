import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
function App() {

  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-[var(--background)] text-[var(--foreground)]">
    
          <main className="flex-1 overflow-y-auto">
            <Routes>
              {/* <Route path="/" element={<Dashboard />} /> */}
            </Routes>
          </main>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
