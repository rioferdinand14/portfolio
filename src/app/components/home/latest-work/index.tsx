"use client";
import { getDataPath, getImgPath } from "@/utils/image";
import Image from "next/image";
import Link from "next/link";

import { lazy, Suspense, useEffect, useState } from "react";

const Modal = lazy(() => import("@/app/components/home/modal/modal"));


const LatestWork = () => {
  const [workData, setWorkData] = useState<any>(null);
  const [showRegularModal, setShowRegularModal] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(getDataPath("/data/work-data.json"));
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setWorkData(data?.workData);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section>
        <div className="bg-softGray">
          <div className="container">
            <div className="py-16 xl:py-32 ">
              <div className="flex items-center justify-between gap-2 border-b border-black pb-7 mb-9 md:mb-16">
                <h2>Latest Works</h2>
                <p className="text-xl text-primary">( 04 )</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 xl:gap-y-12">
                {workData?.map((value: any, index: any) => {
                  return (
                    <div
                      key={index}
                      className="group flex flex-col gap-3 xl:gap-6"
                    >
                      <div className="relative">
                        <Image
                          src={getImgPath(value?.image)}
                          alt="image"
                          width={570}
                          height={414}
                          className="rounded-lg w-full h-full object-cover"
                        />
                        <Link
                          href={"#!"}
                          onClick={(e) => {
                            e.preventDefault();
                            setShowRegularModal(value);
                          }}
                          className="absolute top-0 left-0 backdrop-blur-xs bg-primary/15 w-full h-full hidden group-hover:flex rounded-lg"
                        >
                          <span className="flex justify-center items-center p-5 w-full">
                            <svg
                              width="65"
                              height="64"
                              viewBox="0 0 65 64"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                x="0.333374"
                                width="64"
                                height="64"
                                rx="32"
                                fill="#4a6fdf"
                              />
                              <path
                                d="M25.6667 25.3333H39M39 25.3333V38.6666M39 25.3333L25.6667 38.6666"
                                stroke="#FFFF"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </Link>
                      </div>
                      <div className="flex flex-col gap-0 xl:gap-2">
                        <div className="flex items-center justify-between">
                          <Link href={`${value.slug}`}>
                            <h5>{value?.title}</h5>
                          </Link>
                          <Image
                            src={getImgPath(
                              "/images/icon/right-arrow-icon.svg",
                            )}
                            alt="right-arrow-icon"
                            width={30}
                            height={30}
                          />
                        </div>
                        <p>{value?.client}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      {showRegularModal && (
        <Suspense>
          <Modal
            closeClick={() => setShowRegularModal(null)}
            // If the state has an object, it's "open"
            showModal={showRegularModal ? "open" : "hide"}
            bookmarkId="modal-regular"
          >
            <div className="bg-white flex flex-col w-[90vw] md:w-[50vw] rounded-3xl overflow-hidden shadow-2xl">
              <Link
                className="m-[10px] cursor-pointer self-end"
                href={"#!"}
                onClick={(e) => {
                  e.preventDefault();
                  setShowRegularModal(null);
                }}
              >
                <Image
                  src={getImgPath("/images/icon/close-icon.svg")}
                  width={30}
                  height={30}
                  alt="close icon"
                />
              </Link>
              <div className="w-full flex flex-col md:flex-row gap-8 p-6 md:p-10">
                {/* LEFT SIDE: Visuals */}
                <div className="flex-1 flex flex-col gap-4">
                  <div className="overflow-hidden rounded-md border border-gray-100 shadow-sm">
                    <Image
                      src={getImgPath(
                        showRegularModal?.subImage1 || showRegularModal?.image,
                      )}
                      alt="Main project"
                      width={200}
                      height={200}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  {/* Secondary Picture - You mentioned wanting another image */}
                  {/* <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm opacity-90 hover:opacity-100 transition-opacity">
                    <Image
                      src={getImgPath(
                        showRegularModal?.subImage2 || showRegularModal?.image,
                      )}
                      alt="Secondary view"
                      width={800}
                      height={500}
                      className="w-full h-auto object-cover"
                    />
                  </div> */}
                </div>

                {/* RIGHT SIDE: Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {showRegularModal?.category || "Data Not Found"}
                      </span>
                    </div>

                    <h2 className="text-3xl font-bold text-black mb-4 leading-tight">
                      {showRegularModal?.title}
                    </h2>

                    <p className="text-secondary leading-relaxed mb-6">
                      {showRegularModal?.description || "Data Not Found"}
                    </p>

                    {/* Tech Stack Badges */}
                    <div className="mb-8">
                      <h4 className="text-sm font-bold text-black uppercase mb-3 tracking-wide">
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {showRegularModal?.tech?.map(
                          (tech: string, i: number) => (
                            <span
                              key={i}
                              className="bg-softGray text-black px-3 py-1.5 rounded-lg text-sm font-medium"
                            >
                              {tech}
                            </span>
                          ),
                        ) || (
                          <span className="bg-softGray px-3 py-1.5 rounded-lg text-sm">
                            Not Found
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Footer Buttons */}
                  {/* <div className="flex items-center gap-4 mt-6">
                    <Link
                      href={showRegularModal?.link || "#"}
                      className="flex-1 bg-black text-white text-center py-4 rounded-xl font-bold hover:bg-gray-800 transition-all active:scale-95"
                    >
                      Live Preview
                    </Link>
                    <Link
                      href={showRegularModal?.github || "#"}
                      className="flex-1 border-2 border-black text-black text-center py-4 rounded-xl font-bold hover:bg-black hover:text-white transition-all active:scale-95"
                    >
                      Source Code
                    </Link>
                  </div> */}
                </div>
              </div>
            </div>
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default LatestWork;
