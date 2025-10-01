import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/shared/lib/redux';
import type { User } from '@/entities/user/model/types';
import { addUser, updateUser, deleteUser } from '@/entities/user/model/userSlice';
import { UserForm } from '@/features/user-form/ui/UserForm';
import { Modal } from '@/shared/ui/Modal';

const USERS_PER_PAGE = 10;

export const UserManagementWidget = () => {
  const users = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = (id: string) => {
    if (confirm('Удалить пользователя?')) {
      dispatch(deleteUser(id));
    }
  };

  const handleSubmit = (data: Omit<User, 'id'>) => {
    if (editingUser) {
      dispatch(updateUser({ ...data, id: editingUser.id }));
    } else {
      dispatch(addUser(data));
    }
    setIsFormOpen(false);
    setEditingUser(null);
  };


  const totalPages = Math.max(1, Math.ceil(users.length / USERS_PER_PAGE));

  useEffect(() => {
    const newTotal = Math.max(1, Math.ceil(users.length / USERS_PER_PAGE));
    if (currentPage > newTotal) {
      setCurrentPage(newTotal);
    }
  }, [users.length]);

  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const paginatedUsers = users.slice(startIndex, startIndex + USERS_PER_PAGE);

  return (
    <div className="max-w-[1200px] mx-auto p-4">
      <div className="flex justify-between">
        <p className="text-white text-[24px]">Список пользователей</p>
        <button
          onClick={() => setIsFormOpen(true)}
          className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-green-700"
        >
          + Добавить пользователя
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full border border-[#5B5B5B]">
          <thead className="bg-[#414141]">
            <tr>
              <th className="py-3 px-4 border border-[#5B5B5B] text-white text-center">ID</th>
              <th className="py-3 px-4 border border-[#5B5B5B] text-center text-white">Имя</th>
              <th className="py-3 px-4 border border-[#5B5B5B] text-center text-white">Email</th>
              <th className="py-3 px-4 border border-[#5B5B5B] text-center text-white">Телефон</th>
              <th className="py-3 px-4 border border-[#5B5B5B] text-center text-white">Роль</th>
              <th className="py-3 px-4 border border-[#5B5B5B] text-center text-white">Действия</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length === 0 ? (
              <tr className='bg-[#414141]'>
                <td colSpan={6} className="py-3 px-4 border text-white border-[#414141] text-center">
                  Нет пользователей
                </td>
              </tr>
            ) : (
              paginatedUsers.map((user) => (
                <tr key={user.id} className="border-t bg-[#373737] hover:bg-gray-700">
                  <td className="py-3 px-4 border text-white border-[#414141] text-center">{user.name}</td>
                  <td className="py-3 px-4 border text-white border-[#414141] text-center text-sm">{user.id.slice(0, 8)}</td>
                  <td className="py-3 px-4 border text-white border-[#414141] text-center">{user.email}</td>
                  <td className="py-3 px-4 border text-white border-[#414141] text-center">{user.phone}</td>
                  <td className="py-3 px-4 border text-white border-[#414141] text-center">{user.role}</td>
                  <td className="py-3 px-4 border border-[#414141] text-center space-x-2">
                    <button
                      onClick={() => {
                        setEditingUser(user);
                        setIsFormOpen(true);
                      }}
                      className="bg-[#3E3E3E] rounded-xl hover:bg-[#4F4F4F]"
                    >
                      <img src="public/assets/edit.svg" alt="edit" className="w-8 h-8" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-[#3E3E3E] rounded-xl hover:bg-[#4F4F4F]"
                    >
                      <img src="public/assets/delete.svg" alt="delete" className="w-8 h-8" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded ${
              page === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {page}
          </button>
        ))}     
      </div>

      <Modal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingUser(null);
        }}
      >
        <UserForm
          initialData={editingUser || undefined}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingUser(null);
          }}
        />
      </Modal>
    </div>
  );
};
