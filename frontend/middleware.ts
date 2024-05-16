import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    async authorized({ token }) {
      // Si le token existe, l'utilisateur est autorisé
      return !!token;
    },
  },
});

export const config = {
  matcher: [
    // Liste des routes protégées ici
    '/dashboard/:path*',  // Ici on protège toutes les sous-routes de /dashboard
  ],
};
