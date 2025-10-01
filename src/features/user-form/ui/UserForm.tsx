import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema, type UserFormData } from '@/shared/lib/validation/userSchema.ts';

interface UserFormProps {
  initialData?: UserFormData & { id: string };
  onSubmit: (data: UserFormData) => void;
  onCancel?: () => void;
}

export const UserForm = ({ initialData, onSubmit, onCancel }: UserFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          email: initialData.email,
          phone: initialData.phone,
          role: initialData.role,
        }
      : {
          name: '',
          email: '',
          phone: '',
          role: 'User',
        },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-[#373737] p-6"
    >
      <h2 className="text-xl text-center font-semibold mb-4 text-white">
        {initialData ? 'Редактировать пользователя' : 'Добавить пользователя'}
      </h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm opacity-60 text-white mb-1">
          Имя *
        </label>
        <input
          id="name"
          {...register('name')}
          placeholder="Иван Иванов"
          className={`w-full text-white px-3 py-2 border-b ${
            errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
          }`}
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm opacity-60 text-white mb-1">
          Email *
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          placeholder="ivan@example.com"
          className={`w-full text-white px-3 py-2 border-b ${
            errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
          }`}
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm opacity-60 text-white mb-1">
          Телефон *
        </label>
        <input
          id="phone"
          {...register('phone')}
          placeholder="+7 999 123-45-67"
          className={`w-full text-white px-3 py-2 border-b ${
            errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-blue-300'
          }`}
        />
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor="role" className="block text-sm opacity-60 text-white mb-1">
          Роль *
        </label>
        <select
          id="role"
          {...register('role')}
          className={`w-full bg-[#373737] text-white px-3 py-2 border-b ${
            errors.role ? 'border-red-500 focus:ring-red-200' : 'border-blue-300'
          }`}
        >
            <option className='bg-[#414141]' value="User">User</option>
            <option className='bg-[#414141]' value="Admin">Admin</option>
            <option className='bg-[#414141]' value="Manager">Manager</option>
        </select>
        {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>}
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
        >
          {initialData ? 'Сохранить' : 'Добавить'}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 w-full py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Отмена
          </button>
        )}
      </div>
    </form>
  );
};