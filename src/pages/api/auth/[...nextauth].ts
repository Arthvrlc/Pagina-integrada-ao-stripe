import { query as q } from 'faunadb'

import NextAuth from 'next-auth'
import GitHubProvider from "next-auth/providers/github";

import { fauna } from '../../../services/fauna';

export default NextAuth({
providers: [
    GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
       authorization: {
        params: {
            scope: 'read:user'
        },
       },
    }),
],
callbacks: {
    async signIn({ user, account, profile }) {
        const  email  = user ;
    
        try {
      await fauna.query(
        q.Create(q.Collection('users'), {data: {email}}) 
      )
        
      return true
    } catch  {
        return false;
    }
    },
}
})