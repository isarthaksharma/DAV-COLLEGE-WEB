
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

const AuthButton = () => {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate('/admin')} variant="outline" size="sm">
      <Shield className="h-4 w-4 mr-2" />
      Admin
    </Button>
  );
};

export default AuthButton;
