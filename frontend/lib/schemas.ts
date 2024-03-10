import { z } from 'zod';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const SignUpFormSchema = z.object({
    email: z.string({required_error: "L'email est requis"},).email({ message: "Email invalide" }),
    password: z.string({required_error: "Le mot de passe est requis"},).min(8),
    username: z.string({required_error: "Le nom d'utilisateur est requis"},).min(3, "Le nom doit contenir au moins 3 caractères"), 
    image: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
});