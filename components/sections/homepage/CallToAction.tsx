import React from "react";
import Button from "@/components/ui/Button";
import Link from "next/link";

const CallToAction: React.FC = () => {
  return (
    <div className="py-12 bg-emerald-600 text-white text-center rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold mb-4">
        Ready to take control of your health?
      </h2>
      <p className="mb-8 text-lg">
        Join thousands of users managing their health with MedSync today.
      </p>
      <Link href="/register">
        <Button variant="secondary" size="lg" className="mx-auto">
          Sign Up Now
        </Button>
      </Link>
    </div>
  );
};

export default CallToAction;
