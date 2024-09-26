import '@event-flux/styles/globals.css';
import NxWelcome from './nx-welcome';

import { Button } from '@event-flux/ui/button';
import Navbar from './components/navbar';

export function App() {
  return (
    <div>
      <Navbar />
      <div className="flex w-[100%] justify-center">
        <Button>Hello</Button>
      </div>
    </div>
  );
}

export default App;
