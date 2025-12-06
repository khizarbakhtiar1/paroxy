"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";

const documentTypes = [
  {
    type: "NDA",
    title: "Non-Disclosure Agreement",
    description: "Protect confidential information",
    fields: ["partyName", "effectiveDate", "jurisdiction"],
  },
  {
    type: "EMPLOYMENT_CONTRACT",
    title: "Employment Contract",
    description: "Hire employees or contractors",
    fields: ["employeeName", "position", "salary", "startDate"],
  },
  {
    type: "SHAREHOLDER_AGREEMENT",
    title: "Shareholder Agreement",
    description: "Define equity and ownership",
    fields: ["shareholders", "equityDistribution", "vestingSchedule"],
  },
  {
    type: "TERMS_OF_SERVICE",
    title: "Terms of Service",
    description: "User agreement for your product",
    fields: ["companyName", "serviceName", "jurisdiction"],
  },
  {
    type: "PRIVACY_POLICY",
    title: "Privacy Policy",
    description: "GDPR and data protection compliance",
    fields: ["companyName", "website", "dataTypes"],
  },
];

export default function GenerateDocumentPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState("");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedDoc = documentTypes.find((d) => d.type === selectedType);

  const handleGenerate = async () => {
    if (!selectedType) {
      setError("Please select a document type");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/legal/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentType: selectedType,
          params: formData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate document");
      }

      const data = await response.json();
      router.push(`/dashboard/legal/document/${data.id}`);
    } catch (err) {
      setError("Failed to generate document. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/dashboard/legal">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Generate Legal Document
          </h1>
          <p className="mt-1 text-gray-600">
            AI-powered document generation tailored to your needs
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Document Type Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Document Type</CardTitle>
            <CardDescription>
              Choose the type of legal document you need
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {documentTypes.map((doc) => (
                <button
                  key={doc.type}
                  onClick={() => {
                    setSelectedType(doc.type);
                    setFormData({});
                  }}
                  className={`w-full rounded-lg border p-4 text-left transition-all ${
                    selectedType === doc.type
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <p className="font-medium text-gray-900">{doc.title}</p>
                  <p className="mt-1 text-sm text-gray-600">
                    {doc.description}
                  </p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Document Details */}
        <Card>
          <CardHeader>
            <CardTitle>Document Details</CardTitle>
            <CardDescription>
              {selectedDoc
                ? "Fill in the required information"
                : "Select a document type to continue"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDoc ? (
              <div className="space-y-4">
                {selectedDoc.fields.map((field) => (
                  <div key={field} className="space-y-2">
                    <label className="text-sm font-medium capitalize">
                      {field.replace(/([A-Z])/g, " $1").trim()}
                    </label>
                    <Input
                      value={formData[field] || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, [field]: e.target.value })
                      }
                      placeholder={`Enter ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`}
                    />
                  </div>
                ))}

                {error && (
                  <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <Button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? (
                    "Generating..."
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate with AI
                    </>
                  )}
                </Button>

                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="text-sm text-blue-900">
                    🤖 <strong>AI-Powered:</strong> Your document will be
                    generated using advanced AI, customized to your specific
                    needs and jurisdiction.
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-gray-500">
                <p>Select a document type to get started</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

