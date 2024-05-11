import Image from "next/image";
import InvoiceTemplateCard from "./_components/template-card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-geist-sans font-black">
          Invoice Me
        </h1>
        <p>Your go to invoice maker, select template to continue.</p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-4">
          <InvoiceTemplateCard />
          <InvoiceTemplateCard />
          <InvoiceTemplateCard />
          <InvoiceTemplateCard />
        </div>
      </div>
    </main>
  );
}
