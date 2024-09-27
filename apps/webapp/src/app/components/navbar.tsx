import Logo from '@event-flux/ui/custom/logo';
import CustomAvatar from '@event-flux/ui/custom/custom_avatar';
import { Button } from '@event-flux/ui/button';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className=" px-24 py-4 bg-slate-950 w-[100%] flex justify-between items-center">
      <Logo />
      <div className="right flex">
        <CustomAvatar fallback={'Un'} />
        <div className="cta-buttons flex">
          <Button asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button variant={'secondary'} asChild>
            <Link to="/signup">Signup</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
