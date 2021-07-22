import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import { verifyPassword } from "../../../lib/auth";
import { getMongoClient } from "../../../lib/db";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await getMongoClient();
        const connection = await client.connect();

        const usersCollection = connection.db("users").collection("faculties");

        const user = await usersCollection.findOne({
          employeeID: credentials.employeeID,
        });

        if (!user) {
          connection.close();
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(credentials.password, user.hashedPassword);

        if (!isValid) {
          connection.close();
          throw new Error("Could not log you in!");
        }

        connection.close();
        return { employeeID: user.employeeID };
      },
    }),
  ],
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      //  "user" parameter is the object received from "authorize"
      //  "token" is being send below to "session" callback...
      //  ...so we set "user" param of "token" to object from "authorize"...
      //  ...and return it...
      user && (token.user = user);
      return token;
    },
    async session(session, token) {
      //  "session" is current session object
      //  below we set "user" param of "session" to value received from "jwt" callback
      session.user = token.user;
      return session;
    },
  },
});
