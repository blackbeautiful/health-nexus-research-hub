
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, FileEdit, Printer, Download, Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const PatientHistoryPage = () => {
  return (
    <MainLayout>
      <PageHeader
        title="Patient History"
        description="Comprehensive patient medical history"
        breadcrumbs={[
          { label: 'Medical Records', link: '/medical-records' },
          { label: 'Patient History' }
        ]}
        action={{
          label: 'Edit History',
          icon: FileEdit,
          onClick: () => console.log('Edit patient history')
        }}
      />

      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        <Card className="flex-1">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Sarah Johnson</CardTitle>
                <CardDescription>Patient ID: PT-12345</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Printer className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Patient Information</h3>
                  <div className="space-y-2">
                    <div>
                      <div className="text-sm font-medium">Date of Birth</div>
                      <div className="text-sm">July 12, 1975 (49 years)</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Sex</div>
                      <div className="text-sm">Female</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Blood Type</div>
                      <div className="text-sm">A+</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Contact Details</h3>
                  <div className="space-y-2">
                    <div>
                      <div className="text-sm font-medium">Address</div>
                      <div className="text-sm">123 Main Street, Apt 4B</div>
                      <div className="text-sm">San Francisco, CA 94123</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Phone</div>
                      <div className="text-sm">(555) 123-4567</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Email</div>
                      <div className="text-sm">sarah.johnson@example.com</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Emergency Contact</h3>
                  <div className="space-y-2">
                    <div>
                      <div className="text-sm font-medium">Name</div>
                      <div className="text-sm">Michael Johnson</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Relationship</div>
                      <div className="text-sm">Spouse</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Phone</div>
                      <div className="text-sm">(555) 234-5678</div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Primary Diagnosis</h3>
                <div className="p-3 rounded-md bg-blue-50 border border-blue-100 mb-3">
                  <div className="flex flex-wrap gap-2 mb-1">
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Primary</Badge>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Active</Badge>
                    <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">ICD-10: C50.911</Badge>
                  </div>
                  <div className="text-sm font-medium">Malignant neoplasm of unspecified site of right female breast</div>
                  <div className="text-sm mt-1">Diagnosed on April 10, 2025 by Dr. Rebecca Martinez</div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Current Medications</h3>
                <div className="divide-y">
                  <div className="py-3">
                    <div className="text-sm font-medium">Anastrozole 1mg</div>
                    <div className="text-sm">1 tablet daily</div>
                    <div className="text-xs text-muted-foreground mt-1">Started on April 20, 2025 by Dr. Rebecca Martinez</div>
                  </div>
                  <div className="py-3">
                    <div className="text-sm font-medium">Lisinopril 10mg</div>
                    <div className="text-sm">1 tablet daily</div>
                    <div className="text-xs text-muted-foreground mt-1">Started on August 15, 2024 by Dr. Elena Rodriguez</div>
                  </div>
                  <div className="py-3">
                    <div className="text-sm font-medium">Vitamin D 2000 IU</div>
                    <div className="text-sm">1 tablet daily</div>
                    <div className="text-xs text-muted-foreground mt-1">Started on January 05, 2024 by Dr. James Wilson</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Medication
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="medical" className="mb-6">
        <TabsList>
          <TabsTrigger value="medical">Medical History</TabsTrigger>
          <TabsTrigger value="surgical">Surgical History</TabsTrigger>
          <TabsTrigger value="family">Family History</TabsTrigger>
          <TabsTrigger value="social">Social History</TabsTrigger>
          <TabsTrigger value="allergies">Allergies</TabsTrigger>
          <TabsTrigger value="immunizations">Immunizations</TabsTrigger>
        </TabsList>

        <Card className="mt-6 border">
          <TabsContent value="medical" className="m-0">
            <CardHeader className="pb-0">
              <CardTitle>Medical History</CardTitle>
              <CardDescription>Past and current medical conditions</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4">
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 w-20 justify-center">
                      Active
                    </Badge>
                  </div>
                  <div>
                    <h4 className="text-base font-medium">Breast Cancer</h4>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      <span>Diagnosed: April 10, 2025</span>
                    </div>
                    <p className="text-sm mt-2">
                      Stage IIA (T2N0M0) invasive ductal carcinoma of the right breast. ER+/PR+, HER2-.
                      Currently undergoing treatment.
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start">
                  <div className="mr-4">
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 w-20 justify-center">
                      Active
                    </Badge>
                  </div>
                  <div>
                    <h4 className="text-base font-medium">Hypertension</h4>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      <span>Diagnosed: August 15, 2024</span>
                    </div>
                    <p className="text-sm mt-2">
                      Essential hypertension. Well-controlled on Lisinopril 10mg daily.
                      Recent BP readings averaging 126/82 mmHg.
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start">
                  <div className="mr-4">
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 w-20 justify-center">
                      Active
                    </Badge>
                  </div>
                  <div>
                    <h4 className="text-base font-medium">Obesity</h4>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      <span>Diagnosed: April 8, 2025</span>
                    </div>
                    <p className="text-sm mt-2">
                      BMI 32.4. Nutrition counseling provided. Goal to reduce BMI to under 30 within 6 months.
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start">
                  <div className="mr-4">
                    <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 w-20 justify-center">
                      Resolved
                    </Badge>
                  </div>
                  <div>
                    <h4 className="text-base font-medium">Asthma</h4>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      <span>Diagnosed: November 22, 2023</span>
                    </div>
                    <p className="text-sm mt-2">
                      Mild intermittent asthma. No recent exacerbations or symptoms.
                      No current medication required.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Medical Condition
              </Button>
            </CardFooter>
          </TabsContent>
          
          <TabsContent value="surgical" className="m-0">
            <CardHeader className="pb-0">
              <CardTitle>Surgical History</CardTitle>
              <CardDescription>Past surgical procedures</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="text-base font-medium">Right Breast Lumpectomy with Sentinel Lymph Node Biopsy</h4>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      <span>April 25, 2025</span>
                    </div>
                    <p className="text-sm mt-2">
                      Surgeon: Dr. Michael Chen<br />
                      Facility: Memorial General Hospital<br />
                      Findings: Complete excision of 2.3cm IDC with clear margins. 3 sentinel lymph nodes negative for metastasis.
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start">
                  <div className="mr-4">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="text-base font-medium">Appendectomy</h4>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      <span>June 12, 2015</span>
                    </div>
                    <p className="text-sm mt-2">
                      Surgeon: Dr. Lisa Park<br />
                      Facility: City Medical Center<br />
                      Findings: Acute appendicitis. Uncomplicated laparoscopic procedure.
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start">
                  <div className="mr-4">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="text-base font-medium">Cesarean Section</h4>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      <span>March 3, 2005</span>
                    </div>
                    <p className="text-sm mt-2">
                      Surgeon: Dr. Emily Johnson<br />
                      Facility: Women's Health Hospital<br />
                      Findings: Uncomplicated C-section due to fetal distress. Healthy male infant delivered.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Surgical Procedure
              </Button>
            </CardFooter>
          </TabsContent>
          
          <TabsContent value="family" className="m-0">
            <CardHeader className="pb-0">
              <CardTitle>Family History</CardTitle>
              <CardDescription>Medical conditions in family members</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h4 className="text-base font-medium mb-2">Maternal History</h4>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm font-medium">Mother</div>
                        <div className="text-sm mt-1">Breast cancer at age 62</div>
                        <div className="text-sm">Hypertension</div>
                        <div className="text-sm">Type 2 Diabetes</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Maternal Grandmother</div>
                        <div className="text-sm mt-1">Breast cancer at age 58</div>
                        <div className="text-sm">Died at 72 (stroke)</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Maternal Aunt</div>
                        <div className="text-sm mt-1">Ovarian cancer at age 49</div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-base font-medium mb-2">Paternal History</h4>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm font-medium">Father</div>
                        <div className="text-sm mt-1">Hypertension</div>
                        <div className="text-sm">Coronary artery disease</div>
                        <div className="text-sm">Died at 75 (heart attack)</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Paternal Grandfather</div>
                        <div className="text-sm mt-1">Colon cancer at age 70</div>
                        <div className="text-sm">Died at 73 (cancer)</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Paternal Grandmother</div>
                        <div className="text-sm mt-1">Alzheimer's disease</div>
                        <div className="text-sm">Died at 82</div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-base font-medium mb-2">Siblings</h4>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm font-medium">Sister (47 years)</div>
                        <div className="text-sm mt-1">No significant health issues</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Brother (45 years)</div>
                        <div className="text-sm mt-1">High cholesterol</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Update Family History
              </Button>
            </CardFooter>
          </TabsContent>
          
          <TabsContent value="allergies" className="m-0">
            <CardHeader className="pb-0">
              <CardTitle>Allergies & Adverse Reactions</CardTitle>
              <CardDescription>Known allergies and drug sensitivities</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-red-50 border border-red-100">
                  <div className="flex items-center">
                    <Badge variant="destructive" className="mr-2">Severe</Badge>
                    <h4 className="text-base font-medium">Penicillin</h4>
                  </div>
                  <p className="text-sm mt-2">
                    Reaction: Anaphylaxis<br />
                    First observed: 1995<br />
                    Notes: Required emergency treatment. Avoid all penicillin derivatives.
                  </p>
                </div>
                
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-100">
                  <div className="flex items-center">
                    <Badge className="bg-amber-500 mr-2">Moderate</Badge>
                    <h4 className="text-base font-medium">Sulfa Drugs</h4>
                  </div>
                  <p className="text-sm mt-2">
                    Reaction: Skin rash, hives<br />
                    First observed: 2010<br />
                    Notes: Developed rash after 2 days of treatment with sulfamethoxazole.
                  </p>
                </div>
                
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
                  <div className="flex items-center">
                    <Badge className="bg-blue-500 mr-2">Mild</Badge>
                    <h4 className="text-base font-medium">Latex</h4>
                  </div>
                  <p className="text-sm mt-2">
                    Reaction: Contact dermatitis<br />
                    First observed: 2018<br />
                    Notes: Mild skin irritation when in prolonged contact with latex gloves.
                  </p>
                </div>
                
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
                  <div className="flex items-center">
                    <Badge className="bg-blue-500 mr-2">Mild</Badge>
                    <h4 className="text-base font-medium">Shellfish</h4>
                  </div>
                  <p className="text-sm mt-2">
                    Reaction: Mild GI upset<br />
                    First observed: 2008<br />
                    Notes: Nausea and abdominal pain after consuming shrimp and lobster.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Allergy
              </Button>
            </CardFooter>
          </TabsContent>
          
          <TabsContent value="immunizations" className="m-0">
            <CardHeader className="pb-0">
              <CardTitle>Immunization Record</CardTitle>
              <CardDescription>Vaccines and immunizations</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left text-sm font-medium text-muted-foreground pb-2">Vaccine</th>
                      <th className="text-left text-sm font-medium text-muted-foreground pb-2">Date</th>
                      <th className="text-left text-sm font-medium text-muted-foreground pb-2">Provider</th>
                      <th className="text-left text-sm font-medium text-muted-foreground pb-2">Next Due</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="py-3">
                        <div className="font-medium">Influenza (Flu)</div>
                        <div className="text-xs text-muted-foreground">Quadrivalent</div>
                      </td>
                      <td className="py-3">Oct 15, 2024</td>
                      <td className="py-3">Dr. James Wilson</td>
                      <td className="py-3">Oct 2025</td>
                    </tr>
                    <tr>
                      <td className="py-3">
                        <div className="font-medium">Tetanus-Diphtheria (Td)</div>
                        <div className="text-xs text-muted-foreground">Booster</div>
                      </td>
                      <td className="py-3">May 3, 2022</td>
                      <td className="py-3">Dr. Elena Rodriguez</td>
                      <td className="py-3">May 2032</td>
                    </tr>
                    <tr>
                      <td className="py-3">
                        <div className="font-medium">COVID-19</div>
                        <div className="text-xs text-muted-foreground">mRNA Booster</div>
                      </td>
                      <td className="py-3">Sep 12, 2024</td>
                      <td className="py-3">Pharmacy (CVS)</td>
                      <td className="py-3">As recommended</td>
                    </tr>
                    <tr>
                      <td className="py-3">
                        <div className="font-medium">Pneumococcal (PPSV23)</div>
                      </td>
                      <td className="py-3">Jan 22, 2023</td>
                      <td className="py-3">Dr. James Wilson</td>
                      <td className="py-3">N/A</td>
                    </tr>
                    <tr>
                      <td className="py-3">
                        <div className="font-medium">Shingles (Shingrix)</div>
                        <div className="text-xs text-muted-foreground">Dose 2 of 2</div>
                      </td>
                      <td className="py-3">Mar 14, 2023</td>
                      <td className="py-3">Dr. James Wilson</td>
                      <td className="py-3">N/A</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Immunization
              </Button>
            </CardFooter>
          </TabsContent>
          
          <TabsContent value="social" className="m-0">
            <CardHeader className="pb-0">
              <CardTitle>Social History</CardTitle>
              <CardDescription>Lifestyle and social factors</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Tobacco Use</h4>
                    <div className="p-3 rounded-lg bg-green-50 border border-green-100">
                      <p className="font-medium">Never smoker</p>
                      <p className="text-sm mt-1">No history of tobacco use</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Alcohol Consumption</h4>
                    <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
                      <p className="font-medium">Social drinker</p>
                      <p className="text-sm mt-1">1-2 glasses of wine, 1-2 times per week</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Substance Use</h4>
                    <div className="p-3 rounded-lg bg-green-50 border border-green-100">
                      <p className="font-medium">None</p>
                      <p className="text-sm mt-1">No history of illicit substance use</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Exercise Habits</h4>
                    <div className="p-3 rounded-lg bg-amber-50 border border-amber-100">
                      <p className="font-medium">Minimal</p>
                      <p className="text-sm mt-1">Walking 1-2 times per week, 20 minutes</p>
                      <p className="text-xs mt-2">Note: Exercise plan recommended as part of weight management</p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Diet</h4>
                  <p className="text-sm mb-2">
                    Standard American diet with moderate intake of processed foods. Low intake of fruits and vegetables.
                    Dietary counseling provided for weight management and cancer survivorship nutrition.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Occupation</h4>
                  <p className="text-sm mb-2">
                    Administrative Assistant at a legal firm. Full-time office work, primarily sedentary.
                    Currently on medical leave for cancer treatment (since April 15, 2025).
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Living Situation</h4>
                  <p className="text-sm mb-2">
                    Lives with husband in a two-bedroom apartment. Second floor with elevator access.
                    Adequate support system with husband as primary caregiver.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <Button variant="outline">
                <FileEdit className="h-4 w-4 mr-2" />
                Update Social History
              </Button>
            </CardFooter>
          </TabsContent>
        </Card>
      </Tabs>
    </MainLayout>
  );
};

export default PatientHistoryPage;
