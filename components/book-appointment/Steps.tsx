import React from "react";

interface StepsProps {
  step: number;
  stepLabels: string[];
}

const Steps: React.FC<StepsProps> = ({ step, stepLabels }) => {
  return (
    <>
      <div className="hidden md:block mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((n) => (
            <React.Fragment key={n}>
              <div className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step >= n
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {n}
                </div>
                <p
                  className={`ml-2 text-sm font-medium ${
                    step >= n ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {stepLabels[n - 1]}
                </p>
              </div>
              {n < 4 && (
                <div
                  className={`flex-1 h-1 mx-4 ${
                    step > n ? "bg-emerald-600" : "bg-gray-200"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="md:hidden flex items-center mb-6">
        <div
          className="flex items-center justify-center w-9 h-8 rounded-full
               bg-emerald-600 text-white flex-shrink-0 text-sm font-medium"
        >
          {step}/{stepLabels.length}
        </div>
        <span className="ml-2 text-sm font-medium text-gray-900">
          {stepLabels[step - 1]}
        </span>
      </div>
    </>
  );
};

export default Steps;