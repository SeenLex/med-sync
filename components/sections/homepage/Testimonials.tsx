import React from "react";

const Testimonials: React.FC = () => {
  return (
    <div id="testimonials" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-emerald-600 font-semibold tracking-wide uppercase">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            What our users are saying
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          
          <div className="bg-gray-50 rounded-lg p-6 shadow-md">
            <div className="flex items-center mb-4">
              <img
                className="h-12 w-12 rounded-full object-cover"
                src="https://randomuser.me/api/portraits/women/32.jpg"
                alt="Sarah M."
              />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Sarah M.</h3>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600">
              &quot;I love how easy it is to keep all my medical records in one
              MedSync has made managing my healthcare so much easier. I can book
              appointments, talk to my doctor, and access my records all in one
              place. It&apos;s been a game-changer! &quot;I love how easy it is
              to keep all my medical records in one
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 shadow-md">
            <div className="flex items-center mb-4">
              <img
                className="h-12 w-12 rounded-full object-cover"
                src="https://randomuser.me/api/portraits/men/54.jpg"
                alt="Robert J."
              />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Robert J.</h3>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600">
              &quot;I love how easy it is to keep all my medical records in one
              As someone with a chronic condition, I need to see my doctor
              regularly. The virtual consultations have saved me so much time
              and made it easier to stay on top of my health. &quot;I love how
              easy it is to keep all my medical records in one
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 shadow-md">
            <div className="flex items-center mb-4">
              <img
                className="h-12 w-12 rounded-full object-cover"
                src="https://randomuser.me/api/portraits/women/68.jpg"
                alt="Lisa T."
              />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Lisa T.</h3>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600">
              &quot;I love how easy it is to keep all my medical records in one
              place. I recently changed doctors, and being able to share my
              history seamlessly made the transition so smooth.&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
