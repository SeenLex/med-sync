import React from "react";
import Card from "@/components/ui/Card";
import Layout from "@/components/layout/DoctorLayout";

const MyMessagesPage = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Messages</h1>
        <Card className="p-6 text-center">
          <p className="text-gray-500">This is where you will see your messages with patients and other doctors.</p>
        </Card>
      </div>
    </Layout>
  );
};

export default MyMessagesPage;
