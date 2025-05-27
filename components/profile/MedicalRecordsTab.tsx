import React from "react";
import { FileText, User, Calendar } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";
import { MedicalRecord } from "@/actions/medical-records";

type Props = {
  all: MedicalRecord[];
  page: number;
  setPage: (p: number) => void;
  getTypeInfo: (type: string) => { label: string; color: string };
};

const PAGE_SIZE = 5;

const RecordsTab: React.FC<Props> = ({ all, page, setPage, getTypeInfo }) => {
  const total = Math.ceil(all.length / PAGE_SIZE);
  const slice = all.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Medical Records
      </h2>
      {slice.length > 0 ? (
        <>
          <div className="space-y-4">
            {slice.map((rec) => {
              const info = getTypeInfo(rec.type);
              return (
                <Card
                  key={rec.id}
                  className="p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="bg-emerald-100 p-2 rounded-full">
                        <FileText className="h-6 w-6 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {rec.title}
                        </h3>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <User className="h-4 w-4 mr-1" />
                          {rec.doctor.user.fullName}
                        </div>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {rec.createdAt.toLocaleDateString()}
                        </div>
                        <div className="mt-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${info.color}`}
                          >
                            {info.label}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                      <Button size="sm" variant="secondary">
                        Download
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
          {total > 1 && (
            <Pagination
              currentPage={page}
              totalPages={total}
              onPageChange={setPage}
            />
          )}
        </>
      ) : (
        <Card className="p-6 text-center">
          <p className="text-gray-500">No medical records yet.</p>
          <Button>Upload Records</Button>
        </Card>
      )}
    </div>
  );
};

export default RecordsTab;
