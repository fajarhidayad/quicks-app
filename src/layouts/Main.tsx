import QuickLogo from '@/assets/quick-logo.svg';
import FloatActionButton from '@/components/FloatActionButton';
import Header from '@/components/Header';
import MessageContainer from '@/components/MessageContainer';
import TaskContainer from '@/components/TaskContainer';
import React, { useState } from 'react';

export default function Main({ children }: { children?: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="flex-1 relative">
      <Header />
      {children}
      <div className="fixed right-[34px] bottom-[27px] flex z-50 gap-[26px] items-end">
        {isMenuOpen && (
          <>
            <TaskContainer />
            <MessageContainer />
          </>
        )}
        <FloatActionButton
          bgColor="primary"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          isActive={isMenuOpen}
          activeBg={false}
        >
          <img src={QuickLogo} alt="logo" />
        </FloatActionButton>
      </div>
    </main>
  );
}
