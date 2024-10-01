import { Button } from '@event-flux/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@event-flux/ui/card';
import { Link } from 'react-router-dom';

export default function SignupPage() {
  return (
    <div className=" flex justify-center items-center h-96">
      <Card className=" px-4 py-2 w-max">
        <CardHeader>
          <CardTitle>Signup</CardTitle>
          <CardDescription>
            Sign up for an account. If you already have an account,
            <Link to="/login"> login</Link>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button>Sign up with google</Button>
        </CardContent>
      </Card>
    </div>
  );
}
