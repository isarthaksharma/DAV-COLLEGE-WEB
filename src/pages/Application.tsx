
import React from 'react';
import AdmissionForm from '@/components/admission/AdmissionForm';
import Layout from '@/components/layout/Layout';

const Application = () => {
  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Admission Application</h1>
      <p className="text-gray-600 mb-8 text-center">
        Please fill out the form below to apply for admission to our institution.
        Our team will review your application and contact you soon.
      </p>
      <AdmissionForm />
    </div>
  );
};

export default Application;
