import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import CategoryAdmin from '@/src/features/categories/components/CategoryAdmin/CategoryAdmin';
import React from 'react';

const Categories: React.FC = () => {
  return (
    <AdminLayout pageTitle="Категории" createLink="categories/new-category">
      <CategoryAdmin />
    </AdminLayout>
  );
};

export default Categories;
