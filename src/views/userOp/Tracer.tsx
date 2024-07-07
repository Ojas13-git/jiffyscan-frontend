
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton-2';
import Caption from '@/components/common/Caption';
import { getUsserOpTrace } from '@/components/common/apiCalls/jiffyApis';
import { toast } from 'react-toastify';
import 'react-json-view-lite/dist/index.css';
import { JsonView } from 'react-json-view-lite';

interface TracerData {
    validation?: object;
    accountCreation?: object;
    execution?: object;
    postExecution?: object;
}

interface ItemProps {
    userOpHash: string;
    network: string;
}

interface TracerProps {
    item: ItemProps;
}

const Tracer: React.FC<TracerProps> = ({ item, network }: any) => {
    const [tracer, setTracer] = useState<TracerData | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

    useEffect(() => {
        const fetchTracerData = async () => {
            try {
                const response = await getUsserOpTrace(item.userOpHash, item.network, toast);
                setTracer(response);
            } catch (error) {
                console.error('Error fetching tracer data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTracerData();
    }, [item, network]);

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

    if (!tracer) {
        return <div className="text-gray-500 text-center my-4">No logs available.</div>;
    }

    const sections = [
        { title: 'Validation', data: tracer.validation },
        { title: 'Account Creation', data: tracer.accountCreation },
        { title: 'Execution', data: tracer.execution },
        { title: 'Post Execution', data: tracer.postExecution }
    ];

    return (
        <section className="mt-4 px-3 mb-10 break-all">
            <div className="container px-0">
                <div>
                    <Caption icon={'/images/cube.svg'}>Tracer</Caption>
                </div>
                <div className="my-4">
                    <div id="accordion-collapse" data-accordion="collapse">
                        {sections.map((section, index) => (
                            <div className="mb-6" key={index}>
                                <h2>
                                    <button
                                        type="button"
                                        className="flex items-center justify-between bg-white w-full lg:w-1240 p-4 lg:px-8 font-medium rtl:text-right text-gray-500 border border-gray-200 dark:text-gray-400 gap-3 min-h-20"
                                        onClick={() => toggleAccordion(index)}
                                        aria-expanded={activeAccordion === index}
                                        aria-controls={`accordion-collapse-body-${index}`}
                                    >
                                        <div className="flex justify-between gap-4">
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M11 15H13V17H11V15ZM11 7H13V13H11V7ZM12 2C6.47 2 2 6.5 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM12 20C9.87827 20 7.84344 19.1571 6.34315 17.6569C4.84285 16.1566 4 14.1217 4 12C4 9.87827 4.84285 7.84344 6.34315 6.34315C7.84344 4.84285 9.87827 4 12 4C14.1217 4 16.1566 4.84285 17.6569 6.34315C19.1571 7.84344 20 9.87827 20 12C20 14.1217 19.1571 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20Z"
                                                    fill="#137333"
                                                />
                                            </svg>
                                            <span className="lg:text-[22px] text-gray-900">{section.title}</span>
                                        </div>
                                        <svg
                                            className={`w-3 h-3 rotate-${activeAccordion === index ? '0' : '180'} shrink-0`}
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
                                    id={`accordion-collapse-body-${index}`}
                                    className={`p-4 lg:px-8 border rounded-b-lg border-gray-200 no-wrap ${
                                        activeAccordion === index ? 'block' : 'hidden'
                                    }`}
                                    aria-labelledby={`accordion-collapse-heading-${index}`}
                                >
                                    <JsonView data={section.data || {}} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Tracer;
