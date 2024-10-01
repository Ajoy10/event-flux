import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../dropdown-menu';
import { Link } from 'react-router-dom';

type ProfileDropdownMenuType = {
  children?: React.ReactNode;
  logoutHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export default function ProfileDropdownMenu(props: ProfileDropdownMenuType) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{props.children || <>Open</>}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem className=" cursor-pointer" asChild>
          <Link to={'#'}>Profile</Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          className=" cursor-pointer text-red-500"
          onClick={props.logoutHandler}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
