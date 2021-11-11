import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import { verifyPassword } from "../../../src/lib/auth";
import { getMongoClient } from "../../../src/lib/db";

export default NextAuth({
  session: {
    jwt: true,
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await getMongoClient();
        const connection = await client.connect();

        if (credentials.isAdmin === false || credentials.isAdmin === "false") {
          //dont know why next-auth makes the boolean a string
          const usersCollection = connection
            .db("users")
            .collection("faculties");

          const user = await usersCollection.findOne(
            {
              "profile.employeeID": credentials.employeeID,
            },
            { profile: 1, hashedPassword: 1 }
          );

          if (!user) {
            connection.close();
            throw new Error("No user found!");
          }

          const isValid = await verifyPassword(
            credentials.password,
            user.hashedPassword
          );

          if (!isValid) {
            connection.close();
            //throw new Error("Could not log you in!");
            return null;
          }

          connection.close();

          return { employeeID: user["profile"].employeeID, isAdmin: false };
        } else if (
          credentials.isAdmin === true ||
          credentials.isAdmin === "true"
        ) {
          const usersCollection = connection.db("users").collection("admins");

          const admin = await usersCollection.findOne({
            adminID: credentials.adminID,
          });

          if (!admin) {
            connection.close();
            throw new Error("No such admin found!");
          }

          const isValid = await verifyPassword(
            credentials.password,
            admin.hashedPassword
          );

          if (!isValid) {
            connection.close();
            // throw new Error("Could not log you in!");
            return null;
          }

          connection.close();
          return { adminID: admin.adminID, isAdmin: true };
        }
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
