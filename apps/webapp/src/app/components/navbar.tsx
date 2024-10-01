import Logo from '@event-flux/ui/custom/logo';
import CustomAvatar from '@event-flux/ui/custom/custom-avatar';
import ProfileDropdownMenu from '@event-flux/ui/custom/profile-dropdown-menu';
import { Button } from '@event-flux/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../hooks/stores/useAuth';
import axiosApi from '../utils/axios-service';

export default function Navbar() {
  const isLoggedIn = useAuthStore((state) => state.isAuthenticated);
  // TODO: Show loading while checking for authentication : Need a better laoding management
  return (
    <div className=" px-24 py-4 bg-slate-950 w-[100%] flex justify-between items-center">
      <Logo />
      <div className="right flex">
        {isLoggedIn ? (
          <ProfileMenu />
        ) : (
          <div className="cta-buttons flex">
            <Button asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button variant={'secondary'} asChild>
              <Link to="/signup">Signup</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function ProfileMenu() {
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const profile = useAuthStore((state) => state.profile);

  const navigate = useNavigate();
  // TODO: Make /profile work

  return (
    <div className="flex justify-center items-center gap-2 text-white">
      <ProfileDropdownMenu
        logoutHandler={async (e) => {
          try {
            await axiosApi.delete('/auth/logout', {
              withCredentials: true,
            });

            setAuthenticated(false);
            navigate('/login');
          } catch (err) {
            // Error handling
            console.error(err);
          }
        }}
      >
        <CustomAvatar
          fallback={profile?.fullname || 'Un'}
          src={profile?.profileImagePath || undefined}
        />
      </ProfileDropdownMenu>
    </div>
  );
}
