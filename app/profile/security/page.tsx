import SecurityTab from "@/components/profile/SecurityTab";
import { createClient } from "@/utils/supabase/server";
import React from "react";

const SecurityPage = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // You might want to redirect to a login page here
    // import { redirect } from 'next/navigation';
    // redirect('/login');
    return <div>Please log in to view security settings.</div>;
  }

  // SecurityTab is a client component and manages its own UI state.
  // If you need to pass user-specific data (like user.id for API calls)
  // to SecurityTab, you can pass it as a prop here.
  // For example: <SecurityTab userId={user.id} />
  return <SecurityTab />;
};

export default SecurityPage;
