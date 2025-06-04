
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronRight, MessageSquare } from 'lucide-react';

const AdmissionsFAQ = () => {
  const generalFaqs = [
    {
      question: "When does the admission process start for the upcoming academic year?",
      answer: "The admission process for undergraduate programs typically starts in June, while for postgraduate programs it starts in May. Specific dates are announced on our website and through newspapers every year."
    },
    {
      question: "How can I apply for admission to DAV College?",
      answer: "You can apply online through our college website or visit the admission office for a physical application form. The online application portal is the preferred and more convenient method."
    },
    {
      question: "What are the modes of payment for the application fee?",
      answer: "Application fees can be paid online through credit/debit cards, net banking, or UPI. For offline applications, you can pay by demand draft or at the college cash counter."
    },
    {
      question: "Is there an entrance examination for admission?",
      answer: "For most undergraduate programs, admissions are based on 10+2 marks. However, some postgraduate and all professional programs require an entrance examination. Details are provided in the specific program requirements."
    },
    {
      question: "Can I apply for multiple programs with a single application?",
      answer: "Yes, you can apply for up to three programs with a single application by listing them in order of preference. Each additional program after the first three requires a separate application."
    }
  ];

  const eligibilityFaqs = [
    {
      question: "What is the minimum percentage required for admission?",
      answer: "For most undergraduate programs, the minimum requirement is 50% aggregate in 10+2 (45% for reserved categories). For postgraduate programs, it's 55% in bachelor's degree (50% for reserved categories). Professional programs may have different requirements."
    },
    {
      question: "I completed my 10+2 from a foreign board. Am I eligible to apply?",
      answer: "Yes, students with qualifications from foreign boards can apply provided the qualification is recognized as equivalent to the Indian 10+2 system by the Association of Indian Universities (AIU)."
    },
    {
      question: "Is there any age restriction for admission?",
      answer: "For undergraduate programs, the minimum age requirement is 17 years as of July 1st of the admission year. There is no upper age limit for most programs, though professional courses might have specific age requirements."
    },
    {
      question: "I have a gap year after my 10+2. Will this affect my admission chances?",
      answer: "No, having a gap year does not disqualify you from admission. However, you will need to provide a notarized affidavit explaining the gap period."
    },
    {
      question: "Do you have any sports quota or extracurricular activities quota?",
      answer: "Yes, we reserve a certain number of seats under sports and cultural quotas. Students seeking admission under these quotas need to submit relevant certificates of achievements and may need to appear for trials or auditions."
    }
  ];

  const documentsFaqs = [
    {
      question: "What documents are required for the admission process?",
      answer: "Required documents include 10th and 12th mark sheets and certificates, transfer certificate, character certificate, migration certificate (if applicable), caste certificate (if applicable), passport-sized photographs, and identity/address proof."
    },
    {
      question: "Do I need to submit original documents during application?",
      answer: "No, you need to submit self-attested photocopies during the application process. Original documents are required only at the time of final admission for verification."
    },
    {
      question: "My final semester/year results are pending. Can I still apply?",
      answer: "Yes, you can apply with your provisional results or marksheets of completed semesters/years. However, final admission will be subject to meeting the eligibility criteria based on final results."
    },
    {
      question: "Do international students need additional documents?",
      answer: "Yes, international students need to submit additional documents like a valid passport, visa, English proficiency test scores (IELTS/TOEFL/PTE), and equivalence certificate for their qualifications."
    },
    {
      question: "I don't have my migration certificate yet. Can I submit it later?",
      answer: "Yes, you can submit an undertaking at the time of admission and provide the migration certificate within a specified timeframe, usually within 1-2 months of admission."
    }
  ];

  const feesFaqs = [
    {
      question: "What is the fee structure for different programs?",
      answer: "Fee structures vary by program. Current fee details are available on our website under the 'Fees & Scholarships' section or can be obtained from the admission office."
    },
    {
      question: "Are there any additional fees apart from the tuition fee?",
      answer: "Yes, there are additional fees for examination, library, laboratory, sports, cultural activities, etc. These are detailed in the fee structure document provided during admission."
    },
    {
      question: "What are the available modes of payment for fees?",
      answer: "Fees can be paid online through the college portal using credit/debit cards, net banking, or UPI. Offline payment options include demand draft or payment at the college accounts office."
    },
    {
      question: "Is there an installment option for fee payment?",
      answer: "Yes, fees can be paid in two installments for most programs. The first installment is due at the time of admission, and the second is typically due before the commencement of the second semester."
    },
    {
      question: "Are there any scholarships or fee waivers available?",
      answer: "Yes, we offer various scholarships based on merit, need, sports achievements, and other criteria. Details are available on our website under the 'Scholarships' section."
    }
  ];

  const miscFaqs = [
    {
      question: "Does the college provide hostel facilities?",
      answer: "Yes, we have separate hostels for boys and girls with modern amenities and security. Hostel allocation is done based on availability and distance from hometown."
    },
    {
      question: "How can I transfer from another college to DAV College?",
      answer: "Transfer admissions are considered on a case-by-case basis, subject to seat availability and eligibility. You need to apply with all academic records, a no-objection certificate from your current college, and a valid reason for transfer."
    },
    {
      question: "What is the language of instruction for courses?",
      answer: "Most courses are taught in English, with some programs offering options in Hindi or other regional languages. The primary medium of instruction is specified in each program's details."
    },
    {
      question: "Are there any special provisions for differently-abled students?",
      answer: "Yes, we have reserved seats, accessible infrastructure, and special support services for differently-abled students as per government guidelines."
    },
    {
      question: "How can I check the status of my application?",
      answer: "You can check your application status by logging into the admission portal using your application ID and password, or by contacting the admission office with your application details."
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Find answers to common questions about the admission process at DAV College.
          If you can't find what you're looking for, please contact our admission office.
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">General Admission Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {generalFaqs.map((faq, index) => (
            <AccordionItem key={index} value={`general-item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Eligibility & Requirements</h2>
        <Accordion type="single" collapsible className="w-full">
          {eligibilityFaqs.map((faq, index) => (
            <AccordionItem key={index} value={`eligibility-item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Documents & Submissions</h2>
        <Accordion type="single" collapsible className="w-full">
          {documentsFaqs.map((faq, index) => (
            <AccordionItem key={index} value={`documents-item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Fees & Financial Information</h2>
        <Accordion type="single" collapsible className="w-full">
          {feesFaqs.map((faq, index) => (
            <AccordionItem key={index} value={`fees-item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Miscellaneous</h2>
        <Accordion type="single" collapsible className="w-full">
          {miscFaqs.map((faq, index) => (
            <AccordionItem key={index} value={`misc-item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="bg-gray-50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          If you couldn't find the answer to your question, please feel free to contact our admission office.
          We're here to help you through every step of the admission process.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild>
            <Link to="/contact">
              <MessageSquare className="mr-2 h-4 w-4" />
              Contact Admission Office
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/application">
              Apply Now <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdmissionsFAQ;
