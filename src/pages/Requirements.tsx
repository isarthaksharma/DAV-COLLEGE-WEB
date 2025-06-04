
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, AlertCircle, GraduationCap, BookOpen, Briefcase } from 'lucide-react';

const Requirements = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Admission Requirements</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Review the eligibility criteria and requirements for admission to various programs at DAV College.
          Make sure you meet the necessary qualifications before applying.
        </p>
      </div>

      <Tabs defaultValue="undergraduate" className="mb-12">
        <div className="flex justify-center mb-8">
          <TabsList className="grid grid-cols-3 w-full max-w-xl">
            <TabsTrigger value="undergraduate" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Undergraduate</span>
            </TabsTrigger>
            <TabsTrigger value="postgraduate" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              <span>Postgraduate</span>
            </TabsTrigger>
            <TabsTrigger value="professional" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span>Professional</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="undergraduate">
          <Card>
            <CardHeader>
              <CardTitle>Undergraduate Program Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-3">Academic Requirements</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Completion of 10+2 (Higher Secondary) or equivalent from a recognized board</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Minimum 50% aggregate marks in 10+2 (45% for reserved categories)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>For Science programs: Physics, Chemistry, Mathematics/Biology in 10+2</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>For Commerce programs: Mathematics/Accountancy in 10+2 preferred</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-3">Documents Required</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>10th standard mark sheet and certificate</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>12th standard mark sheet and certificate</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Transfer Certificate from previous institution</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Character Certificate</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Migration Certificate (if applicable)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Caste Certificate (if applicable)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Four recent passport-sized photographs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Identity proof and Address proof</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-amber-50 p-4 rounded-md">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-amber-800">Important Note:</h4>
                      <p className="text-amber-700">Some programs may have additional specific requirements or entrance tests. Please check the respective program details.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="postgraduate">
          <Card>
            <CardHeader>
              <CardTitle>Postgraduate Program Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-3">Academic Requirements</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Bachelor's degree in relevant discipline from a recognized university</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Minimum 55% aggregate marks in graduation (50% for reserved categories)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>For M.Sc. programs: Bachelor's degree with relevant subject as main/subsidiary</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>For M.Com programs: B.Com or equivalent degree with minimum 50% marks</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-3">Documents Required</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>All mark sheets and degree certificate of graduation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>10th and 12th standard mark sheets and certificates</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Transfer Certificate from previous institution</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Migration Certificate</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Character Certificate</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Caste Certificate (if applicable)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Four recent passport-sized photographs</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-3">Entrance Examination</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Most PG programs require qualifying an entrance examination</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>The entrance exam tests subject knowledge and aptitude</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Some departments may conduct interviews after the written test</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-amber-50 p-4 rounded-md">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-amber-800">Important Note:</h4>
                      <p className="text-amber-700">Entrance exam patterns and interview processes may vary by department. Please check the specific program requirements.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="professional">
          <Card>
            <CardHeader>
              <CardTitle>Professional Program Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-3">Academic Requirements</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>For B.Ed: Bachelor's degree with minimum 50% marks</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>For MBA: Bachelor's degree in any discipline with minimum 50% marks</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>For LLB: Bachelor's degree with minimum 45% marks</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>For B.Pharm: 10+2 with Physics, Chemistry, and Biology/Mathematics with minimum 50% marks</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-3">Entrance Examinations</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>For MBA: Valid score in CAT/MAT/XAT or college entrance test</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>For LLB: Valid score in CLAT or college entrance test</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>For B.Ed: Valid score in state-level entrance test or college entrance test</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>For B.Pharm: Valid score in NEET or college entrance test</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-3">Additional Requirements</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Group Discussion and Personal Interview for MBA program</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Language proficiency test for certain programs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Statement of Purpose (SOP) for some professional courses</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Professional experience certificates (if applicable)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-amber-50 p-4 rounded-md">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-amber-800">Important Note:</h4>
                      <p className="text-amber-700">Professional programs have specific regulatory requirements set by respective councils. Please check the detailed admission guidelines for each program.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Age Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Undergraduate Programs:</p>
                  <p className="text-gray-600">Minimum 17 years as of July 1, 2025. No upper age limit.</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Postgraduate Programs:</p>
                  <p className="text-gray-600">No specific age restrictions.</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Professional Programs:</p>
                  <p className="text-gray-600">Age requirements as per respective regulatory councils.</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>International Student Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Academic Equivalence:</p>
                  <p className="text-gray-600">Qualifications equivalent to Indian standards as certified by AIU.</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">English Proficiency:</p>
                  <p className="text-gray-600">IELTS/TOEFL/PTE scores for students from non-English speaking countries.</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Visa Requirements:</p>
                  <p className="text-gray-600">Valid student visa for the duration of the program.</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Additional Documents:</p>
                  <p className="text-gray-600">Passport, translated copies of academic documents, medical certificates.</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col items-center bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Ready to Apply?</h2>
        <p className="text-gray-600 mb-6 text-center max-w-xl">
          Now that you know the requirements, take the next step in your academic journey.
          Apply today or contact our admission office if you have any questions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg">
            <Link to="/application">Apply Now</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/contact">Contact Admission Office</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Requirements;
