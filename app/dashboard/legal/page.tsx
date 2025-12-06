import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default async function LegalPage() {
  const session = await auth();

  // Get user's startup
  const startup = await prisma.startup.findFirst({
    where: { founderId: session?.user?.id },
  });

  // Get legal documents
  const documents = startup
    ? await prisma.legalDocument.findMany({
        where: { startupId: startup.id },
        orderBy: { updatedAt: "desc" },
      })
    : [];

  // Get compliance tasks
  const complianceTasks = await prisma.complianceTask.findMany({
    orderBy: { dueDate: "asc" },
    take: 10,
  });

  const documentStats = {
    total: documents.length,
    draft: documents.filter((d) => d.status === "DRAFT").length,
    approved: documents.filter((d) => d.status === "APPROVED").length,
    signed: documents.filter((d) => d.status === "SIGNED").length,
  };

  const complianceStats = {
    total: complianceTasks.length,
    pending: complianceTasks.filter((t) => t.status === "PENDING").length,
    overdue: complianceTasks.filter(
      (t) => t.dueDate && t.dueDate < new Date() && t.status === "PENDING"
    ).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Legal & Compliance
          </h1>
          <p className="mt-1 text-gray-600">
            Manage documents, contracts, and regulatory compliance
          </p>
        </div>
        <Link href="/dashboard/legal/generate">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Generate Document
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Documents
            </CardTitle>
            <FileText className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documentStats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Draft Documents
            </CardTitle>
            <FileText className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documentStats.draft}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Tasks
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complianceStats.pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Overdue Items
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {complianceStats.overdue}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Documents */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Documents</CardTitle>
            <CardDescription>
              Your latest legal documents and contracts
            </CardDescription>
          </CardHeader>
          <CardContent>
            {documents.length === 0 ? (
              <div className="py-8 text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-4 text-sm text-gray-600">
                  No documents yet. Start by generating your first document.
                </p>
                <Link href="/dashboard/legal/generate">
                  <Button className="mt-4" variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Generate Document
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {documents.slice(0, 5).map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between rounded-lg border border-gray-100 p-3 transition-colors hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {doc.title}
                        </p>
                        <p className="text-xs text-gray-600">
                          {doc.type.replace(/_/g, " ")}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        doc.status === "SIGNED"
                          ? "bg-green-100 text-green-700"
                          : doc.status === "APPROVED"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Compliance Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Compliance Tasks</CardTitle>
            <CardDescription>
              Important compliance items that need attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            {complianceTasks.length === 0 ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
                <p className="mt-4 text-sm text-gray-600">
                  All compliance tasks are up to date!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {complianceTasks.slice(0, 5).map((task) => {
                  const isOverdue =
                    task.dueDate &&
                    task.dueDate < new Date() &&
                    task.status === "PENDING";

                  return (
                    <div
                      key={task.id}
                      className="flex items-center justify-between rounded-lg border border-gray-100 p-3 transition-colors hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300"
                          checked={task.status === "COMPLETED"}
                          readOnly
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {task.title}
                          </p>
                          {task.dueDate && (
                            <p
                              className={`text-xs ${
                                isOverdue ? "text-red-600" : "text-gray-600"
                              }`}
                            >
                              Due: {task.dueDate.toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                      {isOverdue && (
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* AI Suggestions */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>🤖</span>
            <span>AI Legal Suggestions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <p className="text-sm font-medium text-gray-900">
                📄 Document Recommendations
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Based on your startup stage, you should have: NDA, Employment
                Contracts, and Shareholder Agreement. Generate these now to
                protect your business.
              </p>
              <Link href="/dashboard/legal/generate">
                <Button className="mt-3" size="sm" variant="outline">
                  Generate Documents
                </Button>
              </Link>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <p className="text-sm font-medium text-gray-900">
                ⚖️ Compliance Reminder
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Ensure your privacy policy is GDPR compliant if you have
                European users. I can help you update it automatically.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

