// models
import { User } from "@/src/@core/models/Auth/auth.model";

export const fixedUser: User & { password?: string } = {
  userName: 'admin',
  email: 'admin@admin.com',
  password: 'admin123',
};
