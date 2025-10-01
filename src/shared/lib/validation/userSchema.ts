
import { z } from 'zod';

const roleEnum = ['Admin', 'User', 'Manager'] as const;

export const userSchema = z.object({
  name: z
    .string()
    .min(2, 'Имя должно содержать не менее 2 символов')
    .trim()
    .nonempty('Имя обязательно'),

  email: z
    .string()
    .email('Некорректный формат email')
    .nonempty('Email обязателен'),

  phone: z
    .string()
    .regex(
      /^(\+7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
      'Неверный формат телефона (пример: +7 999 123-45-67)'
    )
    .nonempty('Телефон обязателен'),

  role: z.enum(roleEnum),
});

export type Role = (typeof roleEnum)[number];
export type UserFormData = z.infer<typeof userSchema>;