"use client";

import React from "react";
import { Button } from "@/app/components/Button";
import { cn } from "@/app/lib/utils";
import Header from "@/app/components/Header";
import PageContainer from "@/app/components/PageContainer";

interface PageLayoutProps {
  title?: string;
  subTitle?: string;
  children: React.ReactNode;
  withHeader?: boolean;
  withFooter?: boolean;

  // Footer button props
  footerLabel?: string;
  onFooterClick?: () => void;
  footerDisabled?: boolean;
  footerLoading?: boolean;
}

export function PageLayout({
  title,
  subTitle,
  children,
  withHeader = true,
  withFooter = false,
  footerLabel,
  onFooterClick,
  footerDisabled,
  footerLoading,
}: PageLayoutProps) {
  return (
    <PageContainer>
      {/* Header */}
      {withHeader && <Header title={title ?? ""} />}

      {/* Main Content */}
      <main className="grow overflow-y-auto p-6">
        {subTitle && (
          <h2 className="text-md mb-6 font-bold text-gray-600 dark:text-white">{subTitle}</h2>
        )}
        {children}
      </main>

      {/* Footer Button */}
      {withFooter && footerLabel && (
        <footer className="sticky bottom-0 border-t border-gray-200 bg-background-light p-4 dark:border-gray-700 dark:bg-background-dark">
          <Button
            onClick={onFooterClick}
            disabled={footerDisabled}
            loading={footerLoading}
            className={cn(
              "h-12 w-full text-base font-bold transition-all",
              footerDisabled
                ? "cursor-not-allowed bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                : "bg-primary text-white shadow-md hover:scale-[1.01] hover:bg-primary/90"
            )}
          >
            {footerLabel}
          </Button>
        </footer>
      )}
    </PageContainer>
  );
}
