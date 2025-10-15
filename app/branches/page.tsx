"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useBooking } from "@/app/context/BookingContext";
import { getBranches } from "@/app/api";
import Loading from "@/app/components/Loading";
import { PageLayout } from "@/app/components/PageLayout";

type Branch = { branchId: string; name: string; address: string };

export default function BranchSelection() {
  const [loading, setLoading] = useState(false);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [search, setSearch] = useState("");
  const { booking, setBooking } = useBooking();
  const router = useRouter();

  useEffect(() => {
    let active = true; // avoid setting state after unmount
    setLoading(true);

    const fetchBranches = async () => {
      try {
        const data = await getBranches(search);

        if (active) {
          setBranches(data);
        }
      } catch (err) {
        console.error("Error loading branches:", err);
      } finally {
        if (active) setLoading(false);
      }
    };

    // debounce call
    const timeout = setTimeout(fetchBranches, 400);

    // cleanup
    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, [search]);

  function handleSelect(branch: Branch) {
    setBooking({
      branchId: branch.branchId,
      branchName: branch.name,
      branchAddress: branch.address,
    });
  }

  function handleContinue() {
    if (!booking.branchId) return; // nothing selected yet
    router.push("/schedule");
  }

  return (
    <PageLayout
      title="Select a branch"
      withFooter
      footerLabel="Next"
      onFooterClick={handleContinue}
      footerDisabled={!booking.branchId}
    >
      <div className="relative mb-4">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 dark:text-slate-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
            />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search branches by name, address, or province"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/50 dark:border-slate-700 dark:bg-background-dark/50 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="absolute right-2 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-gray-500 hover:bg-gray-200 hover:text-primary focus:outline-none dark:hover:bg-gray-700"
          >
            {/* Bigger X (SVG for better visibility) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="scrollbar-thin max-h-[calc(100vh-220px)] space-y-2 overflow-y-auto pr-1">
        {loading ? (
          <Loading />
        ) : (
          branches.map((branch) => (
            <div
              key={branch.branchId}
              onClick={() => handleSelect(branch)}
              className={`flex cursor-pointer items-center justify-between rounded-lg p-3 shadow-sm transition-colors duration-200 ${
                booking?.branchId === branch.branchId
                  ? "border border-primary bg-primary/20 dark:bg-primary/30"
                  : "bg-white hover:bg-primary/10 dark:bg-background-dark/50 dark:hover:bg-primary/20"
              }`}
            >
              {/* Left side: icon + branch info */}
              <div className="flex items-center">
                <div className="mr-4 flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  {/* Location Pin */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7z"
                    />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-650 font-semibold dark:text-gray-100">{branch.name}</p>
                  <p className="text-sm text-gray-400 dark:text-gray-400">{branch.address}</p>
                </div>
              </div>

              {/* Right side: checkmark if selected */}
              {booking?.branchId === branch.branchId && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          ))
        )}
      </div>
    </PageLayout>
  );
}
