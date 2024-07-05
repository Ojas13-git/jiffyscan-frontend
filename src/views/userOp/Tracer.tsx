import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton-2';
import Caption from '@/components/common/Caption';

interface TracerItem {
    state: string;
    result: string;
}

const Tracer = () => {
    const [tracer, setTracer] = useState<TracerItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

    // Simulating data fetching
    useEffect(() => {
        // Simulate fetching data
        setTimeout(() => {
            const mockTracerData: TracerItem[] = [
                {
                    state: 'Pre Verification',
                    result: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
                },
                {
                    state: 'Account Creation',
                    result: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
                },
                {
                    state: 'Execution',
                    result: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
                },
                {
                    state: 'Post Execution',
                    result: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
                },
            ];

            setTracer(mockTracerData);
            setLoading(false); // Set loading to false when data fetching is done
        }, 2000); // Simulating a 2 second delay
    }, []);

    const toggleAccordion = (index: number) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    if (loading) {
        return (
            <div className="container px-0 mt-12">
                <div>
                    <Caption icon={'/images/cube.svg'} text={'Tracer'} />
                </div>
                <Skeleton height={55} />
            </div>
        );
    }

    if (!loading && tracer.length === 0) {
        return <div className="text-gray-500 text-center my-4">No logs available.</div>;
    }

    return (
        <section className="mt-4 px-3 mb-10 break-all">
            <div className="container px-0">
                <div>
                    <Caption icon={'/images/cube.svg'}>Tracer</Caption>
                </div>
                <div className="my-4">
                    <div id="accordion-collapse" data-accordion="collapse">
                        {/* First Accordion */}
                        <div className="mb-6">
                            <h2 id="accordion-collapse-heading-0">
                                <button
                                    type="button"
                                    className="flex items-center justify-between bg-white w-full lg:w-1240 p-4 lg:px-8 font-medium rtl:text-right text-gray-500 border border-gray-200 dark:text-gray-400 gap-3 min-h-20"
                                    onClick={() => toggleAccordion(0)}
                                    aria-expanded={activeAccordion === 0}
                                    aria-controls={`accordion-collapse-body-0`}
                                >
                                    {' '}
                                    <div className="flex justify-between gap-4">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M21 7.00375L9 19.0037L3.5 13.5037L4.91 12.0938L9 16.1737L19.59 5.59375L21 7.00375Z"
                                                fill="#137333"
                                            />
                                        </svg>
                                        <span className="lg:text-[22px] text-gray-900">{tracer[0].state}</span>
                                    </div>
                                    <svg
                                        className={`w-3 h-3 rotate-${activeAccordion === 0 ? '0' : '180'} shrink-0`}
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 10 6"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 5 5 1 1 5"
                                        />
                                    </svg>
                                </button>
                            </h2>
                            <div
                                id={`accordion-collapse-body-0`}
                                className={`p-4 lg:px-8 border rounded-b-lg border-gray-200 ${activeAccordion === 0 ? 'block' : 'hidden'}`}
                                aria-labelledby={`accordion-collapse-heading-0`}
                            >
                                <p className="mb-2 text-[#1F1F1F] dark:text-[#1F1F1F]">{tracer[0].result}</p>
                            </div>
                        </div>

                        {/* Second Accordion */}
                        <div className="mb-6">
                            <h2 id="accordion-collapse-heading-1">
                                <button
                                    type="button"
                                    className="flex items-center justify-between bg-white w-full lg:w-1240 p-4 lg:px-8 font-medium rtl:text-right text-gray-500 border border-gray-200 dark:text-gray-400 gap-3 min-h-20"
                                    onClick={() => toggleAccordion(1)}
                                    aria-expanded={activeAccordion === 1}
                                    aria-controls={`accordion-collapse-body-1`}
                                >
                                    <div className="flex justify-between gap-4">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M11 15H13V17H11V15ZM11 7H13V13H11V7ZM12 2C6.47 2 2 6.5 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM12 20C9.87827 20 7.84344 19.1571 6.34315 17.6569C4.84285 16.1566 4 14.1217 4 12C4 9.87827 4.84285 7.84344 6.34315 6.34315C7.84344 4.84285 9.87827 4 12 4C14.1217 4 16.1566 4.84285 17.6569 6.34315C19.1571 7.84344 20 9.87827 20 12C20 14.1217 19.1571 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20Z"
                                                fill="#C5221F"
                                            />
                                        </svg>

                                        <span className="lg:text-[22px] text-gray-900">{tracer[1].state}</span>
                                    </div>
                                    <svg
                                        className={`w-3 h-3 rotate-${activeAccordion === 1 ? '0' : '180'} shrink-0`}
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 10 6"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 5 5 1 1 5"
                                        />
                                    </svg>
                                </button>
                            </h2>
                            <div
                                id={`accordion-collapse-body-1`}
                                className={`p-4 lg:px-8 border rounded-b-lg border-gray-200 ${activeAccordion === 1 ? 'block' : 'hidden'}`}
                                aria-labelledby={`accordion-collapse-heading-1`}
                            >
                                <p className="mb-2 text-[#1F1F1F] dark:text-[#1F1F1F]">{tracer[1].result}</p>
                            </div>
                        </div>

                        {/* Third Accordion */}
                        <div className="mb-6">
                            <h2 id="accordion-collapse-heading-2">
                                <button
                                    type="button"
                                    className="flex items-center justify-between bg-white w-full lg:w-1240 p-4 lg:px-8 font-medium rtl:text-right text-gray-500 border border-gray-200 dark:text-gray-400 gap-3 min-h-20"
                                    onClick={() => toggleAccordion(2)}
                                    aria-expanded={activeAccordion === 2}
                                    aria-controls={`accordion-collapse-body-2`}
                                >
                                    <div className="flex justify-between gap-4">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M11.0008 0.03125V2.05125C15.3908 2.59125 18.5008 6.58125 17.9608 10.9713C17.5008 14.6113 14.6408 17.5012 11.0008 17.9312V19.9312C16.5008 19.3813 20.5008 14.5013 19.9508 9.00125C19.5008 4.25125 15.7308 0.50125 11.0008 0.03125ZM9.00078 0.06125C7.05078 0.25125 5.19078 1.00125 3.67078 2.26125L5.10078 3.74125C6.22078 2.84125 7.57078 2.26125 9.00078 2.06125V0.06125ZM2.26078 3.67125C1.01122 5.18907 0.241875 7.04456 0.0507812 9.00125H2.05078C2.24078 7.58125 2.80078 6.23125 3.69078 5.10125L2.26078 3.67125ZM0.0607812 11.0013C0.260781 12.9613 1.03078 14.8112 2.27078 16.3312L3.69078 14.9012C2.80763 13.7709 2.24464 12.4239 2.06078 11.0013H0.0607812ZM5.10078 16.3713L3.67078 17.7412C5.18575 19.0036 7.04014 19.7899 9.00078 20.0012V18.0012C7.57816 17.8174 6.23114 17.2544 5.10078 16.3713ZM12.5908 6.00125L10.0008 8.59125L7.41078 6.00125L6.00078 7.41125L8.59078 10.0013L6.00078 12.5913L7.41078 14.0013L10.0008 11.4113L12.5908 14.0013L14.0008 12.5913L11.4108 10.0013L14.0008 7.41125L12.5908 6.00125Z"
                                                fill="#5A5A62"
                                            />
                                        </svg>

                                        <span className="lg:text-[22px] text-gray-900">{tracer[2].state}</span>
                                    </div>
                                    <svg
                                        className={`w-3 h-3 rotate-${activeAccordion === 2 ? '0' : '180'} shrink-0`}
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 10 6"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 5 5 1 1 5"
                                        />
                                    </svg>
                                </button>
                            </h2>
                            <div
                                id={`accordion-collapse-body-2`}
                                className={`p-4 lg:px-8 border rounded-b-lg border-gray-200 ${activeAccordion === 2 ? 'block' : 'hidden'}`}
                                aria-labelledby={`accordion-collapse-heading-2`}
                            >
                                <p className="mb-2 text-[#1F1F1F] dark:text-[#1F1F1F]">{tracer[2].result}</p>
                            </div>
                        </div>

                        {/* Fourth Accordion */}
                        <div className="mb-6">
                            <h2 id="accordion-collapse-heading-3">
                                <button
                                    type="button"
                                    className="flex items-center justify-between bg-white w-full lg:w-1240 p-4 lg:px-8 font-medium rtl:text-right text-gray-500 border border-gray-200 dark:text-gray-400 gap-3 min-h-20"
                                    onClick={() => toggleAccordion(3)}
                                    aria-expanded={activeAccordion === 3}
                                    aria-controls={`accordion-collapse-body-3`}
                                >
                                    <div className="flex justify-between gap-4">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M11.0008 0.03125V2.05125C15.3908 2.59125 18.5008 6.58125 17.9608 10.9713C17.5008 14.6113 14.6408 17.5012 11.0008 17.9312V19.9312C16.5008 19.3813 20.5008 14.5013 19.9508 9.00125C19.5008 4.25125 15.7308 0.50125 11.0008 0.03125ZM9.00078 0.06125C7.05078 0.25125 5.19078 1.00125 3.67078 2.26125L5.10078 3.74125C6.22078 2.84125 7.57078 2.26125 9.00078 2.06125V0.06125ZM2.26078 3.67125C1.01122 5.18907 0.241875 7.04456 0.0507812 9.00125H2.05078C2.24078 7.58125 2.80078 6.23125 3.69078 5.10125L2.26078 3.67125ZM0.0607812 11.0013C0.260781 12.9613 1.03078 14.8112 2.27078 16.3312L3.69078 14.9012C2.80763 13.7709 2.24464 12.4239 2.06078 11.0013H0.0607812ZM5.10078 16.3713L3.67078 17.7412C5.18575 19.0036 7.04014 19.7899 9.00078 20.0012V18.0012C7.57816 17.8174 6.23114 17.2544 5.10078 16.3713ZM12.5908 6.00125L10.0008 8.59125L7.41078 6.00125L6.00078 7.41125L8.59078 10.0013L6.00078 12.5913L7.41078 14.0013L10.0008 11.4113L12.5908 14.0013L14.0008 12.5913L11.4108 10.0013L14.0008 7.41125L12.5908 6.00125Z"
                                                fill="#5A5A62"
                                            />
                                        </svg>

                                        <span className="lg:text-[22px] text-gray-900">{tracer[3].state}</span>
                                    </div>
                                    <svg
                                        className={`w-3 h-3 rotate-${activeAccordion === 3 ? '0' : '180'} shrink-0`}
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 10 6"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 5 5 1 1 5"
                                        />
                                    </svg>
                                </button>
                            </h2>
                            <div
                                id={`accordion-collapse-body-3`}
                                className={`p-4 lg:px-8 border rounded-b-lg border-gray-200 ${activeAccordion === 3 ? 'block' : 'hidden'}`}
                                aria-labelledby={`accordion-collapse-heading-3`}
                            >
                                <p className="mb-2 text-[#1F1F1F] dark:text-[#1F1F1F]">{tracer[3].result}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Tracer;
