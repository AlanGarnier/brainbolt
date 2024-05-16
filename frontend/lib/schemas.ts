import { z } from 'zod';

// C'est ici que nous définissons les schémas de validation pour les formulaires avec zod.
// Schema pour le formulaire d'inscription
export const SignUpFormSchema = z.object({
    email: z.string({required_error: "L'email est requis"},).email({ message: "Email invalide" }),
    password: z.string({required_error: "Le mot de passe est requis"},).min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    pseudo: z.string({required_error: "Le nom d'utilisateur est requis"},).min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères"), 
    picture: z.string({ required_error: "L'image est requise" }).url({ message: "L'URL de l'image est invalide" })
});

// Schema pour le formulaire de connexion
export const SignInFormSchema = z.object({
    email: z.string({required_error: "L'email est requis"},).email({ message: "Email invalide" }),
    password: z.string({required_error: "Le mot de passe est requis"},).min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});