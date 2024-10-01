import { Button } from '@event-flux/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@event-flux/ui/card';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../hooks/stores/useAuth';

export default function LoginPage() {
  const isLoggedIn = useAuthStore((state) => state.isAuthenticated);

  // TODO: Redirect to dashboard
  return isLoggedIn ? <>Already logged in</> : <Login />;
}

function Login() {
  return (
    <div className=" flex justify-center items-center h-96">
      <Card className=" px-4 py-2 w-max">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Login to your account or{' '}
            <Link to={'/signup'}>create your account.</Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link to={'http://localhost:3000' + '/auth/google'}>
              Sign in with google
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
