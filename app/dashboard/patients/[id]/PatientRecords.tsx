"use client"

import { Patient } from "@/actions/patients";
import { Doctor, MedicalRecord, RecordType } from "@/prisma/generated/prisma";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/shadcn/dialog"
import { useState, useRef, useEffect } from "react";
import { Upload, FileIcon, Download, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { uploadMedicalRecord, deleteMedicalRecord, downloadMedicalRecord } from "@/actions/medical-records";

export default function PatientRecords({ doctor, patient, medicalRecords }: { doctor: Doctor, patient: Patient, medicalRecords: MedicalRecord[] }) {
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedRecordType, setSelectedRecordType] = useState<RecordType | null>(RecordType.LAB_RESULT);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState<{
        upload: boolean,
        delete: Record<string, boolean>,
        download: Record<string, boolean>,
    }>({
        upload: false,
        delete: {},
        download: {},
    });
    if (!patient) {
        return <div>Patient not found</div>;
    }

    const allowedFileTypes = [
        'image/jpeg',
        'image/png',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    const validateFile = (file: File): boolean => {
        if (!allowedFileTypes.includes(file.type)) {
            alert('Please upload only JPEG, PNG, PDF, DOC, or DOCX files.');
            return false;
        }
        return true;
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0 && validateFile(files[0])) {
            setSelectedFile(files[0]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0 && validateFile(files[0])) {
            setSelectedFile(files[0]);
        }
    };

    const handleSubmit = async () => {
        setIsLoading({ ...isLoading, upload: true });
        if (!selectedFile) {
            alert('Please select a file first');
            return;
        }
        if (!selectedRecordType) {
            alert('Please select a record type');
            return;
        }
        console.log('Uploading file:', selectedFile, selectedRecordType);
        await uploadMedicalRecord(patient.id, selectedFile, selectedRecordType, doctor.id, { path: `/dashboard/patients/${patient.id}` });
        setSelectedFile(null);
        setSelectedRecordType(null);
        setIsLoading({ ...isLoading, upload: false });
    };
    useEffect(() => {
        setOpen(false);
    }, [medicalRecords]);
    return <div className="bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">{patient.user.fullName}</h1>
        <div className="text-sm text-gray-500 mb-4">
            {!medicalRecords.length && <p>No medical records found</p>}
            {medicalRecords.length > 0 && <p>{medicalRecords.length} medical {medicalRecords.length === 1 ? 'record' : 'records'}</p>}
        </div>
        <div className="flex flex-col gap-4">
            {medicalRecords.map((record) => (
                <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                        <FileIcon className="w-6 h-6 text-emerald-600" />
                        <div>
                            <h3 className="font-medium">{record.title}</h3>
                            <p className="text-sm text-gray-500">{new Date(record.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {record.fileUrl && (
                            <button
                                type="button"
                                onClick={async () => {
                                    setIsLoading(prev => ({ ...prev, download: { ...prev.download, [record.id]: true } }));
                                    const blob = await downloadMedicalRecord(record.fileUrl!);
                                    const url = URL.createObjectURL(blob);
                                    window.open(url, '_blank');
                                    setIsLoading(prev => ({ ...prev, download: { ...prev.download, [record.id]: false } }));
                                }}
                                className="p-2 text-gray-600 hover:text-emerald-600 transition-colors"
                                disabled={isLoading.download[record.id]}
                            >
                                {isLoading.download[record.id] ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-5 h-5" />}
                            </button>
                        )}
                        <button
                            onClick={async () => {
                                setIsLoading(prev => ({ ...prev, delete: { ...prev.delete, [record.id]: true } }));
                                if (confirm('Are you sure you want to delete this record?')) {
                                    await deleteMedicalRecord(record.id);
                                    setIsLoading(prev => ({ ...prev, delete: { ...prev.delete, [record.id]: false } }));
                                    window.location.reload();
                                } else {
                                    setIsLoading(prev => ({ ...prev, delete: { ...prev.delete, [record.id]: false } }));
                                }
                            }}
                            className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                            disabled={isLoading.delete[record.id]}
                        >
                            {isLoading.delete[record.id] ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            ))}
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="bg-emerald-600 text-white p-2 rounded-md mt-4">Upload Document</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload a document for {patient.user.fullName}</DialogTitle>
                </DialogHeader>
                <div>
                    <label htmlFor="recordType" className="block text-sm font-medium text-gray-700 mb-2">Record Type</label>
                    <select
                        name="recordType"
                        id="recordType"
                        value={selectedRecordType || ''}
                        onChange={(e) => setSelectedRecordType(e.target.value as RecordType)}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value={RecordType.LAB_RESULT}>Lab Result</option>
                        <option value={RecordType.PRESCRIPTION}>Prescription</option>
                        <option value={RecordType.VISIT_SUMMARY}>Visit Summary</option>
                        <option value={RecordType.MEDICAL_HISTORY}>Medical History</option>
                        <option value={RecordType.OTHER}>Other</option>
                    </select>
                    <div
                        className={`mt-4 border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragging ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 hover:border-emerald-400'}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Upload className="w-10 h-10 mx-auto text-gray-400 mb-4" />
                        <div className="text-sm text-gray-600">
                            {selectedFile ? selectedFile.name : 'Drag and drop your file here, or click to select'}
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                            Supported formats: PDF, JPEG, PNG, DOC, DOCX
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                            onChange={handleFileSelect}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        onClick={handleSubmit}
                        disabled={!selectedFile || !selectedRecordType || isLoading.upload}
                        className="bg-emerald-600 hover:bg-emerald-700"
                    >
                        Upload
                        {isLoading.upload && <Loader2 className="w-4 h-4 animate-spin" />}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
}