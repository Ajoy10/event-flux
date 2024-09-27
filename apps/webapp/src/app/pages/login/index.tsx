import { Button } from '@event-flux/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@event-flux/ui/card';
import { Link } from 'react-router-dom';

export default function LoginPage() {
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
          <Button>Sign in with google</Button>
        </CardContent>
      </Card>
    </div>
  );
}
