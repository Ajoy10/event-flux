import { Prisma, User as UserModel } from '@event-flux/prisma-client-v1';
import { db } from '../Database';

export async function findOrCreateUser(
  query: Prisma.UserWhereInput,
  newUser: Prisma.UserCreateInput
): Promise<UserModel | null> {
  const foundUser = await db.user.findFirst({
    where: query,
  });

  if (foundUser) {
    return foundUser;
  } else {
    const createdUser = await db.user.create({ data: newUser });
    return createdUser;
  }
}
