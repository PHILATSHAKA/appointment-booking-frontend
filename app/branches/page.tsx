"use client";

import { Manrope } from "next/font/google";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useBooking } from "../context/BookingContext";
import { getBranches } from "../api";
import Loading from "../components/Loading";
import Header from "../components/Header";
import PageContainer from "../components/PageContainer";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

type Branch = { branchId: string; name: string; address: string };

export default function BranchSelection() {
  const [loading, setLoading] = useState(false);
  const [branches, setBranches] = useState<Branch[]>([]);
  // const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [search, setSearch] = useState("");
  const { booking, setBooking } = useBooking();
  const router = useRouter();

  useEffect(() => {
    let active = true; // 👈 to avoid setting state after unmount
    setLoading(true);

    const fetchBranches = async () => {
      try {
        const data = await getBranches(search); // ✅ use your API
        if (active) setBranches(data);
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

  // function handleContinue() {
  //   // if (!selectedBranch) return;
  //   // setBooking({ branchId: selectedBranch.branchId, branchName: selectedBranch.name });
  //   // router.push("/schedule");
  //   console.log("continue", booking);
  //   if (!booking.branchId) return; // nothing selected yet
  //   router.push("/schedule");
  // }

  // ✅ Stable, safe handler
  const handleContinue = useCallback(
    (e?: React.MouseEvent<HTMLButtonElement>) => {
      // If this button ever sits inside a <form>, prevent a submit refresh
      e?.preventDefault();

      console.log("Continue clicked", booking);

      if (!booking?.branchId) return;
      router.push("/schedule");
    },
    // Only depend on what you actually read inside
    [booking?.branchId, router]
  );

  return (
    <PageContainer>
      <Header title="Select a branch" />

      {/* Main */}
      <main className="flex-grow p-4">
        {/* Search bar */}
        <div className="relative mb-4">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 dark:text-slate-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
            className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/50 dark:border-slate-700 dark:bg-background-dark/50 dark:text-slate-200 dark:placeholder-slate-500"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-gray-500 hover:bg-gray-200 hover:text-primary focus:outline-none dark:hover:bg-gray-700"
            >
              {/* Bigger X (SVG for better visibility) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
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
                  <div className="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    {/* Location Pin */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary"
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
                    className="h-6 w-6 text-primary"
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
      </main>

      {/* Footer */}
      <footer className="border-t border-background-light bg-background-light p-4 dark:border-background-dark/20 dark:bg-background-dark">
        <button
          type="button"
          onClick={() => {
            if (!booking.branchId) return;
            router.push("/schedule");
          }}
          disabled={!booking.branchId}
          className={`flex h-12 w-full items-center justify-center rounded-lg px-5 py-3 font-bold transition-colors duration-200 ${
            booking.branchId
              ? "bg-primary text-white hover:bg-primary/90"
              : "cursor-not-allowed bg-slate-300 text-slate-500 dark:bg-slate-700"
          }`}
        >
          Continue
        </button>
      </footer>
      {/* </div> */}
    </PageContainer>
  );
}
