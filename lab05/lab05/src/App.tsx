import React, { useState } from 'react';
import { YesNoApp } from './components/YesNoApp';
import { Magic8Ball } from './components/Magic8Ball';

type Tab = 'yesno' | 'magic8';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('yesno');

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans text-gray-900">
      <header className="max-w-5xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Лабораторная работа №5
        </h1>
        <p className="text-gray-600">Моделирование случайных событий</p>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setActiveTab('yesno')}
            className={`px-6 py-2 rounded-full font-medium transition ${activeTab === 'yesno'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
          >
            Часть 1: Да/Нет
          </button>
          <button
            onClick={() => setActiveTab('magic8')}
            className={`px-6 py-2 rounded-full font-medium transition ${activeTab === 'magic8'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
          >
            Часть 2: Шар предсказаний
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto">
        {activeTab === 'yesno' ? (
          <YesNoApp />
        ) : (
          <Magic8Ball />
        )}
      </main>
    </div>
  );
}

export default App;