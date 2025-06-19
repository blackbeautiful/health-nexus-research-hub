
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Search, Plus, FileText, Activity, Microscope, Dna } from 'lucide-react';

const OncologyStagingPage = () => {
  const [selectedTumorType, setSelectedTumorType] = useState('');
  const [selectedPatient, setSelectedPatient] = useState('');
  const [stagingData, setStagingData] = useState({
    tCategory: '',
    nCategory: '',
    mCategory: '',
    histology: '',
    grade: '',
    size: '',
    biomarkers: {}
  });

  const tumorTypes = {
    'Solid Tumors': {
      'Breast': ['IDC', 'ILC', 'DCIS', 'Phyllodes', 'Inflammatory'],
      'Lung': ['NSCLC - Adenocarcinoma', 'NSCLC - Squamous', 'NSCLC - Large Cell', 'SCLC', 'Carcinoid'],
      'Colorectal': ['Adenocarcinoma', 'Mucinous', 'Signet-ring', 'Neuroendocrine'],
      'Prostate': ['Acinar Adenocarcinoma', 'Ductal', 'Neuroendocrine'],
      'Head & Neck': ['SCC (HPV+)', 'SCC (HPV-)', 'Nasopharyngeal', 'Salivary Gland'],
      'Skin': ['Melanoma', 'Basal Cell Carcinoma', 'Squamous Cell Carcinoma', 'Merkel Cell'],
      'CNS': ['Glioblastoma', 'Astrocytoma', 'Oligodendroglioma', 'Medulloblastoma', 'Meningioma']
    },
    'Hematologic': {
      'Lymphoma': ['Hodgkin - Nodular Sclerosis', 'Hodgkin - Mixed Cellularity', 'DLBCL', 'Follicular', 'Mantle Cell'],
      'Leukemia': ['AML', 'ALL', 'CLL', 'CML'],
      'Multiple Myeloma': ['IgG', 'IgA', 'Light Chain', 'Nonsecretory']
    },
    'Sarcomas': {
      'Soft Tissue': ['Leiomyosarcoma', 'Liposarcoma', 'Synovial Sarcoma', 'Angiosarcoma', 'Rhabdomyosarcoma'],
      'Bone': ['Osteosarcoma', 'Ewing Sarcoma', 'Chondrosarcoma', 'Giant Cell Tumor']
    }
  };

  const biomarkersByTumor = {
    'Breast': ['ER', 'PR', 'HER2', 'Ki-67', 'AR', 'PD-L1'],
    'Lung': ['PD-L1', 'EGFR', 'ALK', 'ROS1', 'RET', 'MET', 'KRAS', 'STK11', 'KEAP1'],
    'Colorectal': ['MSI/dMMR', 'KRAS', 'NRAS', 'BRAF', 'HER2', 'PIK3CA'],
    'Prostate': ['PSA', 'AR', 'PTEN', 'ERG', 'NKX3.1', 'BRCA1/2'],
    'Melanoma': ['BRAF', 'NRAS', 'c-KIT', 'NF1', 'PD-L1', 'SOX10'],
    'CNS': ['IDH1/2', '1p/19q', 'MGMT', 'H3K27M', 'ATRX', 'TP53']
  };

  const handleTumorTypeChange = (tumorType: string) => {
    setSelectedTumorType(tumorType);
    setStagingData({ ...stagingData, biomarkers: {} });
  };

  const calculateStage = () => {
    const { tCategory, nCategory, mCategory } = stagingData;
    
    // Simplified staging logic - would be much more complex in reality
    if (mCategory === 'M1') return 'IV';
    if (nCategory === 'N3') return 'IIIC';
    if (nCategory === 'N2') return 'IIIB';
    if (nCategory === 'N1' && tCategory === 'T3') return 'IIIA';
    if (tCategory === 'T4') return 'IIIA';
    if (nCategory === 'N1') return 'IIB';
    if (tCategory === 'T3') return 'IIB';
    if (tCategory === 'T2') return 'IIA';
    if (tCategory === 'T1') return 'IA';
    
    return 'Unknown';
  };

  const generateNCCNRecommendations = () => {
    const stage = calculateStage();
    const tumor = selectedTumorType.split(' - ')[0];
    
    // Simplified recommendations - would be much more sophisticated
    const recommendations = {
      'Breast': {
        'IA': 'Consider adjuvant endocrine therapy if HR+. Consider adjuvant chemotherapy based on risk factors.',
        'IIA': 'Adjuvant chemotherapy recommended. Add trastuzumab if HER2+.',
        'IIIA': 'Neoadjuvant chemotherapy followed by surgery and radiation therapy.',
        'IV': 'Systemic therapy based on biomarker profile. Consider CDK4/6 inhibitors if HR+.'
      },
      'Lung': {
        'IA': 'Surgical resection. Consider adjuvant chemotherapy for tumors >4cm.',
        'IIIA': 'Concurrent chemoradiation or neoadjuvant therapy followed by surgery.',
        'IV': 'First-line therapy based on biomarkers: EGFR TKI if EGFR+, ALK inhibitor if ALK+.'
      }
    };

    return recommendations[tumor]?.[stage] || 'Consult multidisciplinary team for treatment planning.';
  };

  return (
    <MainLayout>
      <PageHeader
        title="Oncology Staging & Classification"
        description="AI-Powered Cancer Staging and Decision Support Tool"
        action={{
          label: 'New Staging',
          icon: Plus,
          onClick: () => console.log('New staging assessment')
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Selection */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Patient Selection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Search Patient</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or MRN..."
                  className="pl-10"
                  value={selectedPatient}
                  onChange={(e) => setSelectedPatient(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="font-medium">Sarah Johnson</div>
                <div className="text-sm text-muted-foreground">MRN: 12345678</div>
                <div className="text-sm text-muted-foreground">DOB: 03/15/1978</div>
              </div>
              <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="font-medium">Michael Brown</div>
                <div className="text-sm text-muted-foreground">MRN: 23456789</div>
                <div className="text-sm text-muted-foreground">DOB: 07/22/1965</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Staging Interface */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Microscope className="h-5 w-5" />
              Tumor Staging & Classification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="selection" className="space-y-6">
              <TabsList>
                <TabsTrigger value="selection">Tumor Selection</TabsTrigger>
                <TabsTrigger value="staging">TNM Staging</TabsTrigger>
                <TabsTrigger value="biomarkers">Biomarkers</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>

              <TabsContent value="selection">
                <div className="space-y-4">
                  <div>
                    <Label>Tumor Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tumor category" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(tumorTypes).map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Primary Site</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select primary site" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(tumorTypes['Solid Tumors'] || {}).map((site) => (
                          <SelectItem key={site} value={site}>
                            {site}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Histology</Label>
                    <Select onValueChange={handleTumorTypeChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select histology" />
                      </SelectTrigger>
                      <SelectContent>
                        {(tumorTypes['Solid Tumors']?.['Breast'] || []).map((histology) => (
                          <SelectItem key={histology} value={histology}>
                            {histology}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="staging">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div>
                    <Label>T Category</Label>
                    <Select onValueChange={(value) => setStagingData({...stagingData, tCategory: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="T" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tis">Tis</SelectItem>
                        <SelectItem value="T1">T1</SelectItem>
                        <SelectItem value="T2">T2</SelectItem>
                        <SelectItem value="T3">T3</SelectItem>
                        <SelectItem value="T4">T4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>N Category</Label>
                    <Select onValueChange={(value) => setStagingData({...stagingData, nCategory: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="N" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="N0">N0</SelectItem>
                        <SelectItem value="N1">N1</SelectItem>
                        <SelectItem value="N2">N2</SelectItem>
                        <SelectItem value="N3">N3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>M Category</Label>
                    <Select onValueChange={(value) => setStagingData({...stagingData, mCategory: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="M" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="M0">M0</SelectItem>
                        <SelectItem value="M1">M1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {stagingData.tCategory && stagingData.nCategory && stagingData.mCategory && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Overall Stage</div>
                      <div className="text-3xl font-bold text-blue-700">
                        Stage {calculateStage()}
                      </div>
                      <div className="text-sm text-gray-600 mt-2">
                        {stagingData.tCategory}{stagingData.nCategory}{stagingData.mCategory}
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4 mt-6">
                  <div>
                    <Label>Tumor Size (cm)</Label>
                    <Input 
                      type="number" 
                      placeholder="Enter tumor size"
                      onChange={(e) => setStagingData({...stagingData, size: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Histologic Grade</Label>
                    <Select onValueChange={(value) => setStagingData({...stagingData, grade: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="G1">G1 - Well differentiated</SelectItem>
                        <SelectItem value="G2">G2 - Moderately differentiated</SelectItem>
                        <SelectItem value="G3">G3 - Poorly differentiated</SelectItem>
                        <SelectItem value="GX">GX - Cannot be assessed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="biomarkers">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Dna className="h-5 w-5" />
                    <h3 className="font-semibold">Molecular Biomarkers</h3>
                  </div>
                  
                  {selectedTumorType && biomarkersByTumor['Breast']?.map((biomarker) => (
                    <div key={biomarker} className="grid grid-cols-2 gap-4 items-center">
                      <Label>{biomarker}</Label>
                      <div className="flex gap-2">
                        {biomarker === 'Ki-67' || biomarker === 'PD-L1' ? (
                          <Input placeholder="% positive" type="number" />
                        ) : (
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Result" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="positive">Positive</SelectItem>
                              <SelectItem value="negative">Negative</SelectItem>
                              <SelectItem value="unknown">Unknown</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="recommendations">
                <div className="space-y-6">
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      NCCN Guidelines Recommendations
                    </h4>
                    <p className="text-sm mt-2">{generateNCCNRecommendations()}</p>
                  </div>

                  <div className="bg-green-50 border-l-4 border-green-500 p-4">
                    <h4 className="font-semibold">Clinical Trials</h4>
                    <div className="space-y-2 mt-2">
                      <div className="text-sm">
                        <strong>KEYNOTE-522:</strong> Neoadjuvant pembrolizumab + chemotherapy for TNBC
                      </div>
                      <div className="text-sm">
                        <strong>ADAURA:</strong> Adjuvant osimertinib for EGFR+ NSCLC
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                    <h4 className="font-semibold">Survival Data</h4>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600">85%</div>
                        <div className="text-xs text-gray-600">5-year OS</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600">78%</div>
                        <div className="text-xs text-gray-600">5-year DFS</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600">15%</div>
                        <div className="text-xs text-gray-600">Recurrence Risk</div>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">Generate Synoptic Report</Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default OncologyStagingPage;
