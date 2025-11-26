import { useState } from 'react';
import { InspectionHistory } from './pages/InspectionHistory';
import { AIFullScreenAgent } from './components/AIFullScreenAgent';

function App() {
  const [isAgentOpen, setIsAgentOpen] = useState(false);

  return (
    <div className="relative">
      <InspectionHistory onSetupClick={() => setIsAgentOpen(true)} />
      <AIFullScreenAgent isOpen={isAgentOpen} onClose={() => setIsAgentOpen(false)} />
    </div>
  );
}

export default App;
